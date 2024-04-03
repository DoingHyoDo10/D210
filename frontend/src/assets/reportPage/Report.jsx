import styles from "./Report.module.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { getReport } from "../../apis/exercise";

const Report = function () {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        getReport();
      } catch (err) {
        console.error('리포트 조회 실패 : ', err)
      }
    })();
  }, []);

  return(
    <div className={styles.report_container}>
      <>
        <div className={styles.report_top_bar}>
          <img className={styles.report_back_direct} src="/imgs/direct.png" alt="back_direct" onClick={() => {navigate('/main')}}/>
          <span className={styles.report_title}>운동 리포트</span>
        </div>
        <div className={styles.report_sub_container}>

        </div>
      </>
    </div>
  )
}

export default Report;