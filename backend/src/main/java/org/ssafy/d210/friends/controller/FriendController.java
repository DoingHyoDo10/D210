package org.ssafy.d210.friends.controller;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.d210._common.response.ApiResponseDto;
import org.ssafy.d210._common.response.MsgType;
import org.ssafy.d210._common.service.UserDetailsImpl;
import org.ssafy.d210.friends.dto.request.PostFriendRequest;
import org.ssafy.d210.friends.dto.request.PostSearchMemberListRequest;
import org.ssafy.d210.friends.dto.request.PutFriendRequest;
import org.ssafy.d210.friends.service.FriendService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/friends")
public class FriendController {

    private final FriendService friendService;

    @GetMapping("/{memberId}")
    public ApiResponseDto<?> getMemberInfo(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long memberId){
        return ApiResponseDto.of(MsgType.GET_MEMBER_INFO_SUCCESSFULLY, friendService.getMemberInfo(userDetails.getMember(), memberId));
    }

    @GetMapping("/")
    public ApiResponseDto<?> getMemberList(@AuthenticationPrincipal UserDetailsImpl userDetails){
        return ApiResponseDto.of(MsgType.GET_FRIEND_LIST_SUCCESSFULLY, friendService.getMemberList(userDetails.getMember()));
    }

    @PostMapping("/request")
    public ApiResponseDto<?> postFriend(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody PostFriendRequest request){
        return ApiResponseDto.of(MsgType.POST_FRIEND_REQUEST_SUCCESSFULLY, friendService.postFriend(userDetails.getMember(), request));
    }

    @GetMapping("/sent-list")
    public ApiResponseDto<?> getSentList(@AuthenticationPrincipal UserDetailsImpl userDetails){
        return ApiResponseDto.of(MsgType.GET_FRIEND_SENT_LIST_SUCCESSFULLY, friendService.getSentList(userDetails.getMember()));
    }

    @GetMapping("/received-list")
    public ApiResponseDto<?> getReceivedList(@AuthenticationPrincipal UserDetailsImpl userDetails){
        return ApiResponseDto.of(MsgType.GET_FRIEND_RECEIVED_LIST_SUCCESSFULLY, friendService.getReceivedList(userDetails.getMember()));
    }

    @PutMapping("/response")
    public ApiResponseDto<?> putFriend(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody PutFriendRequest request){
        return ApiResponseDto.of(MsgType.PUT_FRIEND_REQUEST_SUCCESSFULLY, friendService.putFriend(userDetails.getMember(), request));
    }

    @PostMapping("/search")
    public ApiResponseDto<?> searchMemberList(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody PostSearchMemberListRequest request){
        return ApiResponseDto.of(MsgType.POST_MEMBER_LIST_SUCCESSFULLY, friendService.getSearchedMemberList(userDetails.getMember(), request));
    }

    @PostMapping("/search-galley")
    public ApiResponseDto<?> searchGalleyMemberList(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody PostSearchMemberListRequest request){
        return ApiResponseDto.of(MsgType.POST_MEMBER_LIST_SUCCESSFULLY, friendService.getSearchedGalleyMemberList(userDetails.getMember(), request));
    }
}
