-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: ssafyd210.c7iqguism6yd.ap-northeast-2.rds.amazonaws.com    Database: ssafy
-- ------------------------------------------------------
-- Server version	5.5.5-10.11.6-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `badge`
--

DROP TABLE IF EXISTS `badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badge` (
  `badge_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `criteria` bigint(20) DEFAULT NULL,
  `explains` varchar(500) DEFAULT NULL,
  `icon` varchar(500) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` enum('WALK_COUNT','WORK_OUT_DISTANCE','STREAK') NOT NULL,
  PRIMARY KEY (`badge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge`
--

LOCK TABLES `badge` WRITE;
/*!40000 ALTER TABLE `badge` DISABLE KEYS */;
/*!40000 ALTER TABLE `badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_job_execution`
--

DROP TABLE IF EXISTS `batch_job_execution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_job_execution` (
  `JOB_EXECUTION_ID` bigint(20) NOT NULL,
  `VERSION` bigint(20) DEFAULT NULL,
  `JOB_INSTANCE_ID` bigint(20) NOT NULL,
  `CREATE_TIME` datetime(6) NOT NULL,
  `START_TIME` datetime(6) DEFAULT NULL,
  `END_TIME` datetime(6) DEFAULT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `EXIT_CODE` varchar(2500) DEFAULT NULL,
  `EXIT_MESSAGE` varchar(2500) DEFAULT NULL,
  `LAST_UPDATED` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`JOB_EXECUTION_ID`),
  KEY `JOB_INST_EXEC_FK` (`JOB_INSTANCE_ID`),
  CONSTRAINT `JOB_INST_EXEC_FK` FOREIGN KEY (`JOB_INSTANCE_ID`) REFERENCES `batch_job_instance` (`JOB_INSTANCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_job_execution`
--

LOCK TABLES `batch_job_execution` WRITE;
/*!40000 ALTER TABLE `batch_job_execution` DISABLE KEYS */;
INSERT INTO `batch_job_execution` VALUES (1,2,1,'2024-04-03 09:30:01.048231','2024-04-03 09:30:01.552219','2024-04-03 09:30:09.109685','FAILED','FAILED','org.springframework.dao.IncorrectResultSizeDataAccessException: Query did not return a unique result: 2 results were returned\r\n	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.convertHibernateAccessException(HibernateJpaDialect.java:301)\r\n	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.translateExceptionIfPossible(HibernateJpaDialect.java:244)\r\n	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.translateExceptionIfPossible(AbstractEntityManagerFactoryBean.java:550)\r\n	at org.springframework.dao.support.ChainedPersistenceExceptionTranslator.translateExceptionIfPossible(ChainedPersistenceExceptionTranslator.java:61)\r\n	at org.springframework.dao.support.DataAccessUtils.translateIfNecessary(DataAccessUtils.java:335)\r\n	at org.springframework.dao.support.PersistenceExceptionTranslationInterceptor.invoke(PersistenceExceptionTranslationInterceptor.java:152)\r\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)\r\n	at org.springframework.data.jpa.repository.support.CrudMethodMetadataPostProcessor$CrudMethodMetadataPopulatingMethodInterceptor.invoke(CrudMethodMetadataPostProcessor.java:135)\r\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)\r\n	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:97)\r\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)\r\n	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:220)\r\n	at jdk.proxy5/jdk.proxy5.$Proxy246.findExerciseByMemberAndExerciseDay(Unknown Source)\r\n	at org.ssafy.d210._common.batch.SaveFitnessDataEveryDayJobConfig.lambda$userDetailsItemWriter$2(SaveFitnessDataEveryDayJobConfig.java:115)\r\n	at org.springframework.batch.core.step.item.SimpleChunkProcessor.writeItems(SimpleChunkProcessor.java:203)\r\n	at org.springframework.batch.core.step.item.SimpleChunkProcessor.doWrite(SimpleChunkProcessor.java:170)\r\n	at org.springframework.batch.core.step.item.SimpleChunkProcessor.write(SimpleChunkProcessor.java:297)\r\n	at org.springframework.batch.core.step.item.SimpleChunkProcessor.process(SimpleChunkProcessor.java:227)\r\n	at org.springframework.batch.core.step.item.ChunkOrientedTasklet.execute(ChunkOrientedTasklet.java:75)\r\n	at org.springframework.batch.core.step.tasklet.TaskletStep$ChunkTransactionCallback.doInTransaction(TaskletStep.java:388)\r\n','2024-04-03 09:30:09.120693'),(2,2,1,'2024-04-03 01:30:01.128889','2024-04-03 01:30:01.372945','2024-04-03 01:30:23.413838','COMPLETED','COMPLETED','','2024-04-03 01:30:23.414887'),(4,2,2,'2024-04-03 01:30:23.441847','2024-04-03 01:30:23.456384','2024-04-03 01:30:45.538738','COMPLETED','COMPLETED','','2024-04-03 01:30:45.539617');
/*!40000 ALTER TABLE `batch_job_execution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_job_execution_context`
--

DROP TABLE IF EXISTS `batch_job_execution_context`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_job_execution_context` (
  `JOB_EXECUTION_ID` bigint(20) NOT NULL,
  `SHORT_CONTEXT` varchar(2500) NOT NULL,
  `SERIALIZED_CONTEXT` text DEFAULT NULL,
  PRIMARY KEY (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_CTX_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `batch_job_execution` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_job_execution_context`
--

LOCK TABLES `batch_job_execution_context` WRITE;
/*!40000 ALTER TABLE `batch_job_execution_context` DISABLE KEYS */;
INSERT INTO `batch_job_execution_context` VALUES (1,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMS4xeA==',NULL),(2,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMS4xeA==',NULL),(4,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMS4xeA==',NULL);
/*!40000 ALTER TABLE `batch_job_execution_context` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_job_execution_params`
--

DROP TABLE IF EXISTS `batch_job_execution_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_job_execution_params` (
  `JOB_EXECUTION_ID` bigint(20) NOT NULL,
  `PARAMETER_NAME` varchar(100) NOT NULL,
  `PARAMETER_TYPE` varchar(100) NOT NULL,
  `PARAMETER_VALUE` varchar(2500) DEFAULT NULL,
  `IDENTIFYING` char(1) NOT NULL,
  KEY `JOB_EXEC_PARAMS_FK` (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_PARAMS_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `batch_job_execution` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_job_execution_params`
--

LOCK TABLES `batch_job_execution_params` WRITE;
/*!40000 ALTER TABLE `batch_job_execution_params` DISABLE KEYS */;
INSERT INTO `batch_job_execution_params` VALUES (1,'time','java.lang.Long','1712104200444','Y'),(2,'time','java.lang.Long','1712104200444','Y'),(4,'time','java.lang.Long','1712107823424','Y');
/*!40000 ALTER TABLE `batch_job_execution_params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_job_execution_seq`
--

DROP TABLE IF EXISTS `batch_job_execution_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_job_execution_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_job_execution_seq`
--

LOCK TABLES `batch_job_execution_seq` WRITE;
/*!40000 ALTER TABLE `batch_job_execution_seq` DISABLE KEYS */;
INSERT INTO `batch_job_execution_seq` VALUES (5,1,9223372036854775806,1,1,0,0,0);
/*!40000 ALTER TABLE `batch_job_execution_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_job_instance`
--

DROP TABLE IF EXISTS `batch_job_instance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_job_instance` (
  `JOB_INSTANCE_ID` bigint(20) NOT NULL,
  `VERSION` bigint(20) DEFAULT NULL,
  `JOB_NAME` varchar(100) NOT NULL,
  `JOB_KEY` varchar(32) NOT NULL,
  PRIMARY KEY (`JOB_INSTANCE_ID`),
  UNIQUE KEY `JOB_INST_UN` (`JOB_NAME`,`JOB_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_job_instance`
--

LOCK TABLES `batch_job_instance` WRITE;
/*!40000 ALTER TABLE `batch_job_instance` DISABLE KEYS */;
INSERT INTO `batch_job_instance` VALUES (1,0,'saveFitnessDataEveryDayJob','031148a4f0e5175b1e9c43d62dfbf33a'),(2,0,'saveFitnessDataEveryDayJob','811a0d83b70aa7c9a8b7130e53a36d56');
/*!40000 ALTER TABLE `batch_job_instance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_job_seq`
--

DROP TABLE IF EXISTS `batch_job_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_job_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_job_seq`
--

LOCK TABLES `batch_job_seq` WRITE;
/*!40000 ALTER TABLE `batch_job_seq` DISABLE KEYS */;
INSERT INTO `batch_job_seq` VALUES (3,1,9223372036854775806,1,1,0,0,0);
/*!40000 ALTER TABLE `batch_job_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_step_execution`
--

DROP TABLE IF EXISTS `batch_step_execution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_step_execution` (
  `STEP_EXECUTION_ID` bigint(20) NOT NULL,
  `VERSION` bigint(20) NOT NULL,
  `STEP_NAME` varchar(100) NOT NULL,
  `JOB_EXECUTION_ID` bigint(20) NOT NULL,
  `CREATE_TIME` datetime(6) NOT NULL,
  `START_TIME` datetime(6) DEFAULT NULL,
  `END_TIME` datetime(6) DEFAULT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `COMMIT_COUNT` bigint(20) DEFAULT NULL,
  `READ_COUNT` bigint(20) DEFAULT NULL,
  `FILTER_COUNT` bigint(20) DEFAULT NULL,
  `WRITE_COUNT` bigint(20) DEFAULT NULL,
  `READ_SKIP_COUNT` bigint(20) DEFAULT NULL,
  `WRITE_SKIP_COUNT` bigint(20) DEFAULT NULL,
  `PROCESS_SKIP_COUNT` bigint(20) DEFAULT NULL,
  `ROLLBACK_COUNT` bigint(20) DEFAULT NULL,
  `EXIT_CODE` varchar(2500) DEFAULT NULL,
  `EXIT_MESSAGE` varchar(2500) DEFAULT NULL,
  `LAST_UPDATED` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`STEP_EXECUTION_ID`),
  KEY `JOB_EXEC_STEP_FK` (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_STEP_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `batch_job_execution` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_step_execution`
--

LOCK TABLES `batch_step_execution` WRITE;
/*!40000 ALTER TABLE `batch_step_execution` DISABLE KEYS */;
INSERT INTO `batch_step_execution` VALUES (1,2,'saveFitnessDataEveryDayStep',1,'2024-04-03 09:30:02.645726','2024-04-03 09:30:02.741168','2024-04-03 09:30:08.979849','FAILED',0,10,7,0,0,0,0,1,'FAILED','org.springframework.dao.IncorrectResultSizeDataAccessException: Query did not return a unique result: 2 results were returned\r\n	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.convertHibernateAccessException(HibernateJpaDialect.java:301)\r\n	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.translateExceptionIfPossible(HibernateJpaDialect.java:244)\r\n	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.translateExceptionIfPossible(AbstractEntityManagerFactoryBean.java:550)\r\n	at org.springframework.dao.support.ChainedPersistenceExceptionTranslator.translateExceptionIfPossible(ChainedPersistenceExceptionTranslator.java:61)\r\n	at org.springframework.dao.support.DataAccessUtils.translateIfNecessary(DataAccessUtils.java:335)\r\n	at org.springframework.dao.support.PersistenceExceptionTranslationInterceptor.invoke(PersistenceExceptionTranslationInterceptor.java:152)\r\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)\r\n	at org.springframework.data.jpa.repository.support.CrudMethodMetadataPostProcessor$CrudMethodMetadataPopulatingMethodInterceptor.invoke(CrudMethodMetadataPostProcessor.java:135)\r\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)\r\n	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:97)\r\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)\r\n	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:220)\r\n	at jdk.proxy5/jdk.proxy5.$Proxy246.findExerciseByMemberAndExerciseDay(Unknown Source)\r\n	at org.ssafy.d210._common.batch.SaveFitnessDataEveryDayJobConfig.lambda$userDetailsItemWriter$2(SaveFitnessDataEveryDayJobConfig.java:115)\r\n	at org.springframework.batch.core.step.item.SimpleChunkProcessor.writeItems(SimpleChunkProcessor.java:203)\r\n	at org.springframework.batch.core.step.item.SimpleChunkProcessor.doWrite(SimpleChunkProcessor.java:170)\r\n	at org.springframework.batch.core.step.item.SimpleChunkProcessor.write(SimpleChunkProcessor.java:297)\r\n	at org.springframework.batch.core.step.item.SimpleChunkProcessor.process(SimpleChunkProcessor.java:227)\r\n	at org.springframework.batch.core.step.item.ChunkOrientedTasklet.execute(ChunkOrientedTasklet.java:75)\r\n	at org.springframework.batch.core.step.tasklet.TaskletStep$ChunkTransactionCallback.doInTransaction(TaskletStep.java:388)\r\n','2024-04-03 09:30:08.993948'),(2,7,'saveFitnessDataEveryDayStep',2,'2024-04-03 01:30:01.413132','2024-04-03 01:30:01.428289','2024-04-03 01:30:23.397703','COMPLETED',5,47,42,5,0,0,0,0,'COMPLETED','','2024-04-03 01:30:23.399069'),(3,7,'saveFitnessDataEveryDayStep',4,'2024-04-03 01:30:23.475682','2024-04-03 01:30:23.495446','2024-04-03 01:30:45.520097','COMPLETED',5,47,42,5,0,0,0,0,'COMPLETED','','2024-04-03 01:30:45.521079');
/*!40000 ALTER TABLE `batch_step_execution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_step_execution_context`
--

DROP TABLE IF EXISTS `batch_step_execution_context`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_step_execution_context` (
  `STEP_EXECUTION_ID` bigint(20) NOT NULL,
  `SHORT_CONTEXT` varchar(2500) NOT NULL,
  `SERIALIZED_CONTEXT` text DEFAULT NULL,
  PRIMARY KEY (`STEP_EXECUTION_ID`),
  CONSTRAINT `STEP_EXEC_CTX_FK` FOREIGN KEY (`STEP_EXECUTION_ID`) REFERENCES `batch_step_execution` (`STEP_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_step_execution_context`
--

LOCK TABLES `batch_step_execution_context` WRITE;
/*!40000 ALTER TABLE `batch_step_execution_context` DISABLE KEYS */;
INSERT INTO `batch_step_execution_context` VALUES (1,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAAEdAARYmF0Y2gudGFza2xldFR5cGV0AD1vcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC5pdGVtLkNodW5rT3JpZW50ZWRUYXNrbGV0dAAgdXNlckRldGFpbHNJdGVtUmVhZGVyLnJlYWQuY291bnRzcgARamF2YS5sYW5nLkludGVnZXIS4qCk94GHOAIAAUkABXZhbHVleHIAEGphdmEubGFuZy5OdW1iZXKGrJUdC5TgiwIAAHhwAAAAAHQADWJhdGNoLnZlcnNpb250AAU1LjEuMXQADmJhdGNoLnN0ZXBUeXBldAA3b3JnLnNwcmluZ2ZyYW1ld29yay5iYXRjaC5jb3JlLnN0ZXAudGFza2xldC5UYXNrbGV0U3RlcHg=',NULL),(2,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAAEdAARYmF0Y2gudGFza2xldFR5cGV0AD1vcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC5pdGVtLkNodW5rT3JpZW50ZWRUYXNrbGV0dAAgdXNlckRldGFpbHNJdGVtUmVhZGVyLnJlYWQuY291bnRzcgARamF2YS5sYW5nLkludGVnZXIS4qCk94GHOAIAAUkABXZhbHVleHIAEGphdmEubGFuZy5OdW1iZXKGrJUdC5TgiwIAAHhwAAAAMHQADWJhdGNoLnZlcnNpb250AAU1LjEuMXQADmJhdGNoLnN0ZXBUeXBldAA3b3JnLnNwcmluZ2ZyYW1ld29yay5iYXRjaC5jb3JlLnN0ZXAudGFza2xldC5UYXNrbGV0U3RlcHg=',NULL),(3,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAAEdAARYmF0Y2gudGFza2xldFR5cGV0AD1vcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC5pdGVtLkNodW5rT3JpZW50ZWRUYXNrbGV0dAAgdXNlckRldGFpbHNJdGVtUmVhZGVyLnJlYWQuY291bnRzcgARamF2YS5sYW5nLkludGVnZXIS4qCk94GHOAIAAUkABXZhbHVleHIAEGphdmEubGFuZy5OdW1iZXKGrJUdC5TgiwIAAHhwAAAAMHQADWJhdGNoLnZlcnNpb250AAU1LjEuMXQADmJhdGNoLnN0ZXBUeXBldAA3b3JnLnNwcmluZ2ZyYW1ld29yay5iYXRjaC5jb3JlLnN0ZXAudGFza2xldC5UYXNrbGV0U3RlcHg=',NULL);
/*!40000 ALTER TABLE `batch_step_execution_context` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_step_execution_seq`
--

DROP TABLE IF EXISTS `batch_step_execution_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_step_execution_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_step_execution_seq`
--

LOCK TABLES `batch_step_execution_seq` WRITE;
/*!40000 ALTER TABLE `batch_step_execution_seq` DISABLE KEYS */;
INSERT INTO `batch_step_execution_seq` VALUES (4,1,9223372036854775806,1,1,0,0,0);
/*!40000 ALTER TABLE `batch_step_execution_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `block_address`
--

DROP TABLE IF EXISTS `block_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `block_address` (
  `block_address_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) DEFAULT NULL,
  `block_address` longtext NOT NULL,
  `block_type` enum('CA','RA','EA','WA') DEFAULT NULL,
  PRIMARY KEY (`block_address_id`),
  KEY `FKj9sv9uyfn8wk1o5ol24x1n2m2` (`member_id`),
  CONSTRAINT `FKj9sv9uyfn8wk1o5ol24x1n2m2` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block_address`
--

LOCK TABLES `block_address` WRITE;
/*!40000 ALTER TABLE `block_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `block_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise` (
  `exercise_day` date DEFAULT NULL,
  `is_achieved` bit(1) DEFAULT b'0',
  `today` date DEFAULT NULL,
  `calorie` double DEFAULT NULL,
  `exercise_distance` double DEFAULT 0,
  `exercise_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `exercise_minute` bigint(20) DEFAULT 0,
  `heart_rate` double DEFAULT 0,
  `member_id` bigint(20) NOT NULL,
  `steps` bigint(20) DEFAULT 0,
  `streak` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`exercise_id`),
  KEY `FK1ejwxs4v7kt2p7uc1s03i5bkv` (`member_id`),
  CONSTRAINT `FK1ejwxs4v7kt2p7uc1s03i5bkv` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES ('2024-03-27',_binary '','2024-03-28',1579,3352,1,72,NULL,1,5168,1),('2024-03-27',_binary '\0','2024-03-28',83,2241,2,41,NULL,2,3522,0),('2024-03-27',_binary '','2024-03-28',1602,2565,3,59,NULL,3,4103,1),('2024-03-28',_binary '','2024-03-29',1569,4937,7,95,NULL,1,7758,2),('2024-03-28',_binary '','2024-03-29',73,3755,8,76,NULL,2,5537,1),('2024-03-28',_binary '','2024-03-29',1526,2527,9,59,NULL,3,4254,2),('2024-03-29',_binary '','2024-03-30',1345,4911,10,96,NULL,1,7495,3),('2024-03-29',_binary '','2024-03-30',NULL,4577,11,86,NULL,2,6874,2),('2024-03-29',_binary '','2024-03-30',1120,7619,13,124,NULL,23,10945,1),('2024-03-29',_binary '','2024-03-30',6,3930,14,75,NULL,47,5161,1),('2024-03-30',_binary '','2024-03-31',209,2917,17,46,NULL,56,4269,1),('2024-03-30',_binary '','2024-03-31',1648,8680,18,146,NULL,1,12711,4),('2024-03-30',_binary '','2024-03-31',NULL,3763,19,61,NULL,2,5674,3),('2024-03-31',_binary '\0','2024-04-01',18,3384,21,56,NULL,2,4563,0),('2024-03-31',_binary '','2024-04-01',1213,3794,23,66,NULL,23,5802,1),('2024-03-31',_binary '\0','2024-04-01',56,737,25,14,NULL,56,1177,0),('2024-04-01',_binary '','2024-04-02',1602.2603759765625,7078.11767578125,29,144,NULL,1,10650,1),('2024-04-01',_binary '','2024-04-02',224.00634765625,2774.24169921875,30,50,NULL,56,4169,1),('2024-04-01',_binary '\0','2024-04-02',1422.8409423828125,477.14666748046875,32,9,NULL,3,3023,0),('2024-04-02',_binary '','2024-04-03',938.6891479492188,5623.29833984375,37,109,NULL,1,8616,2),('2024-04-02',_binary '\0','2024-04-03',1.106791615486145,817.4375,38,23,NULL,2,1279,0),('2024-04-02',_binary '\0','2024-04-03',1460.803955078125,2394.03857421875,39,57,NULL,3,3245,0),('2024-04-02',_binary '','2024-04-03',954.6231689453125,4177.93896484375,41,84,NULL,23,6359,1),('2024-04-02',_binary '','2024-04-03',51.69788360595703,2252.18701171875,44,83,NULL,57,3588,1);
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_acc`
--

DROP TABLE IF EXISTS `exercise_acc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_acc` (
  `calorie` bigint(20) DEFAULT NULL,
  `exercise_acc_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `exercise_distance` bigint(20) DEFAULT 0,
  `exercise_minute` bigint(20) DEFAULT 0,
  `member_id` bigint(20) DEFAULT NULL,
  `steps` bigint(20) DEFAULT 0,
  PRIMARY KEY (`exercise_acc_id`),
  UNIQUE KEY `UK_oiu9sd71m0u8d6uom9qq1x9l9` (`member_id`),
  CONSTRAINT `FKgsyc723e1ipvqog6d8r5oc99c` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_acc`
--

LOCK TABLES `exercise_acc` WRITE;
/*!40000 ALTER TABLE `exercise_acc` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_acc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_criteria`
--

DROP TABLE IF EXISTS `exercise_criteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_criteria` (
  `is_custom` bit(1) DEFAULT b'0',
  `criteria_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `exercise_minute` bigint(20) DEFAULT 0,
  `heart_rate` bigint(20) DEFAULT 0,
  `member_id` bigint(20) NOT NULL,
  `steps` bigint(20) DEFAULT 0,
  PRIMARY KEY (`criteria_id`),
  KEY `FK8vs6v4lb1386m1ntr0egnb7oq` (`member_id`),
  CONSTRAINT `FK8vs6v4lb1386m1ntr0egnb7oq` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_criteria`
--

LOCK TABLES `exercise_criteria` WRITE;
/*!40000 ALTER TABLE `exercise_criteria` DISABLE KEYS */;
INSERT INTO `exercise_criteria` VALUES (_binary '\0',1,60,130,2,10000),(_binary '\0',2,45,110,1,8000),(_binary '\0',3,45,110,3,8000),(_binary '\0',4,60,130,15,10000),(_binary '\0',6,45,110,16,8000),(_binary '\0',7,45,110,17,8000),(_binary '\0',8,60,130,19,10000),(_binary '\0',9,45,110,20,8000),(_binary '\0',10,45,110,13,8000),(_binary '\0',11,45,110,23,8000),(_binary '\0',12,60,130,25,10000),(_binary '\0',13,45,110,18,8000),(_binary '\0',14,45,110,22,8000),(_binary '\0',15,45,110,28,8000),(_binary '\0',16,45,110,31,8000),(_binary '\0',17,45,110,33,8000),(_binary '\0',18,60,130,37,10000),(_binary '\0',19,25,90,35,6000),(_binary '\0',20,45,110,29,8000),(_binary '\0',21,45,110,38,8000),(_binary '\0',22,60,130,42,10000),(_binary '\0',23,45,110,44,8000),(_binary '\0',24,45,110,46,8000),(_binary '\0',25,45,110,47,8000),(_binary '\0',26,60,130,36,10000),(_binary '\0',27,45,110,27,8000),(_binary '\0',28,60,130,48,10000),(_binary '\0',29,60,130,51,10000),(_binary '\0',30,45,110,53,8000),(_binary '\0',31,60,130,54,10000),(_binary '\0',32,45,110,55,8000),(_binary '\0',33,45,110,56,8000),(_binary '\0',34,60,130,52,10000),(_binary '',35,120,110,3,8000),(_binary '',36,60,130,15,6000),(_binary '\0',37,60,130,57,10000);
/*!40000 ALTER TABLE `exercise_criteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_decided`
--

DROP TABLE IF EXISTS `exercise_decided`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_decided` (
  `exercise_decided_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `calorie` double DEFAULT NULL,
  `exercise_day` date DEFAULT NULL,
  `exercise_distance` double DEFAULT 0,
  `exercise_end` datetime(6) DEFAULT NULL,
  `exercise_minute` bigint(20) DEFAULT 0,
  `exercise_start` datetime(6) DEFAULT NULL,
  `heart_rate` double DEFAULT 0,
  `steps` bigint(20) DEFAULT 0,
  `member_id` bigint(20) NOT NULL,
  PRIMARY KEY (`exercise_decided_id`),
  KEY `FKj72tlepxfrf2tf8gd064tpkd4` (`member_id`),
  CONSTRAINT `FKj72tlepxfrf2tf8gd064tpkd4` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_decided`
--

LOCK TABLES `exercise_decided` WRITE;
/*!40000 ALTER TABLE `exercise_decided` DISABLE KEYS */;
INSERT INTO `exercise_decided` VALUES (1,563.1270751953125,'2024-04-01',2934.590576171875,'2024-04-01 23:30:00.000000',53,'2024-04-01 15:30:00.000000',NULL,4389,1),(2,526.23046875,'2024-03-27',1158.39111328125,'2024-03-27 23:30:00.000000',26,'2024-03-27 15:30:00.000000',NULL,1777,1),(3,236.1666717529297,'2024-03-28',156.09954833984375,'2024-03-28 23:30:00.000000',3,'2024-03-28 19:30:00.000000',NULL,276,1),(4,NULL,'2024-04-03',NULL,NULL,NULL,'2024-04-01 15:30:00.000000',NULL,NULL,1);
/*!40000 ALTER TABLE `exercise_decided` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_monthly`
--

DROP TABLE IF EXISTS `exercise_monthly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_monthly` (
  `exercise_monthly_id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`exercise_monthly_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_monthly`
--

LOCK TABLES `exercise_monthly` WRITE;
/*!40000 ALTER TABLE `exercise_monthly` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_monthly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_weekly`
--

DROP TABLE IF EXISTS `exercise_weekly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_weekly` (
  `exercise_weekly_id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`exercise_weekly_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_weekly`
--

LOCK TABLES `exercise_weekly` WRITE;
/*!40000 ALTER TABLE `exercise_weekly` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_weekly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_list`
--

DROP TABLE IF EXISTS `friend_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_list` (
  `is_accepted` bit(1) NOT NULL,
  `is_friend` bit(1) NOT NULL,
  `friend_list_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `receiver_id` bigint(20) NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  PRIMARY KEY (`friend_list_id`),
  KEY `FK20j0rjapikiogshqgptvjrmsg` (`receiver_id`),
  KEY `FKro9y4ledtutskgm5vsnxpnbyp` (`sender_id`),
  CONSTRAINT `FK20j0rjapikiogshqgptvjrmsg` FOREIGN KEY (`receiver_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKro9y4ledtutskgm5vsnxpnbyp` FOREIGN KEY (`sender_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=421 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_list`
--

LOCK TABLES `friend_list` WRITE;
/*!40000 ALTER TABLE `friend_list` DISABLE KEYS */;
INSERT INTO `friend_list` VALUES (_binary '',_binary '',35,1,17),(_binary '',_binary '',36,17,1),(_binary '',_binary '',43,1,2),(_binary '',_binary '',44,2,1),(_binary '',_binary '',47,3,2),(_binary '',_binary '',48,2,3),(_binary '',_binary '',49,3,1),(_binary '',_binary '',50,1,3),(_binary '',_binary '',53,29,2),(_binary '',_binary '',54,2,29),(_binary '',_binary '',55,22,13),(_binary '',_binary '',56,13,22),(_binary '',_binary '',61,20,2),(_binary '',_binary '',62,2,20),(_binary '',_binary '\0',65,26,31),(_binary '\0',_binary '\0',66,31,26),(_binary '',_binary '\0',67,40,13),(_binary '\0',_binary '\0',68,13,40),(_binary '',_binary '',77,18,31),(_binary '',_binary '',78,31,18),(_binary '',_binary '',79,20,31),(_binary '',_binary '',80,31,20),(_binary '',_binary '',81,18,43),(_binary '',_binary '',82,43,18),(_binary '',_binary '\0',83,21,31),(_binary '\0',_binary '\0',84,31,21),(_binary '',_binary '\0',85,40,31),(_binary '\0',_binary '\0',86,31,40),(_binary '',_binary '',89,1,23),(_binary '',_binary '',90,23,1),(_binary '',_binary '',93,2,19),(_binary '',_binary '',94,19,2),(_binary '',_binary '',95,29,28),(_binary '',_binary '',96,28,29),(_binary '',_binary '\0',99,24,28),(_binary '\0',_binary '\0',100,28,24),(_binary '',_binary '',105,15,20),(_binary '',_binary '',106,20,15),(_binary '',_binary '\0',109,32,44),(_binary '\0',_binary '\0',110,44,32),(_binary '',_binary '',113,20,44),(_binary '',_binary '',114,44,20),(_binary '',_binary '',115,1,13),(_binary '',_binary '',116,13,1),(_binary '',_binary '\0',117,32,35),(_binary '\0',_binary '\0',118,35,32),(_binary '',_binary '\0',119,27,19),(_binary '\0',_binary '\0',120,19,27),(_binary '',_binary '',121,38,18),(_binary '',_binary '',122,18,38),(_binary '',_binary '',123,1,42),(_binary '',_binary '',124,42,1),(_binary '',_binary '\0',127,30,36),(_binary '\0',_binary '\0',128,36,30),(_binary '',_binary '',129,47,48),(_binary '',_binary '',130,48,47),(_binary '',_binary '',133,50,51),(_binary '',_binary '',134,51,50),(_binary '',_binary '',367,56,15),(_binary '',_binary '',368,15,56),(_binary '',_binary '',369,3,15),(_binary '',_binary '',370,15,3),(_binary '',_binary '',387,54,15),(_binary '',_binary '',388,15,54),(_binary '',_binary '',391,2,54),(_binary '',_binary '',392,54,2),(_binary '',_binary '',393,15,2),(_binary '',_binary '',394,2,15),(_binary '',_binary '',419,55,3),(_binary '',_binary '',420,3,55);
/*!40000 ALTER TABLE `friend_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `halley_galley`
--

DROP TABLE IF EXISTS `halley_galley`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `halley_galley` (
  `dayoff` int(11) DEFAULT 0,
  `is_accepted` bit(1) DEFAULT b'0',
  `reward` int(11) DEFAULT 0,
  `created_at` datetime(6) NOT NULL,
  `galley_id` bigint(20) NOT NULL,
  `halley_galley_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `halley_id` bigint(20) NOT NULL,
  `mission_id` bigint(20) DEFAULT NULL,
  `get_reward_at` date DEFAULT NULL,
  PRIMARY KEY (`halley_galley_id`),
  UNIQUE KEY `UK_h93bdkpuebrwrlbkw7krrpvuy` (`mission_id`),
  KEY `FKd8856juo3swuupl4vc8hahc75` (`galley_id`),
  KEY `FK31cfbwng6ilwrkof74thoe6dn` (`halley_id`),
  CONSTRAINT `FK31cfbwng6ilwrkof74thoe6dn` FOREIGN KEY (`halley_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKd8856juo3swuupl4vc8hahc75` FOREIGN KEY (`galley_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKnsb1r94c8grck78djar5p2hp1` FOREIGN KEY (`mission_id`) REFERENCES `mission` (`mission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `halley_galley`
--

LOCK TABLES `halley_galley` WRITE;
/*!40000 ALTER TABLE `halley_galley` DISABLE KEYS */;
INSERT INTO `halley_galley` VALUES (3,_binary '',10000,'2024-04-02 07:53:52.896354',2,78,15,10,'2024-04-02'),(0,_binary '',0,'2024-04-02 16:56:26.970075',15,79,2,NULL,'2024-04-01'),(10,_binary '',12333,'2024-04-02 08:55:35.997669',2,83,52,11,'2024-04-02'),(0,_binary '',0,'2024-04-03 01:16:49.697331',52,85,2,NULL,'2024-04-02');
/*!40000 ALTER TABLE `halley_galley` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `egg_price` int(11) DEFAULT 0,
  `items_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `effect` longtext NOT NULL,
  `icon` longtext NOT NULL,
  `type` enum('STREAK') NOT NULL,
  PRIMARY KEY (`items_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (50,1,'오리발 내밀권','스트릭은 알겠는데 용돈은 못줘','오리','STREAK');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_account`
--

DROP TABLE IF EXISTS `member_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_account` (
  `egg` int(11) DEFAULT 0,
  `money` int(11) DEFAULT 0,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `member_account_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) NOT NULL,
  `eoa` longtext NOT NULL,
  `public_key` longtext NOT NULL,
  PRIMARY KEY (`member_account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_account`
--

LOCK TABLES `member_account` WRITE;
/*!40000 ALTER TABLE `member_account` DISABLE KEYS */;
INSERT INTO `member_account` VALUES (0,14100,'2024-03-27 08:25:29.413138',NULL,1,'2024-04-01 01:48:54.786974','0xB15b5551aA7A829b6c20662DA0B1225c622089db','0x047201e2983cf799dd6d7ce838edd1121266258c9ce110d6a37decfc49c9f2297ff95ba295844b0fa57c50bbc5e160af815bba2de6d7e01ad62947077b03396600'),(50,5000,'2024-03-27 08:27:35.960803',NULL,2,'2024-03-29 16:02:05.648023','fdjlsfj2kl1lk1242515l','dfsdf0-13ds9-dsf9-0'),(0,72333,'2024-03-27 19:02:38.063285',NULL,3,'2024-04-02 17:56:44.839020','0x4CE6aB0F24252E1B70dC36422971579338B22a67','0x042910578f5e57a9f405a3bc3399f56aa0e11b7f48010bbfd6b39af594e6fce240e0e1867550452b4792b58f5f1bb70adc071e5f6b638a31dd94b6626f977519e4'),(0,0,'2024-03-28 00:10:05.795165',NULL,4,'2024-03-28 00:10:05.795165','0x30e53bc0Cb4819bb6f94AE8C9Fff4DE6897f81A5','0x04ae58d00babd9efdc6ec11f917a90c6248df2e83b01451a4ee12352df41949fa3888c3ee4f2fc6d1daae44f1fe29eb548a89f6aadae085305c1e43831cee21d5f'),(0,0,'2024-03-28 07:02:33.628036',NULL,5,'2024-03-28 07:02:33.628036','0x02cE1F0928cBBDe2bFCA2B91089533a251cbbe36','0x04f878cb1dd15fbac94a6afba32e6f8a423a9a54148b38ecb6223513b561814e75736eac98f4af58fd837b3c8124492dc8d574a4c4655c421d30344576a04fec02'),(10000,99900000,'2024-03-29 05:42:35.971346',NULL,6,'2024-04-02 08:12:22.694835','0xD76D862A8647C5449424d6298E61660FD9B0f77B','0x04258aa880b6c68138d203d2175b5597c01b72d715bec521ad76a0a4a7c11cf3acdc3d859443b172e8329c2f19742d13527c11ab500b8e8d843395f59fb69a36e7'),(0,0,'2024-03-29 00:29:41.296514',NULL,7,'2024-03-29 00:29:41.296514','0xfbbC161daEd897A5fA1A5a80e2662D7C63B3972a','0x04caf4426380a9f9235cf7c1a141aea1bb3026453aff118ae073e95b09c61456aea313ec7f347d6df3436cb20545a1cdb15451040f31af4b4d74026ec10eae5bbf'),(0,0,'2024-03-29 00:37:00.163847',NULL,8,'2024-03-29 00:37:00.163847','0x2e4eEca877F5C820C3FaD1F48A369083aA180aA9','0x047a749e7c07a7aafe31d8fd41f66032457de9714766a16b08d93387e898420febd8ee0f86f994be82c7f7d26cfa51279757d8451326f1b642068a8da9d32a10b9'),(0,1111,'2024-03-29 01:27:41.695486',NULL,9,'2024-03-29 01:38:36.660698','0x51D2C156fd6B145f94d6C5cE257e0136E079dD02','0x04538235888dc53fe7dba43869cfe7f549c4534ca2d2f6c878df160f0d0800c33f3e7c8f99cc466775a43905d1f4912f62972ee278bec7eef2f4110c4874b8ca25'),(0,3333,'2024-03-29 01:27:45.932718',NULL,10,'2024-03-29 01:34:13.768502','0x19b6CA9965488DFAa5BE91D65005d5E1d58565fC','0x0418da94164c9502ef34f42c16cea0280b03c4da9333042316a17e91ebb7d043262eab121d6bd8ced79a44fb25352fa644a2cdcdef154d7b36405b6875ba309c16'),(0,0,'2024-03-29 01:28:21.485619',NULL,11,'2024-03-29 01:28:21.485619','0xc5D140747567405e72222a058aF609462F87DC97','0x042b36eb08860d47ac138658ac0d7e07cfe09b7ea86e1713da6fd7129d35e01e4ff7e1e3ae73019bce3d125031d30d398a6f8d4ab6db9e2082568a5952ef6e580a'),(0,0,'2024-03-29 01:28:30.670055',NULL,12,'2024-03-29 01:28:30.757883','0x8149A5aCF73948F7F8fDc0912A504c728CBDB6dD','0x049f6d009370792f7598f267cf7fde9333e46a10bf86da55784bb0dc46d25bbf79821a2156f21d74ae58e61748d71c7ede8467b095f49a8568bcbd1d98bb6c86f3'),(0,0,'2024-03-29 01:28:35.593178',NULL,13,'2024-03-29 01:28:35.593178','0x91ba9Ef538484eC21Be0CbeC5c0932f045CB88d5','0x0484e68070996059e3d31b88542e3b032895d0d1b9035db31fd31d29e4bd0f7f178bd2736efc2f6488e727d874fe498f7b6f943ee84a1540c7bb461524d7158e0c'),(0,1210,'2024-03-29 01:28:36.189106',NULL,14,'2024-03-29 01:36:46.457494','0x2468B6fe3f0400BBD7DBd74D24a75738445B4643','0x047db26d443de5f547b1651c0b1d11541723e1363d8949a284fde681d82a19e2ca98eac7931694ec3d8c1467eeee081c60af8a0b1d63edeae7f3f5fc72874cb75d'),(0,0,'2024-03-29 01:28:38.737209',NULL,15,'2024-03-29 01:28:38.737209','0x533779caC44203fD45Db3089a0e6f3172F6d12f2','0x043bb35086b7fbe8d9b4ac72a2fb19b4ccbbc93f1c075a0cb6da68008795ddc58bcc0dc651b458d3d88abd127f604e6b0ffa2234a1a22d4e6dd337a1ba4137341a'),(0,0,'2024-03-29 01:29:23.202388',NULL,16,'2024-03-29 01:29:23.202388','0xd1de868a64Fb8FE217D0E083Ef53BA47c76AD42B','0x04c5e61aeaf628ca8ae78121a5d64556648d3fe824e4cd35405744d048464466cba16ce18eabf10956353a5ccd2184b2b95ef6739754141820359a24191642989c'),(0,100,'2024-03-29 01:29:49.910453',NULL,17,'2024-03-29 01:35:38.570368','0xEeA9D0093c874dcfE55b58005235e11a56DDd938','0x0489191a816634651286c2a32aa1866a9ed25cf9f9dabfb0de8f9a45c0fa81e5cad66207023d301ad63fd3bb14c83ea9b44d4a20e8795f4beb8e3f58d310c642bb'),(0,0,'2024-03-29 01:30:09.590262',NULL,18,'2024-03-29 01:30:09.590262','0xF333987Cc4E135d65194c2e2730538000286139F','0x042eca915a80791caa85125e407ace62b978b50fef0d8fa9df82d2614eb2c9c6164a1c6c39379aa9543d8aa412570e6d76e69bed605a808ee03a45ec14ba1f63aa'),(0,0,'2024-03-29 01:30:32.156103',NULL,19,'2024-03-29 01:30:32.156103','0xa397c1e69c8Db06aC1D0aC4b0b56cD9347273197','0x04057d7e69eb6409fb173d7c9a98f40456c9c9fe0ab1752ad27017d5cc8b4140b8c40f29fd669eb09cd136c9a3d84980755b785e62636a28ada79bed0bc9a5f6d1'),(0,3900,'2024-03-29 01:30:46.542510',NULL,20,'2024-03-29 01:35:17.243791','0x9d19F418A37531055766cb8B3b1f61AD74b68f51','0x04299f74712517d23a64198ff62fab463dea1320a179b1f697e8105c955ae11657a32d82794133170be103afcd55641d983f8bfdb3a9a4fef1be545e74b814ba0c'),(0,0,'2024-03-29 01:30:51.272941',NULL,21,'2024-03-29 01:30:51.272941','0xdC750b58d6f6cF95378F709667D8dB1feB18B7Fb','0x042ec9a599e435eeed672a75629a348b147af6f7923e4fa00ffbe9f529819673af672f01c535adc229b21c0666bb9d93b16d676da96c756c34bfa636cb0b40fcf0'),(0,0,'2024-03-29 01:31:10.897475',NULL,22,'2024-03-29 01:31:10.897475','0xC6F249417DECA03B91c4f26D4c9E12EeDe913D68','0x04ca013e767a8a3453790173c3af78d7147f550b8421137fe167c91186485fcced9e6d329e114889a1edac552c0e47c53e25fe8fa75f1a656432ed30230c096450'),(0,0,'2024-03-29 01:31:42.165171',NULL,23,'2024-03-29 01:31:42.165171','0xe18D118A385E1e35E98207c9A09096Bb9f8b6d5c','0x04ddf8b48a459a0d54472b32f9e65a5d6c41b2455fa09ee0b068baf2609ad08544feefc1b9204faa43bb4bcfc644aa1e4f648e386a49813fc1b6cdca9f6556a903'),(0,100000,'2024-03-29 01:32:21.625754',NULL,24,'2024-03-29 01:34:31.171104','0xeD9DA87025A7954b659FBB6c5E4D593775c417C9','0x0448a529fa928fe778dba4937dfc66aa28c6d632b5769a0500f0ebaa9a9264ab01d850a0b354219f647e476bb726aa810f01a26a27e474f8a1f8502ae67d9e6860'),(0,0,'2024-03-29 01:33:15.132132',NULL,25,'2024-03-29 01:33:15.132132','0xD5C3021591305981d87328019d7555DE9504E2CE','0x0479c99d935bf3b2d976e33f5a2cf9c2903d063b99aea9d6afb173ee03e01dbf5a53d60557cbfeef852e6b42a73ff9fa5b680f9c34d09549f562eb68fc8462fa81'),(0,100000,'2024-03-29 01:34:06.237023',NULL,26,'2024-03-29 01:37:46.581337','0xDD17dC238ef43fc9257C59117b73AFF1A6DBf236','0x047ae01d368e882d3fc49afa2b8565c271f3a2cc8bddaaf833ddb95f3fd66c490fc3b4fcd5ab5fe705fc248c3b885085fca829b2ae02f265913b6a3fc916ec3b06'),(0,0,'2024-03-29 01:34:41.446059',NULL,27,'2024-03-29 01:34:41.446059','0x16cA860D07a2A4bdbB8e78a342a1aEfF42027986','0x046b5ceee7da47c736db7f780d0caef7504ada27e031bb5208e7a11f51bc2a269cb31da13ee6963de87acf16a857580ccd8aff35a8b6ce90a41e41ed5485e9dba5'),(0,0,'2024-03-29 01:34:57.114158',NULL,28,'2024-03-29 01:34:57.114158','0xB9A79da8e41c880Fe8A5EB64847Ad95Dd4773Dd4','0x04524ad84cd6330dbacfe39243bf18a21649a37bab5a5896f318e6fb44ebdf9ebf4db7792d05656bd7b8c6477d4b3e17ebad9dbdbd2228e465a22dd0ef16e3703a'),(0,0,'2024-03-29 01:35:23.366211',NULL,29,'2024-03-29 01:35:23.366211','0x62B53071b01c4da727d4938C57843c48C8F87392','0x04da60d9977247fccd36caf9c2750ba3158427b4f4027e85229828893f703a12b55cf07430d3d131ef064f0160076a85b14e988248d6417fa37bb4298aaa5a2bea'),(0,0,'2024-03-29 01:41:03.293436',NULL,30,'2024-03-29 01:41:03.293436','0x180404Da9F407F0fCf8B22f2b025A30D61E27094','0x04a792dd695fd2e11ceeec31e4351d80a2129df5101977042587104e8fff50195ee5282a9985b68ba8b0bca67a3d5e9e618135a2f4c976f311943c099789bc41dd'),(0,0,'2024-03-29 10:12:48.291217',NULL,31,'2024-03-29 10:12:48.889941','0xb61dE3B37beEB161cF64B982EDC5849293905800','0x0462527a4c08c18d84aba8ef0ed8febc28d8460329da648a2863960f9a2bc97d57299a0343857b655cc15de078973f89e8a39bd30d8f5198e98318fd79da9339db'),(0,0,'2024-03-29 14:58:10.590046',NULL,32,'2024-03-29 14:58:10.590046','0x5420CaA813D2782f7a79719F3173e521F49b7BB9','0x04472e66b8c5a10ce3c10718979ee1dd9c72040222782a4667ca0653af327a9afcac258045ec0983a270fde186875927106d9aadfd4b0bd15042e59536ec61ff46'),(998,4030,'2024-03-29 16:17:55.405184',NULL,33,'2024-04-02 07:00:54.487211','0x2df265E2d5292251a632a09866f654d73C53d542','0x04a4d3299e59ab6f9080d1ae94e4e7c2f304db41915f3331fa714840d46fc51dcde7441ecebcc28a3c62b3db946822d2b03c60ae00a0c8b90fbc9ee9b96916948d'),(0,0,'2024-03-30 07:43:59.034766',NULL,34,'2024-03-30 07:43:59.034766','0xCb6ED5Bc08Bbf69c3D7cff96f5f530081B4Ae9a5','0x041743c093cc2504e8c96c39bd2502a1ac446b82798674c3c7acbbe9016c4de00b44b5f9d6e21424245d9a21de19e05b1fcc94ccce7e9663b86ddb14f321823956'),(0,999937667,'2024-03-31 08:59:44.934022',NULL,35,'2024-04-02 08:55:58.636804','0xD950DBFa568E724FcEF555a472510633FC18d979','0x0483ea06951055e5455b6a16b5da9f7e88ce1ea190e25d7429feeda38e15a7183a4dfc8b58d8e2b0ed45d01c7eaba7d81bb9f3f902c304d7cdc0f57a94fe4c9401'),(0,0,'2024-04-02 08:59:59.037488',NULL,36,'2024-04-02 08:59:59.037488','0x77Bcb846610BE497cBf27bb48c86b11d07a3275e','0x045d0e5c1fdb2236a5d6504936fe33ae3a141432b5982cac0bc89382c7e6405b11732c0f9373ec7cdc081b448efc55b5ca3061eda89d94e7802d230a4e328c29df');
/*!40000 ALTER TABLE `member_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_badge`
--

DROP TABLE IF EXISTS `member_badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_badge` (
  `badge_id` bigint(20) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `member_badge_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`member_badge_id`),
  KEY `FK39altb7wsyx1gyx3m492wf2kb` (`badge_id`),
  KEY `FKnm42muc7qarip3xc00q4k1h5l` (`member_id`),
  CONSTRAINT `FK39altb7wsyx1gyx3m492wf2kb` FOREIGN KEY (`badge_id`) REFERENCES `badge` (`badge_id`),
  CONSTRAINT `FKnm42muc7qarip3xc00q4k1h5l` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_badge`
--

LOCK TABLES `member_badge` WRITE;
/*!40000 ALTER TABLE `member_badge` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_item_history`
--

DROP TABLE IF EXISTS `member_item_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_item_history` (
  `member_item_history_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `cnt` int(11) NOT NULL,
  `item_type` enum('STREAK') DEFAULT NULL,
  `item_id` bigint(20) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`member_item_history_id`),
  KEY `FKklcequopb3lcn3bxjsfafjsy1` (`item_id`),
  KEY `FK2psbqkx2wjyt1o7e48gwf9hp7` (`member_id`),
  CONSTRAINT `FK2psbqkx2wjyt1o7e48gwf9hp7` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKklcequopb3lcn3bxjsfafjsy1` FOREIGN KEY (`item_id`) REFERENCES `items` (`items_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_item_history`
--

LOCK TABLES `member_item_history` WRITE;
/*!40000 ALTER TABLE `member_item_history` DISABLE KEYS */;
INSERT INTO `member_item_history` VALUES (1,'2024-03-28 17:07:09.601512',1,'STREAK',1,1);
/*!40000 ALTER TABLE `member_item_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `gender` tinyint(4) DEFAULT NULL CHECK (`gender` between 0 and 1),
  `height` double DEFAULT NULL,
  `is_new` bit(1) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `birth_year` bigint(20) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `daily_criteria` bigint(20) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `member_account_id` bigint(20) DEFAULT NULL,
  `member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `streak_color` varchar(20) DEFAULT NULL,
  `comment` varchar(50) DEFAULT NULL,
  `main_badge` varchar(100) DEFAULT NULL,
  `nickname` varchar(100) NOT NULL,
  `location` varchar(500) DEFAULT NULL,
  `profile_url` varchar(500) NOT NULL,
  `member_email` varchar(255) DEFAULT NULL,
  `role` enum('GUEST','USER','ADMIN') DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_6iis0199cgnbhe47x06clexk0` (`member_account_id`),
  CONSTRAINT `FKie39ui3fju0h6xnls2epqnuim` FOREIGN KEY (`member_account_id`) REFERENCES `member_account` (`member_account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (0,171.6,_binary '\0',129.33049881944,35.634370802892,63,1997,'2024-03-27 06:55:15.175984',NULL,NULL,2,1,'2024-04-02 20:28:24.000000','01094852091','gray','야레 야레','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','아가씨전수민','울산 북구 달천동 달천로 50 달천 아이파크','https://d210.s3.ap-northeast-2.amazonaws.com/179609_104140_2635.jpg','wjsaos2081@gmail.com','USER'),(0,100,_binary '\0',0,0,100,2024,'2024-03-27 07:00:07.796106',NULL,NULL,3,2,'2024-04-02 17:52:37.000000','01001010101','gray','힘들다','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','ZI존최강세현','제주특별자치도 서귀포시 가가로 14','https://d210.s3.ap-northeast-2.amazonaws.com/static/76270a.png','germs1020@gmail.com','USER'),(0,123.1,_binary '\0',0,0,12.1,2006,'2024-03-27 07:00:08.387544',NULL,NULL,1,3,'2024-04-02 20:13:12.565240','01012340000','gray','제발요 진짜로','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','인생...?','경기 성남시 분당구 판교역로 166','https://d210.s3.ap-northeast-2.amazonaws.com/static/136781000009188.jpg','ssafy0201@gmail.com','USER'),(0,179,_binary '\0',0,0,72,1998,'2024-03-28 13:35:37.703100',NULL,NULL,11,13,'2024-03-29 10:29:01.000000','01062012418','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','엽','경북 구미시 여헌로7길 24','https://lh3.googleusercontent.com/a/ACg8ocK38OjyZ1yMgjCktTAO0Qtk3364trRtF1RU0HnfvTo8=s96-c','wnsduq1025@gmail.com','USER'),(0,300,_binary '\0',0,0,101,2007,'2024-03-29 05:42:08.090898',NULL,NULL,6,15,'2024-04-03 09:54:20.000000','01092929292','gray','ㅜㅠ유유 취업시켜줘요','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','나는최고야','경북 안동시 강남1길 9','https://d210.s3.ap-northeast-2.amazonaws.com/static/13520%EC%A7%B1%EA%B5%AC2.jpg','bachim2147@gmail.com','USER'),(0,188,_binary '\0',0,0,84,1997,'2024-03-29 00:27:03.987413',NULL,NULL,7,16,'2024-03-29 09:32:02.000000','01094852091','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','전서준','서울 강남구 가로수길 5','https://lh3.googleusercontent.com/a/ACg8ocIapNxvM7fCKWJQEJXlMuvkvEujAJePxSEm-efOyiv9VQ=s96-c','wjsaos136@gmail.com','USER'),(1,166,_binary '\0',0,0,100,1999,'2024-03-29 00:34:09.717899',NULL,NULL,8,17,'2024-04-02 15:46:21.000000','01012345690','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','네펜','경북 구미시 인동북길 3','https://lh3.googleusercontent.com/a/ACg8ocL_qnk0qo0TGEjYbTNydizj1Qxv1FXXHxo5UZqfyiI3=s96-c','nepenthes023@gmail.com','USER'),(0,182,_binary '\0',0,0,67,1998,'2024-03-29 01:26:45.188342',NULL,NULL,14,18,'2024-03-29 10:40:26.000000','01026492786','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','핵펀치맨','경북 구미시 진평5길 17','https://lh3.googleusercontent.com/a/ACg8ocKadMKX7D1JEW3HqrmkIZuzYtAR6Br3TuxgQ_I4gk2R=s96-c','ghddbwns9808@gmail.com','USER'),(0,999,_binary '\0',0,0,999,2024,'2024-03-29 01:26:52.780983',NULL,NULL,9,19,'2024-03-29 10:31:23.000000','01011111111','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','메롱','경북 구미시 삼일로 12','https://lh3.googleusercontent.com/a/ACg8ocJtKuRoYRv_QRTmmpEdjF7FqPdx-UF8ZZ7iQVh8kNI=s96-c','ssafygumi10@gmail.com','USER'),(0,190,_binary '\0',0,0,170,1998,'2024-03-29 01:27:04.931297',NULL,NULL,10,20,'2024-03-29 01:27:45.940829','01039999999','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','1111','서울 강남구 봉은사로 지하 501','https://lh3.googleusercontent.com/a/ACg8ocI7bH0XQNfP-6kNu9a9OgxH3jQzS6ByfVzMdmGpimoRwQ=s96-c','ksh7412.dev@gmail.com','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:27:05.530301',NULL,NULL,NULL,21,'2024-03-29 01:27:05.530301',NULL,NULL,NULL,NULL,'구미_2반_조현제',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJuOd1KKpmQVgQmzhDN-R7pYCZJlN2f-pp0exDE-hQ7=s96-c','chc6575@gmail.com','USER'),(1,165,_binary '\0',0,0,45,1997,'2024-03-29 01:27:07.600986',NULL,NULL,15,22,'2024-03-29 10:29:16.000000','010-6393-6895','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','세둥세','대구 북구 서변로 2','https://lh3.googleusercontent.com/a/ACg8ocJhmjhJf0fveAcP5SDAMZIh-3UXaK5rvoVfeFuG6lMW=s96-c','wkdtpwjd19@gmail.com','USER'),(0,173,_binary '\0',0,0,53,1997,'2024-03-29 01:27:31.806399',NULL,NULL,12,23,'2024-03-29 10:31:27.000000','01094735614','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','우경','경북 구미시 진평4길 8','https://lh3.googleusercontent.com/a/ACg8ocJoea7ZHxChu2aeLL68OtMaptEJkFvNPlpsfwIEJywv=s96-c','ukyoung147@gmail.com','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:27:38.726133',NULL,NULL,NULL,24,'2024-03-29 01:27:38.726133',NULL,NULL,NULL,NULL,'김대영',NULL,'https://lh3.googleusercontent.com/a/ACg8ocLobHEbPxWaZqq-O8yxheEgSwjmFR2JAGksFGqbAmnn=s96-c','kdozlo5730@gmail.com','USER'),(1,171,_binary '\0',0,0,62,2024,'2024-03-29 01:27:55.203552',NULL,NULL,13,25,'2024-03-29 01:28:35.600287','01026698294','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','양산달디매콤주먹','서울 관악구 낙성대역3길 3','https://lh3.googleusercontent.com/a/ACg8ocKqDyAfl68ix5zKGIsZGcf31CoEXHpC6w3hEZ0tgcXqUIM=s96-c','qmak01@gmail.com','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:27:55.943144',NULL,NULL,NULL,26,'2024-03-29 01:27:55.943144',NULL,NULL,NULL,NULL,'양건우',NULL,'https://lh3.googleusercontent.com/a/ACg8ocIbDitTFu1yFdBKGNUgJ5nen-u52_GaNqgVi1vAtnEo=s96-c','mywe2365@gmail.com','USER'),(1,190,_binary '\0',0,0,20,2000,'2024-03-29 01:27:58.262113',NULL,NULL,28,27,'2024-03-29 01:34:57.119090','01021031023','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','유유','경북 구미시 삼일로 12','https://lh3.googleusercontent.com/a/ACg8ocL7x8pYT_0mRrADKGhY02GkDjhA8Wd8mxe-cs1s4FMU=s96-c','yunanash1234@gmail.com','USER'),(0,165,_binary '\0',0,0,58,1997,'2024-03-29 01:28:06.183727',NULL,NULL,16,28,'2024-03-29 01:29:23.210609','01047990673','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','민수','경기 고양시 일산서구 강선로 92','https://lh3.googleusercontent.com/a/ACg8ocLoW01ZxIfFiS4a_xsw_TZBiKtovuz-zk8Lbvx_SnIb=s96-c','kipperhr@gmail.com','USER'),(0,160,_binary '\0',0,0,80,1996,'2024-03-29 01:28:14.078634',NULL,NULL,21,29,'2024-03-29 01:30:51.279173','01011112222','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','김진영멍청이','경북 구미시 삼일로 16','https://lh3.googleusercontent.com/a/ACg8ocKgDA9CaZQ4okIEGmIIH-RoI3ZotAqLVBhxc53R3-B_=s96-c','sssbin123@gmail.com','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:28:34.251858',NULL,NULL,NULL,30,'2024-03-29 01:28:34.251858',NULL,NULL,NULL,NULL,'정슬호',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJnyCJKqt3wBGxKkFVhFsxbNAvXxN4Gok6HvPyfDWa0=s96-c','wjdtmfgh@gmail.com','USER'),(1,158,_binary '\0',0,0,58,1996,'2024-03-29 01:28:58.876373',NULL,NULL,17,31,'2024-03-29 01:29:49.916261','01090794796','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','닉넴ㅋ','경북 구미시 인동중앙로5길 28-33','https://lh3.googleusercontent.com/a/ACg8ocIMDF1eTUSTyu3R6j4n311jcLyY8NIZ3-dP2zcwSrXmk5s=s96-c','alicia.hyojukim@gmail.com','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:29:09.556876',NULL,NULL,NULL,32,'2024-03-29 01:29:09.556876',NULL,NULL,NULL,NULL,'구미_임시6반_안성준',NULL,'https://lh3.googleusercontent.com/a/ACg8ocLZk1KF9LQ5Psgk-YPLXAWk0fk37SH7vS1D-7ainmQR=s96-c','hiahn777@gmail.com','USER'),(0,150,_binary '\0',0,0,100,1999,'2024-03-29 01:29:18.054024',NULL,NULL,18,33,'2024-03-29 01:30:09.599655','01012341235','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','NADA','경북 구미시 삼일로 12','https://lh3.googleusercontent.com/a/ACg8ocJm9rvt1gx-dWgVA5DJom4ZjoAKR7LfZc0ZdtzleuHO=s96-c','igjeon196@gmail.com','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:29:24.887326',NULL,NULL,NULL,34,'2024-03-29 01:29:24.887326',NULL,NULL,NULL,NULL,'정원준',NULL,'https://lh3.googleusercontent.com/a/ACg8ocKHubpA5PlH-nZsgKPqLphCrYGbsqv4M-RjkK7_IF8t=s96-c','doosanyagoo@gmail.com','USER'),(0,204,_binary '\0',0,0,230,1950,'2024-03-29 01:30:01.459265',NULL,NULL,20,35,'2024-03-29 01:30:46.548349','01011111233','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','D205팀원','경북 구미시 개화길 4','https://lh3.googleusercontent.com/a/ACg8ocL8ITaPSyYMQ_monUKmtWCEUIFa6Z6cGLIvTFpeIoA=s96-c','ssafy.jeonghw4n@gmail.com','USER'),(1,150,_binary '\0',0,0,60,2017,'2024-03-29 01:30:01.819054',NULL,NULL,27,36,'2024-03-29 01:34:41.450909','01055555555','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','안녕','경북 구미시 금오산로22길 23-1','https://lh3.googleusercontent.com/a/ACg8ocIVhI2P880mIbkcvvFy2Q4FeWlE4mr6CuO0ywnuCNh4=s96-c','cnn482@gmail.com','USER'),(0,60,_binary '\0',0,0,4,2016,'2024-03-29 01:30:04.785405',NULL,NULL,19,37,'2024-03-29 01:30:32.162913','01012341234','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','찹쌀도어','경북 구미시 도봉로 8','https://lh3.googleusercontent.com/a/ACg8ocK0JZgDtcE1F19PeGEIRaglD4hnqgOV4koiwVWmSHNNCg=s96-c','remarkmin1095@gmail.com','USER'),(1,156,_binary '\0',0,0,60,1994,'2024-03-29 01:30:22.186990',NULL,NULL,22,38,'2024-03-29 10:37:37.000000','01093322945','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','방구쟁이','경북 구미시 인동중앙로5길 28-33','https://lh3.googleusercontent.com/a/ACg8ocIuFWCDy_TczTVrOshdvavfG51sENQTOm-46xY31u23=s96-c','jwchoi.v1@gmail.com','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:30:38.452435',NULL,NULL,NULL,39,'2024-03-29 01:30:38.452435',NULL,NULL,NULL,NULL,'구미_1반_이우성',NULL,'https://lh3.googleusercontent.com/a/ACg8ocIYpK_YqG0IjyNJp0FXeVsHPe1p1fWNtyREASPchDVjkg=s96-c','useong1996@gmail.com','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:30:39.475420',NULL,NULL,NULL,40,'2024-03-29 01:30:39.475420',NULL,NULL,NULL,NULL,'이정민',NULL,'https://lh3.googleusercontent.com/a/ACg8ocIiQy7iZQw99uyC-LWvkr87W53Yysfb9-G3_zRtaDnD=s96-c','bona4936@gmail.com','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:30:41.443519',NULL,NULL,NULL,41,'2024-03-29 01:30:41.443519',NULL,NULL,NULL,NULL,'_',NULL,'https://lh3.googleusercontent.com/a/ACg8ocKu2IZrhlrTxbHGspjRvT_pqFI3QTq0G2newhGwcEnP=s96-c','m9ovo7@gmail.com','USER'),(1,190,_binary '\0',0,0,90,2024,'2024-03-29 01:30:55.095614',NULL,NULL,23,42,'2024-03-29 01:31:42.171569','01012345678','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','슬쨩','경북 구미시 3공단3로 302','https://lh3.googleusercontent.com/a/ACg8ocK70v55tdMNVkuKFMGKFv54UI70Mp898nuykH63d5pb=s96-c','0812dmsgk@gmail.com','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:31:23.872101',NULL,NULL,NULL,43,'2024-03-29 01:31:23.872101',NULL,NULL,NULL,NULL,'콜콜먼니',NULL,'https://lh3.googleusercontent.com/a/ACg8ocKi9WfF3s-bAUNml7ujB21XTGyvI5jhASefMUSPXZw1vw=s96-c','s2s2s2x101@gmail.com','USER'),(0,175,_binary '\0',0,0,57,1998,'2024-03-29 01:31:56.370078',NULL,NULL,24,44,'2024-03-29 01:32:21.630906','01047561803','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','우건','경기 광명시 오리로 801','https://lh3.googleusercontent.com/a/ACg8ocLEWjPSQssJ2xRWcOfGUko9eSqb6uoRprZKJhrnt5ZP=s96-c','bome00519@gmail.com','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:32:29.707108',NULL,NULL,NULL,45,'2024-03-29 01:32:29.707108',NULL,NULL,NULL,NULL,'근렬_SSAFY',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJRjPz3RuozoPlqW9gdejxkrk3EsWqx2JOYbER_e8le3g=s96-c','bs5524137@gmail.com','USER'),(0,181,_binary '\0',0,0,80,1997,'2024-03-29 01:32:33.916824',NULL,NULL,25,46,'2024-03-29 01:33:15.137452','010-7631-9702','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','annoymous','경북 구미시 인동중앙로2길 14','https://lh3.googleusercontent.com/a/ACg8ocJop3gcTuQFGPgBSq5DaPfIyKGSIKKf_Z1yUjZnB1J87Ic=s96-c','allmin9702@gmail.com','USER'),(1,163,_binary '\0',0,0,52,1999,'2024-03-29 01:32:50.499872',NULL,NULL,26,47,'2024-03-29 11:49:44.000000','01022507061','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','희원','경북 구미시 진평2길 65','https://lh3.googleusercontent.com/a/ACg8ocKGEiNZUZJrp-07wq8DnvHQqBzuSIhu5U3i5YLfUwoalA=s96-c','h27052440@gmail.com','USER'),(0,123,_binary '\0',0,0,321,2024,'2024-03-29 01:34:50.849726',NULL,NULL,29,48,'2024-03-29 11:48:04.000000','01045353453','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','수달','경기 성남시 분당구 대왕판교로606번길 45','https://lh3.googleusercontent.com/a/ACg8ocL-shCxWjvWh2MbPgFauCWFGzh2gwXSRELLQyfOcIv8=s96-c','cbgbg0727@knu.ac.kr','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:38:17.079867',NULL,NULL,NULL,49,'2024-03-29 01:38:17.079867',NULL,NULL,NULL,NULL,'효주',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJE1AfxfKHhVWAXPtjrdQ64dTPR-Ah8NSdPh0zQd0ru=s96-c','hyojukim.dev@gmail.com','USER'),(NULL,0,_binary '\0',0,0,0,NULL,'2024-03-29 01:40:05.097785',NULL,NULL,NULL,50,'2024-03-29 01:40:05.097785',NULL,NULL,NULL,NULL,'이준서',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJskJcDjbf46qFRePK3B9aSNy0zpIanAykGGz1X1VZQ=s96-c','wnstj1799@gmail.com','USER'),(1,120,_binary '\0',0,0,11,2008,'2024-03-29 01:40:26.358596',NULL,NULL,30,51,'2024-03-29 01:41:03.298173','01088737660','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','레전드바지','경북 구미시 진평2길 25','https://lh3.googleusercontent.com/a/ACg8ocIQYKefzHeMNi2fpAIOWZOv10m2bGcXVKKGSnRgtH_hsg=s96-c','01088737660b@gmail.com','USER'),(0,165,_binary '\0',0,0,65,2016,'2024-03-29 02:13:10.663421',NULL,NULL,35,52,'2024-04-03 01:25:18.000000','01000000000','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','q','서울 동대문구 경동시장로 1','https://lh3.googleusercontent.com/a/ACg8ocLdbsf-GnSsEa_MZx2k6JG1hwbSzVm3ffBYO0p__Lrj=s96-c','tkatpgus19@tukorea.ac.kr','USER'),(1,148,_binary '\0',0,0,50,1998,'2024-03-29 10:11:42.986212',NULL,NULL,31,53,'2024-03-29 10:12:48.305867','01062024298','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','슈크림','경북 구미시 인동가산로 337-7','https://lh3.googleusercontent.com/a/ACg8ocK_4yxuESkqAcDfHjRZHDBwXxy6GsqWjGwq1CsQUOThtpI=s96-c','ksb981703@gmail.com','USER'),(1,1,_binary '\0',0,0,1,2018,'2024-03-29 14:57:40.626488',NULL,NULL,32,54,'2024-04-02 09:01:48.260986','01049503777','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','귤귤','서울 강남구 논현로111길 3','https://lh3.googleusercontent.com/a/ACg8ocInvJhsXbnd2CpVU0ENtfXyuF0OIpdhy9lCpxrVIu-g=s96-c','prote07023@gmail.com','USER'),(1,162.4,_binary '\0',0,0,50.5,1998,'2024-03-29 16:16:57.738305',NULL,NULL,33,55,'2024-04-02 17:19:13.000000','01037508731','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','챈','경북 구미시 진평2길 5-4','https://lh3.googleusercontent.com/a/ACg8ocLezZAEbc2fBu4h-NlgGH_P9Msabn7zMHyWLdQrnWyZBlk=s96-c','duggi1118@gmail.com','USER'),(1,165,_binary '\0',0,0,65,1994,'2024-03-30 07:09:15.681142',NULL,NULL,34,56,'2024-04-02 22:33:30.000000','01000000000','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','모짜렐라','경북 구미시 진평2길 65-1','https://lh3.googleusercontent.com/a/ACg8ocLITxpQj8KB3Ikhx7JX-tDhWB6H-MYnYG4RiYk9WTm94w=s96-c','pokiii0201@gmail.com','USER'),(1,165,_binary '\0',0,0,65,2016,'2024-04-01 00:09:52.862893',NULL,NULL,36,57,'2024-04-02 08:59:59.053482','01000000000','gray','','https://d210.s3.ap-northeast-2.amazonaws.com/test_badge.png','귤규류규류류귤','서울 강북구 4.19로11길 6','https://lh3.googleusercontent.com/a/ACg8ocIw5VIqTvEKhNPOYvBR2uD5gdysbM3wUmZ-t6yUoW8=s96-c','rlarbfl0702@gmail.com','USER');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission`
--

DROP TABLE IF EXISTS `mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission` (
  `period` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `exercise_minute` bigint(20) NOT NULL,
  `mission_id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`mission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission`
--

LOCK TABLES `mission` WRITE;
/*!40000 ALTER TABLE `mission` DISABLE KEYS */;
INSERT INTO `mission` VALUES (28,'2024-04-02 07:57:14.716755',5,10),(28,'2024-04-02 08:55:58.628377',10,11);
/*!40000 ALTER TABLE `mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `is_checked` bit(1) NOT NULL,
  `noti_content` varchar(255) NOT NULL,
  `noti_type` enum('FRIEND','EXERCISE','HALLEY_GALLEY','VOICE') NOT NULL,
  `receiver_id` bigint(20) NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `FKkbqpyebggaurukd030b8lkxlf` (`receiver_id`),
  KEY `FKjc6i3xr1hwnivyh85qswtadf5` (`sender_id`),
  CONSTRAINT `FKjc6i3xr1hwnivyh85qswtadf5` FOREIGN KEY (`sender_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKkbqpyebggaurukd030b8lkxlf` FOREIGN KEY (`receiver_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=248 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (222,'2024-04-02 08:55:26.589670',_binary '','q님으로 부터 할리 수락 요청이 도착했습니다','HALLEY_GALLEY',2,52),(223,'2024-04-02 08:55:36.000263',_binary '','q님으로 부터 할리 수락 요청이 도착했습니다','HALLEY_GALLEY',2,52),(229,'2024-04-02 15:20:52.053404',_binary '\0','나는최고야님으로부터 친구 요청이 왔습니다','FRIEND',54,15),(230,'2024-04-02 15:27:23.954232',_binary '\0','ZI존최강세현님으로부터 친구 요청이 왔습니다','FRIEND',54,2),(231,'2024-04-02 15:27:42.941005',_binary '\0','귤귤님으로부터 친구 요청이 왔습니다','FRIEND',2,54),(232,'2024-04-02 15:43:24.716184',_binary '\0','ZI존최강세현님으로부터 친구 요청이 왔습니다','FRIEND',15,2),(233,'2024-04-03 01:00:07.715147',_binary '\0','ZI존최강세현님으로부터 친구 요청이 왔습니다','FRIEND',52,2),(234,'2024-04-03 01:12:35.912585',_binary '\0','q님으로부터 친구 요청이 왔습니다','FRIEND',2,52),(235,'2024-04-03 01:12:48.558816',_binary '\0','ZI존최강세현님으로부터 친구 요청이 왔습니다','FRIEND',52,2),(236,'2024-04-03 01:16:00.249556',_binary '\0','ZI존최강세현님으로부터 친구 요청이 왔습니다','FRIEND',52,2),(237,'2024-04-03 01:16:12.193470',_binary '\0','q님으로부터 친구 요청이 왔습니다','FRIEND',2,52),(238,'2024-04-03 01:16:28.650149',_binary '\0','ZI존최강세현님으로 부터 할리 수락 요청이 도착했습니다','HALLEY_GALLEY',52,2),(239,'2024-04-03 01:16:49.708331',_binary '\0','ZI존최강세현님으로 부터 할리 수락 요청이 도착했습니다','HALLEY_GALLEY',52,2),(240,'2024-04-02 16:25:28.314708',_binary '','q님으로부터 친구 요청이 왔습니다','FRIEND',2,52),(241,'2024-04-02 16:25:49.139329',_binary '\0','ZI존최강세현님으로부터 친구 요청이 왔습니다','FRIEND',52,2),(242,'2024-04-02 16:26:05.918773',_binary '\0','q님으로부터 친구 요청이 왔습니다','FRIEND',2,52),(243,'2024-04-02 16:32:31.565899',_binary '\0','ZI존최강세현님으로부터 친구 요청이 왔습니다','FRIEND',52,2),(244,'2024-04-02 16:36:28.032781',_binary '\0','q님으로부터 친구 요청이 왔습니다','FRIEND',2,52),(245,'2024-04-02 20:17:47.618138',_binary '\0','q님으로부터 친구 요청이 왔습니다','FRIEND',2,52),(246,'2024-04-03 00:38:37.711085',_binary '\0','q님으로부터 친구 요청이 왔습니다','FRIEND',2,52),(247,'2024-04-03 01:14:50.069126',_binary '\0','인생...?님으로부터 친구 요청이 왔습니다','FRIEND',55,3);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `total_amount` int(11) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  `payment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cid` varchar(255) DEFAULT NULL,
  `partner_order_id` varchar(255) DEFAULT NULL,
  `partner_user_id` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `is_approve` bit(1) DEFAULT NULL,
  `tid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `FK6ku464659txpdewdlmbxboxek` (`member_id`),
  CONSTRAINT `FK6ku464659txpdewdlmbxboxek` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1000,55,1,'TC0ONETIME','walkwalk','h_chaenn','2024-04-02 12:58:09.893008',_binary '','T60b82514510678bb42f'),(1000,55,2,'TC0ONETIME','walkwalk','h_chaenn','2024-04-02 15:01:15.533686',_binary '','T60b9f2b65886da98ae4');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `server_blockchain_account`
--

DROP TABLE IF EXISTS `server_blockchain_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `server_blockchain_account` (
  `server_account_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chain_id` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL,
  `eoa` longtext NOT NULL,
  `key_id` longtext NOT NULL,
  `krn` longtext NOT NULL,
  `public_key` longtext NOT NULL,
  `updated_at` varchar(255) NOT NULL,
  PRIMARY KEY (`server_account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `server_blockchain_account`
--

LOCK TABLES `server_blockchain_account` WRITE;
/*!40000 ALTER TABLE `server_blockchain_account` DISABLE KEYS */;
INSERT INTO `server_blockchain_account` VALUES (1,'1001','1711589524','0xBC627857D45B5b4f4920839909f7220f55dA453E','krn:1001:wallet:751d0e5f-7444-4037-83d8-5042e89e9029:account-pool:default:0x90c35e28e90d56ef21472188bd9d761479b27a83ef63fc13ecd9b2361e035ad5','krn:1001:wallet:751d0e5f-7444-4037-83d8-5042e89e9029:account-pool:default','0x04c77faf47de132ba1bacaa8dd62b9f4b69f5bf5a6b41633a38f1b3d1922eaf655fa18c94e35f18ea5251973f2b89d52b2741caea8eb9ab12bd00fca2572239ad1','1711589524');
/*!40000 ALTER TABLE `server_blockchain_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voice_message`
--

DROP TABLE IF EXISTS `voice_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voice_message` (
  `is_opened` bit(1) DEFAULT b'0',
  `created_at` datetime(6) NOT NULL,
  `receiver` bigint(20) NOT NULL,
  `sender` bigint(20) NOT NULL,
  `voice_message_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `voice_addr` varchar(255) NOT NULL,
  `msg_type` enum('VOICE','TTS') DEFAULT NULL,
  PRIMARY KEY (`voice_message_id`),
  KEY `FKjtj3qydrsfd2spnpvdygostle` (`receiver`),
  KEY `FKmr1yfxptptdlr8x851jmlijrl` (`sender`),
  CONSTRAINT `FKjtj3qydrsfd2spnpvdygostle` FOREIGN KEY (`receiver`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKmr1yfxptptdlr8x851jmlijrl` FOREIGN KEY (`sender`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=748 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voice_message`
--

LOCK TABLES `voice_message` WRITE;
/*!40000 ALTER TABLE `voice_message` DISABLE KEYS */;
INSERT INTO `voice_message` VALUES (_binary '','2024-03-28 02:00:59.250498',1,1,1,'ㅇㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 02:03:04.498377',1,1,2,'ㅇㄹㅇㅇㄹㄹ','','TTS'),(_binary '','2024-03-28 02:03:17.807111',1,1,3,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 02:03:20.454239',1,1,4,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 02:07:03.009812',1,1,5,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 02:07:13.298278',1,1,6,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 02:07:16.052159',1,1,7,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 02:18:11.048872',1,1,8,'','','TTS'),(_binary '','2024-03-28 02:19:10.065021',1,1,9,'','','TTS'),(_binary '','2024-03-28 09:47:32.673222',1,1,10,'안녕하세요 ','','TTS'),(_binary '','2024-03-28 09:47:39.424467',1,1,11,'안녕하세요','','TTS'),(_binary '','2024-03-28 09:51:40.101740',1,1,12,'','','TTS'),(_binary '','2024-03-28 09:59:52.000967',1,1,13,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 10:00:19.299193',1,1,14,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 10:03:39.439339',1,1,15,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 10:03:56.324339',1,1,16,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 10:04:36.701941',1,1,17,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 10:05:24.208923',1,1,18,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 10:06:42.794993',1,1,19,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 10:38:29.554823',1,1,20,'ddd','','TTS'),(_binary '','2024-03-28 10:38:45.007783',1,1,21,'hhh','','TTS'),(_binary '','2024-03-28 10:38:47.082368',1,1,22,'ggg','','TTS'),(_binary '','2024-03-28 10:45:01.923079',1,1,23,'안녕하세요 ','','TTS'),(_binary '','2024-03-28 10:47:29.857794',1,1,24,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 13:38:52.744403',1,1,25,'dddd','','TTS'),(_binary '','2024-03-28 13:40:11.937398',1,1,26,'dddd','','TTS'),(_binary '','2024-03-28 13:40:23.919740',1,1,27,'ddd','','TTS'),(_binary '','2024-03-28 13:58:57.011422',1,1,28,'ㅇㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:00:12.227182',1,1,29,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:00:38.247630',1,1,30,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:01:34.752997',1,1,31,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:02:01.192920',1,1,32,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:12:55.824465',1,1,33,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:14:46.177061',1,1,34,'ㅋㅋ','','TTS'),(_binary '','2024-03-28 14:14:56.915233',1,1,35,'ㅋㅋㅋㅋㅋ','','TTS'),(_binary '','2024-03-28 14:26:28.926370',1,1,36,'오죠 사마','','TTS'),(_binary '','2024-03-28 14:28:57.123091',1,1,37,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:35:18.103076',1,1,38,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:35:21.258468',1,1,39,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:35:24.446692',1,1,40,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:35:28.334437',1,1,41,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:36:49.905821',1,1,42,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:36:55.345080',1,1,43,'안녕','','TTS'),(_binary '','2024-03-28 14:37:27.029414',1,1,44,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:37:28.193197',1,1,45,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:37:29.858960',1,1,46,'ㄴㄴㄴ','','TTS'),(_binary '','2024-03-28 14:37:31.892243',1,1,47,'ㅈㅈㄷㄷㅈ','','TTS'),(_binary '','2024-03-28 14:42:07.054905',1,1,48,'ㅇㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:43:09.643745',1,1,49,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:43:13.439421',1,1,50,'ㄴㄴㄴㄴ','','TTS'),(_binary '','2024-03-28 14:45:12.803526',1,1,51,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:46:45.647887',1,1,52,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:50:01.143914',1,1,53,'','','TTS'),(_binary '','2024-03-28 14:50:04.583155',1,1,54,'','','TTS'),(_binary '','2024-03-28 14:50:58.395568',1,1,55,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:51:28.448070',1,1,56,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:53:09.168004',1,1,57,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:53:40.880472',1,1,58,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:55:07.398931',1,1,59,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:55:31.655233',1,1,60,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:55:47.250422',1,1,61,'ㅇㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:56:15.401621',1,1,62,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:56:20.280857',1,1,63,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:56:55.698755',1,1,64,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:57:21.714496',1,1,65,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:57:46.564813',1,1,66,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 14:58:53.985515',1,1,67,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:00:05.083501',1,1,68,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:00:25.753705',1,1,69,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:04:04.119528',1,1,70,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:04:06.043287',1,1,71,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:04:34.235255',1,1,72,'ㄴㄴㄴ','','TTS'),(_binary '','2024-03-28 15:04:36.635005',1,1,73,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:04:41.994345',1,1,74,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:07:10.362863',1,1,75,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:07:23.121234',1,1,76,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:07:33.611553',1,1,77,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:07:34.865625',1,1,78,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:09:23.889658',1,1,79,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:09:30.499777',1,1,80,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:09:39.857333',1,1,81,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:09:41.635439',1,1,82,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:11:08.833225',1,1,83,'굿','','TTS'),(_binary '','2024-03-28 15:12:33.514770',1,1,84,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:12:52.536551',1,1,85,'ㅇㅇ','','TTS'),(_binary '','2024-03-28 15:12:55.909193',1,1,86,'ㅇㅇ','','TTS'),(_binary '','2024-03-28 15:15:47.104042',1,1,87,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:15:48.697331',1,1,88,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:15:50.164135',1,1,89,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:18:23.590472',1,1,90,'ddd','','TTS'),(_binary '','2024-03-28 15:18:29.794110',1,1,91,'ddd','','TTS'),(_binary '','2024-03-28 15:18:48.962093',1,1,92,'ddd','','TTS'),(_binary '','2024-03-28 15:19:13.710439',1,1,93,'ddd','','TTS'),(_binary '','2024-03-28 15:19:16.361197',1,1,94,'ddd','','TTS'),(_binary '','2024-03-28 15:20:18.986565',1,1,95,'dd','','TTS'),(_binary '','2024-03-28 15:22:37.658588',1,1,96,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:22:57.590682',1,1,97,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:22:59.141708',1,1,98,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:23:00.404780',1,1,99,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:23:01.569673',1,1,100,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:34:24.547063',1,1,101,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:34:34.028646',1,1,102,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:42:09.404871',1,1,103,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:46:31.737573',1,1,104,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:51:34.316134',1,1,105,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:51:52.369055',1,1,106,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:53:14.602971',1,1,107,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:53:16.080113',1,1,108,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:53:33.204368',1,1,109,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:57:03.224279',1,1,110,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 15:57:47.219882',1,1,111,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 16:06:15.736414',1,1,112,'ddd','','TTS'),(_binary '','2024-03-28 16:06:22.911471',1,1,113,'','','TTS'),(_binary '','2024-03-28 16:24:11.186099',1,1,114,'dddd','','TTS'),(_binary '','2024-03-28 16:38:12.019292',1,1,115,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/94032f2a-a374-4787-b6b3-7967e0eecb0b','VOICE'),(_binary '','2024-03-28 16:41:38.633172',1,1,116,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/5ea57673-3dde-4397-8267-7b73d518df05','VOICE'),(_binary '','2024-03-28 16:41:43.959383',1,1,117,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 16:41:45.801704',1,1,118,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 16:41:47.482266',1,1,119,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 16:44:18.932192',1,1,120,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-28 16:49:24.410786',1,1,121,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/051b71ec-0e51-4444-ac58-cb0f3e62a58f','VOICE'),(_binary '','2024-03-28 16:49:58.070482',1,1,122,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/5c29defd-ed54-4c82-a222-6a9cb35d01cc','VOICE'),(_binary '','2024-03-28 16:50:34.665949',1,1,123,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/67ea38f2-ecd2-43a7-b057-de39d189cd26','VOICE'),(_binary '','2024-03-28 19:38:58.965922',1,1,124,'','','TTS'),(_binary '','2024-03-28 19:39:01.423952',1,1,125,'zzzz','','TTS'),(_binary '','2024-03-28 19:39:11.995844',1,1,126,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/4b72d7d9-0cf2-4a7e-b136-5d7bb7d4f50a','VOICE'),(_binary '','2024-03-28 19:39:23.346420',1,1,127,'ddd','','TTS'),(_binary '','2024-03-28 19:39:30.245158',1,1,128,'ddd','','TTS'),(_binary '','2024-03-29 01:07:27.796729',1,1,129,'ddddf','','TTS'),(_binary '','2024-03-29 01:07:45.859316',1,1,130,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/9c9756ce-17c9-4291-a668-eaf4131d4f45','VOICE'),(_binary '','2024-03-29 01:09:49.141695',1,1,131,'전수민씨','','TTS'),(_binary '','2024-03-29 01:09:55.381744',1,1,132,'보이시나요','','TTS'),(_binary '','2024-03-29 01:10:20.463096',1,1,133,'ㅇㅇㅇㅇㄹㅗ쇼ㅛㅅ쇼ㅇㄹㅇ','','TTS'),(_binary '','2024-03-29 01:10:23.446162',1,1,134,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-29 01:10:33.391969',1,1,135,'뭘 안 킨거길래 안 갔어','','TTS'),(_binary '','2024-03-29 01:26:35.009680',1,1,136,'.','','TTS'),(_binary '','2024-03-29 01:26:35.655646',1,1,137,'','','TTS'),(_binary '','2024-03-29 01:26:35.854860',1,1,138,'.','','TTS'),(_binary '','2024-03-29 01:26:35.984528',1,1,139,'.','','TTS'),(_binary '','2024-03-29 01:26:36.137869',1,1,140,'.','','TTS'),(_binary '','2024-03-29 01:26:36.289619',1,1,141,'.','','TTS'),(_binary '','2024-03-29 01:26:36.439801',1,1,142,'.','','TTS'),(_binary '','2024-03-29 01:26:36.591504',1,1,143,'.','','TTS'),(_binary '','2024-03-29 01:26:36.741028',1,1,144,'.','','TTS'),(_binary '','2024-03-29 01:26:36.867987',1,1,145,'.','','TTS'),(_binary '','2024-03-29 01:26:37.018854',1,1,146,'.','','TTS'),(_binary '','2024-03-29 01:26:37.197601',1,1,147,'','','TTS'),(_binary '','2024-03-29 01:26:37.334288',1,1,148,'.','','TTS'),(_binary '','2024-03-29 01:26:40.363273',1,1,149,'fgdfg','','TTS'),(_binary '','2024-03-29 01:26:44.493460',1,1,150,'.','','TTS'),(_binary '','2024-03-29 01:26:44.679103',1,1,151,'.','','TTS'),(_binary '','2024-03-29 01:26:44.867229',1,1,152,'.','','TTS'),(_binary '','2024-03-29 01:26:46.908869',1,1,153,'1','','TTS'),(_binary '','2024-03-29 01:26:47.251653',1,1,154,'2','','TTS'),(_binary '','2024-03-29 01:26:47.527953',1,1,155,'3','','TTS'),(_binary '','2024-03-29 01:26:47.710969',1,1,156,'4','','TTS'),(_binary '','2024-03-29 01:26:47.922252',1,1,157,'5','','TTS'),(_binary '','2024-03-29 01:26:48.145566',1,1,158,'6','','TTS'),(_binary '','2024-03-29 01:26:48.377805',1,1,159,'7','','TTS'),(_binary '','2024-03-29 01:26:48.564825',1,1,160,'8','','TTS'),(_binary '','2024-03-29 01:27:14.401252',1,1,161,'안녕','','TTS'),(_binary '','2024-03-29 01:27:15.506135',1,1,162,'하쇼','','TTS'),(_binary '','2024-03-29 01:27:31.940432',1,1,163,'ㅎㅇㅎㅇ','','TTS'),(_binary '','2024-03-29 01:27:38.429714',1,1,164,'ㅋㅋ','','TTS'),(_binary '','2024-03-29 01:29:43.601713',1,1,165,'dd','','TTS'),(_binary '','2024-03-29 01:29:51.200336',1,1,166,'dfadfef','','TTS'),(_binary '','2024-03-29 01:31:48.193933',1,1,167,'전수민씨','','TTS'),(_binary '','2024-03-29 01:31:50.235874',1,1,168,'잘 들리세요?','','TTS'),(_binary '','2024-03-29 01:31:52.274077',1,1,169,'잘 들리냐고요','','TTS'),(_binary '','2024-03-29 01:31:55.396604',1,1,170,'전수민씨','','TTS'),(_binary '','2024-03-29 01:31:57.044571',1,1,171,'전수민씨','','TTS'),(_binary '','2024-03-29 01:32:20.475311',1,1,172,'안녕','','TTS'),(_binary '','2024-03-29 01:32:24.672913',1,1,173,'수민아 안녕','','TTS'),(_binary '','2024-03-29 01:32:30.927193',1,1,174,'대답해줘','','TTS'),(_binary '','2024-03-29 01:33:37.790010',1,1,175,'수빈아','','TTS'),(_binary '','2024-03-29 01:33:41.490337',1,1,176,'뭐야','','TTS'),(_binary '','2024-03-29 01:33:41.984513',1,1,177,'이거','','TTS'),(_binary '','2024-03-29 01:33:43.184788',1,1,178,'이상해','','TTS'),(_binary '','2024-03-29 01:33:44.844193',1,1,179,'수민이가 아니고 수비닝구나','','TTS'),(_binary '','2024-03-29 01:33:45.812770',1,1,180,'ㅋ','','TTS'),(_binary '','2024-03-29 01:33:49.574541',1,1,181,'김대영','','TTS'),(_binary '','2024-03-29 01:33:51.221847',1,1,182,'멍청아','','TTS'),(_binary '','2024-03-29 01:33:52.247393',1,1,183,'김대영','','TTS'),(_binary '','2024-03-29 01:33:53.265161',1,1,184,'김대영','','TTS'),(_binary '','2024-03-29 01:33:54.285049',1,1,185,'김대영','','TTS'),(_binary '','2024-03-29 01:33:55.125531',1,1,186,'뭘봐','','TTS'),(_binary '','2024-03-29 01:33:55.184350',1,1,187,'김대영','','TTS'),(_binary '','2024-03-29 01:33:55.994985',1,1,188,'김대영','','TTS'),(_binary '','2024-03-29 01:33:56.570352',1,1,189,'ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ','','TTS'),(_binary '','2024-03-29 01:33:56.766298',1,1,190,'.socket','','TTS'),(_binary '','2024-03-29 01:33:57.136715',1,1,191,'김대영','','TTS'),(_binary '','2024-03-29 01:33:57.615757',1,1,192,'야','','TTS'),(_binary '','2024-03-29 01:33:58.008612',1,1,193,'야','','TTS'),(_binary '','2024-03-29 01:33:58.423523',1,1,194,'야','','TTS'),(_binary '','2024-03-29 01:33:58.846231',1,1,195,'야','','TTS'),(_binary '','2024-03-29 01:33:59.235294',1,1,196,'야','','TTS'),(_binary '','2024-03-29 01:33:59.295589',1,1,197,'김대영 바보','','TTS'),(_binary '','2024-03-29 01:33:59.866203',1,1,198,'양','','TTS'),(_binary '','2024-03-29 01:34:08.127077',1,1,199,'ㅁㄴㅇㅁㄴㅇ','','TTS'),(_binary '','2024-03-29 01:34:36.527183',1,1,200,'김진영 바보','','TTS'),(_binary '','2024-03-29 01:34:43.620334',1,1,201,'오디오파일도 ','','TTS'),(_binary '','2024-03-29 01:34:45.287264',1,1,202,'넣어보십쇼','','TTS'),(_binary '','2024-03-29 01:34:55.592645',1,1,203,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/1ed0d7fb-f336-45c7-9c65-760278d647c0','VOICE'),(_binary '','2024-03-29 01:35:02.885974',1,1,204,',,','','TTS'),(_binary '','2024-03-29 01:35:03.243448',1,1,205,',','','TTS'),(_binary '','2024-03-29 01:35:03.436318',1,1,206,',','','TTS'),(_binary '','2024-03-29 01:35:03.604924',1,1,207,',','','TTS'),(_binary '','2024-03-29 01:35:03.758683',1,1,208,',','','TTS'),(_binary '','2024-03-29 01:35:03.903405',1,1,209,',','','TTS'),(_binary '','2024-03-29 01:35:04.057174',1,1,210,',','','TTS'),(_binary '','2024-03-29 01:35:04.204034',1,1,211,',','','TTS'),(_binary '','2024-03-29 01:35:04.486734',1,1,212,',,','','TTS'),(_binary '','2024-03-29 01:35:04.829974',1,1,213,',,','','TTS'),(_binary '','2024-03-29 01:35:08.395325',1,1,214,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/dbd37efc-c5c5-4ec0-94f9-5207abca416c','VOICE'),(_binary '','2024-03-29 01:35:11.818533',1,1,215,'?','','TTS'),(_binary '','2024-03-29 01:35:17.216739',1,1,216,'공공서버인가보네요','','TTS'),(_binary '','2024-03-29 01:35:34.581561',1,1,217,'아 이거 채팅인가?','','TTS'),(_binary '','2024-03-29 01:35:37.924718',1,1,218,'오 정답','','TTS'),(_binary '','2024-03-29 01:35:46.068907',1,1,219,'db에 기록다 저장되나요','','TTS'),(_binary '','2024-03-29 01:35:49.283615',1,1,220,'아니멶 휘발성인가요','','TTS'),(_binary '','2024-03-29 01:35:50.612531',1,1,221,'오..','','TTS'),(_binary '','2024-03-29 01:35:55.609322',1,1,222,'ㅣ','','TTS'),(_binary '','2024-03-29 01:35:56.164449',1,1,223,'','','TTS'),(_binary '','2024-03-29 01:35:56.532175',1,1,224,'ㅡ','','TTS'),(_binary '','2024-03-29 01:35:56.803618',1,1,225,'ㅡ','','TTS'),(_binary '','2024-03-29 01:35:57.062940',1,1,226,'ㅡ','','TTS'),(_binary '','2024-03-29 01:35:59.715005',1,1,227,'으앗','','TTS'),(_binary '','2024-03-29 01:36:00.980780',1,1,228,'테스트','','TTS'),(_binary '','2024-03-29 01:36:08.649172',1,1,229,'콜','','TTS'),(_binary '','2024-03-29 01:36:12.546346',1,1,230,'','','TTS'),(_binary '','2024-03-29 01:36:17.706271',1,1,231,'','','TTS'),(_binary '','2024-03-29 01:36:19.168429',1,1,232,'','','TTS'),(_binary '','2024-03-29 01:36:20.409029',1,1,233,'','','TTS'),(_binary '','2024-03-29 01:36:22.984622',1,1,234,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/a4e95e52-324b-4121-ad1a-3aa7dfa8c1e4','VOICE'),(_binary '','2024-03-29 01:36:24.081915',1,1,235,' ','','TTS'),(_binary '','2024-03-29 01:36:24.258306',1,1,236,' ','','TTS'),(_binary '','2024-03-29 01:36:24.439919',1,1,237,' ','','TTS'),(_binary '','2024-03-29 01:36:24.588246',1,1,238,' ','','TTS'),(_binary '','2024-03-29 01:36:24.639537',1,1,239,'','','TTS'),(_binary '','2024-03-29 01:36:24.738339',1,1,240,' ','','TTS'),(_binary '','2024-03-29 01:36:24.859891',1,1,241,' ','','TTS'),(_binary '','2024-03-29 01:36:25.009732',1,1,242,' ','','TTS'),(_binary '','2024-03-29 01:36:25.159033',1,1,243,' ','','TTS'),(_binary '','2024-03-29 01:36:25.309793',1,1,244,' ','','TTS'),(_binary '','2024-03-29 01:36:25.459851',1,1,245,'','','TTS'),(_binary '','2024-03-29 01:36:25.581077',1,1,246,' ','','TTS'),(_binary '','2024-03-29 01:36:26.362981',1,1,247,'','','TTS'),(_binary '','2024-03-29 01:36:26.499184',1,1,248,'','','TTS'),(_binary '','2024-03-29 01:36:27.716446',1,1,249,'12','','TTS'),(_binary '','2024-03-29 01:36:29.603578',1,1,250,'','','TTS'),(_binary '','2024-03-29 01:36:29.753863',1,1,251,'','','TTS'),(_binary '','2024-03-29 01:36:30.803046',1,1,252,'  ','','TTS'),(_binary '','2024-03-29 01:36:30.918907',1,1,253,' ','','TTS'),(_binary '','2024-03-29 01:36:31.069175',1,1,254,' ','','TTS'),(_binary '','2024-03-29 01:36:31.188556',1,1,255,' ','','TTS'),(_binary '','2024-03-29 01:36:31.338323',1,1,256,' ','','TTS'),(_binary '','2024-03-29 01:36:31.461778',1,1,257,'','','TTS'),(_binary '','2024-03-29 01:36:31.611699',1,1,258,' ','','TTS'),(_binary '','2024-03-29 01:36:31.763141',1,1,259,' ','','TTS'),(_binary '','2024-03-29 01:36:31.881979',1,1,260,' ','','TTS'),(_binary '','2024-03-29 01:36:32.062030',1,1,261,' ','','TTS'),(_binary '','2024-03-29 01:36:32.178677',1,1,262,' ','','TTS'),(_binary '','2024-03-29 01:36:32.329628',1,1,263,' ','','TTS'),(_binary '','2024-03-29 01:36:32.479373',1,1,264,' ','','TTS'),(_binary '','2024-03-29 01:36:32.658799',1,1,265,' ','','TTS'),(_binary '','2024-03-29 01:36:32.931252',1,1,266,'  ','','TTS'),(_binary '','2024-03-29 01:36:33.050827',1,1,267,' ','','TTS'),(_binary '','2024-03-29 01:36:33.230059',1,1,268,' ','','TTS'),(_binary '','2024-03-29 01:36:33.350768',1,1,269,' ','','TTS'),(_binary '','2024-03-29 01:36:37.309230',1,1,270,'도배 그만해다오..','','TTS'),(_binary '','2024-03-29 01:36:38.419938',1,1,271,'나 김진영인데 이거 나 맞다','','TTS'),(_binary '','2024-03-29 01:36:43.338638',1,1,272,'뭐냐..','','TTS'),(_binary '','2024-03-29 01:36:44.361872',1,1,273,' ','','TTS'),(_binary '','2024-03-29 01:36:44.508864',1,1,274,' ','','TTS'),(_binary '','2024-03-29 01:36:44.659002',1,1,275,' ','','TTS'),(_binary '','2024-03-29 01:36:44.810233',1,1,276,' ','','TTS'),(_binary '','2024-03-29 01:36:44.959136',1,1,277,' ','','TTS'),(_binary '','2024-03-29 01:36:45.109762',1,1,278,' ','','TTS'),(_binary '','2024-03-29 01:36:45.259983',1,1,279,'','','TTS'),(_binary '','2024-03-29 01:36:48.724352',1,1,280,'오 이거','','TTS'),(_binary '','2024-03-29 01:36:54.744232',1,1,281,'아하','','TTS'),(_binary '','2024-03-29 01:38:30.711695',1,1,282,'ㅎㅇ','','TTS'),(_binary '','2024-03-29 01:38:31.544394',1,1,283,'ㅎㅇ','','TTS'),(_binary '','2024-03-29 01:38:32.063710',1,1,284,'ㅎㅇ','','TTS'),(_binary '','2024-03-29 01:38:32.444472',1,1,285,'ㅎ','','TTS'),(_binary '','2024-03-29 01:38:33.254233',1,1,286,'ㅇ','','TTS'),(_binary '','2024-03-29 01:38:34.267948',1,1,287,'엇','','TTS'),(_binary '','2024-03-29 01:38:36.044917',1,1,288,'나 전수민','','TTS'),(_binary '','2024-03-29 01:38:49.818401',1,1,289,'반','','TTS'),(_binary '','2024-03-29 01:38:51.034687',1,1,290,'갑습니다 반','','TTS'),(_binary '','2024-03-29 01:38:51.680532',1,1,291,'가워요','','TTS'),(_binary '','2024-03-29 01:38:57.687441',1,1,292,'hi','','TTS'),(_binary '','2024-03-29 01:39:04.831340',1,1,293,'한칸','','TTS'),(_binary '','2024-03-29 01:39:10.928433',1,1,294,'hi I am nuclear punch man','','TTS'),(_binary '','2024-03-29 01:39:16.684194',1,1,295,'아나따와','','TTS'),(_binary '','2024-03-29 01:39:18.076055',1,1,296,'다레데스까','','TTS'),(_binary '','2024-03-29 01:39:49.973067',1,1,297,'','','TTS'),(_binary '','2024-03-29 01:39:50.631854',1,1,298,'나 전수민인데 그건 좀 그렇네','','TTS'),(_binary '','2024-03-29 01:40:49.853724',1,1,299,'안녕','','TTS'),(_binary '','2024-03-29 01:40:54.591388',1,1,300,'아하하ㅏ하','','TTS'),(_binary '','2024-03-29 01:40:56.407404',1,1,301,'아아앙','','TTS'),(_binary '','2024-03-29 01:40:57.632759',1,1,302,'하하하','','TTS'),(_binary '','2024-03-29 01:40:58.804267',1,1,303,'ㅣ키킼','','TTS'),(_binary '','2024-03-29 01:41:21.569821',1,1,304,'반갑습니다','','TTS'),(_binary '','2024-03-29 01:42:19.465997',22,1,305,'반갑습니다','','TTS'),(_binary '','2024-03-29 01:42:22.966758',22,1,306,'ㅁㄴㅇㅁㄴ','','TTS'),(_binary '','2024-03-29 01:42:25.214998',22,1,307,'안됩니까','','TTS'),(_binary '','2024-03-29 01:42:30.852935',22,1,308,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/e2952c46-278b-4919-95d4-9afc651aad42','VOICE'),(_binary '','2024-03-29 01:42:31.565464',22,1,309,'','','TTS'),(_binary '','2024-03-29 01:42:39.377332',22,1,310,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/0e1993bf-7264-4123-b6da-3e5301453ac6','VOICE'),(_binary '','2024-03-29 01:42:40.186282',22,1,311,'','','TTS'),(_binary '','2024-03-29 01:42:40.370777',22,1,312,'','','TTS'),(_binary '','2024-03-29 01:42:40.559502',22,1,313,'','','TTS'),(_binary '','2024-03-29 01:42:40.775035',22,1,314,'','','TTS'),(_binary '','2024-03-29 01:42:46.694953',22,1,315,'반갑습니다','','TTS'),(_binary '','2024-03-29 01:42:54.854217',1,1,316,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/91d3f518-824b-4975-ae2d-4edfe8ec72f4','VOICE'),(_binary '','2024-03-29 05:20:00.558005',1,1,317,'ddd','','TTS'),(_binary '','2024-03-29 07:31:34.642637',1,1,318,'ddd','','TTS'),(_binary '','2024-03-29 16:41:23.070749',1,1,319,'ddd','','TTS'),(_binary '','2024-03-29 16:52:26.709236',1,1,320,'ddd','','TTS'),(_binary '','2024-03-29 16:52:32.607236',1,1,321,'ddd','','TTS'),(_binary '','2024-03-29 16:52:34.356945',1,1,322,'dddd','','TTS'),(_binary '','2024-03-29 16:56:27.552906',1,1,323,'dddd','','TTS'),(_binary '','2024-03-29 17:10:10.117770',1,1,324,'ddd','','TTS'),(_binary '','2024-03-29 17:11:29.717488',1,1,325,'ddd','','TTS'),(_binary '','2024-03-29 17:12:01.429603',1,1,326,'ddd','','TTS'),(_binary '','2024-03-29 17:12:16.506464',1,1,327,'sss','','TTS'),(_binary '','2024-03-29 17:12:37.768784',1,1,328,'sss','','TTS'),(_binary '','2024-03-29 17:13:32.455525',1,1,329,'sss','','TTS'),(_binary '','2024-03-29 17:14:21.265138',1,1,330,'sss','','TTS'),(_binary '','2024-03-29 17:15:28.971747',1,1,331,'sss','','TTS'),(_binary '','2024-03-29 17:15:42.536365',1,1,332,'sss','','TTS'),(_binary '','2024-03-29 17:15:50.684699',1,1,333,'sss','','TTS'),(_binary '','2024-03-29 17:15:57.035392',1,1,334,'sss','','TTS'),(_binary '','2024-03-29 17:16:43.168228',1,1,335,'ddd','','TTS'),(_binary '','2024-03-29 17:17:09.778514',1,1,336,'ddd','','TTS'),(_binary '','2024-03-29 17:17:47.254861',1,1,337,'sss','','TTS'),(_binary '','2024-03-29 17:17:49.173909',1,1,338,'dfdf','','TTS'),(_binary '','2024-03-29 17:17:51.353660',1,1,339,'sdfsdsfsfsfsfsd','','TTS'),(_binary '','2024-03-29 17:17:54.088458',1,1,340,'sfsdfsfsdfsdfsdfsdf','','TTS'),(_binary '','2024-03-29 17:20:36.510477',1,1,341,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-03-29 17:21:22.665043',1,1,342,'ㄴㄴㄴ','','TTS'),(_binary '','2024-03-29 17:21:37.046824',1,1,343,'ㄴㄴㄴ','','TTS'),(_binary '','2024-03-29 17:23:31.755188',1,1,344,'ㄴㄴㄴ','','TTS'),(_binary '','2024-03-29 17:25:07.504403',1,1,345,'ㄴㄴㄴ','','TTS'),(_binary '','2024-03-29 17:28:11.894795',1,1,346,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-29 17:32:01.038073',1,1,347,'dddd','','TTS'),(_binary '','2024-03-29 17:34:17.732305',1,1,348,'api','','TTS'),(_binary '','2024-03-29 17:35:13.530472',1,1,349,'dddd','','TTS'),(_binary '','2024-03-29 17:37:58.855418',1,1,350,'socket ','','TTS'),(_binary '','2024-03-29 17:46:01.103496',1,1,351,'ㄷㄱㄷㄱㄷ','','TTS'),(_binary '','2024-03-29 17:46:03.714646',1,1,352,'ㅈㅈㅈㅈ','','TTS'),(_binary '','2024-03-29 17:53:59.852495',1,1,353,'dddd','','TTS'),(_binary '','2024-03-29 08:56:07.558852',1,1,354,'ddd','','TTS'),(_binary '','2024-03-29 15:56:31.620612',1,1,355,'안녕','','TTS'),(_binary '','2024-03-29 16:06:06.187089',1,1,356,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/f1f1733d-518f-4136-b3f9-705787d8e6fb','VOICE'),(_binary '','2024-03-29 17:03:21.489819',1,1,357,'안냥','','TTS'),(_binary '','2024-03-29 17:03:28.493969',1,1,358,'ㅋ','','TTS'),(_binary '','2024-03-29 17:23:58.320029',1,1,359,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/6919677e-4141-42a9-9658-86bb10305f8c','VOICE'),(_binary '','2024-03-29 17:51:29.448887',1,1,360,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-29 18:06:09.567795',1,1,361,'ddd','','TTS'),(_binary '','2024-03-29 18:06:39.068188',1,1,362,'dddd','','TTS'),(_binary '','2024-03-29 18:25:47.229056',1,1,363,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/c54ea3f5-9a66-4ff6-8bf8-a3923a612eb2','VOICE'),(_binary '','2024-03-29 18:30:45.438658',1,1,364,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-29 18:32:08.399784',1,1,365,'ㄹㄹㄹ','','TTS'),(_binary '','2024-03-29 18:43:10.438913',1,1,366,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/21f3286a-67c1-4199-a66d-7c6a631aee63','VOICE'),(_binary '','2024-03-29 19:01:44.695125',1,1,367,'dddd','','TTS'),(_binary '','2024-03-29 19:03:44.673462',1,1,368,'ddd','','TTS'),(_binary '','2024-03-29 19:03:46.019533',1,1,369,'dddd','','TTS'),(_binary '','2024-03-29 19:03:47.365925',1,1,370,'dddd','','TTS'),(_binary '','2024-03-29 19:16:04.268994',1,1,371,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/3c03c32c-f0fc-402f-a09f-ecd76004c4eb','VOICE'),(_binary '','2024-03-29 19:16:44.695262',1,1,372,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/55e8a786-583e-4717-820e-1044d0dcb346','VOICE'),(_binary '','2024-03-29 19:18:40.185255',1,1,373,'ddd','','TTS'),(_binary '','2024-03-29 19:18:56.832506',1,1,374,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/fab327e0-64d7-4dd0-a5cf-eff45a7779c0','VOICE'),(_binary '','2024-03-30 05:47:56.316963',1,1,375,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/731d50a7-fcc2-4a46-ae5d-1abed57a8fe4','VOICE'),(_binary '','2024-03-30 07:45:34.366989',1,1,376,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/f0192ec1-9980-4d3a-87b0-df56cf93f1ba','VOICE'),(_binary '','2024-03-30 07:45:55.579936',1,1,377,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/7b6c7fb9-196e-4734-a33d-30dfd58f3c57','VOICE'),(_binary '','2024-03-30 08:28:52.806893',1,1,378,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/1b9141d2-b506-4189-a22b-966e5c7d1d7e','VOICE'),(_binary '','2024-03-30 08:35:13.645975',1,1,379,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/a2c67d11-f5b3-4ce4-af63-d75eb2a195d9','VOICE'),(_binary '','2024-03-30 08:53:37.914383',1,1,380,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/afee2d2d-dc8f-44c9-8ae3-1c0234d43bec','VOICE'),(_binary '','2024-03-30 08:53:53.171536',1,1,381,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/be37eebf-8b65-4046-822e-791c821d15cf','VOICE'),(_binary '','2024-03-30 09:00:39.516201',2,1,382,'ddd','','TTS'),(_binary '','2024-03-30 09:00:42.558771',2,1,383,'ssss','','TTS'),(_binary '','2024-03-30 09:04:41.212181',1,1,384,'ddddd','','TTS'),(_binary '','2024-03-30 09:04:47.666255',2,1,385,'ddddd','','TTS'),(_binary '','2024-03-30 09:07:50.299760',2,1,386,'ddd','','TTS'),(_binary '','2024-03-30 09:07:57.457580',2,1,387,'ddd','','TTS'),(_binary '','2024-03-30 09:20:31.953476',1,1,388,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/7c8fb5c3-5609-4bb7-8d30-f6f6626ec951','VOICE'),(_binary '','2024-03-30 10:06:47.289824',1,1,389,'ddd','','TTS'),(_binary '','2024-03-30 10:17:47.840617',2,1,390,'1','','TTS'),(_binary '','2024-03-30 10:17:52.699692',2,2,391,'2','','TTS'),(_binary '','2024-03-30 10:18:18.780997',2,1,392,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/df3ac19a-5ea2-4175-946b-720781f1b435','VOICE'),(_binary '','2024-03-30 10:20:00.867295',2,15,393,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/ef9028be-a217-4459-a2c6-2df1a5e5ee07','VOICE'),(_binary '','2024-03-30 16:16:26.361622',1,1,394,'안녕','','TTS'),(_binary '','2024-03-31 01:53:49.491363',1,1,395,'안녕하세요','','TTS'),(_binary '','2024-03-31 01:55:43.762699',1,1,396,'ㄷㄷㄷ','','TTS'),(_binary '','2024-03-31 02:01:35.495164',2,1,397,'안냥','','TTS'),(_binary '','2024-03-31 02:01:41.705365',2,1,398,'이거 느려졌나?','','TTS'),(_binary '','2024-03-31 02:01:49.654531',2,1,399,'TTS 다니까 채팅 느려짐','','TTS'),(_binary '','2024-03-31 16:48:54.257061',1,1,400,'ddd','','TTS'),(_binary '','2024-03-31 16:50:12.243602',1,1,401,'안녕','','TTS'),(_binary '','2024-03-31 16:50:15.924478',1,1,402,'ㅋㅋ','','TTS'),(_binary '','2024-03-31 16:50:19.980016',1,1,403,'크크','','TTS'),(_binary '','2024-03-31 16:50:29.932112',1,1,404,'이거 되냐?','','TTS'),(_binary '','2024-03-31 07:56:43.292359',1,1,405,'안녕','','TTS'),(_binary '','2024-03-31 07:56:56.895821',1,1,406,'왜 안돼','','TTS'),(_binary '','2024-03-31 07:56:59.755246',1,1,407,'안녕','','TTS'),(_binary '','2024-03-31 08:01:11.006199',1,1,408,'안녕','','TTS'),(_binary '','2024-03-31 08:01:13.500620',1,1,409,'야','','TTS'),(_binary '','2024-03-31 08:03:32.195182',1,2,410,'hgfh','','TTS'),(_binary '','2024-03-31 08:03:50.321823',1,1,411,'아아','','TTS'),(_binary '','2024-03-31 08:03:55.427314',1,2,412,'오','','TTS'),(_binary '','2024-03-31 08:03:56.892294',1,2,413,'신기하다','','TTS'),(_binary '','2024-03-31 08:04:01.879751',1,2,414,'근데 내가 친것도 tts로','','TTS'),(_binary '','2024-03-31 08:04:03.067361',1,1,415,'이거 많이 몰리면 ','','TTS'),(_binary '','2024-03-31 08:04:05.392154',1,1,416,'들리냐','','TTS'),(_binary '','2024-03-31 08:04:05.513289',1,2,417,'읽히는겨?','','TTS'),(_binary '','2024-03-31 08:04:14.221277',1,2,418,'한번에 쳐볼게 ㄱㄷ','','TTS'),(_binary '','2024-03-31 08:04:20.215064',1,2,419,'한번에 쳐볼게','','TTS'),(_binary '','2024-03-31 08:04:20.480096',1,2,420,'한번에 쳐볼게','','TTS'),(_binary '','2024-03-31 08:04:20.757493',1,2,421,'한번에 쳐볼게','','TTS'),(_binary '','2024-03-31 08:04:21.046240',1,2,422,'한번에 쳐볼게','','TTS'),(_binary '','2024-03-31 08:04:21.317870',1,2,423,'한번에 쳐볼게','','TTS'),(_binary '','2024-03-31 08:04:21.599360',1,2,424,'한번에 쳐볼게','','TTS'),(_binary '','2024-03-31 08:04:23.027573',1,2,425,'한번에 쳐볼게한번에 쳐볼게한번에 쳐볼게한번에 쳐볼게','','TTS'),(_binary '','2024-03-31 08:04:31.995660',1,2,426,'딜레이가 있기는 한데','','TTS'),(_binary '','2024-03-31 08:04:37.612626',1,1,427,'내가 친거는 안 읽히고 운동하는 사람한테만 들리게 해놓을라고','','TTS'),(_binary '','2024-03-31 08:04:41.615994',1,2,428,'다 오긴한다','','TTS'),(_binary '','2024-03-31 08:04:53.446099',1,2,429,'어떻게 테스트를','','TTS'),(_binary '','2024-03-31 08:04:54.723129',1,2,430,'해봐야하지','','TTS'),(_binary '','2024-03-31 08:05:08.563786',1,1,431,'근데 이거 왜 2번됨','','TTS'),(_binary '','2024-03-31 08:05:15.559121',1,2,432,'2번?','','TTS'),(_binary '','2024-03-31 08:05:16.976949',1,1,433,'다 오긴 하네 다행이다','','TTS'),(_binary '','2024-03-31 08:05:17.841009',1,2,434,'무슨소리지','','TTS'),(_binary '','2024-03-31 08:05:23.480809',1,2,435,'순차적이네','','TTS'),(_binary '','2024-03-31 08:05:23.991990',1,2,436,'이거','','TTS'),(_binary '','2024-03-31 08:05:25.584756',1,1,437,'소리가 2번씩 들리는데','','TTS'),(_binary '','2024-03-31 08:05:28.381310',1,2,438,'엥','','TTS'),(_binary '','2024-03-31 08:05:33.119264',1,2,439,'그렇구먼','','TTS'),(_binary '','2024-03-31 08:05:41.352038',1,2,440,'이거 뭔서비스야','','TTS'),(_binary '','2024-03-31 08:05:44.002934',1,2,441,'aws에서 지원하는','','TTS'),(_binary '','2024-03-31 08:05:45.952616',1,2,442,'tts인가','','TTS'),(_binary '','2024-03-31 08:05:52.195416',1,1,443,'ㄴㄴ 이건 윈도우 내장이야','','TTS'),(_binary '','2024-03-31 08:05:57.991654',1,2,444,'모바일에도','','TTS'),(_binary '','2024-03-31 08:05:58.622509',1,2,445,'뜨나','','TTS'),(_binary '','2024-03-31 08:06:00.667344',1,2,446,'한번 해볼가','','TTS'),(_binary '','2024-03-31 08:06:07.678732',1,1,447,'나도 한 번 해볼게','','TTS'),(_binary '','2024-03-31 08:07:21.929883',1,1,448,'채팅 치는 거 들립니까','','TTS'),(_binary '','2024-03-31 08:07:29.136336',1,2,449,'모바일','','TTS'),(_binary '','2024-03-31 08:07:31.677235',1,2,450,'로그인이 아니됩니다','','TTS'),(_binary '','2024-03-31 08:07:43.998755',1,2,451,'이건또 뭔문제여','','TTS'),(_binary '','2024-03-31 08:07:55.150167',1,1,452,'난 되는데','','TTS'),(_binary '','2024-03-31 08:08:00.778709',1,1,453,'근데 딱 들어갔을 때 최신 거가 보이는 게 아니라 오래된 거부터 보이는 거 맞아요?','','TTS'),(_binary '','2024-03-31 08:08:09.173330',1,1,454,'잘못했음','','TTS'),(_binary '','2024-03-31 08:08:12.205726',1,2,455,'그건','','TTS'),(_binary '','2024-03-31 08:08:14.591858',1,2,456,'프론트에서','','TTS'),(_binary '','2024-03-31 08:08:16.348216',1,2,457,'고쳐야할듯','','TTS'),(_binary '','2024-03-31 08:08:18.595881',1,1,458,'근데 왜 너 내 이름으로 쳐지냐','','TTS'),(_binary '','2024-03-31 08:08:19.536971',1,1,459,'아하','','TTS'),(_binary '','2024-03-31 08:08:28.075393',1,2,460,'뭐지','','TTS'),(_binary '','2024-03-31 08:08:29.740553',1,1,461,'내가 말한 것도 들려주는거야?','','TTS'),(_binary '','2024-03-31 08:08:32.599294',1,1,462,'아니 내가 페이지 네이션 해서 프론트로 주고 있어서 내가 고쳐야함','','TTS'),(_binary '','2024-03-31 08:08:33.235902',1,2,463,'어','','TTS'),(_binary '','2024-03-31 08:08:36.914364',1,2,464,'아','','TTS'),(_binary '','2024-03-31 08:08:43.828013',1,1,465,'모바일에서 로그인 안하면 내 이름으로 쳐짐','','TTS'),(_binary '','2024-03-31 08:08:54.696080',1,2,466,'이거 웹인데','','TTS'),(_binary '','2024-03-31 08:09:04.684344',1,1,467,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋ이거 안된다고?','','TTS'),(_binary '','2024-03-31 08:09:12.585716',1,1,468,'왜 내껄로 쳐지냐','','TTS'),(_binary '','2024-03-31 08:09:13.637178',1,1,469,'아 tts가 안되네','','TTS'),(_binary '','2024-03-31 08:09:20.257706',1,2,470,'아','','TTS'),(_binary '','2024-03-31 08:09:21.925029',1,1,471,'ㅋㅋㅋㅋㅋㅎㅎㅎㅎ휴ㅠㅠㅠㅠ','','TTS'),(_binary '','2024-03-31 08:09:27.777219',1,15,472,'이거','','TTS'),(_binary '','2024-03-31 08:09:31.419935',1,2,473,'안녕','','TTS'),(_binary '','2024-03-31 08:09:34.747402',1,15,474,'한 사람 채팅방에 ','','TTS'),(_binary '','2024-03-31 08:09:47.353363',1,2,475,'아고','','TTS'),(_binary '','2024-03-31 08:09:48.934144',1,15,476,'여러명에 동시에 접근할 수 있는건가요?','','TTS'),(_binary '','2024-03-31 08:10:00.584615',1,1,477,'와 근데 잘만들었다','','TTS'),(_binary '','2024-03-31 08:10:03.911640',1,1,478,'대박 채팅창 구현','','TTS'),(_binary '','2024-03-31 08:10:04.455118',1,2,479,'까까 놀리기 채팅방이랑 비슷한듯','','TTS'),(_binary '','2024-03-31 08:10:08.296224',1,15,480,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ','','TTS'),(_binary '','2024-03-31 08:10:08.485471',1,1,481,'와','','TTS'),(_binary '','2024-03-31 08:10:14.843156',1,1,482,'왜 내껄로 누가 말하는거야','','TTS'),(_binary '','2024-03-31 08:10:17.648225',1,2,483,'근데 모바일에서 웨안들림','','TTS'),(_binary '','2024-03-31 08:10:25.317483',1,2,484,'pwa앱에서는 들리나','','TTS'),(_binary '','2024-03-31 08:10:28.832343',1,1,485,'이거 웹인데 나 똑같은 걸로 들어갔는데','','TTS'),(_binary '','2024-03-31 08:10:31.218790',1,1,486,'이거 운동하기 버튼 누르면 들어오는 음성 메세지 녹음할 수 있는 응원방으로 할려했는데','','TTS'),(_binary '','2024-03-31 08:10:39.338945',1,1,487,'모바일에서 안 들림?? ','','TTS'),(_binary '','2024-03-31 08:10:42.192691',1,2,488,'엉','','TTS'),(_binary '','2024-03-31 08:10:44.217751',1,1,489,'로그인이 저걸로 자동으로 들어가네','','TTS'),(_binary '','2024-03-31 08:10:55.998208',1,15,490,'그럼 운동중이라고 버튼을 누르면','','TTS'),(_binary '','2024-03-31 08:11:03.710815',1,15,491,'운동 활성중인 갈리 목록에 갈리가 들어가고','','TTS'),(_binary '','2024-03-31 08:11:19.482096',1,15,492,'할리가 자신이 관리하는 갈리들중에서 선택해서 ','','TTS'),(_binary '','2024-03-31 08:11:27.067413',1,15,493,'실시간 음성 채팅을 보낼 수 있다는 거죠?','','TTS'),(_binary '','2024-03-31 08:11:50.625787',1,1,494,'나는 그 ','','TTS'),(_binary '','2024-03-31 08:11:52.477734',1,15,495,'해당 갈리 채팅방에 들어가면 그 갈리를 관리하는 모든할리들이 보낸 채팅을 다 볼 수 있는거고?','','TTS'),(_binary '','2024-03-31 08:12:10.011481',2,2,496,'ㅋㅋ','','TTS'),(_binary '','2024-03-31 08:12:13.497555',2,2,497,'여긴 웨안ㄷ렙','','TTS'),(_binary '','2024-03-31 08:12:16.648671',2,2,498,'ㅋㅋ','','TTS'),(_binary '','2024-03-31 08:12:18.122732',2,2,499,'ㅋㅋㅋ','','TTS'),(_binary '','2024-03-31 08:12:25.294102',1,1,500,'갈리가 운동 하기 버튼 누르면 할리한테 SSE 알림가고, 알림에 응원하기 버튼 누르면 요 페이지 들어와서 채팅이나 음성 메세지 녹음해서 응원할 수있게 할려했음','','TTS'),(_binary '','2024-03-31 08:12:26.338195',1,1,501,'대화기록 싹 사라진 게 나에게만 그런겨..?','','TTS'),(_binary '','2024-03-31 08:12:36.348421',2,2,502,'떫뗣뗿뜛띯땷','','TTS'),(_binary '','2024-03-31 08:13:00.237757',1,2,503,'왜 이전것만 보이지','','TTS'),(_binary '','2024-03-31 08:13:03.978757',1,1,504,'ㅇㅇ 규리 마지막에 한 말 맞음','','TTS'),(_binary '','2024-03-31 08:13:14.320788',1,1,505,'내가 페이지 네이션 잘못한듯','','TTS'),(_binary '','2024-03-31 08:13:18.056714',1,2,506,'오홍','','TTS'),(_binary '','2024-03-31 08:13:23.342378',1,1,507,'아니 이거 왜 2번 들리냐고','','TTS'),(_binary '','2024-03-31 08:13:35.463139',1,1,508,'이걸로 할까 아니면 좀  송신 느리더라도','','TTS'),(_binary '','2024-03-31 08:13:39.002451',1,2,509,'전수민 그는 신인가? 떫뗣뗿뜛띯땷 전수민 그는 신인가? 떫뗣뗿뜛띯땷 전수민 그는 신인가? 떫뗣뗿뜛띯땷 전수민 그는 신인가? 떫뗣뗿뜛띯땷 전수민 그는 신인가? 떫뗣뗿뜛띯땷 전수민 그는 신인가? 떫뗣뗿뜛띯땷 전수민 그는 신인가? 떫뗣뗿뜛띯땷 전수민 그는 신인가? 떫뗣뗿뜛띯땷 전수민 그는 신인가? 떫뗣뗿뜛띯땷','','TTS'),(_binary '','2024-03-31 08:13:43.022616',1,2,510,'괜찮은데','','TTS'),(_binary '','2024-03-31 08:13:43.939276',1,1,511,'구글 TTS API 쓸까','','TTS'),(_binary '','2024-03-31 08:14:00.404517',1,1,512,'구글 TTS 는 나이 성별에 따라서 목소리 다르게 할 수 있음','','TTS'),(_binary '','2024-03-31 08:14:07.228185',1,2,513,'오...','','TTS'),(_binary '','2024-03-31 08:14:10.721346',1,2,514,'미쳤는데','','TTS'),(_binary '','2024-03-31 08:14:13.009011',1,1,515,'그래서 시연할 떄 진영이형보고 채팅 치라하고 할아버지 음성 나오게 하면 재밌을 거 같은데','','TTS'),(_binary '','2024-03-31 08:14:19.021951',1,1,516,'그는 신인가에서 tts가 못 벗어나고 있는데','','TTS'),(_binary '','2024-03-31 08:14:24.987868',1,15,517,'우주최강 세현 지구최강 세현 지상최상세현 지하최강세현 멘틀최강세현 외핵최강세현 내핵최강세현 핵최강세현','','TTS'),(_binary '','2024-03-31 08:14:34.216912',1,1,518,'뭐고 왜 Loop가','','TTS'),(_binary '','2024-03-31 08:14:46.449805',1,2,519,'실시간채팅이 죄다 읽힌다','','TTS'),(_binary '','2024-03-31 08:14:58.143842',1,2,520,'i lost ma mind','','TTS'),(_binary '','2024-03-31 08:15:03.865397',1,15,521,'이거 ','','TTS'),(_binary '','2024-03-31 08:15:03.900349',1,2,522,'yeah','','TTS'),(_binary '','2024-03-31 08:15:12.460143',1,15,523,'사람마다 tts 음성 다르게 못하나?','','TTS'),(_binary '','2024-03-31 08:15:17.017196',1,2,524,'something on your mind?','','TTS'),(_binary '','2024-03-31 08:15:21.617081',1,2,525,'im going','','TTS'),(_binary '','2024-03-31 08:15:30.443028',1,2,526,'scv good to go sir','','TTS'),(_binary '','2024-03-31 08:15:31.135645',1,1,527,'영어 발음 진짜 한국인처럼 한다','','TTS'),(_binary '','2024-03-31 08:15:34.483437',1,2,528,'job finished','','TTS'),(_binary '','2024-03-31 08:15:38.683607',1,2,529,'역시 ih','','TTS'),(_binary '','2024-03-31 08:15:40.240403',1,1,530,'할 수 있는데 , 그거 하려면 구글 API 써야되긴해 그것도 구현 해놨긴 해놨어 ','','TTS'),(_binary '','2024-03-31 08:15:43.611931',1,2,531,'내귀엔 al인데','','TTS'),(_binary '','2024-03-31 08:15:44.712614',1,1,532,'근데 그건 송수신이 좀 느려져','','TTS'),(_binary '','2024-03-31 08:15:47.359101',1,2,533,'오','','TTS'),(_binary '','2024-03-31 08:15:53.175116',1,15,534,'아하','','TTS'),(_binary '','2024-03-31 08:15:56.156830',1,2,535,'이것보다 많이느려?','','TTS'),(_binary '','2024-03-31 08:15:59.605048',1,1,536,'일단 그걸로 바꿔볼게 ','','TTS'),(_binary '','2024-03-31 08:16:04.135615',1,1,537,'그 뭐냐 ','','TTS'),(_binary '','2024-03-31 08:16:08.466714',1,2,538,'미친전수민','','TTS'),(_binary '','2024-03-31 08:16:15.083117',1,15,539,'파친전수민','','TTS'),(_binary '','2024-03-31 08:16:17.281212',1,2,540,'매드사이언티스트','','TTS'),(_binary '','2024-03-31 08:16:17.976781',1,1,541,'좀 느린 컴퓨터 버벅이는 느낌인데 한번 봐바','','TTS'),(_binary '','2024-03-31 08:16:29.659860',1,1,542,'좀 이따 해서 올릴게','','TTS'),(_binary '','2024-03-31 08:16:37.510422',1,2,543,'멋지다 수민아','','TTS'),(_binary '','2024-03-31 08:16:39.891094',1,2,544,'우우우우','','TTS'),(_binary '','2024-03-31 08:16:46.161670',1,2,545,'우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우','','TTS'),(_binary '','2024-03-31 08:16:49.364434',1,1,546,'아니다 다들 넘 고생해줘서 고맙다','','TTS'),(_binary '','2024-03-31 08:16:55.266660',1,2,547,'유유유유유유유유유유유유유유유유유유유유유유유유','','TTS'),(_binary '','2024-03-31 08:17:07.862777',1,2,548,'우리팀장님 뭐야 나 너무 감동이야유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유','','TTS'),(_binary '','2024-03-31 08:17:08.145531',1,1,549,'멋진데 왜 우 하는거야 ㅋㅋㅋㅋㅋㅋㅋ','','TTS'),(_binary '','2024-03-31 08:17:14.195864',1,15,550,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ','','TTS'),(_binary '','2024-03-31 08:17:21.704748',1,15,551,'옆에서 낄낄대면서 좋아하는데','','TTS'),(_binary '','2024-03-31 08:17:24.804210',1,2,552,'캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬캬','','TTS'),(_binary '','2024-03-31 08:17:26.449586',1,15,553,'킹받아','','TTS'),(_binary '','2024-03-31 08:17:31.926728',1,2,554,'너무신기해','','TTS'),(_binary '','2024-03-31 08:17:36.815374',1,2,555,'사이드프로젝트때','','TTS'),(_binary '','2024-03-31 08:17:41.209901',1,2,556,'접목시킬거 많겠다','','TTS'),(_binary '','2024-03-31 08:17:54.695576',1,2,557,'미친전수민','','TTS'),(_binary '','2024-03-31 08:17:58.496366',1,2,558,'어디까지 미칠꺼야','','TTS'),(_binary '','2024-03-31 08:18:06.500308',1,15,559,'미를 넘어서 이미 파도 치셨어','','TTS'),(_binary '','2024-03-31 08:18:12.175041',1,1,560,'ㅋㅋㅋㅋ 아 이거','','TTS'),(_binary '','2024-03-31 08:18:15.867527',1,1,561,'정신병 걸릴 거 같다 ','','TTS'),(_binary '','2024-03-31 08:18:20.556769',1,1,562,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ','','TTS'),(_binary '','2024-03-31 08:18:21.301928',1,15,563,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ','','TTS'),(_binary '','2024-03-31 08:18:24.144989',1,2,564,'우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우우','','TTS'),(_binary '','2024-03-31 08:18:30.637859',1,2,565,'앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙앙','','TTS'),(_binary '','2024-03-31 08:18:37.331952',1,2,566,'앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉앙엉','','TTS'),(_binary '','2024-03-31 08:18:53.236295',1,15,567,'강퇴기능도 만들어주세요','','TTS'),(_binary '','2024-03-31 08:18:58.988694',1,2,568,'앙엉옹잉엥양영용융잉앙엉옹잉엥양영용융잉앙엉옹잉엥양영용융잉앙엉옹잉엥양영용융잉앙엉옹잉엥양영용융잉앙엉옹잉엥양영용융잉앙엉옹잉엥양영용융잉','','TTS'),(_binary '','2024-03-31 08:19:01.633555',1,1,569,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ','','TTS'),(_binary '','2024-03-31 08:19:05.420141',1,1,570,'ㅋㅋㅋ ','','TTS'),(_binary '','2024-03-31 08:19:25.490779',1,1,571,'저는 이만 커피 시키러 가겠씀다','','TTS'),(_binary '','2024-03-31 08:19:31.761739',1,2,572,'많이드십쇼','','TTS'),(_binary '','2024-03-31 08:19:32.565107',1,2,573,'충성','','TTS'),(_binary '','2024-03-31 08:19:40.394379',1,15,574,'파이팅파이팅','','TTS'),(_binary '','2024-03-31 08:19:44.349208',1,2,575,'너를 처음 만난 그 날은 드미트리 메드베데프 러시아 대통령 재임 시절 확률분포표상에는 있을 수 없는 청 단풍잎이 우거진 붉은 수수밭에서','','TTS'),(_binary '','2024-03-31 08:19:54.879676',1,2,576,'수사슴 수사에 붙은 수수료가 얼마인지 알아보기 위해 간 그 곳이었지 너의 얼굴은 마치 페니실린 살균 항균작용을 한 듯 하얗고 입술은 붉은','','TTS'),(_binary '','2024-03-31 08:20:05.201321',1,2,577,'액자 속 사진 속의 그 홍합 홍합 홍합 홍합 홍합 홍합 홍합 홍합 액자 속 사진 속의 그 왕밤빵 왕밤빵 왕밤빵 왕밤빵','','TTS'),(_binary '','2024-03-31 08:20:14.195816',1,2,578,'그립다 그리워 그립다 그리워 홍합 홍합 홍합 홍합 홍합 홍합 홍합 홍합 그립다 그리워 그립다 그리워 왕밤빵 왕밤빵 왕밤빵 왕밤빵','','TTS'),(_binary '','2024-03-31 08:29:29.894717',1,1,579,'?????','','TTS'),(_binary '','2024-03-31 08:56:08.453292',1,1,580,'dd','','TTS'),(_binary '','2024-03-31 08:56:14.247967',1,2,581,'뭐야','','TTS'),(_binary '','2024-03-31 08:56:18.455521',1,2,582,'안녕하세요','','TTS'),(_binary '','2024-03-31 08:56:22.426041',1,2,583,'저는웨 아직도 할머니죠?','','TTS'),(_binary '','2024-03-31 08:56:27.034876',1,1,584,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ','','TTS'),(_binary '','2024-03-31 08:56:35.776491',1,1,585,'지금 채팅창 밑으로 내리는 거 하고 있습니다 ','','TTS'),(_binary '','2024-03-31 08:56:40.973738',1,2,586,'뭐야 내목소리 돌려줘요','','TTS'),(_binary '','2024-03-31 08:56:41.495584',1,2,587,'아','','TTS'),(_binary '','2024-03-31 08:56:43.283100',1,2,588,'아까 dd는','','TTS'),(_binary '','2024-03-31 08:56:51.271990',1,2,589,'남자소리로 들린거같아서','','TTS'),(_binary '','2024-03-31 08:56:56.499137',1,2,590,'착각이었군요','','TTS'),(_binary '','2024-03-31 08:56:59.469838',1,2,591,'죄송합니다','','TTS'),(_binary '','2024-03-31 08:57:00.773438',1,1,592,'아 그려? ','','TTS'),(_binary '','2024-03-31 08:57:03.770380',1,1,593,'F12 누르면 ','','TTS'),(_binary '','2024-03-31 08:57:04.155860',1,2,594,'제가 빡! 대가리였습니다','','TTS'),(_binary '','2024-03-31 08:57:08.107670',1,1,595,'아나운서 리스트 있습니다','','TTS'),(_binary '','2024-03-31 08:57:11.282597',1,2,596,'오','','TTS'),(_binary '','2024-03-31 08:57:15.611075',1,2,597,'어디서보죠?','','TTS'),(_binary '','2024-03-31 08:57:28.936736',1,1,598,'근데 모바일은 그게 안나오나요? 아니면 영어 아나운서 밖에 없어서 안되나','','TTS'),(_binary '','2024-03-31 08:57:30.525658',1,1,599,'음 ','','TTS'),(_binary '','2024-03-31 08:57:35.359057',1,1,600,'사진 MM으로 보내겠습니다.','','TTS'),(_binary '','2024-03-31 08:57:35.487495',1,2,601,'아뇨 웹입니다','','TTS'),(_binary '','2024-03-31 08:57:40.524621',1,2,602,'알겠슴다','','TTS'),(_binary '','2024-03-31 08:57:48.088328',1,2,603,'이거 웹소켓인가요?','','TTS'),(_binary '','2024-03-31 08:57:50.545190',1,2,604,'그렇군요','','TTS'),(_binary '','2024-03-31 08:57:55.949655',1,2,605,'SEND MESSGE 창난거보니까','','TTS'),(_binary '','2024-03-31 08:57:58.752967',1,2,606,'웹소켓맞군요','','TTS'),(_binary '','2024-03-31 08:58:04.964197',1,2,607,'이거 지우는법이나 알고싶네요','','TTS'),(_binary '','2024-03-31 08:58:17.563250',1,1,608,'어떤 거 지우는 거 말씀이시죠?','','TTS'),(_binary '','2024-03-31 08:58:22.816688',1,2,609,'f12 누르면','','TTS'),(_binary '','2024-03-31 08:58:25.346290',1,2,610,'웹소켓 주고받을 때','','TTS'),(_binary '','2024-03-31 08:58:32.062735',1,2,611,'뜨는 개같은 SEND >> RECEIVED >>','','TTS'),(_binary '','2024-03-31 08:58:33.385387',1,2,612,'이거요','','TTS'),(_binary '','2024-03-31 08:58:41.652365',1,2,613,'<<<< MESSAGE','','TTS'),(_binary '','2024-03-31 08:58:47.722717',1,2,614,'전에도 스트레스 많이받았어요','','TTS'),(_binary '','2024-03-31 08:59:12.149614',1,1,615,'그렇군요 ','','TTS'),(_binary '','2024-03-31 09:00:59.164401',1,1,616,'네','','TTS'),(_binary '','2024-03-31 09:01:00.713801',1,1,617,'메세지 ','','TTS'),(_binary '','2024-03-31 09:01:03.385113',1,1,618,'잘 가나욤','','TTS'),(_binary '','2024-03-31 09:01:10.598448',1,52,619,'안들랴용','','TTS'),(_binary '','2024-03-31 09:01:13.784044',1,1,620,'헐','','TTS'),(_binary '','2024-03-31 09:01:18.098777',1,2,621,'ㅠㅠ','','TTS'),(_binary '','2024-03-31 09:01:19.980692',1,1,622,'백앤드 구현 밖에 ','','TTS'),(_binary '','2024-03-31 09:01:23.632268',1,1,623,'답이 없군요','','TTS'),(_binary '','2024-03-31 09:01:27.749407',1,2,624,'그렇군요..','','TTS'),(_binary '','2024-03-31 18:21:44.669329',1,1,625,'ddd','','TTS'),(_binary '','2024-03-31 09:31:12.375893',1,1,626,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/9581b37c-59ac-4cae-8ec1-3967fc81c880','VOICE'),(_binary '','2024-03-31 09:31:15.843061',1,1,627,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/9fcd86b6-11fb-4412-8658-de292fe1ebd4','VOICE'),(_binary '','2024-03-31 09:31:17.528089',1,1,628,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/213f0229-0832-4203-84a2-cfb6307a00e9','VOICE'),(_binary '','2024-03-31 09:31:51.191215',1,1,629,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/057a0b3e-946c-49af-a193-8b0d216256fd','VOICE'),(_binary '','2024-03-31 09:40:42.174116',1,1,630,'여기는 모바일 음성 들리나? ','','TTS'),(_binary '','2024-03-31 09:40:56.408937',1,1,631,'여기는 모바일 음성 들리나? ','','TTS'),(_binary '','2024-03-31 09:54:57.495126',1,1,632,'ddd','','TTS'),(_binary '','2024-03-31 09:55:13.165096',1,1,633,'sss','','TTS'),(_binary '','2024-03-31 09:55:17.658263',1,1,634,'안녕','','TTS'),(_binary '','2024-03-31 09:55:25.111052',1,1,635,'ㅎㅇㄹ','','TTS'),(_binary '','2024-03-31 09:55:28.807761',1,1,636,'하이루','','TTS'),(_binary '','2024-03-31 09:55:33.347450',1,1,637,'너 뭔데','','TTS'),(_binary '','2024-03-31 19:07:31.306855',1,1,638,'안녕','','TTS'),(_binary '','2024-03-31 19:07:44.422180',1,1,639,'안녕','','TTS'),(_binary '','2024-03-31 19:07:53.670614',1,1,640,'왜','','TTS'),(_binary '','2024-03-31 19:33:59.313714',1,1,641,'안냥?','','TTS'),(_binary '','2024-03-31 19:35:36.597430',1,1,642,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-31 19:36:38.463707',1,1,643,'안냥','','TTS'),(_binary '','2024-03-31 19:37:07.948454',1,1,644,'ㅇㅇㅇ','','TTS'),(_binary '','2024-03-31 19:37:26.780870',1,1,645,'안냥','','TTS'),(_binary '','2024-03-31 19:37:31.517087',1,1,646,'야','','TTS'),(_binary '','2024-03-31 19:37:39.359377',1,1,647,'왜','','TTS'),(_binary '','2024-03-31 19:38:29.930369',1,1,648,'안녕','','TTS'),(_binary '','2024-03-31 19:38:37.183914',1,1,649,'야','','TTS'),(_binary '','2024-03-31 19:38:48.020180',1,1,650,'야!!!!','','TTS'),(_binary '','2024-03-31 19:39:14.200119',1,1,651,'헬로우','','TTS'),(_binary '','2024-03-31 14:12:12.589926',1,15,652,'수민님 이거 페이지 경로 바꿨습니당','','TTS'),(_binary '','2024-03-31 14:12:24.627960',1,15,653,'어라?','','TTS'),(_binary '','2024-03-31 14:19:10.414181',1,15,654,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/9629f53e-4651-403d-8221-d2c6eb05a509','VOICE'),(_binary '','2024-04-01 00:06:38.378728',1,1,655,'일해라 전수민 누군교','','TTS'),(_binary '','2024-04-01 00:07:34.300418',1,1,656,'음','','TTS'),(_binary '','2024-04-01 00:35:30.602554',1,1,657,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/9dbdcfc0-9256-4081-92e0-002f2c347b05.mp3','VOICE'),(_binary '','2024-04-01 00:42:38.949524',1,1,658,NULL,'https://d210.s3.ap-northeast-2.amazonaws.com/538dbe14-f9f6-4afc-8337-0a808f7b0825.mp3','VOICE'),(_binary '','2024-04-01 03:38:26.967722',1,1,659,'김세현 화이팅! 두 마디 되는지 확인하겠습니다괜찮은 정도는? :94.0%','https://d210.s3.ap-northeast-2.amazonaws.com/287d6570-d9f3-49fd-bd08-d0a6e77b1f93.mp3','VOICE'),(_binary '','2024-04-01 03:40:50.649680',1,1,660,'김세현 화이팅! 두 마디 되는지 확인하겠습니다(현재 힘든 정도? :6.0%)','https://d210.s3.ap-northeast-2.amazonaws.com/fe40f57c-5643-4525-9df8-d0143793755c.mp3','VOICE'),(_binary '','2024-04-01 03:44:23.625810',1,1,661,'김세현 화이팅! 두 마디 되는지 확인하겠습니다(현재 힘든 정도? :6.0%)','https://d210.s3.ap-northeast-2.amazonaws.com/c6d3b0eb-b9de-48fb-b95c-494c3ed681d0.mp3','VOICE'),(_binary '','2024-04-01 03:47:04.830976',1,1,662,'웹 녹음도 되는지 한 번 확인해 보겠습니다.(현재 힘든 정도? :27.0%)','https://d210.s3.ap-northeast-2.amazonaws.com/08355c9b-6cbc-4e1a-92cc-4fbfe3ffbdce.webm','VOICE'),(_binary '','2024-04-01 03:49:51.713237',1,1,663,'웹 녹음 되는 거의 스티치, 대인 지 확인해 보겠습니다.(현재 힘든 정도? :14.099999999999994%)','https://d210.s3.ap-northeast-2.amazonaws.com/56491e12-39a9-4fd1-b787-cd9be13d4d38.webm','VOICE'),(_binary '','2024-04-01 04:11:13.125618',1,1,664,'녹음 STT 이 되는지 확인해 보겠습니다.(현재 힘든 정도? :52.2%)','https://d210.s3.ap-northeast-2.amazonaws.com/f9528b9f-581f-4e6e-b904-5c518a67a5aa.webm','VOICE'),(_binary '','2024-04-01 04:11:38.450806',1,1,665,'녹음 STT 되는지 확인해 보겠습니다.(현재 힘든 정도? :13.099999999999994%)','https://d210.s3.ap-northeast-2.amazonaws.com/97ccb18e-6644-44a3-8bf4-00fe6b7aea39.webm','VOICE'),(_binary '','2024-04-01 04:14:46.156079',1,1,666,'안녕','','TTS'),(_binary '','2024-04-01 04:14:51.533023',1,1,667,'ㅎㅇ','','TTS'),(_binary '','2024-04-01 04:15:02.056320',1,1,668,'하이','','TTS'),(_binary '','2024-04-01 04:16:07.177603',1,1,669,'하이이','','TTS'),(_binary '','2024-04-01 04:17:28.109255',1,1,670,'내가 그린 기린 그림은 긴 기린 그림이고  네가 그린 기린 그림은 안 긴 기린 그림이다 ','','TTS'),(_binary '','2024-04-01 04:19:05.113464',1,1,671,'하이(현재 힘든 정도? :5.1000000000000085%)','https://d210.s3.ap-northeast-2.amazonaws.com/4bbe5b5a-f221-4171-b902-bb37abacb1a3.webm','VOICE'),(_binary '','2024-04-01 04:19:30.280562',1,1,672,'이번 거 왜 이렇게 오래 걸림?(현재 힘든 정도? :1.0999999999999943%)','https://d210.s3.ap-northeast-2.amazonaws.com/3aea88ab-8123-4095-8c59-f6efb173f82a.webm','VOICE'),(_binary '','2024-04-01 04:19:50.938201',1,1,673,'제 속도도 잘 되네.(현재 힘든 정도? :1.9000000000000057%)','https://d210.s3.ap-northeast-2.amazonaws.com/44d0681e-1845-4862-b9a1-d6ee7c15470b.webm','VOICE'),(_binary '','2024-04-01 04:26:50.386463',1,1,674,'아 아 아(현재 힘든 정도? :0.5999999999999943%)','https://d210.s3.ap-northeast-2.amazonaws.com/72b7ddd0-e0c8-45b2-9dc4-474c1c1bb8eb.m4a','VOICE'),(_binary '','2024-04-01 04:30:51.175012',1,1,675,'','https://d210.s3.ap-northeast-2.amazonaws.com/eb6d03b7-9880-4523-a93e-0dfddc802925.webm','VOICE'),(_binary '','2024-04-01 04:31:31.436306',1,1,676,'이거 과연 세 마디 하면 될까요? 한 마디 시작했고 두 마디 시작했고 세 마디 시작했습니다.(현재 힘든 정도? :0.29999999999999716%)','https://d210.s3.ap-northeast-2.amazonaws.com/33b7b83f-71bb-45b2-a5c5-4f3d623c1e68.webm','VOICE'),(_binary '','2024-03-31 19:42:41.244298',1,1,677,'안녕 녹음 잘 되고 있니? 이 제발 됐으면 좋겠다 사랑하게(현재 힘든 정도? :0.4000000000000057%)','https://d210.s3.ap-northeast-2.amazonaws.com/20df84d6-2ded-4654-807f-054c41f00f1f.webm','VOICE'),(_binary '','2024-03-31 19:42:58.128401',1,1,678,'zzzzz','','TTS'),(_binary '','2024-03-31 19:43:46.120663',1,1,679,'씨 사.(현재 힘든 정도? :43.2%)','https://d210.s3.ap-northeast-2.amazonaws.com/72075330-a5c0-4685-ac76-388d43b4d409.webm','VOICE'),(_binary '','2024-03-31 19:43:47.113014',1,1,680,'씨 사.(현재 힘든 정도? :43.2%)','https://d210.s3.ap-northeast-2.amazonaws.com/d5457ca4-89ba-4324-8d38-d44db1203e6c.webm','VOICE'),(_binary '','2024-03-31 19:44:19.039058',1,1,681,'야! 배포 환경에서도 제가 내 말 알아 들어 서라 나 자로 하게(현재 힘든 정도? :0.20000000000000284%)','https://d210.s3.ap-northeast-2.amazonaws.com/2f61303c-89bc-4e2d-b370-0b415536c8c9.webm','VOICE'),(_binary '','2024-03-31 20:52:55.228383',1,1,682,'하이','','TTS'),(_binary '','2024-03-31 20:53:01.020685',1,1,683,'허이','','TTS'),(_binary '','2024-03-31 20:53:08.996487',1,1,684,'ㅋㅋㅋㅋㅋ','','TTS'),(_binary '','2024-03-31 20:53:35.813753',1,1,685,'로(현재 힘든 정도? :83.7%)','https://d210.s3.ap-northeast-2.amazonaws.com/8d0a2269-1c3f-4f97-89e1-bcd956baad22.m4a','VOICE'),(_binary '\0','2024-04-01 08:29:20.509586',2,1,686,'','https://d210.s3.ap-northeast-2.amazonaws.com/841d4290-c48e-435c-97bc-d4d377cb007d.mp3','VOICE'),(_binary '','2024-03-31 23:43:40.043969',1,1,687,'누나 안녕','','TTS'),(_binary '','2024-03-31 23:43:47.303163',1,1,688,'누나 안녕','','TTS'),(_binary '','2024-03-31 23:44:06.790263',1,3,689,'규영 테스트','','TTS'),(_binary '\0','2024-04-01 10:56:08.986150',2,1,690,'','https://d210.s3.ap-northeast-2.amazonaws.com/69773e19-7c25-48f1-bb70-526e56f1f392.mp3','VOICE'),(_binary '\0','2024-04-01 14:55:11.851233',15,2,691,'','https://d210.s3.ap-northeast-2.amazonaws.com/6c623848-5bde-44dc-b542-56bf9b150bab.','VOICE'),(_binary '\0','2024-04-01 14:55:17.188229',15,2,692,'','https://d210.s3.ap-northeast-2.amazonaws.com/adab1e8e-f136-49ae-87b5-713a746349fd.','VOICE'),(_binary '','2024-04-01 06:21:09.742530',2,2,693,'너무 신나요! 프로젝트 가지 파이팅!(현재 힘든 정도? :0.09999999999999432%)','https://d210.s3.ap-northeast-2.amazonaws.com/dedb9904-b31b-4663-b17b-ec5bbf223680.webm','VOICE'),(_binary '\0','2024-04-01 15:22:36.412414',15,2,694,'','https://d210.s3.ap-northeast-2.amazonaws.com/797b8546-d39a-49e4-8e2a-b32f016d5cba.','VOICE'),(_binary '','2024-04-02 00:06:37.761761',1,1,695,'dd','','TTS'),(_binary '','2024-04-02 00:29:54.321952',1,1,696,'zzzz','','TTS'),(_binary '','2024-04-02 00:29:59.272895',1,1,697,'zzz','','TTS'),(_binary '','2024-04-02 00:30:07.524529',1,1,698,'ㅋㅋㅋㅋㅋ','','TTS'),(_binary '','2024-04-02 00:38:58.304293',1,1,699,'김세현 화이팅! 두 마디 되는지 확인하겠습니다(현재 힘든 정도? :6.0%)','https://d210.s3.ap-northeast-2.amazonaws.com/f6ea9a34-a0e4-4f1d-a3c1-07761ff15d1f.mp3','VOICE'),(_binary '','2024-04-02 04:12:10.928826',1,1,700,'안녕','','TTS'),(_binary '','2024-04-02 04:12:13.890321',1,1,701,'','','TTS'),(_binary '','2024-04-02 04:12:17.529558',1,1,702,'헤이','','TTS'),(_binary '','2024-04-02 04:17:20.319220',1,1,703,'안녕','','TTS'),(_binary '','2024-04-02 04:17:24.618234',1,1,704,'안녕','','TTS'),(_binary '','2024-04-02 04:17:33.767533',1,1,705,'ㅎㅇ','','TTS'),(_binary '','2024-04-02 04:17:43.463996',1,1,706,'안녕','','TTS'),(_binary '','2024-04-02 04:18:06.524167',1,1,707,'항 ㅣ ','','TTS'),(_binary '','2024-04-02 04:18:18.466922',1,1,708,'음','','TTS'),(_binary '','2024-04-02 17:36:01.155722',1,1,709,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-04-02 17:36:05.345778',1,1,710,'ㄴㄴㄴㄴ','','TTS'),(_binary '','2024-04-02 17:36:23.004503',1,1,711,'ㅇㅇㅇㅇ','','TTS'),(_binary '','2024-04-02 17:36:26.311145',1,1,712,'야 되냐?','','TTS'),(_binary '','2024-04-02 17:36:34.384846',1,1,713,'안녕','','TTS'),(_binary '','2024-04-02 11:28:54.276854',1,1,714,'안녕','','TTS'),(_binary '','2024-04-02 11:28:57.107132',1,1,715,'안녕','','TTS'),(_binary '','2024-04-02 11:29:05.866919',1,1,716,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋ','','TTS'),(_binary '','2024-04-02 11:29:35.584326',1,1,717,'안녕하세요. 녹음 하겠습니다.(현재 힘든 정도? :0.09999999999999432%)','https://d210.s3.ap-northeast-2.amazonaws.com/744bffdb-5604-48f9-85f0-e9087f56ed98.m4a','VOICE'),(_binary '','2024-04-02 16:44:16.085556',1,1,718,'안녕','','TTS'),(_binary '','2024-04-02 16:44:21.082995',1,1,719,'안녕','','TTS'),(_binary '','2024-04-02 16:55:03.652423',1,1,720,'김세현 할아버지 힘내세요(현재 힘든 정도? :1.7000000000000028%)','https://d210.s3.ap-northeast-2.amazonaws.com/7b4e4dd9-e096-4b6c-bf36-fa44ea1f7741.mp3','VOICE'),(_binary '','2024-04-02 17:00:33.841381',1,1,721,'아 아 아(현재 힘든 정도? :0.5999999999999943%)','https://d210.s3.ap-northeast-2.amazonaws.com/db4f5c12-e612-4022-8411-0853db57b21c.m4a','VOICE'),(_binary '','2024-04-02 17:04:10.650797',1,1,722,'','','TTS'),(_binary '','2024-04-02 17:05:31.102406',1,1,723,'아 왜 저장이 안 될까.(현재 힘든 정도? :6.3999999999999915%)','https://d210.s3.ap-northeast-2.amazonaws.com/a19a0647-7bf1-4a12-9563-c0e088d682b7.webm','VOICE'),(_binary '','2024-04-02 17:09:24.338892',1,1,724,'왜 이렇게 오래 걸리지?(현재 힘든 정도? :0.20000000000000284%)','https://d210.s3.ap-northeast-2.amazonaws.com/25c6e45b-9993-4240-86aa-bb47bffb3804.webm','VOICE'),(_binary '','2024-04-03 02:20:22.522597',1,1,725,'시간대가 어울려 졌는데 왜 이렇게 된 거지?(현재 힘든 정도? :2.200000000000003%)','https://d210.s3.ap-northeast-2.amazonaws.com/f74b0e29-bad4-4b7a-8094-b42e88941be6.webm','VOICE'),(_binary '','2024-04-02 17:27:15.425235',1,1,726,'안녕','','TTS'),(_binary '','2024-04-02 17:27:17.593580',1,1,727,'ㅎㅇ','','TTS'),(_binary '','2024-04-02 17:27:24.097868',1,1,728,'ㅎㅇ','','TTS'),(_binary '','2024-04-02 17:27:29.971760',1,1,729,'하이','','TTS'),(_binary '','2024-04-02 17:27:38.261882',1,1,730,'핼로우','','TTS'),(_binary '','2024-04-02 17:28:03.154443',1,1,731,'김세현 할아버지 힘내세요(현재 힘든 정도? :1.7000000000000028%)','https://d210.s3.ap-northeast-2.amazonaws.com/fa63bc57-2a0f-47d3-ad9e-516eff1aa9d9.mp3','VOICE'),(_binary '','2024-04-02 17:35:56.369537',1,1,732,'안녕','','TTS'),(_binary '','2024-04-02 17:35:58.729509',1,1,733,'ㅎㅇ','','TTS'),(_binary '','2024-04-02 17:36:33.874731',1,1,734,'이응','','TTS'),(_binary '','2024-04-02 17:36:39.329463',1,1,735,'하이','','TTS'),(_binary '','2024-04-02 17:39:41.080479',1,1,736,'음','','TTS'),(_binary '','2024-04-02 18:14:20.207000',1,1,737,'하이','','TTS'),(_binary '','2024-04-02 18:14:22.579863',1,1,738,'하이','','TTS'),(_binary '','2024-04-02 18:15:24.830335',1,1,739,'음','','TTS'),(_binary '','2024-04-02 18:15:28.388850',1,1,740,'음','','TTS'),(_binary '','2024-04-02 18:18:45.861137',1,1,741,'아 이 대련 아(현재 힘든 정도? :3.5%)','https://d210.s3.ap-northeast-2.amazonaws.com/132d6ef7-f003-4ef1-84a9-d5760b5bfe06.m4a','VOICE'),(_binary '\0','2024-04-03 00:37:39.759224',2,15,742,'','https://d210.s3.ap-northeast-2.amazonaws.com/5b1eb2d5-996d-4190-8dd9-319a83f05e5d.','VOICE'),(_binary '\0','2024-04-03 00:37:41.763134',2,15,743,'','https://d210.s3.ap-northeast-2.amazonaws.com/f9f50c82-6f62-4ad0-8d23-8cf9d3e43320.','VOICE'),(_binary '\0','2024-04-03 00:38:36.553369',2,15,744,'','https://d210.s3.ap-northeast-2.amazonaws.com/428a89f0-dfc3-4e9c-bdfb-c354c187da0b.','VOICE'),(_binary '\0','2024-04-03 00:39:52.840987',15,2,745,'','https://d210.s3.ap-northeast-2.amazonaws.com/39293258-711e-4fac-bcee-2409ed517f68.','VOICE'),(_binary '\0','2024-04-03 01:01:49.324753',2,15,746,'','https://d210.s3.ap-northeast-2.amazonaws.com/c7f92241-c918-40a2-8102-e887901591e1.','VOICE'),(_binary '\0','2024-04-03 01:03:50.742982',2,15,747,'','https://d210.s3.ap-northeast-2.amazonaws.com/d37c3855-c76a-4c90-8bcd-6625b0c8acb2.','VOICE');
/*!40000 ALTER TABLE `voice_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_history`
--

DROP TABLE IF EXISTS `wallet_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_history` (
  `wallet_history_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `block_uri` varchar(255) NOT NULL,
  `operator` bit(1) NOT NULL,
  `price` int(11) NOT NULL,
  `wallet_type` enum('EGG','MONEY') NOT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`wallet_history_id`),
  KEY `FKj8fl4sv6ieh327krywc7r7jdo` (`member_id`),
  CONSTRAINT `FKj8fl4sv6ieh327krywc7r7jdo` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_history`
--

LOCK TABLES `wallet_history` WRITE;
/*!40000 ALTER TABLE `wallet_history` DISABLE KEYS */;
INSERT INTO `wallet_history` VALUES (1,'2024-04-02 14:49:15.992958','https://metadata-store.klaytnapi.com/3951992d-8a79-795d-5b23-5eda010d8971/f94e05f0-0fea-a2c1-fd52-711572f1ccaa.json',_binary '\0',10,'EGG',55),(2,'2024-04-02 15:02:26.113168','https://metadata-store.klaytnapi.com/3951992d-8a79-795d-5b23-5eda010d8971/3d7127ab-a246-b540-3b91-8965f2cc558f.json',_binary '',1000,'MONEY',55),(3,'2024-04-02 07:00:54.152081','https://metadata-store.klaytnapi.com/3951992d-8a79-795d-5b23-5eda010d8971/f245bed8-1f1d-5936-cb19-ecd73bd344dd.json',_binary '\0',10,'MONEY',55),(4,'2024-04-02 08:12:22.551929','https://metadata-store.klaytnapi.com/3951992d-8a79-795d-5b23-5eda010d8971/9f46863d-e7ce-1928-0dc2-407a4102ecdf.json',_binary '\0',80000,'MONEY',15);
/*!40000 ALTER TABLE `wallet_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-03 10:53:20
