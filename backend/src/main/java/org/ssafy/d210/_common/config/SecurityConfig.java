package org.ssafy.d210._common.config;

import jakarta.servlet.DispatcherType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.ssafy.d210._common.exception.AccessDeniedHandler;
import org.ssafy.d210._common.exception.AuthenticationEntryPoint;
import org.ssafy.d210._common.service.jwt.JwtAuthFilter;
import org.ssafy.d210._common.service.jwt.JwtUtil;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {


    // * Security용
    private final AuthenticationEntryPoint authenticationEntryPoint;
    private final AccessDeniedHandler accessDeniedHandler;
    private final JwtUtil jwtUtil;

    private final String [] whiteList = {"/api/**", "/ws-stomp/**", "/swagger-ui/**", "/api-docs/**","/swagger-resources/**", "/webjars/**"
    ,"/oauth2/**", "/error"};


    @Bean
    // 1. 비밀번호를 안전하게 저장할 수 있도록 비밀번호의 단방향 암호화를 지원하는 인터페이스
    // 우리는 해당 인터페이스의 구현체 중 하나인 BCryptPasswordEncoder를 사용한다.
    // 해당 함수는 Bcrypt라는 해시 함수를 사용해 비밀번호를 암호화 한다.
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    /* 2.  SpringSecurity에서 제공하는 인증, 인가를 위한 필터들의 모음
     *     가장 핵심이 되는 기능을 제공, 거의 대부분의 Security 서비스는 이 Filter Chain에서 실행됨
     *     개발 취지에 따라 기본 제공되는 필터들 사이에 커스텀 필터를 넣어도 된다.
     */
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .formLogin(AbstractHttpConfigurer::disable);       // 1)
        http
                .httpBasic(AbstractHttpConfigurer::disable);       // 2)
        http
                .csrf(AbstractHttpConfigurer::disable);            // 3)

        http
                .cors((corsCustomizer -> corsCustomizer.configurationSource(request -> {

                    CorsConfiguration configuration = new CorsConfiguration();

                    configuration.setAllowedOriginPatterns(Arrays.asList("*"));
                    configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
                    configuration.setAllowCredentials(true);
                    configuration.setAllowedHeaders(Arrays.asList("*"));
                    configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                    return configuration;
                })));
        http
                .headers((headers) -> headers.frameOptions(
                        HeadersConfigurer.FrameOptionsConfig::sameOrigin
                ));                                                 // 4)
        http
                .sessionManagement((sessionManagement) ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );                                                  // 5)

        http                                                        // 6)
                .authorizeHttpRequests(
                        (auth) ->
                                auth
                                        .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                                        .dispatcherTypeMatchers(DispatcherType.ASYNC).permitAll()

                                        .requestMatchers(whiteList).permitAll()
//                                      .requestMatchers("/api/oauth/authorize").permitAll()
                                        .anyRequest().authenticated()

                )
                   .exceptionHandling(authentication ->        // 7)
                           authentication.authenticationEntryPoint(authenticationEntryPoint)
                                  .accessDeniedHandler(accessDeniedHandler))

                // 8)
                .addFilterBefore(new JwtAuthFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();


    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cors = new CorsConfiguration();
        cors.setAllowedOriginPatterns(Arrays.asList("*"));
        cors.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        cors.setAllowedHeaders(Arrays.asList("*"));
        cors.addExposedHeader("Authorization");
        cors.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);  // 모든 경로에 대해 CORS 설정 적용

        return source;
    }



}