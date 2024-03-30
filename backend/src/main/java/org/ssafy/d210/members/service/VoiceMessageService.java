package org.ssafy.d210.members.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.d210._common.request.MessageInfo;
import org.ssafy.d210.members.entity.VoiceMessage;
import org.ssafy.d210.members.repository.VoiceMessageRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class VoiceMessageService {

    private final VoiceMessageRepository voiceMessageRepository;


    public Page<MessageInfo> loadVoiceMessage(Long receiverId, int pageNo, String criteria){

        // 1) 페이지 네이션을 해주는 객체 Pageable 선언 (PageNumber, pageSize, 기준)
        Pageable pageable = PageRequest.of(pageNo, 100, Sort.by(Sort.Direction.ASC,criteria));

        // 2)
        Page<VoiceMessage> messages = voiceMessageRepository.findAllByReceiver_Id(receiverId, pageable);

        return messages.map(this::messageInfoConverter);
    }

    public MessageInfo messageInfoConverter(VoiceMessage voiceMessage) {

        return MessageInfo.toDto(
                voiceMessage.getSender().getId(),
                voiceMessage.getSender().getProfileUrl(),
                voiceMessage.getText(),
                voiceMessage.getReceiver().getId(),
                voiceMessage.getSender().getNickname(),
                voiceMessage.getVoiceAddr(),
                voiceMessage.getMsgType().toString(),
                voiceMessage.getCreatedAt(),
                voiceMessage.isOpened()
        );
    }
}

