package org.ssafy.d210.friends.dto;

import lombok.Builder;
import lombok.Getter;
import org.ssafy.d210.friends.entity.FriendList;

@Getter
public class FriendSentDto {
    private String profileUrl;
    private String nickname;
    private Long memberId;

    @Builder
    private FriendSentDto(String profileUrl, String nickname, Long memberId){
        this.profileUrl = profileUrl;
        this.nickname = nickname;
        this.memberId = memberId;
    }

    public static FriendSentDto from(FriendList friendList){
        return builder()
                .profileUrl(friendList.getReceiverId().getProfileUrl())
                .nickname(friendList.getReceiverId().getNickname())
                .memberId(friendList.getReceiverId().getId())
                .build();
    }
}
