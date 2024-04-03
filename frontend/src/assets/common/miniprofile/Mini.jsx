import { useState } from 'react'
import styles from "./Mini.module.css";
import Calendar from "../calendar/Calendar";
import { useStore } from "../../../stores/mini"

function Mini(props) {
    const {friendName, setFriendName} = useStore();
    const {friendIntro, setFriendIntro} = useStore(); 
    const {friendProfileImg, setFriendProfileImg, friendModalOpen, setFriendModalOpen} = useStore();

    return (
    <>
      <div className={styles.modal_background}>
        <div className={styles.mini_profile_container}>
        <img src='/imgs/x.png' alt='x' className={styles.x} onClick={() => {setFriendModalOpen(!friendModalOpen)}}></img>
            <img src={friendProfileImg} alt='프로필 이미지' className={styles.profile_img}></img>
            <p className={styles.profile_name}>{friendName}</p>
            <div className={styles.profile_detail}>
                <p>{friendIntro}</p>
            </div>
            <p className={styles.strick_txt}>스트릭</p>
            <div className={styles.strick_line}></div>
            
            <div className={styles.calen_container}>
                <Calendar></Calendar>
            </div>
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
