package org.ssafy.d210.members.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.ssafy.d210.members.entity.VoiceMessage;

import java.util.List;

@Repository
public interface VoiceMessageRepository extends JpaRepository<VoiceMessage, Long> {
    List<VoiceMessage> findAllByReceiver_Id(Long id);

    Page<VoiceMessage> findAllByReceiver_Id(Long receiverId, Pageable pageable);
}
