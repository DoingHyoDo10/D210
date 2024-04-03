package org.ssafy.d210.members.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.ssafy.d210._common.entity.GatRedis;
import org.ssafy.d210._common.entity.GrtRedis;
import org.ssafy.d210._common.exception.CustomException;
import org.ssafy.d210._common.exception.ErrorType;
import org.ssafy.d210._common.repository.GatRepository;
import org.ssafy.d210._common.repository.GrtRepository;
import org.ssafy.d210._common.response.oauth2Google.GoogleAccessTokenInfo;
import org.ssafy.d210._common.response.oauth2Google.GoogleOauthTokenInfo;
import org.ssafy.d210._common.service.UserDetailsImpl;
import org.ssafy.d210.members.dto.request.AdditionalInfo;
import org.ssafy.d210.members.dto.request.VoiceMessageInfo;
import org.ssafy.d210.members.dto.response.JustEoa;
import org.ssafy.d210.members.dto.response.MemberBadgeInfo;
import org.ssafy.d210.members.dto.response.ResMyPageDetailInfo;
import org.ssafy.d210.members.entity.Badge;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.members.entity.VoiceMessage;
import org.ssafy.d210.members.repository.BadgeRepository;
import org.ssafy.d210.members.repository.MemberBadgeRepository;
import org.ssafy.d210.members.repository.MembersRepository;
import org.ssafy.d210.members.repository.VoiceMessageRepository;
import org.ssafy.d210.walk.service.ExerciseCriteriaService;
import org.ssafy.d210.wallets.entity.MemberAccount;
import org.ssafy.d210.wallets.repository.MemberAccountRepository;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberDataService {

    private final MembersRepository membersRepository;
    private final MemberAccountRepository memberAccountRepository;
    private final VoiceMessageRepository voiceMessageRepository;
    private final BadgeRepository badgeRepository;
    private final ExerciseCriteriaService exerciseCriteriaService;
    private final GrtRepository grtRepository;
    private final GatRepository gatRepository;

    @Value("${google.client-id}")
    String client_id;
    @Value("${google.client-secret}")
    String client_secret;


    @Transactional
    public Members addAdditionalInfo (AdditionalInfo addInfo,  UserDetailsImpl userDetails) {

       long id = userDetails.getMember().getId();

       // 0) 추가 가입하려는 사용자의 객체 가져오기
       Members member = membersRepository.findById(id).orElse(null);



       // 1) 현재 [UserDetail]에 사용자가 없다.
       if(member == null){
           log.error("추가 정보 안 들어왔다 임마! 멤버 아이디가 NULL 이야!");
           throw new CustomException(ErrorType.NOT_FOUND_MEMBER);
       }

       // 2) 사용자가 있으면 받은 값으로 세팅 -> dirty checking
        else{
           log.info("추가 가입하려는 사용자의 기존 명세 " + Objects.requireNonNull(member.toString()));

           member.setNickname(addInfo.getNickname());

            if(member.getMemberAccountId() == null){
                MemberAccount memberAccount = new MemberAccount();
                memberAccount.setEgg(0);
                memberAccount.setMoney(0);
                memberAccount.setEoa(addInfo.getEoa());
                memberAccount.setPublicKey(addInfo.getPublicKey());
                memberAccountRepository.save(memberAccount);
                member = addInfo.toEntity(member, memberAccount);
            }else {
                member.getMemberAccountId().setEoa(addInfo.getEoa());
                member.getMemberAccountId().setPublicKey(addInfo.getPublicKey());
                member = addInfo.toEntity(member, member.getMemberAccountId());
            }

            exerciseCriteriaService.setDefaultExerciseCriteria(member);


       }

        return member;

    }

    public ResMyPageDetailInfo getMyPageDetail (UserDetailsImpl userDetails) throws CustomException {
        Members member = membersRepository.findById(userDetails.getMember().getId()).orElse(null);


        if(member == null){
            throw  new CustomException(ErrorType.NOT_FOUND_MEMBER);
        }


        return ResMyPageDetailInfo.of(member);
    }


    public List<VoiceMessageInfo> getVoiceMailList(UserDetailsImpl userDetails) throws CustomException {

        return voiceMessageRepository.findAllByReceiver_Id(userDetails.getMember().getId())
                .stream()
                .map(voiceMessage -> VoiceMessageInfo.of(voiceMessage.getVoiceAddr(), voiceMessage.getCreatedAt(), voiceMessage.isOpened()))
                .collect(Collectors.toList());
    }

    public List<MemberBadgeInfo> getBadgeList(UserDetailsImpl userDetails) throws CustomException {

        List<MemberBadgeInfo> mb = badgeRepository.getMembersBadge(userDetails.getMember().getId())
                .stream().map(x -> MemberBadgeInfo.of(x.getIcon(), x.getName())).collect(Collectors.toList());

        return mb;
    }


    public String refreshAccessToken(Members members) {

        log.info("{}",members.getId());


        // 컬럼 이름이 아니라 Key Value 값의 Id를 써야한다.
        GrtRedis grt = grtRepository.findById(members.getId()).orElse(null);


        if(grt == null) {
            throw new CustomException(ErrorType.THIS_MEMBER_DONT_HAVE_GRT);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "refresh_token");
        params.add("client_id", client_id);
        params.add("client_secret", client_secret);
        log.info("RefreshToken : {} !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", grt.getRefreshToken());
        params.add("refresh_token", grt.getRefreshToken());

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

        ResponseEntity<String> responseEntity = new RestTemplate().exchange(
                "https://www.googleapis.com/oauth2/v4/token",
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        GoogleOauthTokenInfo gti = null;

        try{
            ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            log.info("성공적으로 Google로부터 새 Access Token을 발급 받았습니다.");
            gti = objectMapper.readValue(responseEntity.getBody(), GoogleOauthTokenInfo.class);

            if(gti.getAccess_token() != null) {
                gatRepository.save(new GatRedis(members.getId(), gti.getAccess_token()));
            }

            return gti.getAccess_token();
        }catch (JsonProcessingException e){
            log.info("Google Access TOken 재발급 과정에서 에러가 났습니다. {}", e.getMessage());
        }

        return null;
    }


    public Members getTargetMemberDetail(Long id ){
        return membersRepository.findById(id).orElse(null);
    }


    public JustEoa getJustEoa (UserDetailsImpl userDetails){

       MemberAccount memberAccount = memberAccountRepository.findMemberAccountById(userDetails.getMember().getMemberAccountId().getId()).orElse(null);

        return JustEoa.of(memberAccount.getEoa());
    }

}
