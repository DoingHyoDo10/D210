package org.ssafy.d210.friends.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.ssafy.d210.friends.dto.GalleyMemberListDto;
import org.ssafy.d210.friends.dto.MemberListDto;
import org.ssafy.d210.friends.entity.FriendList;
import org.ssafy.d210.members.entity.Members;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendListRepository extends JpaRepository<FriendList, Long> {


    Optional<FriendList> findFriendListBySenderIdAndReceiverIdAndIsFriendIsTrue(Members senderId, Members receiverId);
    Optional<List<FriendList>> findFriendListsBySenderIdAndIsFriendIsTrue(Members member);
    Optional<FriendList> findFriendListBySenderIdAndReceiverId(Members member1, Members member2);

    Optional<List<FriendList>> findFriendListsBySenderIdAndIsAcceptedIsTrueAndIsFriendIsFalse(Members member);

    Optional<List<FriendList>> findFriendListsByReceiverIdAndIsAcceptedIsTrueAndIsFriendIsFalse(Members member);

    @Query(value =
            "SELECT m.member_id as memberId, m.profile_url as profileUrl, m.nickname as nickname, f.is_friend as isFriend, f.is_accepted as isAccepted " +
                    "FROM members m LEFT JOIN friend_list f " +
                    "ON m.member_id = f.receiver_id AND f.sender_id = :memberId " +
                    "WHERE m.nickname LIKE CONCAT('%', :keyword, '%') AND m.member_id <> :memberId AND (f.is_accepted = false OR f.is_accepted IS NULL)", nativeQuery = true)
    List<MemberListDto> findAllByKeyword(@Param("memberId") Long memberId, @Param("keyword") String keyword);

    @Query(value =
            "SELECT m.member_id as memberId, m.profile_url as profileUrl, m.nickname as nickname, h.is_accepted as isAccepted " +
                    "FROM members m LEFT JOIN halley_galley h " +
                    "ON m.member_id = h.galley_id AND h.halley_id = :memberId  " +
                    "WHERE m.nickname LIKE CONCAT('%', :keyword, '%')" +
                    "AND (is_accepted IS NULL OR is_accepted = false) AND m.member_id <> :memberId ", nativeQuery = true)
    List<GalleyMemberListDto> findMembersById(@Param("memberId") Long memberId, @Param("keyword") String keyword);
}
