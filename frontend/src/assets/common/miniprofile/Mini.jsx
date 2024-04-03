import { useEffect, useState } from 'react'
import styles from "./Mini.module.css";
import Calendar from "../calendar/Calendar";
import { useStore } from "../../../stores/mini"
import { getDailyExerciseData } from '../../../apis/exercise';

function Mini(props) {
    const {friendProfileImg, friendName, friendIntro} = useStore();
    const [streak, setStreak] = useState(0);
    useEffect(()=>{
      getDailyExerciseData(props.memberId)
        .then(res=>{
          if(res.streak){
            setStreak(res.streak);
          }
        })
    },[])
    return (
    <>
      <div className={styles.modal_background}>
        <div className={styles.mini_profile_container}>
        <img src='/imgs/x.png' alt='x' className={styles.x} onClick={() => {props.closeModal()}}></img>
            <img src={friendProfileImg} alt='프로필 이미지' className={styles.profile_img}></img>
            <p className={styles.profile_name}>{friendName}</p>
            <div className={styles.profile_detail}>
                <p>{friendIntro}</p>
            </div>
            <p className={styles.strick_txt}>스트릭</p>
            <p className={styles.strick_day}>{streak}일째</p>
            <div className={styles.strick_line}></div>
            {props.type !== 'halli' && props.type !== 'galli'
              ? <div></div>
              : <div className={styles.calen_container}>
                    <Calendar></Calendar>
                </div>
            }
            
            {props.type === 'search' 
              ? <div><br/></div>
              : <div className={styles.delete_friend_btn}>
                <p>친구 삭제</p>
                </div>
            }
        </div>
      </div>
    </>
  )
}

export default Mini
