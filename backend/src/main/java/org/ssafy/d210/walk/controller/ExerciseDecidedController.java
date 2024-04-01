package org.ssafy.d210.walk.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.ssafy.d210._common.response.ApiResponseDto;
import org.ssafy.d210._common.response.MsgType;
import org.ssafy.d210._common.response.ResponseUtils;
import org.ssafy.d210._common.service.UserDetailsImpl;
import org.ssafy.d210.walk.service.ExerciseDecidedService;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/walk/decided")
@Slf4j
public class ExerciseDecidedController {

    private final ExerciseDecidedService exerciseDecidedService;

    @Operation(summary = "운동 시작")
    @GetMapping("/start")
    public ApiResponseDto<?> setStartDecideExercise(@RequestParam(value = "start-time", required = true) LocalDateTime startTime, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(exerciseDecidedService.saveStartTime(userDetails.getMember(), startTime), MsgType.SET_DECIDED_EXERCISE_START_SUCCESSFULLY);
    }

    @Operation(summary = "운동 끝! 작정한 운동 저장!")
    @GetMapping("/end")
    public ApiResponseDto<?> setEndDecideExercise(@RequestParam(value = "end-time", required = true) LocalDateTime endTime, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(exerciseDecidedService.saveEndTime(userDetails.getMember(), endTime), MsgType.SET_DECIDED_EXERCISE_END_SUCCESSFULLY);
    }

//    @Operation(summary = "어제 작정한 운동 데이터 불러오기")
//    @GetMapping("/yesterday")
//    public ApiResponseDto<?> getYesterdayDecidedExercise(@AuthenticationPrincipal UserDetailsImpl userDetails) {
//        return ResponseUtils.ok()
//    }

    @Operation(summary = "저번달 리포트")
    @GetMapping("/report")
    public ApiResponseDto<?> getLastMonthReport(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(exerciseDecidedService.)
    }
}
