import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyWallet.module.css";
import { getEggMoney, requestMoneyCharge, requestMoneyExchange, getWalletHistory } from "../../apis/wallet";
import useWalletStore from "../../stores/wallet";
import WalletHistory from './WalletHistory';
import LoadingModal from '../common/loading/LoadingModal';

const MyWallet = function () {
  const navigate = useNavigate();
  const [eggMoney, setEggMoney] = useState();
  const [isChargeModalOpen, setChargeModalOpen] = useState(false);
  const [isExchangeModalOpen, setExchangeModalOpen] = useState(false);
  const { inputMoney, updateInputMoney, updateTid } = useWalletStore();
  const [histories, setHistories] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getEggMoney();
        setEggMoney(data);
      } catch (err) {
        console.error('eggmoney 정보를 가져오는 중 에러 발생:', err);
      }
    })();
    fetchWalletHistory();
  }, [])

  const handleInputChange = (e) => {
    if (e.target.value === '') {
      updateInputMoney(0);
    } else {
      updateInputMoney(Number(e.target.value));
    }
  }

  const isMobile = () => {
    // 터치 이벤트 지원 여부 및 화면 크기를 통한 모바일 환경 판별
    return false;
    // return navigator.maxTouchPoints > 0 ;
    // return ('ontouchstart' in window || navigator.maxTouchPoints > 1 );
  }

  const submitMoneyCharge = async () => {
    try {
      if (inputMoney === 0) {
        alert('충전할 금액을 입력해주세요!')
      } else if (inputMoney > 100000000) {
        alert('입력값이 너무 큽니다. 다시 입력해주세요.');
      } else {
        const res = await requestMoneyCharge(inputMoney);
        updateTid(res.tid);
        console.log('모바일? : ', isMobile())
  
        setTimeout(() => {
          if (isMobile()) {
            window.location.href = res.next_redirect_mobile_url
          } else {
            window.location.href = res.next_redirect_pc_url
          }
        }, 1000);
      }
    } catch (err) {
      console.error('머니 충전 실패 : ', err)
    }
  }

  const submitMoneyExchange = async () => {
    try {
      if (inputMoney === 0) {
        alert('환전할 금액을 입력해주세요!')
      } else {
        setIsLoading(true);
        const response = await requestMoneyExchange(inputMoney);
        console.log(response)
        setEggMoney((prevInfo) => ({...prevInfo, money: eggMoney.money - response}));
        updateInputMoney(0);
        setExchangeModalOpen(false);
        alert('환전 성공!');
        fetchWalletHistory();
        setIsLoading(false);
      }
    } catch (err) {
      console.error('머니 환전 실패 : ', err)
      setIsLoading(false);
    }
  }

  const fetchWalletHistory = async () => {
    try {
      const historyData = await getWalletHistory();
      setHistories(historyData);
    } catch (err) {
      console.error('거래 내역 정보를 가져오는 중 에러 발생:', err);
    }
  };

  const showModal = (content) => {
    setModalContent(content);
    setIsReceiptModalOpen(true);
  };

  return(
    <div className={styles.mywallet_container}>
      <>
        <div className={styles.mywallet_top_bar}>
          <img className={styles.mywallet_back_direct} src="/imgs/direct.png" alt="back_direct" onClick={() => {navigate('/mypage')}}/>
          <span className={styles.mywallet_title}>내 금고</span>
        </div>
        {eggMoney && (
          <>
            <div className={styles.mywallet_sub_container}>

              <div className={styles.mywallet_field_container}>
                <div className={styles.mywallet_sub_title}>내 자산</div>
                <div className={styles.mywallet_2col}>
                  <div className={styles.mywallet_col}>
                    <img className={styles.mywallet_col_img} src="/imgs/egg.png" alt="" />
                    <div>{eggMoney.egg}</div>
                  </div>
                  <div className={styles.mywallet_col}>
                    <img className={styles.mywallet_col_img} src="/imgs/money.png" alt="" />
                    <div>{eggMoney.money}</div>
                  </div>
                </div>
              </div>

              <div className={styles.mywallet_btn_container}>
                <button className={styles.mywallet_btn} onClick={() => {setChargeModalOpen(true)}}>
                  <img className={styles.mywallet_transfer_img} src="/imgs/money-bill-solid.svg" alt="" />
                  <div>충전</div>
                </button>
                <button className={styles.mywallet_btn} onClick={() => {setExchangeModalOpen(true)}}>
                  <img className={styles.mywallet_transfer_img} src="/imgs/money-bill-transfer-solid.svg" alt="" />
                  <div>환전</div>
                </button>
              </div>

              <div className={styles.mywallet_field_container}>
                <div className={styles.mywallet_sub_title}>거래 내역</div>
                { histories && (
                  <>
                    <WalletHistory histories={histories} onShowModal={showModal}/>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </>
      {isChargeModalOpen && (
        <>
          <div className={styles.mywallet_modal_background}>
            <div className={styles.mywallet_modal_container}>
              <img className={styles.mywallet_close} src="/imgs/x.png" alt="" onClick={() => {setChargeModalOpen(false)}}/>
              <div className={styles.mywallet_title}>머니 충전하기</div>
              <input className={styles.mywallet_input} type="number" name="inputMoney" placeholder="금액을 입력해주세요" onChange={handleInputChange}/>
              <img className={styles.mywallet_kakaopay_btn} src="/imgs/kakaopay.png" alt="kakaopay_btn" onClick={submitMoneyCharge}/>
            </div>
          </div>
        </>
      )}
      {isExchangeModalOpen && (
        <>
          <div className={styles.mywallet_modal_background}>
            <div className={styles.mywallet_modal_container}>
              <img className={styles.mywallet_close} src="/imgs/x.png" alt="" onClick={() => {setExchangeModalOpen(false)}}/>
              <div className={styles.mywallet_title}>머니 환전하기</div>
              <input className={styles.mywallet_input} type="number" name="inputMoney" placeholder="금액을 입력해주세요" onChange={handleInputChange}/>
              <button className={styles.mywallet_exchange_btn} onClick={submitMoneyExchange}>환 전</button>
            </div>
          </div>
        </>
      )}
      {isLoading && <LoadingModal text="환전 중..."/>}
      {isReceiptModalOpen && modalContent && (
        <div className={styles.mywallet_modal_background}>
          <div className={styles.mywallet_modal_container}>
            <img className={styles.mywallet_close} src="/imgs/x.png" alt="" onClick={() => {setIsReceiptModalOpen(false)}}/>
            <div className={styles.mywallet_receipt_container}>
              <div className={styles.mywallet_receipt_title}>영수증</div>
              <div className={styles.mywallet_receipt_box}>
                <div>{new Date(modalContent.createdAt).toLocaleString()}</div>
                <div>{modalContent.operator ? "+" : "-"} {modalContent.price? parseInt(modalContent.price._hex, 16).toString() : 'N/A'} {modalContent.walletType === "EGG" ? "에그" : "머니"}</div>
                <div>{modalContent.description}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyWallet;