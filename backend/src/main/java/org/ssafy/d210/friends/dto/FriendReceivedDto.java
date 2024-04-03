package org.ssafy.d210.friends.dto;

import lombok.Builder;
import lombok.Getter;
import org.ssafy.d210.friends.entity.FriendList;

@Getter
public class FriendReceivedDto {
    private String profileUrl;
    private String nickname;
    private Long memberId;

    @Builder
    private FriendReceivedDto(String profileUrl, String nickname, Long memberId){
        this.profileUrl = profileUrl;
        this.nickname = nickname;
        this.memberId = memberId;
    }

    public static FriendReceivedDto from(FriendList friendList){
        return builder()
                .profileUrl(friendList.getSenderId().getProfileUrl())
                .nickname(friendList.getSenderId().getNickname())
                .memberId(friendList.getSenderId().getId())
                .build();
    }
}
