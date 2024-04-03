import axios from "axios";
import { instance } from "./axiosModule";

// 블록체인 지갑 생성
export const createWallet = async () => {
    const url = 'https://wallet-api.klaytnapi.com/v2/account'

    return await axios.post(url, {}, {
      headers: {
        'x-chain-id': '1001',
        Authorization: import.meta.env.VITE_KAS_AUTHORIZATION
        }
      })
        .then((res) => {
          console.log(res)
          return {eoa: res.data.address, publicKey: res.data.publicKey}
        })
        .catch((err) => {console.log(err)})
}

// 금고 조회
export const getEggMoney = async () => {
  const url = '/wallets/egg-money'

  return await instance.get(url)
      .then((res) => {
        return res.data.data
      })
      .catch((err) => {console.log(err)})
}

// 에그 충전 요청
export const requestMoneyCharge = async (money) => {
  const url = '/payment/kakaoPayReady'
  const REDIRECT_URI = import.meta.env.VITE_NODE_ENV === 'production' ? 'https://j10d210.p.ssafy.io' : 'http://localhost:5173';
  const info = {
    "cid": "TC0ONETIME",
    "partner_order_id": "walkwalk",
    "partner_user_id": "walkwalk",
    "item_name": "머니",
    "quantity": 1,
    "total_amount": money,
    "tax_free_amount": 0,
    "approval_url": `${REDIRECT_URI}/kakaopay/callback?status=approval`,
    "fail_url": `${REDIRECT_URI}/mywallet?status=fail`,
    "cancel_url": `${REDIRECT_URI}/mywallet?status=cancel`
  }

  return await instance.post(url, info)
      .then((res) => {
        return res.data
      })
      .catch((err) => {console.log(err)})
}

// 에그 충전 승인
export const approveMoneyCharge = async (info) => {
  const url = '/payment/kakaoPayApprove'
  const chargeInfo = {
    "cid" : "TC0ONETIME",
    "tid" : info.tid,
    "partner_order_id": "walkwalk",
    "partner_user_id": "walkwalk",
    "pg_token" : info.pgToken,
    "total_amount": info.inputMoney
  }

  return await instance.post(url, chargeInfo)
      .then((res) => {
        return true
      })
      .catch((err) => {
        return false
      })
}

// 머니를 현금으로 환전
export const requestMoneyExchange = async (money) => {
  const url = '/payment/exchange'

  return await instance.put(url, {exchangeMoneyValue: money})
      .then((res) => {
        return res.data.data.putMoneyValue
      })
      .catch((err) => {console.log(err)})
}

// 거래내역 조회
export const getWalletHistory = async () => {
  const url = '/wallets/wallet-history'

  return await instance.get(url)
      .then((res) => {
        console.log('api', res);
        return res.data.data
      })
      .catch((err) => {console.log(err)})
}