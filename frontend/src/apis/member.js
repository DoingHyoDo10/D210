import { instance } from "./axiosModule";

// JWT 토큰, 구글 토큰, 회원가입 여부 확인
export const getGoogleToken = async (code) => {
    const url = import.meta.env.VITE_NODE_ENV === 'production' ? `/oauth/callback/google/token/d-t-d?code=${code}` : `/oauth/callback/google/token/l-t-l?code=${code}`;
    
    return await instance.get(url)
        .then((res) => {
            localStorage.setItem('tokens', JSON.stringify(res.data.data))
            instance.defaults.headers.common["Authorization"] = res.data.data.Authorization;
            return res.data.data
        })
        .catch((err) => {console.log(err)})
}

// 회원가입 추가정보 제출
export const submitUserInfo = async (userInfo) => {
    const url = '/members/'
    console.log('api로 전달된 정보 :' , userInfo)
    return await instance.post(url, userInfo)
        .then((res) => {
            console.log('api 결과', res)
            return true
        })
        .catch((err) => {console.log(err)})
}

// 닉네임 중복 체크
export const checkDuplicated = async (nickname) => {
    const url = '/members/check-duplicated'

    return await instance.get(url, {params: {nickname}})
        .then((res) => {
            console.log('checkDuplicated', res)
            if (res.data.data.isDuplicated) {
                return true
            } else {
                return false
            }
        })
        .catch((err) => {console.log(err)})
}

// 마이페이지 정보 확인
export const getMypage = async () => {
    const url = '/members/'

    return await instance.get(url)
        .then((res) => {
            return res.data.data
        })
        .catch((err) => {console.log(err)})
}

// 유저 추가정보 확인
export const getMyInfo = async () => {
    const url = '/members/detail'

    return await instance.get(url)
        .then((res) => {
            // console.log('myinfo : ', res.data.data)
            return res.data.data
        })
        .catch((err) => {console.log(err)})
}

// 유저 추가정보 수정
export const updateMyInfo = async (data) => {
    const url = '/members/detail'
    console.log('api로 들어온 데이터', data);
    return await instance.post(url, data)
        .then((res) => {
            console.log('유저정보수정api', res)
            return res.data.data
        })
        .catch((err) => {console.log(err)})
}

// 구글 access_token 갱신
export const updateGoogleToken = async () => {
    const url = '/members/google-refresh-token'
    
    return await instance.get(url)
        .then((res) => {
            console.log(res.data.data)
            const tokens = JSON.parse(localStorage.getItem('tokens'));
            tokens.Google_access_token = res.data.data;
            localStorage.setItem('tokens', JSON.stringify(tokens));
        })
        .catch((err) => {console.log(err)})
}

// 이미지 변환
export const uploadImgFile = async (formData) => {
    const url = '/test/uploadFile'

    return await instance.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((res) => {
            return res.data.data
        })
        .catch((err) => {console.log(err)})
}

// 내 배지 조회
export const getMyBadge = async () => {
    const url = '/members/badge'

    return await instance.get(url)
        .then((res) => {
            console.log('배지api', res)
            return res.data.data
        })
        .catch((err) => {console.log(err)})
}

// 유저 프로필 조회
export const getUserDetail = async (memberId) => {
    const url = `/members/${memberId}`

    return await instance.get(url)
        .then((res) => {
            // console.log('myinfo : ', res)
            return res.data.data
        })
        .catch((err) => {console.log(err)})
}
