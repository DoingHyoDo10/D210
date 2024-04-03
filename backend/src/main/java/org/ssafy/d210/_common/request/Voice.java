package org.ssafy.d210._common.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Voice {
    private static final String language = "ko-KR";
    private static final String name = "ko-KR-Neural2-c";

    private String ssmlGender;

    public Voice(String gender){
        this.ssmlGender = gender;
    }
}
