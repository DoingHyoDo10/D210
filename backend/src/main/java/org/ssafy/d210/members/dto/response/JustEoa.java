package org.ssafy.d210.members.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JustEoa {

    String eoa;

    @Builder
    public JustEoa(String eoa){
        this.eoa = eoa;
    }

    public static JustEoa of(String eoa){
        return builder().eoa(eoa).build();
    }

}
