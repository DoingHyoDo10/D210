import { instance } from "./axiosModule";
import axios from "axios";

export const getEgg = async () => {
    const url = '/wallets/egg-money'
  
    return await instance.get(url)
        .then((res) => {
          return res.data.data
        })
        .catch((err) => {console.log(err)})
}

export const useEgg = async () => {
  const url = '/items/use'

  return await instance.post(url, {itemId: 1})
      .then((res) => {
        return res.data.data
      })
      .catch((err) => {console.log(err)})
}