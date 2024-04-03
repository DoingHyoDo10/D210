package org.ssafy.d210._common.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.explore.JobExplorer;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.members.repository.MembersRepository;
import org.ssafy.d210.members.service.MemberDataService;
import org.ssafy.d210.walk.dto.response.FitnessResponse;
import org.ssafy.d210.walk.service.ExerciseCriteriaService;
import org.ssafy.d210.walk.service.ExerciseService;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class SchedulerConfig {

//    private final JobLauncher jobLauncher;
//    private final Job job;
//    private final JobExplorer jobExplorer;

    private final MemberDataService memberDataService;
    private final MembersRepository membersRepository;
    private final ExerciseService exerciseService;
    private final ExerciseCriteriaService exerciseCriteriaService;

    @Scheduled(cron = "0 0 4 * * *")
//    @Scheduled(cron = "0 * * * * *")
    public void runTempSaveExercise() {
//        exerciseService.saveExerciseDataEveryDay();
        List<Members> members = membersRepository.findAll();

        for (Members member : members) {

            try {
                String accessToken = memberDataService.refreshAccessToken(member);

                // 받아온 액세스 토큰으로 구글 피트니스 데이터 가져오기
                LocalDateTime now = LocalDateTime.now();
                LocalDateTime startOfYesterday = now.minusDays(1).toLocalDate().atStartOfDay();
                LocalDateTime endOfYesterday = startOfYesterday.plusDays(1).minusNanos(1);

                long startTimeMillis = startOfYesterday.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
                long endTimeMillis = endOfYesterday.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();

                FitnessResponse fitnessResponse = exerciseService.fetchGoogleFitData(accessToken, startTimeMillis, endTimeMillis);
                exerciseService.mapFitnessResponseToExercise(fitnessResponse, member);
            } catch (Exception e) {
                log.info(member.getNickname() + " 씨는 에러가 났다.", e);
            }

        }

    }

//    @Scheduled(cron = "0 56 14 * * *")
//    public void runBatchJob() {
//        Set<JobExecution> executions = jobExplorer.findRunningJobExecutions(job.getName());
//        if (!executions.isEmpty()) {
//            log.info("이전 작업이 아직 실행 중입니다. 새 작업을 시작하지 않습니다.");
//            return;
//        }
//
//        try {
//            // 현재 시간을 JobParameters에 추가, 중단됐던 job 실행할 때 활용
//            JobParameters parameters = new JobParametersBuilder()
//                    .addLong("time", System.currentTimeMillis())
//                    .toJobParameters();
//            jobLauncher.run(job, parameters);
//        } catch (Exception e) {
//            log.error("배치 작업 실행 중 에러가 발생했습니다.", e);
//        }
//    }

    @Scheduled(cron = "0 0 0 1 1 *")
    public void adjustAgeGroup() {
        List<Members> members = membersRepository.findAll();

        for (Members member : members) {
            exerciseCriteriaService.setDefaultExerciseCriteria(member);
        }
    }
}

