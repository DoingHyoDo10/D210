import React from 'react';

const WalletHistory = ({ histories }) => {
  if (histories.length === 0) {
    return <div>거래 내역이 없습니다.</div>;
  }

  return (
    <div>
      {histories.map((history) => (
        <div key={history.walletHistoryId}>
          <div>{new Date(history.createdAt).toLocaleString()}</div>
          <div>{history.operator ? "+" : "-"} {history.price} {history.walletType === "EGG" ? "에그" : "머니"}</div>
        </div>
      ))}
    </div>
  );
};

export default WalletHistory;
