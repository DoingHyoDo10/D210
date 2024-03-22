package org.ssafy.d210.halleyGalley.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.d210._common.response.ApiResponseDto;
import org.ssafy.d210._common.response.MsgType;
import org.ssafy.d210._common.service.UserDetailsImpl;
import org.ssafy.d210.halleyGalley.dto.request.PostGalleyRequest;
import org.ssafy.d210.halleyGalley.dto.request.PutGalleyResponseRequest;
import org.ssafy.d210.halleyGalley.service.HalleyGalleyService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/halleygalley")
public class HalleyGalleyController {

    private final HalleyGalleyService halleyGalleyService;

    @PostMapping("/galley-request")
    public ApiResponseDto<?> postGalleyRequest(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody PostGalleyRequest postGalleyRequest){
        return ApiResponseDto.of(MsgType.POST_GALLEY_REQUEST_SUCCESSFULLY, halleyGalleyService.postGalleyRequest(userDetails.getMember(), postGalleyRequest));
    }

    @PutMapping("/galley-response")
    public ApiResponseDto<?> putGalleyResponse(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody PutGalleyResponseRequest putGalleyResponseRequest){
        return ApiResponseDto.of(MsgType.PUT_GALLEY_RESPONSE_SUCCESSFULLY, halleyGalleyService.putGalleyResponse(userDetails.getMember(), putGalleyResponseRequest));
    }

    @GetMapping("/halley-to-galley")
    public ApiResponseDto<?> getGalleyList(@AuthenticationPrincipal UserDetailsImpl userDetails){
        return ApiResponseDto.of(MsgType.GET_GALLEY_LIST_SUCCESSFULLY, halleyGalleyService.getGalleyList(userDetails.getMember()));
    }

    @GetMapping("/galley-to-halley")
    public ApiResponseDto<?> getHalleyList(@AuthenticationPrincipal UserDetailsImpl userDetails){
        return ApiResponseDto.of(MsgType.GET_HALLEY_LIST_SUCCESSFULLY, halleyGalleyService.getHalleyList(userDetails.getMember()));
    }

    @GetMapping("/halley-request-list")
    public ApiResponseDto<?> getHalleyRequestList(@AuthenticationPrincipal UserDetailsImpl userDetails){
        return ApiResponseDto.of(MsgType.GET_HALLEY_REQUEST_LIST_SUCCESSFULLY, halleyGalleyService.getHalleyRequestList(userDetails.getMember()));
    }
}
