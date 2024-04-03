package org.ssafy.d210._common.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Input {
    private String text;

    public Input (String text) {
        this.text = text;
    }
}
