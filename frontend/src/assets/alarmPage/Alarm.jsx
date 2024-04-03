import { useEffect, useState } from "react";
import styles from "./Alarm.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getAlarmList, putAlarmCheck } from "../../apis/alarm";


const Alarm = function(){

    useEffect(()=>{
        getAlarmList()
            .then(res=>setAlarmList(res));
    }, [])
    
    const navigate = useNavigate();    

    const moveToMainPage = function () {
        navigate("/main")
    }

    const[alarm, setAlarm] = useState(false);
    const[nowAlarm, setNowAlarm] = useState("")
    const [alarmList, setAlarmList] = useState([]);
    

    const openAlarmModal = function(data){
        setAlarm(!alarm);
        setNowAlarm(data.notiContent);
        if(!data.isChecked){
            putAlarmCheck(data.id);
            getAlarmList()
            .then(res=>setAlarmList(res));
        }
    }

    return(
        <> 
            {alarm && (
                <>
                    <div className={styles.modal_background}>
                        <div className={styles.alarm_modal_container}>
                            <p className={styles.alarm_modal_title}>알림</p>
                            <img src="/imgs/x.png" alt="x" className={styles.alarm_modal_x} onClick={openAlarmModal}></img>
                        
                            <div className={styles.alarm_content}>
                                <img src="/imgs/alarm.png" alt="알림" className={styles.alarm_img}></img>
                                <p className={styles.alarm_detail}>{nowAlarm}</p>
                            </div>
                        
                        </div>
                    </div>
                </>
            )}
            <div className={styles.main_container}>
                <div className={styles.title_container}>
                    <img src="/imgs/direct.png" alt="뒤로가기" className={styles.back_btn} onClick={moveToMainPage}></img>
                    <p className={styles.title_txt}>알림</p>
                </div>
                <div className={styles.alarm_list_container}>
                    {alarmList.map((data, index) => {
                        return(
                            <>
                                <div key={index} className={`${styles.alarm_container} ${data.isChecked == true ? styles.select_alarm_container : ''}`} onClick={() => openAlarmModal(data)}>
                                    <img src="/imgs/bell.png" alt="알람사진" className={styles.alarm_img_container} ></img>
                                    <p className={styles.alarm_txt}> {data.notiContent.length > 32 ? `${data.notiContent.slice(0,31)}...`: data.notiContent}</p>
                                </div>  
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Alarm; 