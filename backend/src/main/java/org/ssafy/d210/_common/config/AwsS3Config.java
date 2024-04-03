package org.ssafy.d210._common.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.transcribe.AmazonTranscribe;
import com.amazonaws.services.transcribe.AmazonTranscribeClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsS3Config {

    // 1. 아마존 S3 서비스 실행을 위해서는 S3에서 지급한 접근 키, 비밀키, 이용지역이 필요하다.
    // 2. 해당 내용을 설정파일에 적어둔 뒤, @Value 어노테이션을 이용해 불러온다.

    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    @Value("${cloud.aws.region.static}")
    private String region;


    // 3. 위에 설정한 값들로 아마존 서비스와 연결을 준비한다.


    // 1) 개발자가 직접 제어가 불가능한 외부 라이브러리 객체를 Bean으로 등록하고자 할 떄 사용하는 어노테이션
    //    우리가 등록하려는 Bean 객체를 반환하는 Method에 붙이면, 그 반환 값이 빈 객체로 application.xml에 적힌다.
    @Bean
    public AmazonS3Client amazonS3Client() {


        // 2) Credentials는 신임장 -> 추천서를 뜻한다. 우리는 accessKey와 secretKey를 주면
        //    Basic 인증 (단순 base64 인코딩 방식으로 만든 토큰을 사용하여 인증하는 방식)
        //    Basic 인증 방식을 이용한 신임장 (허가증)을 주는 로직
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);

        // 3) 우리가 진짜 사용할 AmazonS3Client 객체를 만들어서 사용한다.
        //    우리가 만드는 것은 Server지만, S3와 SpringBoot의 입장에서 보면, Spring Boot가 정보를 제공받는 Client 역할이다.
        return (AmazonS3Client) AmazonS3ClientBuilder.standard()
                .withRegion(region) // 가용지역 -> 필수 인수
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds)) // 허가증 받았니? -> 필수 요소
                .build();
    }

    @Bean
    public AmazonTranscribe amazonTranscribe() {
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);

        return AmazonTranscribeClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();
    }


}


