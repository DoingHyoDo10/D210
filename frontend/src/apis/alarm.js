import { instance } from "./axiosModule";

// 내 운동기준 정보 조회
// export const getAlarmList = async () => {
//     const url = `/walk/criteria`;
    
//     return await instance.get(url)
//         .then((res) => {
//             console.log(res.data.data);
//             return res.data.data;
//         })
//         .catch((err) => {console.log(err)})
// }

// 알림 목록 조회
export const getAlarmList = async () => {
    const url = `/notifications/`;

    return await instance.get(url)
        .then(res=>{
            console.log(res.data.data)
            return res.data.data.reverse();
        })
}

// 알림 읽음 표시 전송
export const putAlarmCheck = async (alarmId) => {
    const url = `/notifications/`;
    const data = {
        notificationId: alarmId
    }

    return await instance.put(url, data)
        .then(res=>{
            return res.data.data;
        })
        .catch(err=>{console.log('이미 확인한 알림')})
}