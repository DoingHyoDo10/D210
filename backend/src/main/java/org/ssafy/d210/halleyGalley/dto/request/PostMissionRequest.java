package org.ssafy.d210.halleyGalley.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PostMissionRequest {
    private Long memberId;
    private Long exerciseMinute;
    private Integer questMoney;
    private Integer period;
    private Integer dayoff;
}
