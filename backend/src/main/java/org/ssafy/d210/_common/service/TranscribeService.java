package org.ssafy.d210._common.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.transcribe.AmazonTranscribe;
import com.amazonaws.services.transcribe.model.*;
import com.amazonaws.util.IOUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.d210._common.response.STTInfo.TranscriptionResult;

import java.io.DataInput;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class TranscribeService {


    private final AmazonTranscribe amazonTranscribe;
    private final AmazonS3Client amazonS3Client;
    private final ObjectMapper objectMapper;

    private String outPutKey;

    // A. STT 요청 보내기

    @Transactional
    public CompletableFuture<String> transcribeAudioFromS3(String audioS3Url) {

        CompletableFuture<String> future = new CompletableFuture<>();

        // A-1. URL에서 맨 마지막 3글자를 떼어내서 확인
        String extension = audioS3Url.substring(audioS3Url.length()-3);

        if(audioS3Url.substring(audioS3Url.length()-4).equals("webm")){
            extension = "webm";
        }

        log.info("STT 서비스 적용하려는 음성메세지의 확장자가 유효한 확장자인가? {}", extension);

        String transcriptionJobName = "TranscriptionJob_" + System.currentTimeMillis();

        StartTranscriptionJobRequest transcribeRequest = new StartTranscriptionJobRequest()
                .withLanguageCode("ko-KR")
                .withMediaFormat(extension)
                .withMedia(new Media().withMediaFileUri(audioS3Url))
                .withOutputBucketName("d210")
                .withOutputKey("my-transcript2")
                .withTranscriptionJobName(transcriptionJobName);

        StartTranscriptionJobResult result = amazonTranscribe.startTranscriptionJob(transcribeRequest);

        new Thread(() -> {
            while (true){
                String jobStatus = getTranscriptionJobStatus(result.getTranscriptionJob().getTranscriptionJobName());

                if ("COMPLETED".equals(jobStatus)) {
                    log.info("Transcription job completed");

                    GetTranscriptionJobRequest getTranscriptionJobRequest = new GetTranscriptionJobRequest()
                            .withTranscriptionJobName(result.getTranscriptionJob().getTranscriptionJobName());

                    GetTranscriptionJobResult result2 = amazonTranscribe.getTranscriptionJob(getTranscriptionJobRequest);

                    log.info("STT 결과값에 든 내용: {}", result2);

                    String transcriptFileUri = getTranscriptFileUri(result2.getTranscriptionJob());
                    if (transcriptFileUri != null) {
                        String textResult = getTextFromTranscriptFile(transcriptFileUri);
                        future.complete(textResult);
                    } else {
                        future.completeExceptionally(new RuntimeException("Transcript file URI is null"));
                    }
                    break;
                } else if ("FAILED".equals(jobStatus)) {
                    future.completeExceptionally(new RuntimeException("Transcription job failed"));
                    break;
                } else {
                    log.info("Transcription job status: {}", jobStatus);
                }

                try {
                    Thread.sleep(5000); // 5초마다 상태 확인
                } catch (InterruptedException e) {
                    future.completeExceptionally(e);
                    break;
                }
            }
            log.info("STT Thread가 종료되었습니다.======================");

        }).start();

        log.info("STT JOB RESULT == {}", result);
        return future;
    }

    private String getTranscriptionJobStatus(String transcriptionJobName) {
        // Transcribe 작업 상태 확인 로직 구현
        GetTranscriptionJobRequest getTranscriptionJobRequest = new GetTranscriptionJobRequest()
                .withTranscriptionJobName(transcriptionJobName);

        GetTranscriptionJobResult result = amazonTranscribe.getTranscriptionJob(getTranscriptionJobRequest);

        return result.getTranscriptionJob().getTranscriptionJobStatus();
    }

    private String getTextFromTranscriptFile(String transcriptFileUri) {
        // S3에서 텍스트 결과 가져오는 로직 구현
        URI uri = URI.create(transcriptFileUri);
        log.info("transcriptFileUri: {}",transcriptFileUri);
        String bucketName = "d210";
        String objectKey = "my-transcript2"; // 앞의 '/' 제거

        String textResult = "";

        // S3 버킷에서 결과 파일 가져오기
        S3Object transcriptObject = amazonS3Client.getObject(new GetObjectRequest(bucketName,objectKey));

        StringBuilder sb = new StringBuilder();

        // 결과 파일에서 텍스트 가져오기
        try (InputStream inputStream = transcriptObject.getObjectContent()) {
            textResult = IOUtils.toString(inputStream);
            TranscriptionResult result =  objectMapper.readValue(textResult, TranscriptionResult.class);

            String transcript = result.getResults().getTranscripts().get(0).getTranscript();
            double confidence = Double.parseDouble(result.getResults().getItems().get(0).getAlternatives().get(0).getConfidence());

            sb.append(transcript).append("(현재 힘든 정도? :").append(100 -(confidence*100)).append("%)");

        } catch (Exception e) {
            log.info("{}", e.getMessage());
        }

        log.info("음성 메세지 변환 내역 === {}",textResult);

        return String.valueOf(sb);
    }

    private String getTranscriptFileUri(TranscriptionJob transcriptionJob) {
        if (transcriptionJob != null) {
            Transcript transcript = transcriptionJob.getTranscript();
            if (transcript != null) {
                return transcript.getTranscriptFileUri();
            }
        }
        return null;
    }
}
