package org.ssafy.d210._common.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.UnexpectedRollbackException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.ssafy.d210._common.request.*;
import org.ssafy.d210._common.response.ResTTSInfo;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.members.entity.MsgType;
import org.ssafy.d210.members.entity.VoiceMessage;
import org.ssafy.d210.members.repository.MembersRepository;
import org.ssafy.d210.members.repository.VoiceMessageRepository;
import com.google.gson.Gson;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.concurrent.ExecutionException;


@Slf4j
@Service
@RequiredArgsConstructor
public class SocketService {

    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations template;
    private final S3Base64Uploader s3Base64Uploader;
    private final VoiceMessageRepository voiceMessageRepository;
    private final MembersRepository membersRepository;
    private final TranscribeService transcribeService;

    @Value("${google.Text-to-Speech-key}")
    private String GoogleAPIKey;
    /*
    * A. 입장 메세지 관리
    *   1) 입장 시 채팅방 인원 수 증가
    *   2) TTS 변환
    *   3) 변환된 TTS를 S3에 저장후 URL로 받기
    *   4) URL도 메세지 DTO에 더하기
    *   5) 메세지 전송
    *
    *   -> 인자: 직렬화된 메세지 객체
    * */

    @Transactional
    public void sendEnterMessage(String publishMessage){
        try {
            GeoLocation gps = objectMapper.readValue(publishMessage, GeoLocation.class);
            log.info("위도: {}, 경도: {}", gps.getLatitude(), gps.getLongitude());

            sendLocationToSubscriber(gps);

        } catch (Exception e){
            log.error("Exception {}",e.getMessage());
        }
    }


    @Transactional
    public void sendTalkMessage(String publishMessage){
        try {
            MessageInfo msg = objectMapper.readValue(publishMessage, MessageInfo.class);


            // A. 들어온 메세지 확인
            log.info("들어온 입장 메세지: " +
                    "\n 보낸 이: "+ msg.getSenderId() +
                    "\n 받는 이: "+ msg.getReceiverId() +
                    "\n 문자 타입: " + msg.getMessageType() +
                    "\n 문자 내용: " + msg.getTextContent() +
                    "\n VoiceURL: " + msg.getVoiceURL()
            );

//            if(msg.getMessageType().equals("TTS")){
//                try{
//                    TextToSpeech(msg);
//                }catch (Exception e){
//                    log.info(e.getMessage());
//                }
//            }


            // B. 만약 들어온 메세지의 URL이 BASE64라면, http로 변환
            if(msg.getVoiceURL().length()>=10 && !msg.getVoiceURL().substring(0,4).equals("http")){
               String httpUrl =  s3Base64Uploader.Base64ToHttp(msg.getVoiceURL());
               log.info(httpUrl);
               msg.setVoiceURL(httpUrl);
            }
            msg.setCreatedAt(LocalDateTime.now());
            saveAndSendingMessageToSubscriber(msg);

        } catch (Exception e){
            log.error("Exception {}",e.getMessage());
        }
    }

    @Transactional
    public void sendQuitMessage(String publishMessage) {
        try {
            MessageInfo msg = objectMapper.readValue(publishMessage, MessageInfo.class);


            // A. 들어온 메세지 확인
            log.info("들어온 입장 메세지: \n" +
                    "보낸 이: "+ msg.getSenderId() +
                    "받는 이: "+ msg.getReceiverId()
            );

            // B. 메세지 내용 채우기
            msg.setTextContent(msg.getSenderId()+"님이 퇴장하셨습니다!");
            msg.setCreatedAt(LocalDateTime.now());
            msg.setOpened(false);


            saveAndSendingMessageToSubscriber(msg);

        } catch (Exception e){
            log.error("Exception {}",e.getMessage());
        }
    }


    // Message 보내기
    public void  saveAndSendingMessageToSubscriber(MessageInfo msg ){

        // A. 보낸 사람이 받는 사람과 같다. == 방의 주인이다.
        // 그러면 STT 서비스 시작

        log.info(String.valueOf(Objects.equals(msg.getSenderId(), msg.getReceiverId())));

        if(msg.getMessageType().equals("VOICE") && Objects.equals(msg.getSenderId(), msg.getReceiverId())){
            try {
                String text = transcribeService.transcribeAudioFromS3(msg.getVoiceURL()).get();
                msg.setTextContent(text);
            } catch (InterruptedException | ExecutionException | UnexpectedRollbackException e) {
               log.info(e.getMessage());
            }
        }


        // B. 메세지를 먼저 전송 -> 속도를 위해!!
        template.convertAndSend("/sub/member/"+msg.getReceiverId(), msg);

        if(msg.getSenderId() == 1000){
            return;
        }

        // C. 메세지를 Entity로 바꿔서 DB에 저장
        Members sender = membersRepository.findById(msg.getSenderId()).orElse(null);
        Members receiver = membersRepository.findById(msg.getReceiverId()).orElse(null);


        voiceMessageRepository.save(
                VoiceMessage.toEntity(
                        sender,
                        receiver,
                        msg.getVoiceURL(),
                        true,
                        msg.getTextContent(),
                        msg.getMessageType().equals("VOICE")? MsgType.VOICE : MsgType.TTS
                ));


        log.info("{}",msg.getReceiverId());


    }

    public void sendLocationToSubscriber (GeoLocation gps) {

        template.convertAndSend("/sub/gps/"+gps.getReceiverId(), gps);

    }




    @Transactional
    public ResTTSInfo TextToSpeech(MessageInfo msg ){

        Members sender = membersRepository.findById(msg.getSenderId()).orElse(null);

        // A. RestTemplate Header 작성
        HttpHeaders headers = new HttpHeaders();
        Charset utf8 = StandardCharsets.UTF_8;
        MediaType mediaType = new MediaType("application","json", utf8);
        headers.setContentType(mediaType);

        // B. POST 요청의 PARAMS 작성

        Gson gson = new Gson();

        JsonObject inputJson = new JsonObject();
        inputJson.addProperty("text", msg.getTextContent());

        JsonObject voiceJson = new JsonObject();
        voiceJson.addProperty("languageCode", "ko-KR");
        voiceJson.addProperty("name", "ko-KR-Neural2-c");
        voiceJson.addProperty("ssmlGender", sender.getGender() == Members.GenderType.MALE ? "MALE" : "FEMALE");

        // audioConfig JSON 생성
        JsonObject audioConfigJson = new JsonObject();
        audioConfigJson.addProperty("audioEncoding", "MP3");

        // 전체 요청 JSON 생성
        JsonObject requestJson = new JsonObject();
        requestJson.add("input", inputJson);
        requestJson.add("voice", voiceJson);
        requestJson.add("audioConfig", audioConfigJson);

        // 요청 Body 문자열로 변환
        String requestBody = gson.toJson(requestJson);


        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> responseEntity = new RestTemplate().exchange(
                "https://texttospeech.googleapis.com/v1/text:synthesize?key="+GoogleAPIKey,
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        try {
            ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            log.info("TTS 변환 완료={}", responseEntity.getBody());
            return objectMapper.readValue(responseEntity.getBody(), ResTTSInfo.class);
        }catch (JsonProcessingException e) {
            // B-5) 에러 내역 참고
            log.info(e.getMessage());
            return null;
        }

    }
}


