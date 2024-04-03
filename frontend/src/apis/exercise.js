import { instance } from "./axiosModule";
import axios from "axios";
import { updateGoogleToken } from "./member";

// 실시간 운동 정보 조회
export const getRealtimeExerciseData = async () => {
    const url = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';

    // 현재 날짜와 시간 객체 생성
    var currentDate = new Date();
    // 현재 날짜의 0시 0분 0초로 설정
    currentDate.setHours(0, 0, 0, 0);
    
    // 현재 날짜의 밀리초 구하기
    var millisecondsSinceMidnight = currentDate.getTime();
    // 현재 시간의 밀리초 구하기
    var currentMilliseconds = (new Date()).getTime();

    const requestBody = {
        "aggregateBy": [{
        "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:merge_step_deltas"
        },
        {
        "dataSourceId":  "derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes"
        },
        {
        "dataSourceId":  "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta"
        },
        ],
        "bucketByTime": { "durationMillis": currentMilliseconds - millisecondsSinceMidnight },
        "startTimeMillis": millisecondsSinceMidnight,
        "endTimeMillis": currentMilliseconds
    };
    let data = {
        'steps': 0,
        'time': 0,
        'distance' : 0
    };
    await axios.post(url, requestBody, {headers: {Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).Google_access_token} })
        .then((res) => {
            data = {
                'steps': res.data.bucket[0].dataset[0].point[0].value[0].intVal,
                'time': res.data.bucket[0].dataset[1].point[0].value[0].intVal,
                'distance': res.data.bucket[0].dataset[2].point[0].value[0].fpVal,
            };
            return data;
        })
        .catch((err)=>{
            updateGoogleToken();
            axios.post(url, requestBody, {headers: {Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).Google_access_token} })
            .then((res) => {
                data = {
                    'steps': res.data.bucket[0].dataset[0].point[0].value[0].intVal,
                    'time': res.data.bucket[0].dataset[1].point[0].value[0].intVal,
                    'distance': res.data.bucket[0].dataset[2].point[0].value[0].intVal,
                };
                
                return data;
            })})
    return data;
}

// 일주일 운동 정보 조회
export const getWeeklyExerciseData = async () => {
    const today = new Date();
    const year = today.getFullYear();
    // JavaScript의 getMonth() 함수는 0부터 시작하므로 +1 해줌
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    const url = `/walk/${date}`;
    
    return await instance.get(url)
        .then((res) => {
            console.log(res.data.data);
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}

// 내 운동기준 정보 조회
export const getExerciseCriteria = async () => {
    const url = `/walk/criteria`;
    
    return await instance.get(url)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}

// 내 연령대 맞춤 기준 조회
export const getExerciseCriteriaByAge = async () => {
    const url = `/walk/criteria/default`;
    
    return await instance.get(url)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}

// 내 운동 기준 수정
export const updateExerciseCriteria = async (data) => {
    const url = `/walk/criteria/custom`;
    
    return await instance.post(url, data)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}

// 유저 한달 운동정보 조회
export const getMonthlyExerciseData = async (memberId) => {
    const url = `/walk/calendar/${memberId}`;
    
    return await instance.get(url)
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}
