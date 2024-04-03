import styles from "./Report.module.css"
import { useNavigate } from "react-router-dom"

const Report = function () {
  const navigate = useNavigate();

  return(
    <div className={styles.report_container}>
      <>
        <div className={styles.report_top_bar}>
          <img className={styles.report_back_direct} src="/imgs/direct.png" alt="back_direct" onClick={() => {navigate('/main')}}/>
          <span className={styles.report_title}>운동 리포트</span>
        </div>
      </>
    </div>
  )
}

export default Report;