//package org.ssafy.d210._common.config;
//
//import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
//import org.springframework.batch.core.configuration.support.DefaultBatchConfiguration;
//import org.springframework.batch.core.explore.JobExplorer;
//import org.springframework.batch.core.launch.JobLauncher;
//import org.springframework.batch.core.repository.JobRepository;
//import org.springframework.beans.factory.ObjectProvider;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.autoconfigure.AutoConfiguration;
//import org.springframework.boot.autoconfigure.batch.BatchDataSource;
//import org.springframework.boot.autoconfigure.batch.BatchDataSourceScriptDatabaseInitializer;
//import org.springframework.boot.autoconfigure.batch.BatchProperties;
//import org.springframework.boot.autoconfigure.batch.JobLauncherApplicationRunner;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
//import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
//import org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration;
//import org.springframework.boot.context.properties.EnableConfigurationProperties;
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.boot.sql.init.dependency.DatabaseInitializationDependencyConfigurer;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Import;
//import org.springframework.jdbc.datasource.DataSourceTransactionManager;
//import org.springframework.jdbc.datasource.init.DatabasePopulator;
//import org.springframework.transaction.PlatformTransactionManager;
//import org.springframework.util.StringUtils;
//
//import javax.sql.DataSource;
//
//
//@Configuration
//@EnableConfigurationProperties(BatchProperties.class)
//public class BatchConfig {
//    @Value("${spring.datasource.url}")
//    private String url;
//
//    @Value("${spring.datasource.username}")
//    private String username;
//
//    @Value("${spring.datasource.password}")
//    private String password;
//
//    @Value("${spring.datasource.driver-class-name}")
//    private String driverClassName;
//
//    @Bean
//    public DataSource getDataSource() {
//        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
//        dataSourceBuilder.driverClassName(driverClassName);
//        dataSourceBuilder.url(url);
//        dataSourceBuilder.username(username);
//        dataSourceBuilder.password(password);
//        return dataSourceBuilder.build();
//    }
//
//    @Bean
//    public PlatformTransactionManager transactionManager(@Qualifier("getDataSource") DataSource dataSource) {
//        return new DataSourceTransactionManager(dataSource);
//    }
//
//    @Bean
//    @ConditionalOnMissingBean
////    @ConditionalOnProperty(prefix = "spring.batch.job", name = "enabled", havingValue = "true", matchIfMissing = true)
//    public JobLauncherApplicationRunner jobLauncherApplicationRunner(JobLauncher jobLauncher, JobExplorer jobExplorer,
//                                                                     JobRepository jobRepository, BatchProperties properties) {
//        JobLauncherApplicationRunner runner = new JobLauncherApplicationRunner(jobLauncher, jobExplorer, jobRepository);
//        String jobNames = properties.getJob().getName();
//        if (StringUtils.hasText(jobNames)) {
//            runner.setJobName(jobNames);
//        }
//        return runner;
//    }
//
//    // batchDatasource 사용을 위한 수동 빈 등록
//    @Bean
//    @ConditionalOnMissingBean(BatchDataSourceScriptDatabaseInitializer.class)
//    BatchDataSourceScriptDatabaseInitializer batchDataSourceInitializer(DataSource dataSource,
//                                                                        @BatchDataSource ObjectProvider<DataSource> batchDataSource, BatchProperties properties) {
//        return new BatchDataSourceScriptDatabaseInitializer(batchDataSource.getIfAvailable(() -> dataSource),
//                properties.getJdbc());
//    }
//}
