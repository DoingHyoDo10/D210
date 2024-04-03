package org.ssafy.d210._common.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import org.ssafy.d210._common.response.ResponseUtils;

import java.io.IOException;
import java.util.Enumeration;

/*
 * (〜￣△￣)〜    인증 되지 않은 사용자의 요청에 대한 처리       〜(￣△￣〜)
 *  A.  시큐리티 필터체인에서 인증 되지 않은 사용자의 요청이 들어오면 에러가 생기고
 *      해당 EntryPoint로 들어온다.
 *
 * */
@Component
@Slf4j
public class AuthenticationEntryPoint implements org.springframework.security.web.AuthenticationEntryPoint {


    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {


        String exception = (String) request.getAttribute("exception");

        log.error(request.getRequestURI());

        // 소켓 헤더 확인하기
        Enumeration<String> headerNames = request.getHeaderNames();

        while (headerNames.hasMoreElements()){
            String name = headerNames.nextElement();
            String value = request.getHeader(name);

            log.info("header 이름: {} <<<<<<< 값: {}", name, value);
        }

        if(exception != null) {
            if (ErrorType.valueOf(exception).equals(ErrorType.TOKEN_DOESNT_EXIST)) {
                exceptionHandler(response, ErrorType.TOKEN_DOESNT_EXIST);
                return;
            }

            if (ErrorType.valueOf(exception).equals(ErrorType.NOT_VALID_TOKEN)) {
                exceptionHandler(response, ErrorType.NOT_VALID_TOKEN);
                return;
            }

            if(ErrorType.valueOf(exception).equals(ErrorType.EXPIRED_TOKEN)) {

                exceptionHandler(response, ErrorType.EXPIRED_TOKEN);
                return;
            }

            if (ErrorType.valueOf(exception).equals(ErrorType.NOT_FOUND_MEMBER)) {
                exceptionHandler(response, ErrorType.NOT_FOUND_MEMBER);
            }

        }else {
            authException.printStackTrace();
            exceptionHandler(response, ErrorType.ANOTHER_ERROR);
        }
    }


    // B. 에러에 대한 답변을 JSON 형태의 Response로 만드는 공간이다.
    public  void exceptionHandler(HttpServletResponse response, ErrorType error) {
        // B-1 에러에 대한 MetaData
        response.setStatus(error.getCode());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");


        try {
            // B-2 에러가 무엇인지에 대한 Body를 Response에 쓴다.
            String json = new ObjectMapper().writeValueAsString(ResponseUtils.error(ErrorResponse.of(error)));
            response.getWriter().write(json);

            //      에러 내용 로그 확인
            log.error(" 에러 내용은 다음과 같습니다.={}", error.getMsg());
        } catch (Exception e){
            // B-3 Response 작성 과정에서 에러가 났을 경우 알려준다.
            log.error(e.getMessage());
        }
    }
}
