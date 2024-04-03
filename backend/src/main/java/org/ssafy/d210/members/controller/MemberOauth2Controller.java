package org.ssafy.d210.members.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.ssafy.d210._common.repository.GrtRepository;
import org.ssafy.d210._common.response.ApiResponseDto;
import org.ssafy.d210._common.response.MsgType;
import org.ssafy.d210._common.response.ResponseUtils;
import org.ssafy.d210._common.response.oauth2Google.GoogleAccessTokenInfo;
import org.ssafy.d210._common.response.oauth2Google.GoogleOauthTokenInfo;
import org.ssafy.d210._common.response.oauth2Google.GoogleRefreshTokenInfo;
import org.ssafy.d210._common.service.UserDetailsImpl;
import org.ssafy.d210.members.service.MemberService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;


@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberOauth2Controller {

    private final MemberService memberService;
    private final GrtRepository grtRepository;


    // A. 프론트에서 인가코드 다시 주는 주소.
    // B. 백에서 해야할 일: 인가코드로 Google AccessToken, RefreshToken 받아 놓기
    //      -> 해당 사용자의 기본 정보(추가로 [WALK_WALK]에서 받아야 할 것을 뺀 정보)를 DB에 저장 -> jwtAccessToken, jwtRefreshToken 발급 -> 프론트에 토큰 전달

    @Operation(summary = "로컬(프)에서 배포(백)로 요청 보낼 때, URL")
    @GetMapping("/oauth/callback/google/token/l-t-d")
    public ApiResponseDto<Map<String, String>> getAccessTokenLocalToDist(@RequestParam(value = "code", required = false) String code, HttpServletResponse response){
        return handleAccessTokenRequest(code, "http://localhost:5173/oauth/callback/google/token", response);
    }

    // local -> local

    @Operation(summary = "로컬(프)에서 로컬(백)로 요청 보낼 때, URL")
    @GetMapping("/oauth/callback/google/token/l-t-l")
    public ApiResponseDto<Map<String, String>> getAccessTokenLocalToLocal(@RequestParam(value = "code", required = false) String code, HttpServletResponse response){
        return handleAccessTokenRequest(code, "http://localhost:5173/oauth/callback/google/token", response);
    }


    @Operation(summary = "배포(프)에서 배포(백)로 요청 보낼 때, URL")
    @GetMapping("/oauth/callback/google/token/d-t-d")
    public ApiResponseDto<Map<String, String>> getAccessTokenDistToDist(@RequestParam(value = "code", required = false) String code, HttpServletResponse response){
        return handleAccessTokenRequest(code, "https://j10d210.p.ssafy.io/oauth/callback/google/token", response);
    }

    @Operation(summary = "로컬(백)에서 배포(프)로 요청 보낼 때, URL")
    @GetMapping("/oauth/callback/google/token/d-t-l")
    public ApiResponseDto<Map<String, String>> getAccessTokenDistToLocal(@RequestParam(value = "code", required = false) String code, HttpServletResponse response){
        return handleAccessTokenRequest(code, "https://j10d210.p.ssafy.io/oauth/callback/google/token", response);
    }

    @Operation(summary = "Header에 JWT를 꺼내서 분해, 그 사용 주체인 멤버 객체를 받아낸다.")
    @GetMapping("/me")
    public ApiResponseDto<String> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {


        log.info("클라이언트에서 자신의 정보를 요청: {}", userDetails.getUsername());
        return ResponseUtils.ok("유저 : " + userDetails.getUsername(), MsgType.SEARCH_SUCCESSFULLY);
    }

    private ApiResponseDto<Map<String, String>> handleAccessTokenRequest(String code, String redirectUri, HttpServletResponse response) {
        log.info("들어온 인가코드는 다음과 같습니다.={}",code);
        GoogleOauthTokenInfo gti = memberService.getAccessToken(code, redirectUri);

        log.info("Google에서 준 토큰 내용은 다음과 같습니다={}", gti);

        GoogleAccessTokenInfo gat = new GoogleAccessTokenInfo(gti.getToken_type(), gti.getAccess_token(), gti.getExpires_in(), gti.getScope());
        GoogleRefreshTokenInfo grt = new GoogleRefreshTokenInfo(gti.getRefresh_token(), gti.getToken_type());

        List<String> ans = memberService.SaveUserAndGetToken(gti.getAccess_token(),response,gat,grt);
        String jwtAccessToken = ans.get(0);
        String jwtRefreshToken = ans.get(2);
        String memberId = ans.get(3);
        String memberNickname= ans.get(4);
        String memberProfileUrl = ans.get(5);
        boolean isNew = ans.get(1).equals("true");
        log.info("해당 사용자는 첫번째 가입 입니까?={}",isNew? "Yes" : "NO");
        log.info("해당 사용자의 AccessToken: {}", jwtAccessToken);
        Map<String, String> ret = new HashMap<>();
        ret.put("isNew", isNew? "true" : "false");
        ret.put("Authorization", jwtAccessToken);
        ret.put("Refresh_Token", jwtRefreshToken);
        ret.put("Google_access_token", gti.getAccess_token());
        ret.put("member_id", memberId);
        ret.put("member_nickname", memberNickname);
        ret.put("member_profile_url",memberProfileUrl);


        if(gti.getRefresh_token() == null){
            ret.put("Google_refresh_token", Objects.requireNonNull(grtRepository.findById(Long.parseLong(memberId)).orElse(null)).getRefreshToken());
        }else{
            ret.put("Google_refresh_token",gti.getRefresh_token());
        }

        log.info("입력으로 들어온 GRT가 NULL 인가요? {}", gti.getRefresh_token() == null);
        log.info("Response Body의 내용 {}", ret.values());

        return ResponseUtils.ok(ret, MsgType.GENERATE_TOKEN_SUCCESSFULLY);
    }
}
