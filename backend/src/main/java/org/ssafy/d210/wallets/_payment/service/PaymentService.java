package org.ssafy.d210.wallets._payment.service;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.ssafy.d210._common.exception.CustomException;
import org.ssafy.d210._common.response.ApiResponseDto;
import org.ssafy.d210._common.service.UserDetailsImpl;
import org.ssafy.d210.members.entity.Members;
import org.ssafy.d210.members.repository.MembersRepository;
import org.ssafy.d210.wallets._payment.dto.request.PaymentApproveRequest;
import org.ssafy.d210.wallets._payment.dto.request.PaymentExchangeRequest;
import org.ssafy.d210.wallets._payment.dto.request.PaymentReadyRequest;
import org.ssafy.d210.wallets._payment.dto.response.PaymentApproveResponse;
import org.ssafy.d210.wallets._payment.dto.response.PaymentExchangeResponse;
import org.ssafy.d210.wallets._payment.dto.response.PaymentReadyResponse;
import org.ssafy.d210.wallets._payment.entity.Payment;
import org.ssafy.d210.wallets._payment.repository.PaymentRepository;
import org.ssafy.d210.wallets.entity.MemberAccount;
import org.ssafy.d210.wallets.entity.WalletHistory;
import org.ssafy.d210.wallets.entity.WalletType;
import org.ssafy.d210.wallets.repository.MemberAccountRepository;
import org.ssafy.d210.wallets.repository.WalletHistoryRepository;
import org.ssafy.d210.wallets.service.WalletsService;

import java.util.HashMap;
import java.util.Map;

import static org.ssafy.d210._common.exception.ErrorType.*;
import static org.ssafy.d210._common.response.MsgType.PUT_MONEY_EXCHANGE_SUCCESSFULLY;

@Slf4j
@Service
@Transactional

public class PaymentService {

    @Value("${pay.secret-key}")
    private String secretKey;
    private final RestTemplate restTemplate;
    private final PaymentRepository paymentRepository;
    private final MembersRepository membersRepository;
    private final MemberAccountRepository memberAccountRepository;
    private final WalletsService walletsService;

    private final String kakaoPayReadyUrl = "https://open-api.kakaopay.com/online/v1/payment/ready";
    private final String kakaoPayApproveUrl = "https://open-api.kakaopay.com/online/v1/payment/approve";

    public PaymentService(RestTemplateBuilder restTemplateBuilder, PaymentRepository paymentRepository, MembersRepository membersRepository, MemberAccountRepository memberAccountRepository, WalletsService walletsService) {
        this.restTemplate = restTemplateBuilder.build();
        this.paymentRepository = paymentRepository;
        this.membersRepository = membersRepository;
        this.memberAccountRepository = memberAccountRepository;
        this.walletsService = walletsService;
    }

    // 결제 준비
    // 모바일 혹은 pc로 카톡 결제 후 DB에 결제 내역 저장
    public PaymentReadyResponse preparePayment(UserDetailsImpl userDetails, PaymentReadyRequest paymentReadyRequest) {

        // 사용자 정보 가져오기(Token 유효성 검사)
        Members member = findByEmailAndDeletedAtIsNull(userDetails.getMember().getEmail());

        // 카카오페이 결제를 시작하기 위해 결제정보를 카카오페이 서버에 전달하고 결제 고유번호(TID)와 URL을 응답받는 단계
        // Secret key를 헤더에 담아 파라미터 값들과 함께 POST로 요청
        // 요청이 성공하면 응답 바디에 JSON 객체로 다음 단계 진행을 위한 값들 받기
        // 서버는 tid를 저장하고, 클라이언트는 사용자 환경에 맞는 URL로 리다이렉트
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "SECRET_KEY " + secretKey);

        HttpEntity<PaymentReadyRequest> request = new HttpEntity<>(paymentReadyRequest, headers);
        ResponseEntity<PaymentReadyResponse> response = restTemplate.postForEntity(kakaoPayReadyUrl, request, PaymentReadyResponse.class);

