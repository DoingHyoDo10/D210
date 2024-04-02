import { instance } from "./axiosModule";

// 할리 목록 조회
export const getHalleyList = async () => {
    const url = '/halleygalley/galley-to-halley';
    return await instance.get(url)
        .then((res) => {
            if(res.data.data.requestContent.length != 0){
                console.log(res.data.data.requestContent)
                return res.data.data.requestContent;
            }
            return false;
        })
        .catch((err) => {console.log(err)})
        
}

// 갈리 목록 조회
export const getGalleyList = async () => {
    const url = '/halleygalley/halley-to-galley';
    
    return await instance.get(url)
        .then((res) => {
            if(res.data.data.length != 0){
                let data = [];
                res.data.data.forEach(element => {
                    if(element.isAccepted){
                        data.push(element);
                    }
                });
                if(data.length != 0){
                    return data;
                }
            }
            return false;
        })
        .catch((err) => {console.log(err)})
}

// 갈리 요청을 보낼 목록 조회
export const getHalleyReauestList = async () => {
    const url = '/halleygalley/halley-request-list';
    
    return await instance.get(url)
        .then((res) => {
            if(res.data.data.length != 0){
                return res.data.data;
            }
            return false;
        })
        .catch((err) => {console.log(err)})
}

// 갈리 요청 전송
export const postGalleyRequest = async (request) => {
    const url = '/halleygalley/galley-request';

    return await instance.post(url, request)
        .then((res) => {
            alert(res.data.msg);
        })
        .catch(err => console.log(err))
}

// 할리 세부정보 조회
export const getHalley = async (memberId) => {
    const url = `/halleygalley/halley?memberId=${memberId}`;
    
    return await instance.get(url)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}

// 갈리 세부정보 조회
export const getGalley = async (memberId) => {
    const url = `/halleygalley/galley?memberId=${memberId}`;
    
    return await instance.get(url)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}

// 갈리 요청 수락/거절
export const responseGalley = async (data) => {
    const url = `/halleygalley/galley-response`;
    
    return await instance.put(url, data)
        .then((res) => {
            console.log(res)
            return res.data.data;
        })
        .catch((err) => {console.log(err)})
}

// 미션 세팅
export const postMission = async (data) => {
    const url = '/halleygalley/mission';

    return await instance.post(url, data)
        .then((res) => {
            return true;
        })
        .catch((err) => {console.log(err)});

}

// 미션 달성
export const putMission = async (data) => {
    const url = '/halleygalley/accomplish-mission';

    return await instance.put(url, {memberIdList: data})
        .then((res) => {
            return true;
        })
        .catch((err) => {console.log(err)});

}