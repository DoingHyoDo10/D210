import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyBadge.module.css";
import { getMyBadge } from "../../apis/member";

const MyBadege = function () {
  const navigate = useNavigate();
  const [myBadge, setMyBadge] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await getMyBadge();
        setMyBadge(response);
      } catch (error) {
        console.error('badge 정보를 가져오는 중 에러 발생: ', error)
      }
    })();
  }, []);

  return (
    <div className={styles.mybadge_container}>
      <>
        <div className={styles.mybadge_top_bar}>
          <img className={styles.mybadge_back_direct} src="/imgs/direct.png" alt="back_direct" onClick={() => {navigate('/mypage')}}/>
          <span className={styles.mybadge_title}>내 배지</span>
        </div>
        <div className={styles.mybadge_sub_container}>
          <div>배지 데이터 없음</div>
        </div>
      </>
    </div>
  )
}

export default MyBadege;