        // 결제 정보 생성 및 DB 저장
        Payment payment = new Payment();
        payment.setCid("TC0ONETIME");
        payment.setPartner_order_id(paymentReadyRequest.getPartner_order_id());
        payment.setPartner_user_id(paymentReadyRequest.getPartner_user_id());
        payment.setTotal_amount(Math.toIntExact(paymentReadyRequest.getTotal_amount()));
        payment.setMember(member);
        payment.setTid(response.getBody().getTid());
        payment.setIsApprove(false);
        paymentRepository.save(payment);

        return response.getBody();
    }

    // 결제 승인
    // member의 카카오톡으로 결제 완료 카톡 보내기
    public PaymentApproveResponse approvePayment(UserDetailsImpl userDetails, PaymentApproveRequest paymentApproveRequest) {

        // 사용자 정보 가져오기(Token 유효성 검사)
        Members member = findByEmailAndDeletedAtIsNull(userDetails.getMember().getEmail());
        MemberAccount memberAccount = findMemberAccountByMemberAccountId(member.getMemberAccountId().getId());
        Payment payment = findPaymentByTid(paymentApproveRequest.getTid());

        // 결제 승인 요청에 필요한 정보를 설정
        Map<String, String> requestMap = new HashMap<>();
        requestMap.put("cid", paymentApproveRequest.getCid()); // 가맹점 코드, 테스트 코드 또는 실제 발급받은 코드 사용
        requestMap.put("tid", paymentApproveRequest.getTid()); // 결제 준비 응답에서 받은 tid
        requestMap.put("partner_order_id", paymentApproveRequest.getPartner_order_id()); // 가맹점 주문번호
        requestMap.put("partner_user_id", paymentApproveRequest.getPartner_user_id()); // 가맹점 회원 id
        requestMap.put("pg_token", paymentApproveRequest.getPg_token()); // 사용자 결제 수단 선택 후 받은 pg_token

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "SECRET_KEY " + secretKey);

        // 사용자가 결제 수단을 선택하고 비밀번호를 입력해 결제 인증을 완료한 뒤, 최종적으로 결제 완료 처리를 하는 단계
        // 인증완료시, 응답받은 pg_token과 tid로 최종 승인요청
        // 결제 승인 API를 호출하면, 결제 준비 단계에서 시작된 결제건이 승인으로 완료 처리
        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestMap, headers);
        ResponseEntity<PaymentApproveResponse> response = restTemplate.postForEntity(kakaoPayApproveUrl, request, PaymentApproveResponse.class);

        if (response.getBody() != null) {
            // DB의 money량 추가
            memberAccount.putMoney(paymentApproveRequest.getTotal_amount(), true);
            payment.updateIsApprove(true);
        }

        walletsService.writeDBandBlockchain(WalletHistory.of(WalletType.MONEY, true, paymentApproveRequest.getTotal_amount(), "", member), "카카오페이로 MONEY 충전");

        return response.getBody();
    }

    public ApiResponseDto<PaymentExchangeResponse> exchangeMoney(UserDetailsImpl userDetails, PaymentExchangeRequest paymentExchangeRequest) {

        Members member = findByEmailAndDeletedAtIsNull(userDetails.getMember().getEmail());
        MemberAccount memberAccount = findMemberAccountByMemberAccountId(member.getMemberAccountId().getId());

        Integer putMoneyResult = memberAccount.putMoney(paymentExchangeRequest.getExchangeMoneyValue(), false);

        walletsService.writeDBandBlockchain(WalletHistory.of(WalletType.MONEY, false, paymentExchangeRequest.getExchangeMoneyValue(), "", member), "MONEY 환전");

        return ApiResponseDto.of(PUT_MONEY_EXCHANGE_SUCCESSFULLY, PaymentExchangeResponse.of(putMoneyResult));
    }

    public Members findByEmailAndDeletedAtIsNull(String email) {
        return membersRepository.findByEmailAndDeletedAtIsNull(email)
                .orElseThrow(() -> new CustomException(NOT_FOUND_MEMBER));
    }

    public MemberAccount findMemberAccountByMemberAccountId(Long memberAccountId) {
        return memberAccountRepository.findMemberAccountById(memberAccountId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_MEMBER_ACCOUNT));
    }

    public Payment findPaymentByTid(String tid) {
        return paymentRepository.findPaymentByTid(tid)
                .orElseThrow(() -> new CustomException(NOT_FOUND_PAYMENT));
    }
}