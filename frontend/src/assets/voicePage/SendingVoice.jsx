import styles from "./SendingVoice.module.css"
import { useState, useCallback  } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const SendingVoice = function(){
    const navigate = useNavigate();

    const moveToVoicePage = function () {
        navigate("/voice/sendvoice")
    };
    const [stream, setStream] = useState();
    const [media, setMedia] = useState();
    const [onRec, setOnRec] = useState(true);
    const [source, setSource] = useState();
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const chunks = []; // 오디오 청크 데이터를 저장할 배열
    const texts = ['녹음기능',
      '구현해보자',
      '화이팅',
      '모든 문장녹음을 완료하였습니다.'
    ]

    const [recordingTime, setRecordingTime] = useState(0);
    const [timer, setTimer] = useState(null);
    
    const startRecordingTime = () => {
        const startTime = Date.now();
        const timerId = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            setRecordingTime(Math.floor(elapsedTime / 1000));
        }, 1000);
        setTimer(timerId);
    };
    
    const stopRecordingTime = () => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
        }
    };
    
    const onRecAudio = () => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createScriptProcessor(0, 1, 1);
        setAnalyser(analyser);
    
        function makeSound(stream) {
            const source = audioCtx.createMediaStreamSource(stream);
            setSource(source);
    
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
        }
    
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
    
            mediaRecorder.addEventListener('dataavailable', (e) => {
                chunks.push(e.data);
            });
    
            mediaRecorder.start();
            setStream(stream);
            setMedia(mediaRecorder);
            makeSound(stream);
    
            analyser.onaudioprocess = function (e) {
                setOnRec(false);
            };
    
            startRecordingTime(); // 녹음 시작시 타이머 시작
        }).catch((error) => {
            alert('마이크 사용 권한을 허용해야 녹음을 진행할 수 있습니다.');
        });
    };
    
    const offRecAudio = () => {
        media.ondataavailable = function (e) {
            chunks.push(e.data);
            setAudioUrl(e.data);
            setOnRec(true);
        };
    
        stream.getAudioTracks().forEach(function (track) {
            track.stop();
        });
    
        media.stop();
    
        analyser.disconnect();
        source.disconnect();
    
        stopRecordingTime(); // 녹음 종료시 타이머 중지
    };
    
    const onSubmitAudioFile = useCallback(() => {
        if (audioUrl) {
            const audio = new Audio(URL.createObjectURL(audioUrl));
            audio.play();
        }
    }, [audioUrl]);

  
    function handleClickNext () {      
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex >= 4) {
          return 0;
        }
        return newIndex;
      });
    }
  
    
  
    const sound = new File([audioUrl], `${currentIndex}.wav`, { lastModified: new Date().getTime(), type: "aaudio/mpeg" });

    // uploadFileToServer(sound);

    const uploadFileToServer = (file) => {
        const formData = new FormData();
        formData.append('audioFile', file);
      
        // axios.post('http://127.0.0.1:8000/upload-audio/', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // })
        // .then(response => {
        //   console.log(response.data.message);
        // })
        // .catch(error => {
        //   console.error('파일 전송 중 오류 발생:', error);
        // });
    };

    
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const galliList = [
        {
            profileUrl: "/imgs/profile_img1.jpg",
            nickname : "우주최강세현"
        },
        {
            profileUrl: "/imgs/profile_img1.jpg",
            nickname : "지구최강세현"
        },
        {
            profileUrl: "/imgs/profile_img1.jpg",
            nickname : "지상최강세현"
        },
        {
            profileUrl: "/imgs/profile_img1.jpg",
            nickname : "지하최강세현"
        },
    ]

    const [galli, setGalli] = useState(false);
    const [galliName, setGalliName] = useState("응원 메시지를 보낼 갈리찾기");
    const [keyword, setKeyword] = useState('');

    const openGalliListModal = function(){
        setGalli(!galli);
    }
    const handleInputChange = (e) => {
        const value = e.target.value;
        // 입력 값에 대한 즉각적인 유효성 검사를 추가
        
        setKeyword(value);
      };
    const handleSearchClick = ()=>{
        searchGalleyMemberList(keyword)
        .then((res)=>{
            setMemberList(res);
        })  
        .catch((err)=>{
            console.log(err);
        })
    }


    return(
        <>
            {galli && (
                <>
                    <div className={styles.modal_background}></div>
                    <div className={styles.galli_modal_container}>
                        <div className={styles.galli_title_container}>
                            <p className={styles.galli_modal_title}>응원 메시지 보낼 갈리 선택하기</p>
                            <img src="/imgs/x.png" alt="x" className={styles.galli_modal_x} onClick={openGalliListModal}></img>
                        </div>                                
                        
                        <div className={styles.galli_search_container}>
                            <input className={styles.galli_search_box} onChange={handleInputChange}></input>
                            <img className={styles.galli_search_icon} src="/imgs/search.png" alt="찾기 아이콘" onClick={handleSearchClick}></img>
                        </div>

                        <div className={styles.galli_list_container}>
                            <div className={styles.galli_names_container}>

                                {galliList.map((data, index) => {
                                    return(
                                        <div key={index} className={styles.galli_name_container}>
                                            <img src={data.profileUrl} alt="프로필 사진" className={styles.galli_img_container} ></img>
                                            <p className={styles.galli_name_txt}>{data.nickname}</p>
                                            <div className={styles.galli_btn_container}>
                                                <div className={styles.galli_put_btn}>
                                                    <p className={styles.btn_txt} onClick={()=>{setGalliName(data.nickname)}}>선택</p>
                                                </div>
                                            </div>
                                        </div>  
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className={styles.main_container}>
                <div className={styles.title_container}>
                    <img src="/imgs/direct.png" alt="뒤로가기" className={styles.back_btn} onClick={moveToVoicePage}></img>
                    <p className={styles.title_txt}>일반 응원 메시지 보내기</p>
                </div>
                <div className={styles.record_container}>
                    <p className={styles.record_txt}>녹음 시간</p>
                    <div className={styles.record_time}>{formatTime(recordingTime)}</div>

                    <div className={styles.btn_area}>
                        <div > 
                            <button className={onRec ? styles.record_btn : styles.pushed_record_btn } onClick={onRec ? onRecAudio : offRecAudio}>{onRec ? '녹음 시작' : '녹음 중지'}</button>
                        </div>
                        <div>
                            <button className={styles.result_btn} onClick={onSubmitAudioFile}>결과 확인</button>
                        </div>
                    </div>

                    <p className={styles.recieve_txt}>받는 사람</p>
                    <div className={styles.select_container}>
                        <p className={styles.select_name}>{galliName}</p>
                        <img src="/imgs/search.png" alt="찾기" className={styles.galli_select_search_icon} onClick={openGalliListModal}></img>
                    </div>
                    
                    <div className={styles.send_btn_container}>
                        <p>보내기</p>
                    </div>

                    <img src="/imgs/calendar_bottom.png" alt="풀밭" className={styles.ch_ground}></img>
                    <div className={styles.img_container}>
                        <img src="/imgs/ch2_bol_hil.png" alt="할리 오리" className={styles.ch_img}></img>
                        <img src="/imgs/mike.png" alt="오리 마이크" className={styles.ch_mike}></img>
                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default SendingVoice;