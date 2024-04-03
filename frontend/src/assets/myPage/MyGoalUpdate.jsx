import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyGoalUpdate.module.css";
import { getExerciseCriteria, getExerciseCriteriaByAge, updateExerciseCriteria } from "../../apis/exercise";

const MyGoalUpdate = function () {
  const navigate = useNavigate();
  const [myCriteria, setMyCriteria] = useState();
  const [myCriteriaByAge, setMyCriteriaByAge] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res1 = await getExerciseCriteriaByAge();
        setMyCriteriaByAge(res1);
        const res2 = await getExerciseCriteria();
        setMyCriteria(() => ({...res2, heartRate: res1.heartRate}));
      } catch (error) {
        console.error('criteria 정보를 가져오는 중 에러 발생:', error);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    const newValue = value.replace(/^0+/, '') || '0';
    setMyCriteria((prevInfo) => ({
      ...prevInfo,
      [name]: newValue,
    }))
  }

  const handleSubmit = async () => {
    // myCriteria의 각 값을 정수로 변환
    const updatedCriteria = {...myCriteria};
    Object.keys(updatedCriteria).forEach(key => {
      updatedCriteria[key] = Number(updatedCriteria[key]);
    });

    // myCriteria의 모든 값이 0이 아닌지 확인
    const isAllCriteriaValid = Object.values(updatedCriteria).every(value => value !== 0);

    if (isAllCriteriaValid) {
      try {
        await updateExerciseCriteria(updatedCriteria);
        alert('수정되었습니다!');
        navigate('/mypage');
      } catch (error) {
        console.error('업데이트 중 에러 발생:', error);
      }
    } else {
      // 하나 이상의 값이 0인 경우, 사용자에게 모든 필드를 올바르게 채우라는 메시지를 표시
      alert('0보다 큰 값을 입력해주세요.');
    }
  }
  
  return (
    <div className={styles.mygoalupdate_container}>
      <>
        <div className={styles.mygoalupdate_top_bar}>
          <img className={styles.mygoalupdate_back_direct} src="/imgs/direct.png" alt="back_direct" onClick={() => {navigate('/mypage')}}/>
          <span className={styles.mygoalupdate_title}>미션 수정</span>
        </div>

        <div className={styles.mygoalupdate_sub_container}>
          {myCriteriaByAge && (
            <div className={styles.mygoalupdate_byage_container}>
              <div className={styles.mygoalupdate_byage_title_container}>
                <img className={styles.mygoalupdate_info_img} src="/imgs/info.png" alt="info_img"/>
                <div>나의 권장량</div>
              </div>
              <div className={styles.mygoalupdate_underline}></div>
              <div className={styles.mygoalupdate_byage_content_container}>
                <div>걸음수 {myCriteriaByAge.steps} 보</div>
                <div>운동시간 {myCriteriaByAge.exerciseMinute} 분</div>
                <div>이동거리 {myCriteriaByAge.exerciseDistance} km</div>
              </div>
            </div>
          )}
          {myCriteria && (
            <>
              <div className={styles.mygoalupdate_field_container}>
                <div className={styles.mygoalupdate_sub_title}>목표 걸음수</div>
                <input className={styles.mygoalupdate_input} type="number" placeholder='걸음수를 입력해주세요' name="steps" value={myCriteria.steps} onChange={handleChange}/>
              </div>
              <div className={styles.mygoalupdate_field_container}>
                <div className={styles.mygoalupdate_sub_title}>목표 운동시간 (분)</div>
                <input className={styles.mygoalupdate_input} type="number" placeholder='운동시간을 입력해주세요' name="exerciseMinute" value={myCriteria.exerciseMinute} onChange={handleChange}/>
              </div>
              <div className={styles.mygoalupdate_field_container}>
                <div className={styles.mygoalupdate_sub_title}>목표 이동거리 (km)</div>
                <input className={styles.mygoalupdate_input} type="number" placeholder='이동거리를 입력해주세요' name="exerciseDistance" value={myCriteria.exerciseDistance} onChange={handleChange}/>
              </div>
              <button className={styles.mygoalupdate_btn} onClick={handleSubmit}>설 정</button>
            </>
          )}
        </div>
      </>
    </div>
  )
}

export default MyGoalUpdate;