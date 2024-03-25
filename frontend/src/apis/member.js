import { instance } from "./axiosModule";
import { useMemberStore } from "../stores/member";

// 프론트에서 사용할 api 함수 이름, 인자가 있다면 인자 설정 / 없으면 비워두기
export const getGoogleToken = async (token) => {
    // API명세서 주소 '/도메인/URI'
    const url = import.meta.env.VITE_NODE_ENV === 'production' ? `/oauth/callback/google/token/d-t-d?code=${token}` : `/oauth/callback/google/token/l-t-l?code=${token}`;
    const {tokens, setToken} = useMemberStore();

    // return은 필요할 때만 붙이면 됩니다.
    // instance 뒤에 method 적어주고, url와 넘겨줄 정보가 있다면 같이 인자로 넘겨줍니다.
    return await instance.get(url)
        .then((res) => {
            console.log(res)
            setToken(res.data.data)
            if (res.data.data.isNew) {
                return true
            } else {
                return false
            }
        })
        .catch((err) => {console.log(err)})
}

export const submitUserInfo = async (userInfo) => {
    const url = '/members/'

    return await instance.post(url, userInfo)
        .then((res) => {
            console.log(res)
            return true
        })
        .catch((err) => {console.log(err)})
}