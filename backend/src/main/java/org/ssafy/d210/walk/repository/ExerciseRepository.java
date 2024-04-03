package org.ssafy.d210.walk.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.walk.dto.response.FriendRankingResponseDto;
import org.ssafy.d210.walk.entity.Exercise;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    // DB에 하루 치 운동이 저장된 마지막 날짜
    @Query("select max(e.exerciseDay) from Exercise e")
    LocalDate findLastDate();

    // 이번주(어제까지) 운동 데이터(걸음 수) 조회
    @Query("SELECT e FROM Exercise e WHERE e.exerciseDay >= :startOfWeek AND e.exerciseDay < :today AND e.member.id = :myId")
    List<Exercise> findExercisesFromStartOfWeekToYesterday(LocalDate startOfWeek, LocalDate today, Long myId);

    // 스트릭 랭킹 조회 기능 중 1. 페이지네이션
    @Query("select distinct new org.ssafy.d210.walk.dto.response.FriendRankingResponseDto(m.id, m.nickname, m.profileUrl, e.streak)" +
            " from Exercise e join Members m on e.member.id = m.id" +
            " where (m.id = :myId or m.id in (select f.receiverId.id from FriendList f where f.senderId.id = :myId and f.isFriend = true))" +
            " and e.exerciseDay = :yesterday" +
            " order by e.streak desc")
    Slice<FriendRankingResponseDto> findStreakRankingByPage(Long myId, Pageable pageable, LocalDate yesterday);

    @Query("select distinct new org.ssafy.d210.walk.dto.response.FriendRankingResponseDto(m.id, m.nickname, m.profileUrl, sum(e.steps))" +
            " from Exercise e join Members m on e.member.id = m.id" +
            " where (m.id = :myId or m.id in (select f.receiverId.id from FriendList f where f.senderId.id = :myId))" +
            " and e.exerciseDay between :startDate and :endDate" +
            " group by m.id" +
            " order by sum(e.steps) desc")
    Slice<FriendRankingResponseDto> findStepsRankingByPage(Long myId, Pageable pageable, LocalDate startDate, LocalDate endDate);

    Optional<Exercise> findExerciseByMemberAndExerciseDay(Members member, LocalDate exerciseDay);

}
