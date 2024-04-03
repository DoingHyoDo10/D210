import { useState } from 'react';
import styles from './WalletHistory.module.css';
import { getReceiptData } from '../contracts/ethers'

const WalletHistory = ({ histories, onShowModal }) => {
  if (histories.length === 0) {
    return <div className={styles.history_container}>거래 내역이 없습니다.</div>;
  }

  const reversedHistories = [...histories].reverse();
  const [receiptDetail, setReceiptDetail] = useState();

  const handleClick = async (id) => {
    try {
      console.log('id', id)
      const data = await getReceiptData(id);
      console.log('data', data);
      // setReceiptDetail(data);
      onShowModal(data);
    } catch (err) {
      console.error('영수증 조회 중 오류 발생 : ', err);
    }
  }

  return (
    <div className={styles.history_container}>
      {reversedHistories.map((history) => (
        <div className={styles.history_box} key={history.walletHistoryId} onClick={() => handleClick(history.receiptId)}>
          <div>{new Date(history.createdAt).toLocaleString()}</div>
          <div>{history.operator ? "+" : "-"} {history.price} {history.walletType === "EGG" ? "에그" : "머니"}</div>
        </div>
      ))}
    </div>
  );
};

export default WalletHistory;
