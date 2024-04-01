import { instance } from "./axiosModule";

// 음성 메시지 조회
export const getVoiceMessageList = async (memberId) => {
    const url = `/members/load/${memberId}`
    return await instance.get(url)
        .then((res) => {
            console.log(res)
            const data = []
            res.data.data.content.forEach(element => {
                if(element.messageType === 'VOICE'){
                    element.createdAt = element.createdAt.substring(0, 10)
                    data.push(element);
                }
            });
            return data;
        })
        .catch((err) => {console.log(err)})
}

// 음성 메시지 전송
export const sendVoiceMessage = async (file, memberId) => {
    const url = `/members/send-message`
    const data = {
        audioFileBase64Data: file,
        receiver_id: memberId
    }
    return await instance.post(url, data)
        .then((res) => {
            console.log(res)
            return data;
        })
        .catch((err) => {console.log(err)})
}