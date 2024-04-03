package org.ssafy.d210.halleyGalley.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.ssafy.d210.halleyGalley.entity.HalleyGalley;
import org.ssafy.d210.halleyGalley.entity.Mission;

@Getter
public class GetGalleyResponse {
    private String profileUrl;
    private String nickname;
    private Long requestedTime;
    private Integer reward;
    private Integer dayoff;

    @Builder
    private GetGalleyResponse(String profileUrl, String nickname, Long requestedTime, Integer reward, Integer dayoff){
        this.profileUrl = profileUrl;
        this.nickname = nickname;
        this.requestedTime = requestedTime;
        this.reward = reward;
        this.dayoff = dayoff;
    }

    public static GetGalleyResponse from(HalleyGalley galley, Mission mission){
        return builder()
                .profileUrl(galley.getGalleyId().getProfileUrl())
                .nickname(galley.getGalleyId().getNickname())
                .requestedTime(mission == null ? -1 : mission.getExerciseMinute())
                .reward(galley.getReward())
                .dayoff(galley.getDayoff())
                .build();
    }
}
