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
import org.ssafy.d210._common.service.S3Base64Uploader;
import org.ssafy.d210._common.service.UserDetailsImpl;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.members.entity.MsgType;
import org.ssafy.d210.members.entity.VoiceMessage;
import org.ssafy.d210.members.repository.MembersRepository;
import org.ssafy.d210.members.repository.VoiceMessageRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class VoiceMessageService {

    private final VoiceMessageRepository voiceMessageRepository;
    private final S3Base64Uploader base64Uploader;
    private final MembersRepository membersRepository;


    public Page<MessageInfo> loadVoiceMessage(Long receiverId, int pageNo, String criteria){

        // 1) 페이지 네이션을 해주는 객체 Pageable 선언 (PageNumber, pageSize, 기준)
        Pageable pageable = PageRequest.of(pageNo, 100, Sort.by(Sort.Direction.DESC,criteria));

        // 2)
        Page<VoiceMessage> messages = voiceMessageRepository.findAllByReceiver_Id(receiverId, pageable);

        return messages.map(this::messageInfoConverter);
    }

    public void sendMessage (UserDetailsImpl userDetails, String base64File, Long receiverId ) throws  RuntimeException{



        Members sender = membersRepository.findById(userDetails.getMember().getId()).orElse(null);
        Members receiver = membersRepository.findById(receiverId).orElse(null);
        String http = base64Uploader.Base64ToHttp(base64File);

        log.info("{},{},{}",sender.getId(), receiver.getId(), http);

        voiceMessageRepository.save(VoiceMessage.toEntity(sender,receiver,http,false,"", MsgType.VOICE));

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

