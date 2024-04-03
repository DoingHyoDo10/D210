package org.ssafy.d210.members.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.ssafy.d210._common.exception.ErrorResponse;
import org.ssafy.d210._common.response.ApiResponseDto;
import org.ssafy.d210._common.response.MsgType;
import org.ssafy.d210._common.response.ResponseUtils;
import org.ssafy.d210._common.service.UserDetailsImpl;
import org.ssafy.d210.members.dto.request.AdditionalInfo;
import org.ssafy.d210.members.dto.request.LastLoginInfo;
import org.ssafy.d210.members.dto.request.ReqMyPageDetailInfo;
import org.ssafy.d210.members.dto.response.JustEoa;
import org.ssafy.d210.members.dto.response.ResMyPageDetailInfo;
import org.ssafy.d210.members.dto.request.MyPageInfo;
import org.ssafy.d210.members.dto.response.ResAdditionalInfo;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.members.repository.MembersRepository;
import org.ssafy.d210.members.service.MemberDataService;
import org.ssafy.d210.members.service.MemberService;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberDataController {

    private final MemberService memberService;
    private final MemberDataService memberDataService;
    private final MembersRepository membersRepository;


    @GetMapping("/check-duplicated")
    public ApiResponseDto<Map<String, Boolean>> checkDuplicated (@RequestParam("nickname")String nickname) {
        boolean isDuplicated = memberService.isDuplicatedID(nickname);

        Map<String, Boolean> ret = new HashMap<>();
        ret.put("isDuplicated", isDuplicated);

        log.info("중복 확인 완료 {}의 중복 여부는 {} 입니다. ξ´-ﻌ-`Ҙ", nickname, isDuplicated);
        return ResponseUtils.ok(ret, MsgType.SEARCH_SUCCESSFULLY);
    }

    @PostMapping("/")
    public ApiResponseDto<?> postAdditionalInfo (@RequestBody @Valid  AdditionalInfo addInfo, BindingResult bindingResult, @AuthenticationPrincipal UserDetailsImpl userDetails) {


        if(bindingResult.hasErrors()){
            log.info("{}", bindingResult.getFieldErrors());
            return ResponseUtils.error(ErrorResponse.of(400, "유효하지 않은 값이 있습니다.\n" + bindingResult.getFieldErrors()));
        }

        log.info("객체 바인딩이 잘 되었을까요? 바인딩된 객체는 {}",addInfo);
        log.info("userDetails: {}", userDetails);

        Members member = memberDataService.addAdditionalInfo(addInfo, userDetails);

        ResAdditionalInfo ans = new ResAdditionalInfo();
        ans.setId(member.getId());

        return ResponseUtils.ok(ans, MsgType.ADD_INFO_SUCCESSFULLY);
    }

    @GetMapping("/")
    public ApiResponseDto<?> getMyPage(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        Members member = userDetails.getMember();

        return ResponseUtils.ok(MyPageInfo.of(member.getProfileUrl(), member.getNickname(), member.getComment()),
                MsgType.GET_MY_PAGE_SUCCESSFULLY);
    }

    @GetMapping("/lastlogin")
    public ApiResponseDto<?> getLastLogin(@AuthenticationPrincipal UserDetailsImpl userDetails){

        return ResponseUtils.ok(LastLoginInfo.of(userDetails.getMember().getUpdatedAt()),MsgType.LAST_LOGIN_UPDATED_AT);
    }

    @GetMapping("/detail")
    public ApiResponseDto<?> getMyPageDetail(@AuthenticationPrincipal UserDetailsImpl userDetails){

        ResMyPageDetailInfo myPageDetail = memberDataService.getMyPageDetail(userDetails);

        return ResponseUtils.ok(myPageDetail, MsgType.GET_MY_PAGE_SUCCESSFULLY);
    }

    @PostMapping("/detail")
    public ApiResponseDto<?> editMyPageDetail(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                              @RequestBody @Valid ReqMyPageDetailInfo rmdl, BindingResult bindingResult){

        if (bindingResult.hasErrors()){
            return ResponseUtils.error(ErrorResponse.of(400, "유효하지 않은 값이 있습니다.\n" + bindingResult.getFieldErrors()));
        }


        Members me = rmdl.ToEntity(userDetails.getMember());

        membersRepository.save(me);

        return ResponseUtils.ok(rmdl, MsgType.ADD_INFO_SUCCESSFULLY);
    }

    @GetMapping("/voice-mail")
    public ApiResponseDto<?> getVoiceEmail(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        return ResponseUtils.ok(memberDataService.getVoiceMailList(userDetails), MsgType.SEARCH_SUCCESSFULLY);
    }

    @GetMapping("/badge")
    public ApiResponseDto<?> getBadge(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(memberDataService.getBadgeList(userDetails),MsgType.SEARCH_SUCCESSFULLY);
    }

    @GetMapping("/google-refresh-token")
    public ApiResponseDto<?> getAccessToken(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        return ResponseUtils.ok(memberDataService.refreshAccessToken(userDetails.getMember()), MsgType.GENERATE_TOKEN_SUCCESSFULLY);
    }

    @GetMapping("/{id}")
    public ApiResponseDto<?> getTargetMemberDetails(@PathVariable("id") Long id){

        return ResponseUtils.ok(memberDataService.getTargetMemberDetail(id), MsgType.SEARCH_SUCCESSFULLY);
    }

    @GetMapping("/eoa")
    public ApiResponseDto<?> getMyAccountId(@AuthenticationPrincipal UserDetailsImpl userDetails){
        JustEoa ans = memberDataService.getJustEoa(userDetails);
        return ResponseUtils.ok(ans, MsgType.SEARCH_SUCCESSFULLY);
    }



}
