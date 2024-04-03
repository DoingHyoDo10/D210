package org.ssafy.d210.members.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.ssafy.d210._common.exception.ErrorResponse;
import org.ssafy.d210._common.exception.ErrorType;
import org.ssafy.d210._common.response.ApiResponseDto;
import org.ssafy.d210._common.response.MsgType;
import org.ssafy.d210._common.response.ResponseUtils;
import org.ssafy.d210._common.service.S3Base64Uploader;
import org.ssafy.d210._common.service.UserDetailsImpl;
import org.ssafy.d210.members.dto.request.SendVoiceMessageInfo;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.members.repository.MembersRepository;
import org.ssafy.d210.members.service.VoiceMessageService;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/members")
public class VoiceMessageController {

    private VoiceMessageService voiceMessageService;


    @GetMapping("/load/{member-id}")
    public ApiResponseDto<?> loadVoiceMessage(
            @PathVariable(value = "member-id") long memberId,
            @RequestParam(required = false, defaultValue = "0", value = "page") int pageNo,
            @RequestParam(required = false, defaultValue = "createdAt", value = "criteria") String criteria
    ){
        return ResponseUtils.ok(voiceMessageService.loadVoiceMessage(memberId,pageNo,criteria), MsgType.SEARCH_SUCCESSFULLY);
    }

    @PostMapping("/send-message")
    public ApiResponseDto<?> sendMessage(
            @RequestBody SendVoiceMessageInfo sendVoiceMessageInfo, BindingResult bindingResult,
            @AuthenticationPrincipal UserDetailsImpl userDetails
            ){
            if(bindingResult.hasErrors()){
                log.info("{}", bindingResult.getFieldErrors());
                return ResponseUtils.error(ErrorResponse.of(400, "유효하지 않은 값이 있습니다.\n" + bindingResult.getFieldErrors()));
            }

            log.info("{},{}",sendVoiceMessageInfo.getReceiver_id(), sendVoiceMessageInfo.getAudioFileBase64Data());

//            try {
                voiceMessageService.sendMessage(userDetails,sendVoiceMessageInfo.getAudioFileBase64Data(), sendVoiceMessageInfo.getReceiver_id());
//            } catch (Exception e){
//                return ResponseUtils.error(ErrorResponse.of(400, "메세지 저장 도중 오류가 발생했습니다." + e.getMessage()));
//            }

            return ResponseUtils.ok(MsgType.ADD_INFO_SUCCESSFULLY);
    }



}
