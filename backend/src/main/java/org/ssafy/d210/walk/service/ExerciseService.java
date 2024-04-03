package org.ssafy.d210.walk.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.ssafy.d210.items.entity.ItemsType;
import org.ssafy.d210.items.entity.MemberItemHistory;
import org.ssafy.d210.items.repository.MemberItemHistoryRepository;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.members.repository.MembersRepository;
import org.ssafy.d210.members.service.MemberDataService;
import org.ssafy.d210.walk.dto.request.StepsRankingPeriodEnum;
import org.ssafy.d210.walk.dto.response.*;
import org.ssafy.d210.walk.entity.Exercise;
import org.ssafy.d210.walk.repository.ExerciseRepository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

@Service
//@Transactional
@RequiredArgsConstructor
@Slf4j
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseCriteriaService exerciseCriteriaService;
    private final MemberItemHistoryRepository memberItemHistoryRepository;


    // db에 저장된 마지막 날짜
    public LocalDate findLastSavedDate() {
        return exerciseRepository.findLastDate();
    }

    // 오늘 날짜만 받으면 이번주 월요일부터 어제까지 데이터를 조회하고 나머지 날은 디폴트로
    @Transactional
    public Map<String, Object> findWeeklyExerciseRecords(LocalDate today, Long memberId) {
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

        Map<String, Object> data = new HashMap<>();
        System.out.println(exerciseRepository.findExercisesFromStartOfWeekToYesterday(startOfWeek, today, memberId));
        List<Exercise> exercises = exerciseRepository.findExercisesFromStartOfWeekToYesterday(startOfWeek, today, memberId);
        List<ThisWeekExerciseResponseDto> weeklyExercises = new ArrayList<>();
        int summ = 0;
        int supp = 0;

        for (LocalDate date = startOfWeek; date.isBefore(today); date = date.plusDays(1)) {
            LocalDate finalDate = date;
            ThisWeekExerciseResponseDto exercise = exercises.stream()
                    .filter(e -> e.getExerciseDay().equals(finalDate))
                    .findFirst()
                    .map(e -> ThisWeekExerciseResponseDto.builder().timeStamp(finalDate).steps(e.getSteps()).build())
                    .orElseGet(() -> ThisWeekExerciseResponseDto.builder().timeStamp(finalDate).steps(0L).build());

            weeklyExercises.add(exercise);
            summ += exercise.getSteps();
            supp++;
        }

        Integer avgValue = 0;
        if (supp != 0) avgValue = (int) Math.round((double) summ / supp);

        // 여기서 나머지 요일에 대해 기본값을 설정
        for (LocalDate date = today; date.isBefore(startOfWeek.plusWeeks(1)); date = date.plusDays(1)) {
            weeklyExercises.add(ThisWeekExerciseResponseDto.builder().timeStamp(date).steps(0L).build());
        }

        data.put("content", weeklyExercises);
        data.put("avg", avgValue);

        return data;
    }

    public SliceResponseDto getStreakRankingWithFriends(Members member, Pageable pageable) {
//        Members member = membersRepository.findById(memberId).orElseThrow();
        Long myId = member.getId();
        Slice<FriendRankingResponseDto> exercises = exerciseRepository.findStreakRankingByPage(myId, pageable, LocalDate.now().minusDays(1));

        // 시작 순위 계산
        int startRank = pageable.getPageNumber() * pageable.getPageSize() + 1;

        for (FriendRankingResponseDto exercise : exercises) {
            exercise.setRank((long) startRank++);
        }

        return new SliceResponseDto(exercises);
    }

    public SliceResponseDto getStepsRankingWithFriends(Members member, StepsRankingPeriodEnum type, Pageable pageable) {

        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);
        LocalDate startDate = yesterday;
        LocalDate endDate = yesterday;

        if (type == StepsRankingPeriodEnum.WEEKLY) {
            startDate = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
            endDate = today.with(DayOfWeek.SUNDAY);
        } else if (type == StepsRankingPeriodEnum.MONTHLY) {
            startDate = today.withDayOfMonth(1);
            endDate = today.withDayOfMonth(today.lengthOfMonth());
        }

        Long myId = member.getId();

        Slice<FriendRankingResponseDto> exercises = exerciseRepository.findStepsRankingByPage(myId, pageable, startDate, endDate);

        // 시작 순위 계산
        int startRank = pageable.getPageNumber() * pageable.getPageSize() + 1;

        for (FriendRankingResponseDto exercise : exercises) {
            exercise.setRank((long) startRank++);
        }

        return new SliceResponseDto(exercises);
    }

    public FitnessResponse fetchGoogleFitData(String accessToken, long startTimeMillis, long endTimeMillis) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + accessToken);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("aggregateBy", Arrays.asList(
                Map.of("dataSourceId", "derived:com.google.step_count.delta:com.google.android.gms:merge_step_deltas"),
                Map.of("dataSourceId", "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta"),
                Map.of("dataSourceId", "derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended"),
                Map.of("dataTypeName", "com.google.heart_rate.bpm"),
                Map.of("dataSourceId", "derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes")
        ));
        requestBody.put("bucketByTime", Map.of("durationMillis", 86400000)); // 24시간 (하루)를 밀리초로 표현
        requestBody.put("startTimeMillis", startTimeMillis);
        requestBody.put("endTimeMillis", endTimeMillis);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

//        System.out.println("@@@@@@@김길규@@@@@@@" + restTemplate.postForEntity(url, entity, String.class).getBody());
        // 얘가 문제임
        ResponseEntity<FitnessResponse> response = restTemplate.postForEntity(url, entity, FitnessResponse.class);


        return response.getBody();
    }

    @Transactional
    public Exercise mapFitnessResponseToExercise(FitnessResponse fitnessResponse, Members member) {
        Exercise exercise = new Exercise();
        exercise.setMember(member);
        LocalDate yesterday = LocalDate.now().minusDays(1);
        exercise.setExerciseDay(yesterday); // 어제 날짜로 설정

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

        MainCriteriaResponseDto criteria = exerciseCriteriaService.findMyCriteria(member);

        LocalDateTime startOfYesterday = yesterday.atStartOfDay();
        LocalDateTime endOfYesterday = yesterday.atTime(LocalTime.MAX);
        Optional<MemberItemHistory> memberItemHistory = memberItemHistoryRepository.findFirstByMemberAndCreatedAtBetweenAndItemType(member, startOfYesterday, endOfYesterday, ItemsType.STREAK);

        if (criteria.getExerciseMinute() <= exercise.getExerciseMinute() || memberItemHistory.isPresent()) {
            exercise.setIsAchieved(true);
            Optional<Exercise> lastExercise = exerciseRepository.findExerciseByMemberAndExerciseDay(member, LocalDate.now().minusDays(2));
            lastExercise.ifPresentOrElse(
                    value -> exercise.setStreak(value.getStreak() + 1),
                    () -> exercise.setStreak(1L)
            );
        } else {
            exercise.setIsAchieved(false);
            exercise.setStreak(0L);
        }

        return exerciseRepository.save(exercise);
    }

}
