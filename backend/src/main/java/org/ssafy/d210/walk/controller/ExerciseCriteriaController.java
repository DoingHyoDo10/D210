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
import org.ssafy.d210.walk.dto.request.CustomExerciseCriteriaRequestDto;
import org.ssafy.d210.walk.service.ExerciseCriteriaService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/walk/criteria")
@Slf4j
public class ExerciseCriteriaController {

    private final ExerciseCriteriaService exerciseCriteriaService;

    @Operation(summary = "연령대별 디폴트 운동 기준 세팅")
    @GetMapping("/default")
    public ApiResponseDto<?> setDefaultCriteria(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(exerciseCriteriaService.setDefaultExerciseCriteria(userDetails.getMember()), MsgType.SET_DEFAULT_CRITERIA_SUCCESSFULLY);
    }

    @Operation(summary = "운동 기준 사용자 커스텀")
    @PostMapping("/custom")
    public ApiResponseDto<?> setCustomCriteria(@RequestBody CustomExerciseCriteriaRequestDto requestDto, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(exerciseCriteriaService.setCustomExerciseCriteria(userDetails.getMember(), requestDto), MsgType.SET_DEFAULT_CRITERIA_SUCCESSFULLY);
    }

    @Operation(summary = "메인 페이지 운동 기준 조회")
    @GetMapping()
    public ApiResponseDto<?> getCriteria(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseUtils.ok(exerciseCriteriaService.findMyCriteria(userDetails.getMember()), MsgType.GET_EXERCISE_CRITERIA_SUCCESSFULLY);
    }

    @Operation(summary = "운동 기준 디폴트로 초기화(커스텀 기준 삭제)")
    @DeleteMapping("/init")
    public ApiResponseDto<?> initCriteria(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        exerciseCriteriaService.deleteCustomCriteria(userDetails.getMember());
        return ResponseUtils.ok("", MsgType.INIT_CRITERIA_SUCCESSFULLY);
    }
}
