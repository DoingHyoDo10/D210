import styles from "./SavedVoice.module.css"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Store = function(){
    const navigate = useNavigate();
    const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(null);
    const[voice, setVoice] = useState(false);    
    const[voiceSrc, setVoiceSrc] = useState("");
    const[voiceName, setVoiceName] = useState("");

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

    const voiceList = [
        {
            date: "2024.02.12",
            sendName: "가나다라마바사아",
            voice: "/imgs/music.mp3"
        },
        {
            date: "2024.02.21",
            sendName: "아기오리엄마오리",
            voice: "/imgs/music.mp3"
        },
        {
            date: "2024.02.24",
            sendName: "키으쿵",
            voice: "/imgs/music.mp3"
        },
        {
            date: "2024.02.29",
            sendName: "히히",
            voice: "/imgs/music.mp3"
        },
        {
            date: "2024.03.01",
            sendName: "우주최강세현",
            voice: "/imgs/music.mp3"
        },
        {
            date: "2024.03.04",
            sendName: "지구최강세현",
            voice: "/imgs/music.mp3"
        },
        {
            date: "2024.03.06",
            sendName: "지상최강세현",
            voice: "/imgs/music.mp3"
        },
        {
            date: "2024.03.09",
            sendName: "지하최강세현",
            voice: "/imgs/music.mp3"
        },
        {
            date: "2024.03.16",
            sendName: "내핵최강세현",
            voice: "/imgs/music.mp3"
        },
        {
            date: "2024.03.16",
            sendName: "내핵최강세현",
            voice: "/imgs/music.mp3"
        },
        {
            date: "2024.03.16",
            sendName: "내핵최강세현",
            voice: "/imgs/music.mp3"
        },
        {
            date: "2024.03.16",
            sendName: "내핵최강세현",
            voice: "/imgs/music.mp3"
        },
    ]

    return(
        <>
            {voice && (
                <>
                    <div className={styles.modal_background}></div>
                    <div className={styles.voice_modal_container}>
                        <div className={styles.voice_title_container}>
                            <p className={styles.voice_modal_title}>{voiceName}님의 메시지</p>
                            <img src="/imgs/x.png" alt="x" className={styles.voice_modal_x} onClick={openVoiceModal}></img>
                        </div>
                        <div className={styles.voice_content}>
                            <img src="/imgs/alarm.png" alt="알림" className={styles.voice_img}></img>
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
                            <div key={index} className={`${styles.voice_container} ${selectedVoiceIndex === index ? styles.select_voice_container : ''}`} onClick={() => {handleVoiceClick(index); openVoiceModal(data.voice, data.sendName)}}>
                            </div>  
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default Store;