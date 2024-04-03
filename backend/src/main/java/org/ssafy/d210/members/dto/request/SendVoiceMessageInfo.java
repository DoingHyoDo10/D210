package org.ssafy.d210.members.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SendVoiceMessageInfo {
    private String audioFileBase64Data;
    private Long receiver_id;
}
