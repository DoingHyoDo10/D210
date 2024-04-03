package org.ssafy.d210.walk.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.walk.dto.request.CustomExerciseCriteriaRequestDto;
import org.ssafy.d210.walk.dto.response.MainCriteriaResponseDto;
import org.ssafy.d210.walk.entity.ExerciseCriteria;
import org.ssafy.d210.walk.repository.ExerciseCriteriaRepository;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ExerciseCriteriaService {

    private final ExerciseCriteriaRepository exerciseCriteriaRepository;

    public ExerciseCriteria setDefaultExerciseCriteria(Members member) {
        Optional<ExerciseCriteria> exerciseCriteria = exerciseCriteriaRepository.findExerciseCriteriaByMemberAndIsCustomIsFalse(member);

        ExerciseCriteria criteria;

        if (exerciseCriteria.isPresent()) {
            criteria = exerciseCriteria.get();
            criteria.updateDefaultCriteria(member);
        } else {
            criteria = ExerciseCriteria.createDefaultCriteria(member);
        }

        return exerciseCriteriaRepository.save(criteria);
    }

    public ExerciseCriteria setCustomExerciseCriteria(Members member, CustomExerciseCriteriaRequestDto requestDto) {
        Optional<ExerciseCriteria> existingCriteria = exerciseCriteriaRepository.findExerciseCriteriaByMemberAndIsCustomIsTrue(member);

        ExerciseCriteria newCriteria;
        if (existingCriteria.isPresent()) {
            newCriteria = existingCriteria.get();
            // requestDto에서 가져온 데이터로 exerciseCriteria 업데이트
            newCriteria.setExerciseMinute(requestDto.getExerciseMinute());
            newCriteria.setSteps(requestDto.getSteps());
            newCriteria.setHeartRate(requestDto.getHeartRate());
        } else {
            newCriteria = ExerciseCriteria.builder()
                    .member(member)
                    .isCustom(true)
                    .exerciseMinute(requestDto.getExerciseMinute())
                    .steps(requestDto.getSteps())
                    .heartRate(requestDto.getHeartRate())
                    .build();
        }

        return exerciseCriteriaRepository.save(newCriteria);

    }

    public MainCriteriaResponseDto findMyCriteria(Members member) {
        Optional<ExerciseCriteria> existingCriteria = exerciseCriteriaRepository.findExerciseCriteriaByMemberAndIsCustomIsTrue(member);
        MainCriteriaResponseDto responseDto;

        if (existingCriteria.isPresent()) {
            responseDto = MainCriteriaResponseDto.builder()
                    .steps(existingCriteria.get().getSteps())
                    .exerciseMinute(existingCriteria.get().getExerciseMinute())
                    .build();
        } else {
            Optional<ExerciseCriteria> defaultCriteria = exerciseCriteriaRepository.findExerciseCriteriaByMemberAndIsCustomIsFalse(member);
            responseDto = MainCriteriaResponseDto.builder()
                    .steps(defaultCriteria.get().getSteps())
                    .exerciseMinute(defaultCriteria.get().getExerciseMinute())
                    .build();
        }
        return responseDto;
    }

    public void deleteCustomCriteria(Members member) {
        Optional<ExerciseCriteria> customCriteria = exerciseCriteriaRepository.findExerciseCriteriaByMemberAndIsCustomIsTrue(member);
        customCriteria.ifPresent(exerciseCriteriaRepository::delete);
    }
}
