import styles from "./SavedVoice.module.css"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getVoiceMessageList } from "../../apis/voiceRecord";


const SavedVoice = function(){
    const navigate = useNavigate();
    const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(null);
    const[voice, setVoice] = useState(false);    
    const[voiceSrc, setVoiceSrc] = useState("");
    const[voiceName, setVoiceName] = useState("");
    const[voiceList, setVoiceList] = useState([]);

    const openVoiceModal = function(content, name){
        setVoice(!voice);
        setVoiceSrc(content);
        setVoiceName(name)
    }

    const moveToVoicePage = function () {
        navigate("/voice")
    };

    const handleVoiceClick = (index) => {
        setSelectedVoiceIndex(index);
    };

    useEffect(()=>{
        const memberId = JSON.parse(localStorage.getItem('tokens')).member_id;
        getVoiceMessageList(memberId)
            .then(res=>setVoiceList(res))
    }, [])


    return(
        <>
            {voice && (
                <>
                    <div className={styles.modal_background}></div>
                    <div className={styles.voice_modal_container}>
                        <div className={styles.voice_title_container}>
                            <p className={styles.voice_modal_title}>{voiceName}님의<br></br>응원 메시지</p>
                            <img src="/imgs/x.png" alt="x" className={styles.voice_modal_x} onClick={openVoiceModal}></img>
                        </div>
                        <div className={styles.voice_content}>
                            <img src="/imgs/mike.png" alt="마이크" className={styles.voice_img}></img>
                            <audio controls>
                                        <source src={voiceSrc} type="audio/mpeg"></source>
                            </audio>
                        </div>
                       
                    </div>
                </>
            )}

            <div className={styles.main_container}>
                <div className={styles.title_container}>
                    <img src="/imgs/direct.png" alt="뒤로가기" className={styles.back_btn} onClick={moveToVoicePage}></img>
                    <p className={styles.title_txt}>응원 메시지 보관함</p>
                </div>
                <div className={styles.voice_list_container}>
                    {voiceList.map((data, index) => {
                        return(
                            <div key={index} className={`${styles.voice_container} ${selectedVoiceIndex === index ? styles.select_voice_container : ''}`} onClick={() => {handleVoiceClick(index);}}>
                                <p className={styles.voice_date}>{data.createdAt}</p>
                                <p className={styles.voice_sendname}>{data.senderNickname}</p>
                                <img src="/imgs/play.png" alt="플레이" className={styles.voice_play} onClick={() => {openVoiceModal(data.voiceURL, data.senderNickname)}}></img>
                            </div>  
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default SavedVoice;