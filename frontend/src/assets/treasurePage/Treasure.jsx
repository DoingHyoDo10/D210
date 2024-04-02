import styles from "./Treasure.module.css"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Treasure = function(){
    const navigate = useNavigate();    

    const moveToMainPage = function () {
        navigate("/main")
    }

    return(
        <>
            <div className={styles.main_container}>
                <div className={styles.title_container}>
                    <img src="/imgs/direct.png" alt="뒤로가기" className={styles.back_btn} onClick={moveToMainPage}></img>
                    <p className={styles.title_txt}>보물찾기</p>
                </div>
                <div className={styles.map_container}>
                    <img src="/imgs/beach.jpg" alt="해변가" className={styles.map_img}></img>
                </div>
            </div>
        </>
    )
}

export default Treasure;