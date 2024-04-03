package org.ssafy.d210._common.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class GeoLocation {

    private Long senderId;
    private Long receiverId;
    private double latitude;
    private double longitude;

}
