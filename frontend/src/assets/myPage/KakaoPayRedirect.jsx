import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { approveMoneyCharge } from "../../apis/wallet";
import useWalletStore from "../../stores/wallet";
import Loading from "../common/loading/Loading";

const KakaoPayRedirect = function () {
  const navigate = useNavigate();
  const { inputMoney, tid, updateInputMoney, updateTid } = useWalletStore();

  useEffect(() => {
    const pgToken = new URLSearchParams(location.search).get('pg_token')

    const approveCharge = async () => {
      if (pgToken) {
        const chargeInfo = {
          tid: tid,
          inputMoney: inputMoney,
          pgToken: pgToken,
        };

        try {
          const isApprove = await approveMoneyCharge(chargeInfo);
          if (isApprove) {
            alert('충전 성공')
          } else {
            alert('충전 실패')
          }
          updateInputMoney(0);
          updateTid('');
          navigate('/mywallet')
        } catch (err) {
          console.error('머니 충전 승인 과정에서 오류가 발생했습니다:', err)
        }
      } else {
        console.log('머니 충전 승인 실패했습니다.')
      }
    };

    approveCharge();
  }, [])
  
  return (
    <Loading text='결제 중...'></Loading>
  )
}

export default KakaoPayRedirect;