package org.ssafy.d210._common.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import jakarta.xml.bind.DatatypeConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.ssafy.d210._common.exception.CustomException;
import org.ssafy.d210._common.exception.ErrorResponse;
import org.ssafy.d210._common.exception.ErrorType;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Base64Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String Base64ToHttp (String base64EncodedData){

        try {
            // 1-1) Base64 명세 나누기
            String [] strings = base64EncodedData.split(",");

            log.info(base64EncodedData);

            String base64File = strings[1];


            // 1-2) if 문을 통해 확장자명을 찾음
            String extension = "";

            if(strings[0].equals("data:image/jpeg;base64")){
                extension = "jpeg";
            } else if(strings[0].equals("data:image/png;base64")){
                extension = "png";
            } else if(strings[0].equals("data:image/jpg;base64")){
                extension = "jpg";
            } else if(strings[0].equals("data:image/gif;base64")){
                extension = "gif";
            } else if (strings[0].equals("data:audio/wav;base64")) {
                extension = "wav";
            } else if (strings[0].equals("data:audio/mp3;base64")) {
                extension = "mp3";
            } else if (strings[0].equals("data:audio/mpeg;base64")) {
                extension = "mp3";
            } else if (strings[0].equals("data:audio/3gpp;base64")) {
                extension = "m4a";
            } else if (strings[0].equals("data:audio/webm;base64")) {
                extension = "webm";
            } else if (strings[0].equals("data:audio/x-m4a;base64")){
                extension = "m4a";
            }

            log.info(extension);

            // 1-3) base64를 bytes 로 변환
            byte [] fileBytes = DatatypeConverter.parseBase64Binary(base64File);

            // 1-4) byte 내역 저장할 임시 파일 생성
            File tempFile = File.createTempFile("audio" , "." + extension);

            try (OutputStream outputStream = new FileOutputStream(tempFile)){

                // 1-5) byte 배열로 변환한 내용을 임시 파일에 써준다.
                outputStream.write(fileBytes);
            }

            log.info(tempFile.getAbsolutePath());

            // 1-6) 파일 이름은 유일 해야 한다.
            String originalName = UUID.randomUUID() +"."+extension;

            // 1-7) S3에 tempFile을 저장하고 URL을 받는다.
            //      여기서 사용하는 S3 저장 방식은 Stream 방식이다.
            //      Stream 방식은 서버의 메모리를 쓰지 않아서, 메모리 낭비가 없다.
            //      하지만 용량이 큰 파일일수록 메모리를 쓰지 않고 바로 업로드 하기 때문에 시간이 오래 걸린다.
            //      93MB -> 16분 걸림
            //      작은 파일 업로드에 용이
            amazonS3Client.putObject(new PutObjectRequest(bucket, originalName, tempFile));

            String awsS3FileUrl = amazonS3Client.getUrl(bucket, originalName).toString();

            try {
                FileOutputStream fileOutputStream = new FileOutputStream(tempFile);

                fileOutputStream.close();

                if(tempFile.delete()){
                    log.info("Base64로 들어온 파일이 성공적으로 임시파일로 변환되어 S3에 업로드 되었고, 임시파일도 정상적으로 삭제 되었습니다.");
                }else {
                    log.error("Base64로 들어온 파일이 성공적으로 임시파일로 변환되어 S3에 업로드 되었으나, 임시파일 삭제에 실패했습니다.");
                }
            }catch (Exception e){
              log.error("{}",ErrorType.CANT_DELETE_FILE);
            }

            return awsS3FileUrl;

        }catch (Exception e){
            throw new CustomException(ErrorType.CANT_UPLOAD_FILE);
        }

    }
}
