import styles from "./Voice.module.css"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Voice = function(){
    const navigate = useNavigate();    

    const moveToMainPage = function () {
        navigate("/main")
    }

    const moveToSendVoicePage = function () {
        navigate("/voice/sendvoice")
    }

    const moveToSavedVoicePage = function () {
        navigate("/voice/savedvoice")
    }

    return(
        <>
            <div className={styles.main_container}>
                <div className={styles.title_container}>
                    <img src="/imgs/direct.png" alt="뒤로가기" className={styles.back_btn} onClick={moveToMainPage}></img>
                    <p className={styles.title_txt}>응원 메시지</p>
                </div>
                <div className={styles.voice_btn_container}>
                    <div className={styles.send_container} onClick={moveToSendVoicePage}>
                        <p className={styles.btn_txt}>응원 메시지<br></br>보내기</p>
                        <img src="/imgs/mike.png" alt="마이크" className={styles.mike}></img>
                    </div>
                    <div className={styles.contain_container} onClick={moveToSavedVoicePage}>
                        <p className={styles.btn_txt}>응원 메시지<br></br>보관함</p>
                        <img src="/imgs/file.png" alt="파일" className={styles.file}></img>
                    </div>
                    <div className={styles.back}>
                        <img src="/imgs/ch1_bol_longwalk.gif" alt="걷는 오리" className={styles.walk_ori}></img>
                        <img src="/imgs/ground.png" alt="땅 이미지" className={styles.ground}></img>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Voice;