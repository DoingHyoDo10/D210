package org.ssafy.d210.members.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.ssafy.d210._common.entity.GatRedis;
import org.ssafy.d210._common.entity.GrtRedis;
import org.ssafy.d210._common.entity.RefreshTokenInRedis;
import org.ssafy.d210._common.exception.CustomException;
import org.ssafy.d210._common.exception.ErrorType;
import org.ssafy.d210._common.repository.GatRepository;
import org.ssafy.d210._common.repository.GrtRepository;
import org.ssafy.d210._common.repository.RefreshTokenInRedisRepository;
import org.ssafy.d210._common.response.oauth2Google.GoogleAccessTokenInfo;
import org.ssafy.d210._common.response.oauth2Google.GoogleOauthTokenInfo;
import org.ssafy.d210._common.response.oauth2Google.GoogleProfileInfo;
import org.ssafy.d210._common.response.oauth2Google.GoogleRefreshTokenInfo;
import org.ssafy.d210._common.service.jwt.JwtUtil;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.members.entity.Role;
import org.ssafy.d210.members.repository.MembersRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberService {

    private final MembersRepository membersRepository;
    private final RefreshTokenInRedisRepository refreshTokenInRedisRepository;
    private final GrtRepository grtRepository;
    private final GatRepository gatRepository;
    private final JwtUtil jwtUtil;

    @Value("${google.client-id}")
    String client_id;
    @Value("${google.client-secret}")
    String client_secret;

    // A. 명세와 구현의 분리
    public GoogleOauthTokenInfo getAccessToken(String code, String redirectUri) {

        return requestAccessToken(code, redirectUri);
    }


    // B. 실제 구현 - AccessToken 얻기
    private GoogleOauthTokenInfo requestAccessToken(String code, String redirectUri) {
        // B-1) 메타 데이터 작성
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // B-2) Params 작성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", client_id);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);
        params.add("client_secret", client_secret);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

        // B-3) AccessToken 요청 후 결과 값
        ResponseEntity<String> responseEntity = new RestTemplate().exchange(
                "https://oauth2.googleapis.com/token",
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        try {
            // B-4) 직렬화된 JSON을 진짜 객체 형태로 역직렬화, 실패시 FAIL_ON_UNKNOWN_PROPERTIES 에러가 나고, 이는 DTO 명세를 맞추지 못한 것이다.
            ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            log.info("성공적으로 GOOGLE과 통신했습니다={}", responseEntity.getBody());
            return objectMapper.readValue(responseEntity.getBody(), GoogleOauthTokenInfo.class);
        } catch (JsonProcessingException e) {
            // B-5) 에러 내역 참고
            log.info(e.getMessage());
            return null;
        }
    }

    // C.   구글 [Resource Server]에서 가져온 데이터와 일치하는 유저가 없다면 해당 유저 Entity 채워서 DB에 저장
    //      만약 있다면 [WALK_WALK TOKEN]을 만들어서 전해줌.
    //      따라서 내 로직은 요청이 들어올 때마다 [WALK_WALK] [AccessToken]과 [RefreshToken]이 같이 만들어진다.
    public List<String> SaveUserAndGetToken(
            String token, HttpServletResponse response, GoogleAccessTokenInfo gat, GoogleRefreshTokenInfo grt) {

        // C-1) Google AT 이용해 유저 정보 받아온다.
        GoogleProfileInfo googleProfileInfo = findProfile(token);
        log.info("[Google AccessToken]을 이용해 받아온 현재 OAuth2 로그인한 사용자의 정보: {}", googleProfileInfo.toString());

        // C-2) 해당 정보를 가진 유저가 있는지 찾는다.
        Members member = membersRepository.findByEmailAndDeletedAtIsNull(googleProfileInfo.getEmail()).orElse(null);

        // C-3) user가 Null이면 response에 신규 유저임을 해서 이렇게 씀
        boolean isNew = false;

        // C-4) 아예 처음 가입한 사람인 경우 다 비어있을 것이다. 그러면 신규 유저다.
        if (member == null) {
            member = Members.of(
                    googleProfileInfo.getEmail(),
                    googleProfileInfo.getName() == null? "없음": googleProfileInfo.getName(),
                    googleProfileInfo.getPicture(),
                    Role.USER
            );
            isNew = true;
        }

        // C-5) 처음 가입한 유저는 아니지만, 추가 정보 입력 단계에서 나간 유저의 경우 해당 부분이 비어있다. -> 따라서 이를 통해 확인한다.
        else if (member.getBirthYear() == null || member.getBlockAddresses() == null || member.getPhoneNumber() == null) {
            isNew = true;
        }
        // C-6) 추가 정보도 다 차 있는 유저일 경우, 신규 가입 여부를 [false]로 두고, 수정일자를 갱신한다.
        //      원래 [setter]로 인한 변경 값이 있을 경우, [save]만 해도 수정일자가 바뀌지만 [isNew]가 [false]인 경우
        //      즉, 추가정보도 다 기입했는데, Google 토큰 만료로 인해 OAuth2 다시 한 사람의 경우, 변경 내용이 없으므로,
        //      save 를 해도 updated_at 이 바뀌지 않는다. 따라서 억지로 수정일자를 변경 해줘야 한다.
        else {
            member.setNew(false);

            membersRepository.updateById(member.getId());
        }

        // C-7) 위의 모든 과정을 거친 후 [save]를 해준다. -> [JPA]의 [dirty Checking]으로 인해, [setter]로 바뀐 값도 자동으로 DB에 업데이트 된다.
        //      updateById 를 한 경우, save 과정은 불필요 하기에 추후 리팩토링이 필요하다.
        membersRepository.save(member);

        // C-8) 구글 AT, RT 정보를 담은 jwt 토큰을 만들어서 헤더에 실는다.
        String jwtAccessToken = jwtUtil.createToken(member, false);
        String jwtRefreshToken = jwtUtil.createToken(member, true);
        response.addHeader("Authorization", jwtAccessToken);

        // C-9) jwt 토큰과 신규 가입 유저 여부를 Body에 담기 위해 ArrayList 형태로 다시 컨트롤러 레벨로 돌려준다.
        List<String> ans = new ArrayList<>();
        ans.add(jwtAccessToken);
        ans.add(String.valueOf(isNew));
        ans.add(jwtRefreshToken);
        ans.add(String.valueOf(member.getId()));
        ans.add(member.getNickname());
        ans.add(member.getProfileUrl());
        // C-10) [REDIS]에 Member 의 PK(식별자), RefreshToken, AccessToken 을 저장
        refreshTokenInRedisRepository.save(new RefreshTokenInRedis(String.valueOf(member.getId()), jwtRefreshToken, jwtAccessToken));
        gatRepository.save(new GatRedis(member.getId(), gat.getAccess_token()));


        if(grt.getRefresh_token() != null){
            grtRepository.save(new GrtRedis(member.getId(), grt.getRefresh_token(), gat.getAccess_token()));
        }

        return ans;
    }


    // D. [Google AccessToken]으로 원하는 정보 가져오기
    public GoogleProfileInfo findProfile(String token) {

        // D-1) RestTemplate 작성
        RestTemplate rt = new RestTemplate();

        // D-2) Metadata 작성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token); //(1-4)
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // D-3) Entity 객체에 하나의 값으로 header를 넣는다. -> 왜 넣는지는 공부 필요
        HttpEntity<MultiValueMap<String, String>> googleProfileRequest =
                new HttpEntity<>(headers);

        // D-4) Http 요청 (POST 방식) 후, response 변수에 응답을 받음
        ResponseEntity<String> googleProfileResponse = rt.exchange(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                HttpMethod.GET,
                googleProfileRequest,
                String.class
        );

        // D-5)
        ObjectMapper objectMapper = new ObjectMapper();
        GoogleProfileInfo googleProfileInfo = null;

        try {
            googleProfileInfo = objectMapper.readValue(googleProfileResponse.getBody(), GoogleProfileInfo.class);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
        }

        return googleProfileInfo;
    }


    // E .해당 이메일을 가진 사용자가 있는지 확인
    public Members validateMemberByEmail(String email) {
        return membersRepository.findByEmailAndDeletedAtIsNull(email)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_MEMBER));
    }

    // F. 닉네임 중복확인
    public boolean isDuplicatedID(String nickname) {
        return membersRepository.findByNicknameAndDeletedAtIsNull(nickname).isPresent();
    }

}
