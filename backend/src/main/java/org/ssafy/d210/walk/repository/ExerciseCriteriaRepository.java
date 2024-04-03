package org.ssafy.d210.walk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.walk.entity.ExerciseCriteria;

import java.util.Optional;

@Repository
public interface ExerciseCriteriaRepository extends JpaRepository<ExerciseCriteria, Long> {

    Optional<ExerciseCriteria> findExerciseCriteriaByMemberAndIsCustomIsFalse(Members member);
    Optional<ExerciseCriteria> findExerciseCriteriaByMemberAndIsCustomIsTrue(Members member);
}
