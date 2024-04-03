package org.ssafy.d210.items.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.ssafy.d210.items.entity.ItemsType;
import org.ssafy.d210.items.entity.MemberItemHistory;
import org.ssafy.d210.members.entity.Members;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface MemberItemHistoryRepository extends JpaRepository<MemberItemHistory, Long> {

    Optional<MemberItemHistory> findFirstByMemberAndCreatedAtBetweenAndItemType(Members member, LocalDateTime startOfDay, LocalDateTime endOfDay, ItemsType itemType);

}
