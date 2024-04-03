package org.ssafy.d210.friends.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.ssafy.d210.friends.entity.FriendList;

@Getter
public class GetFriendListResponse {
    private String profileUrl;
    private String nickname;
    private Long memberId;
    private Boolean isFriend;
    private String comment;

    @Builder
    private GetFriendListResponse(String profileUrl, String nickname, Long memberId, Boolean isFriend, String comment){
        this.profileUrl = profileUrl;
        this.nickname = nickname;
        this.memberId = memberId;
        this.isFriend = isFriend;
        this.comment = comment;
    }

    public static GetFriendListResponse from(FriendList friendList){
        return builder()
                .profileUrl(friendList.getReceiverId().getProfileUrl())
                .nickname(friendList.getReceiverId().getNickname())
                .memberId(friendList.getReceiverId().getId())
                .isFriend(friendList.getIsFriend())
                .comment(friendList.getReceiverId().getComment())
                .build();
    }
}
