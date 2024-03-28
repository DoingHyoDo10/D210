import { instance } from "./axiosModule";

// 갈리 요청을 보낼 목록 조회
export const searchGalleyMemberList = async (keyword) => {
    const url = '/friends/search-galley'
    return await instance.post(url, {"keyword": keyword})
        .then((res) => {
            let data = [];
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}

// 친구 요청을 보낼 유저 목록 조회
export const searchMemberList = async (keyword) => {
    const url = '/friends/search'
    return await instance.post(url, {"keyword": keyword})
        .then((res) => {
            console.log(res);
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}

// 친구 요청 전송
export const sendFriendRequest = async (memberId) => {
    const url = '/friends/request'
    return await instance.post(url, {"memberId": memberId})
        .then((res) => {
            console.log(res);
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}

// 친구 목록 조회
export const getFriendList = async () => {
    const url = '/friends/'
    return await instance.get(url)
        .then((res) => {
            console.log(res);
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}

// 친구 요청 전송 목록 조회
export const getFriendSentList = async () => {
    const url = '/friends/sent-list'
    return await instance.get(url)
        .then((res) => {
            console.log(res);
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}