import axios from "axios";

const instance = axios.create({
  baseURL: 'https://j10d210.p.ssafy.io/api',
  // baseURL: 'http://localhost:8081/api'
});

const tokens = JSON.parse(localStorage.getItem('tokens')) || {};
if (tokens.Authorization) {
  instance.defaults.headers.common["Authorization"] = tokens.Authorization;
}

// 요청 인터셉터: 요청을 보내기 전에 실행됩니다.
instance.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 실행할 코드를 여기에 작성하세요.
    return config;
  },
  (error) => {
    // 리프레쉬 토큰 API가 없어서 주석 처리

    // // 요청 에러 처리를 여기서 합니다.
    // const originalRequest = error.config;

    // // 401 상태 코드는 토큰이 만료되었음을 의미
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true; // 재시도 플래그 설정, 무한 재시도 방지
      
    //   try {
    //     // 리프레시 토큰으로 새 액세스 토큰 요청 API 호출
    //     // const { data } = await API이름();

    //     // 새 액세스 토큰 저장
    //     const newAccessToken = data.accessToken;
    //     localStorage.setItem('tokens', JSON.stringify({...tokens, Authorization: `Bearer ${newAccessToken}`}));

    //     // 인스턴스에 새 액세스 토큰 설정
    //     instance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

    //     // 원래 요청에 새 토큰을 설정하고 재시도
    //     originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

    //     return instance(originalRequest);
    //   } catch (refreshError) {
    //     // 리프레시 토큰으로 액세스 토큰을 갱신하는 데 실패한 경우의 처리
    //     console.error("Unable to refresh access token.", refreshError);

    //     // 로그인 페이지로 리다이렉트하거나, 적절한 오류 처리를 수행할 수 있습니다.
    //     return Promise.reject(refreshError);
    //   }
    // }
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 응답을 받고 난 후 실행됩니다.
instance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 처리하는 코드를 여기에 작성하세요.
    return response;
  },
  (error) => {
    // 응답 에러 처리를 여기서 합니다.
    return Promise.reject(error);
  }
);

export { instance }
