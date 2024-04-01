package org.ssafy.d210.walk.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.members.service.MemberDataService;
import org.ssafy.d210.walk.dto.response.FitnessResponse;
import org.ssafy.d210.walk.entity.ExerciseDecided;
import org.ssafy.d210.walk.repository.ExerciseDecidedRepository;

import java.time.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExerciseDecidedService {

    private final ExerciseDecidedRepository exerciseDecidedRepository;
    private final ExerciseService exerciseService;
    private final MemberDataService memberDataService;

    @Transactional
    public ExerciseDecided saveStartTime(Members member, LocalDateTime startTime) {
        Optional<ExerciseDecided> exerciseDecidedOptional = exerciseDecidedRepository.findExerciseDecidedByMemberAndExerciseEndIsNull(member);
        if (exerciseDecidedOptional.isPresent()) {
            ExerciseDecided exerciseDecided = exerciseDecidedOptional.get();
            exerciseDecided.setExerciseStart(startTime);
            return exerciseDecidedRepository.save(exerciseDecided);
        } else {
            ExerciseDecided exerciseDecided = new ExerciseDecided();
            exerciseDecided.setExerciseStart(startTime);
            exerciseDecided.setMember(member);
            return exerciseDecidedRepository.save(exerciseDecided);
        }
    }

    @Transactional
    public ExerciseDecided saveEndTime(Members member, LocalDateTime endTime) {
        Optional<ExerciseDecided> exerciseDecidedOptional = exerciseDecidedRepository.findExerciseDecidedByMemberAndExerciseEndIsNull(member);
        if (exerciseDecidedOptional.isPresent()) {
            ExerciseDecided exerciseDecided = exerciseDecidedOptional.get();
            return handleExerciseDataAcrossDates(exerciseDecided, member, endTime);
        }
        return null;
    }

    private ExerciseDecided handleExerciseDataAcrossDates(ExerciseDecided exerciseDecided, Members member, LocalDateTime endTime) {
        LocalDate startDate = exerciseDecided.getExerciseStart().toLocalDate();
        LocalDate endDate = endTime.toLocalDate();

        ExerciseDecided forResult;
        if (startDate.isBefore(endDate)) {

            LocalDateTime endOfStartDate = LocalDateTime.of(startDate, LocalTime.MAX);
            forResult = saveExerciseData(member, exerciseDecided.getExerciseStart(), endOfStartDate, exerciseDecided.getId());

            for (LocalDate date = startDate.plusDays(1); date.isBefore(endDate); date = date.plusDays(1)) {
                LocalDateTime startOfEachDate = LocalDateTime.of(date, LocalTime.MIN);
                LocalDateTime endOfEachDate = LocalDateTime.of(date, LocalTime.MAX);
                saveExerciseData(member, startOfEachDate, endOfEachDate, null);
            }

            LocalDateTime startOfEndDate = LocalDateTime.of(endDate, LocalTime.MIN);
            saveExerciseData(member, startOfEndDate, endTime, null);
        } else {
            // 같은 날짜 내에서 처리
            forResult = saveExerciseData(member, exerciseDecided.getExerciseStart(), endTime, exerciseDecided.getId());
        }

        return forResult;
    }

    private ExerciseDecided saveExerciseData(Members member, LocalDateTime startTime, LocalDateTime endTime, Long exerciseDecidedId) {
        String accessToken = memberDataService.refreshAccessToken(member);
        long startTimeMillis = startTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        long endTimeMillis = endTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        FitnessResponse fitnessResponse = exerciseService.fetchGoogleFitData(accessToken, startTimeMillis, endTimeMillis);
        ExerciseDecided exerciseDecided = mapFitnessResponseToExerciseDecided(fitnessResponse, member, startTime, endTime);
        exerciseDecided.setId(exerciseDecidedId);
        return exerciseDecidedRepository.save(exerciseDecided);
    }

    private ExerciseDecided mapFitnessResponseToExerciseDecided(FitnessResponse fitnessResponse, Members member, LocalDateTime startTime, LocalDateTime endTime) {
        ExerciseDecided exercise = new ExerciseDecided();
        exercise.setMember(member);

        exercise.setExerciseStart(startTime);
        exercise.setExerciseEnd(endTime);

        LocalDate date = startTime.toLocalDate();
        exercise.setExerciseDay(date);

        for (FitnessResponse.Bucket bucket : fitnessResponse.getBucket()) {
            for (FitnessResponse.DataSet dataSet : bucket.getDataset()) {
                for (FitnessResponse.DataPoint dataPoint : dataSet.getPoint()) {
                    switch (dataPoint.getDataTypeName()) {
                        case "com.google.step_count.delta":
                            exercise.setSteps(dataPoint.getValue().get(0).getIntVal());
                            break;
                        case "com.google.distance.delta":
                            exercise.setExerciseDistance((double) dataPoint.getValue().get(0).getFpVal());
                            break;
                        case "com.google.calories.expended":
                            exercise.setCalorie((double) dataPoint.getValue().get(0).getFpVal());
                            break;
                        case "com.google.heart_rate.bpm":
                            exercise.setHeartRate((double) dataPoint.getValue().get(0).getFpVal());
                            break;
                        case "com.google.active_minutes":
                            exercise.setExerciseMinute(dataPoint.getValue().get(0).getIntVal());
                            break;
                    }
                }
            }
        }


        return exercise;
    }


    public String classifyTimeOfDay(LocalDateTime time) {
        int hour = time.getHour();
        if (hour < 5) return "새벽";
        else if (hour < 9) return "아침";
        else if (hour < 17) return "낮";
        else if (hour < 21) return "저녁";
        else return "밤";
    }

    public List<String> findMostActiveTimePeriods(Members member) {
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.minusMonths(1).withDayOfMonth(1);
        LocalDate endDate = today.minusDays(1);
        List<ExerciseDecided> sessions = exerciseDecidedRepository.findExerciseDecidedsByMemberAndExerciseDayIsAfterOrEqualAndExerciseDayIsBeforeOrEqual(member, startDate, endDate); // 모든 세션 조회

        Map<String, Long> timeOfDayCount = sessions.stream()
                .collect(Collectors.groupingBy(session -> classifyTimeOfDay(session.getExerciseStart()), Collectors.counting()));

        long maxCount = timeOfDayCount.values().stream().max(Long::compare).orElse(0L);

        return timeOfDayCount.entrySet().stream()
                .filter(entry -> entry.getValue() == maxCount)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

}
