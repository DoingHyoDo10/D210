package org.ssafy.d210.walk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.ssafy.d210.walk.entity.ExerciseAcc;

@Repository
public interface ExerciseAccRepository extends JpaRepository<ExerciseAcc, Long> {
    //

}

