//package org.ssafy.d210._common.batch;
//
//import jakarta.persistence.EntityManagerFactory;
//import lombok.RequiredArgsConstructor;
//import org.springframework.batch.core.Job;
//import org.springframework.batch.core.Step;
//import org.springframework.batch.core.configuration.annotation.StepScope;
//import org.springframework.batch.core.configuration.support.DefaultBatchConfiguration;
//import org.springframework.batch.core.job.builder.JobBuilder;
//import org.springframework.batch.core.repository.JobRepository;
//import org.springframework.batch.core.step.builder.StepBuilder;
//import org.springframework.batch.item.ItemProcessor;
//import org.springframework.batch.item.ItemWriter;
//import org.springframework.batch.item.database.JpaPagingItemReader;
//import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.transaction.PlatformTransactionManager;
//import org.ssafy.d210._common.service.UserDetailsImpl;
//import org.ssafy.d210.members.entity.Members;
//import org.ssafy.d210.members.service.MemberDataService;
//import org.ssafy.d210.walk.dto.response.FitnessResponse;
//import org.ssafy.d210.walk.entity.Exercise;
//import org.ssafy.d210.walk.repository.ExerciseRepository;
//import org.ssafy.d210.walk.service.ExerciseService;
//
//import java.time.LocalDateTime;
//import java.time.ZoneId;
//
//@Configuration
//@RequiredArgsConstructor
//public class SaveFitnessDataEveryDayJobConfig {
//
//    private final EntityManagerFactory entityManagerFactory;
//    private final MemberDataService memberDataService;
//    private final ExerciseService exerciseService;
//    private final ExerciseRepository exerciseRepository;
//
//    @Bean
//    public Job saveFitnessDataEveryDayJob(JobRepository jobRepository, Step saveFitnessDataEveryDayStep) {
//        System.out.println("job!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//        return new JobBuilder("saveFitnessDataEveryDayJob", jobRepository)
//                .start(saveFitnessDataEveryDayStep)
//                .build();
//    }
//
//    @Bean
//    public Step saveFitnessDataEveryDayStep(JobRepository jobRepository, PlatformTransactionManager platformTransactionManager) {
//        System.out.println("step????????????????????????????????????????????????????????????????");
//        return new StepBuilder("saveFitnessDataEveryDayStep", jobRepository)
//                .<Members, Exercise>chunk(10, platformTransactionManager)
//                .reader(userDetailsItemReader(entityManagerFactory))
//                .processor(accessTokenProcessor())
//                .writer(userDetailsItemWriter())
//                .build();
//    }
//
//    @Bean
//    @StepScope
//    public JpaPagingItemReader<Members> userDetailsItemReader(EntityManagerFactory entityManagerFactory) {
//
//        System.out.println("야!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//        return new JpaPagingItemReaderBuilder<Members>()
//                .name("userDetailsItemReader")
//                .queryString("SELECT m FROM Members m")
//                .entityManagerFactory(entityManagerFactory)
//                .pageSize(10)
//                .build();
////        JpaPagingItemReader<Members> reader = new JpaPagingItemReader<>();
////        reader.setQueryString("SELECT m FROM Members m");
////        reader.setEntityManagerFactory(entityManagerFactory);
////        reader.setPageSize(10);
////        return reader;
//    }
//
//    @Bean
//    public ItemProcessor<Members, Exercise> accessTokenProcessor() {
//        return member -> {
//            System.out.println("왜????????????????????????????????????????????????????????????????" + member.getNickname());
////            return new Exercise();
//            // access token 받아오기
//            String accessToken = memberDataService.refreshAccessToken(member);
//
//            // 받아온 액세스 토큰으로 구글 피트니스 데이터 가져오기
//            LocalDateTime now = LocalDateTime.now();
//            LocalDateTime startOfYesterday = now.minusDays(1).toLocalDate().atStartOfDay();
//            LocalDateTime endOfYesterday = startOfYesterday.plusDays(1).minusNanos(1);
//
//            long startTimeMillis = startOfYesterday.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
//            long endTimeMillis = endOfYesterday.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
//
//            FitnessResponse fitnessResponse = exerciseService.fetchGoogleFitData(accessToken, startTimeMillis, endTimeMillis);
//
//            return exerciseService.mapFitnessResponseToExercise(fitnessResponse, member);
//        };
//    }
//
//    @Bean
//    public ItemWriter<Exercise> userDetailsItemWriter() {
//        return exercises -> {
//            for (Exercise exercise : exercises) {
//                System.out.println("writer!!!!!!!!!!!!!!!!!!!!!!!" + exercise.getMember().getNickname());
//                exerciseRepository.save(exercise);
//            }
//        };
//    }
//
//
//}
