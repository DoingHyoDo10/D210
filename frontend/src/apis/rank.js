import { instance } from "./axiosModule";

// 친구 랭킹 일간 조회
export const getDailyRank = async () => {
  const url = `/walk/ranking/steps/daily`

  return await instance.get(url)
      .then((res) => {
          console.log('daily : ', res)
          return res.data.data
      })
      .catch((err) => {console.log(err)})
}

// 친구 랭킹 주간 조회
export const getWeeklyRank = async () => {
  const url = `/walk/ranking/steps/weekly`

  return await instance.get(url)
      .then((res) => {
          console.log('weekly : ', res)
          return res.data.data
      })
      .catch((err) => {console.log(err)})
}

// 친구 랭킹 월간 조회
export const getMonthlyRank = async () => {
  const url = `/walk/ranking/steps/monthly`

  return await instance.get(url)
      .then((res) => {
          console.log('monthly : ', res)
          return res.data.data
      })
      .catch((err) => {console.log(err)})
}

// 친구 랭킹 스트릭 조회
export const getStreakRank = async () => {
  const url = `/walk/ranking/streak`

  return await instance.get(url)
      .then((res) => {
          console.log('streak : ', res)
          return res.data.data
      })
      .catch((err) => {console.log(err)})
}