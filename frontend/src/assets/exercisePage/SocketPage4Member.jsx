import React, { useState, useEffect, useRef } from 'react';
import "./SocketPage4Member.css";
import TypeIt from 'typeit-react';
import { useLocation, useParams, useNavigate} from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import AudioRecord from './AudioRecord';
import './FileUploader.module.css';
import axios from 'axios';
import { getSpeech } from './getSpeech';
import styles from "./SocketPage4Member.module.css"
import { ResponsiveRadialBar } from '@nivo/radial-bar'
import { MapComponent } from './MapComponent';
import GeolocationComponent from './GeolocationComponent';
import { getRealtimeExerciseData, getExerciseCriteria, startExercise, closeExercise } from "../../apis/exercise"
import { recordExercise } from '../contracts/ethers'
import LoadingModal from '../common/loading/LoadingModal';

let stompClient;
var pageOwnerId;

// Static variable For Test
const currentMember =  JSON.parse(localStorage.getItem('tokens')) || {
  member_id: 1000,
  member_nickname: "지나가는 오리 1 ",
  member_profile_url: "https://d210.s3.ap-northeast-2.amazonaws.com/duck.gif",
  Authorization: null
};


const SocketPage4Member = () => {
  const navigate = useNavigate();
  const [realtimeExerciseData, setRealtimeExerciseData] = useState({steps:0, time:0, distance:0});  
  const [myCriteria, setMyCriteria] = useState({steps:0, time:0, distance:0});
  useEffect(() => {
    (async () => {
      try {
        const response = await getRealtimeExerciseData();

        // 거리 단위 m -> km로 변환 & 소수점 첫 번째 자리까지 반올림
        const distanceInKm = (response.distance / 1000).toFixed(1);

        setRealtimeExerciseData({...response, distance: parseFloat(distanceInKm)});

        const criteriaRes = await getExerciseCriteria();
        setMyCriteria({steps: criteriaRes.steps, time: criteriaRes.exerciseMinute, distance: criteriaRes.exerciseDistance});
        console.log(criteriaRes);
      } catch (error) {
        console.log('운동 정보 조회 실패 :', error)
      }
    })();
  },[]);

  //⭐ VARIABLES 
  
  // A. LocalStorage에 있는 Authorization 가져오기 
  var authorization = currentMember.Authorization;
  
  // B. 화면 이동하면서 현 사용자의 정보 가져오기 
  const location = useLocation();

  // C. 페이지 들어올 때 채팅창 스크롤이 항상 하단으로 가게 하기 위하여 사용 
  const chatContainerRef = useRef(null);

  // E. 모든 채팅 메세지 저장 
  const [messages, setMessages] = useState([]);

  // F. 현재 다른 사람이 타이핑하는 메세지를 추적
  const [currentTypingId, setCurrentTypingId] = useState(null);

  // G. 현재 소켓의 주인이 되는 사용자의 ID 가져오기 
  const params = useParams();
  pageOwnerId = params.id;

  // H. 현재 페이지 주인의 정보 
  const [pageOwner, setPageOwner] = useState({})

  // I. 현재 유저가 들어온 환경이 모바일인지 아닌지 
  const [isMobile, setIsMobile] = useState(false);

  // J. Tab Bar 용
  const [tabIndex, setTabIndex] = useState(0);
  
  // K. 모달 창 용
  const [isModal, setIsModal] = useState(false)

  // L. CountDown 
  const [time, setTime] = useState(5);

  // M. 운동 데이터 
  const [data, setData] = useState([
    {
      "id": "걸음수",
      "data": [
        {
          "x": '진행 정도',  
          "y":  realtimeExerciseData.steps
        }
      ]
    }
  ]);

  // N. 실시간 위도, 경도 
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // O. 에러 핸들링
  const [error, setError] = useState(null);

  // Q. 페이지 주인 위치 
  const [position, setPosition] = useState({ lat: 36.110336, lng: 128.4112384 });


  // ⭐ 카운트 다운 함수 
  useEffect(() => {
    if (time > 0) {
      const timerId = setTimeout(() => setTime(time -1), 1000)
      return () => clearTimeout(timerId);
    } else {
      const startTime = formatCurrentDateTime();
      const startRes = startExercise(startTime);
      console.log(startRes);
    }
  }, [time]);

  function formatCurrentDateTime() {
    const now = new Date();
  
    // 날짜와 시간 구성 요소를 추출합니다.
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하기 때문에 1을 더합니다.
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    // 추출한 구성 요소를 원하는 형식의 문자열로 결합합니다.
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }


  //⭐ CHAT FOCUS ALWAYS ON BOTTOM

  // A. 스택에 쌓이는 값들 중에 제일 최근에 타이핑된 메세지를 담은 객체를 특정한다.
  //    -> currentTypeId는 제일 최근에 타이핑된 메세지를 가리키는 지표이다. 
  //    -> 그 쪽으로 스크롤을 내린다. 
  useEffect(() => {

    // A-1. 채팅창 스크롤을 가장 하단으로 이동 
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    // A-2. 제일 최근 객체를 가리키는 지표가 null이면, 메세지 중에, 현재 유저가 쓴 것이 아니고, 타이핑 하고 있는 중인 메세지(= 누군가 치고 있는 메세지)
    //      를 찾아 다음 타이핑 메세지로 지정한다. 
    if(currentTypingId === null) {
      const nextTypingMessage = messages.find( (msg) => !msg.isUser && msg.isTyping);

    // A-3. 다음 타이핑 중인 메세지가 존재한다면, 그 메세지의 ID를 해당 메세지를 현재 메세지 ID로 저장한다.
      if(nextTypingMessage) {
        setCurrentTypingId(nextTypingMessage.id);
      }
    }
  }, [messages, currentTypingId])

  //⭐ WEB SOCKET PART 
  const clientHeader = { Authorization: authorization};

  // [ A. 최초 연결 PART ]

  // A-1. 최초 연결 함수 
  const connect = () => {
    // const socketURL = "http://localhost:8081/ws-stomp";
    const socketURL = "https://j10d210.p.ssafy.io/ws-stomp";
    var sockJS = new SockJS(socketURL);
    stompClient = Stomp.over(sockJS);
    console.log(stompClient);

    // (Header=토큰 정보, 첫 번째 행동=해당 토픽 구독, 에러 핸들링)
    stompClient.connect(clientHeader, firstConnectAction, onError)
  }

  // A-2. 최초 연결 시 해야할 행동을 정의한 함수
  const firstConnectAction = () => {
      console.log("ﮩ٨ـﮩﮩ٨ـ♡ﮩ٨ـﮩﮩ٨ـ");
      console.log("👩🏻‍🎤 최초 연결 시작 🎸");

      stompClient.subscribe("/sub/member/" + pageOwnerId, onMessageReceivedFromSocket, clientHeader);
      stompClient.subscribe("/sub/gps/" + pageOwnerId, getGpsAboutPageOwner, clientHeader);
  }

  // A-3. 연결 오류가 났을 시 할 행동 
  const onError = (error) => { console.log(error);}

  // [ B. 메세지 Send Receive 함수 ]

  // B-1. 메세지를 소켓 서버로 보내는 로직 
  const sendMessageToSocket = (content) => {
    var messageInfo = {
      messageType: content !== null? 'TTS' : "VOICE",
      textContent: content,
      voiceURL: "",
      senderId: currentMember.member_id,
      senderProfileUrl: currentMember.member_profile_url,
      receiverId: pageOwnerId,
      senderNickname: currentMember.member_nickname,
      isOpened: false
    }

    // 발송 
    console.log("보내는 채팅 Info:", messageInfo);
    stompClient.send("/pub/api/socket/talk", clientHeader, JSON.stringify(messageInfo));
  }

  // B-2 메세지 받는 로직 -> subscribe 함수 두 번째에 들어가는 녀석 (통신으로 받은 메세지를 어떻게 처리할지 선택한다.)
  const onMessageReceivedFromSocket = (payload) => {
    var receivedMsg = JSON.parse(payload.body);

    // 메세지 스택에 저장 
    console.log("들어온 메세지:", receivedMsg);
    if(Number(pageOwnerId) === Number(currentMember.member_id) && receivedMsg.voiceURL === ''){
      getSpeech(`${receivedMsg.senderNickname} 님의 응원메세지!:  `+receivedMsg.textContent);
    }
    setMessages((preMessages) => [...preMessages, receivedMsg]);
  }

  const getGpsAboutPageOwner = (payload) => {
    var receivedGPS = JSON.parse(payload.body);

    console.log("주인의 GPS", receivedGPS);
    
    const NowGPS =  {lat: receivedGPS.latitude, lng: receivedGPS.longitude};

    console.log("현재 GPS",NowGPS)

    setPosition({...NowGPS})
  }

  // B-3 페이지 오너 정보 가져오기 
  const getPageOwner = async () =>{
    axios.get(`https://j10d210.p.ssafy.io/api/members/${pageOwnerId}`, clientHeader)
    .then((res)=> {
      console.log(res.data.data)
     setPageOwner({...res.data.data});
    })
    .catch((err) => {console.log(err)})
  }

  // B-4 해당 방 메세지 전부 불러오기 
  const getloadMessage = async () =>{
    axios.get(`https://j10d210.p.ssafy.io/api/members/load/${pageOwnerId}`, clientHeader)
    .then((res)=> {
      console.log(res.data.data.content)
     setMessages([...res.data.data.content].reverse());
    })
    .catch((err) => {console.log(err)})
  }


  // [ C. 페이지 접근 시 소켓 연결, 페이지 퇴장 시 소켓 종료를 세팅]
  useEffect(() => {

    getPageOwner();

    connect();

    // C-1 첫 입장 시 스크롤을 맨 밑으로 떙긴다. 
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    },0);

    // C-2 이전 메세지 불러오기 
    getloadMessage();

    // D. 모바일인지 아닌지 확인 
    console.log("열린 디바이스 브라우저 넓이",window.innerWidth)

    if(typeof window !== "undefined"){
      if(window.innerWidth > 412){ 
        setIsMobile(false);
    } else {
      setIsMobile(true);
    }

    }

    if(Number(currentMember.member_id) === Number(pageOwnerId)){
      setIsModal(true);
    }

    setTimeout(() => {
      setIsModal(false);
    }, 6500)


    getLocation();

    return () => {
      setTimeout(() => {
        stompClient.disconnect();
      },0)

    }
  },[pageOwnerId])

  useEffect(() => {
    if(chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  },[messages])


  // E. 기타 
  useEffect(() => {
    // 메시지 배열이 업데이트될 때마다 스크롤을 가장 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  const handleEndTyping = (id) => {
    setMessages((prevMessages) =>
    
    // 이전 메세지들을 전부 순회하면서, 그 중 제일 최근 메세지의 ChatBot Animation 여부를 false로 바꾼다. (isTyping == 챗봇의 애니메이션 여부) 
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, isTyping: false } : msg
      )
    );
  }

  const handleSendMessage = (message) => {
    // console.log(message);
    // 소켓으로 메세지 보내기
    sendMessageToSocket(message);

  };

  // F. tab 변경 
  const tabClickHandler = (index) => {
    setTabIndex(index);
  }

  // G. 위치 확인 

  const getLocation = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setError(null);

                var GpsDTO = {
                  senderId: currentMember.member_id,
                  receiverId: pageOwnerId,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                }

                stompClient.send("/pub/api/socket/enter", clientHeader, JSON.stringify(GpsDTO));
            },
            (error) => {
                setError(error.message);
            }
        );
    } else {
        setError("Geolocation is not supported by this browser.");
    }

};

let chainValue = {
  id: 0,
  member: {
    id: 0,
  },
  steps: 0,
  exerciseMinute: 0,
  exerciseDistance: '',
  exerciseDay: '',
  exerciseStart: '',
  exerciseEnd: '',
  calorie: ''
}

const [isSavingModalOpen, setIsSavingModalOpen] = useState(false);
// 데이터에서 null 값을 기본값으로 변환하는 함수
function transformDataWithDefaults(data) {
  return {
    id: data.id || 0,
    memberId: data.member?.id || 0,
    steps: data.steps || 0,
    exerciseMinute: data.exerciseMinute || 0,
    exerciseDistance: data.exerciseDistance || '',
    exerciseDay: data.exerciseDay || '',
    exerciseStart: data.exerciseStart || '',
    exerciseEnd: data.exerciseEnd || '',
    calorie: data.calorie || ''
  };
}

const handleCloseBtn = async () => {
  try {
    setIsSavingModalOpen(true);
    const closeTime = formatCurrentDateTime();
    const closeRes = await closeExercise(closeTime);
    console.log('운동 화면', closeRes);

    // 함수 호출 전에 데이터 변환
    const transformedData = transformDataWithDefaults(closeRes);
    // 변환된 데이터를 사용하여 함수 호출
    const chainRes = await recordExercise(
      transformedData.id,
      transformedData.memberId,
      transformedData.steps,
      transformedData.exerciseMinute,
      transformedData.exerciseDistance,
      transformedData.exerciseDay,
      transformedData.exerciseStart,
      transformedData.exerciseEnd,
      transformedData.calorie
    );
    alert('블록체인 저장 성공!')
    console.log('블록체인 저장 내용', chainRes);
    setIsSavingModalOpen(false);
    navigate('/walking')
  } catch (err) {
    console.log('운동 종료 중 문제 발생 : ', err)
    setIsSavingModalOpen(false);
  }
}

  if(currentMember.member_id === pageOwnerId){
    useEffect(() => {
      console.log("geoLocation 실행!")
        getLocation()
    }, [tabIndex])
  }

  
  const tabArr=[
    {
      tabTitle:(
        <div className={tabIndex===0 ? styles.mode_choose : styles.mode_other_list} onClick={()=>tabClickHandler(0)}>
          <p className={styles.mode_friend_list_txt}>실시간 운동</p>
        </div>
      ),  
      tabCont:(
        <div className={styles.socket_page_content}>
          <div className={styles.socket_box}>
                {/* <MyResponsiveRadialBar2 data={data}/> */}
                <div style={{position: 'relative', marginBottom: '2rem'}} >
                  <MapComponent location={position}/>
                </div>
                <div className={styles.close_btn_box}>
                  <div className={styles.distance_title}>총 운동거리 : {realtimeExerciseData.distance} km</div>
                  <button className={styles.close_btn} onClick={handleCloseBtn}>종료</button>
                </div>
          </div>
          
        </div>
      )
    },
    
    
    {
    tabTitle:(
      <div className={tabIndex===1 ? styles.mode_choose : styles.mode_other_list} onClick={()=>tabClickHandler(1)}>
        <p className={styles.mode_friend_list_txt}>채팅</p>
      </div>
    ),        
    tabCont:(
      <div className={styles.socket_page_content}>
          <div className={styles.socket_box}>
              <div style={{fontWeight: 'bold', alignSelf: 'center', fontSize: '1.5rem'}}> 🏃{pageOwner.nickname}🤸님 응원하기</div> 

              {/* 전송된 메세지들이 보이는 공간 messages => 메세지 배열, currentTypingId => 현재 타이핑 중인 메세지 ID, onEndTyping => 메세지 입력이 끝났을 때 호출하는 함수  */}
              <MessageList
                chatContainerRef={chatContainerRef}
                messages={messages}
                currentTypingId={currentTypingId}
                onEndTyping={handleEndTyping}
                pageOwnerId={pageOwnerId}
                currentMember={currentMember}
              />
              {/* 메세지가 쳐지는 INPUT FORM onSendMessage => 새로운 메세지가 전송될 때 호출하는 함수  */}
              <div style={{display: 'flex'}}>
                {/* 모바일 환경인지 아닌지에 따라 버튼 다르게 구현 */}
                {isMobile?(
                  <FileUploader currentMember = {currentMember} clientHeader={clientHeader} pageOwnerId={pageOwnerId}/>
                ):(
                  <AudioRecord stompClient={stompClient} currentMember = {currentMember} pageOwnerId={pageOwnerId}/>
                )}
                
              
              </div>
              <MessageForm onSendMessage={handleSendMessage} clientHeader={clientHeader} currentMember = {currentMember}  pageOwnerId={pageOwnerId}/>
          </div>
  
      </div>
  )
  }]

  return (
    <>
    {isSavingModalOpen && <LoadingModal text="저장 중..." />}
      {isModal && (
        <div className={styles.modal_background}>
          <div className={styles.lets_start_modal_container}>
            <p className={styles.lets_start_modal_title}>잠시 후! <br/> 오늘의 달리기가 <br/> 시작됩니다. </p> 
            <div className="countdown text-9xl" style={{alignSelf: 'center', paddingBottom: "5rem", fontFamily: "bp_r"}}>
              {time !== 0? (<span style={{"--value": time}}></span>) : "시작!"}
            </div>
          </div>
          <audio style={{display: "none"}} controls autoPlay>
        <source src='https://d210.s3.ap-northeast-2.amazonaws.com/WALK_WALK.mp3' type='audio/mpeg'/>
      </audio>
        </div>
        
      )}
      


      <div className={styles.main_container}>
        <div className={styles.tab_container}>
          <div className={styles.mode_tabs}>
              {tabArr.map((mode, index)=>{
                  return <div key={index}>{mode.tabTitle}</div>
              })}
          </div>
            {tabArr[tabIndex].tabCont}
        </div>
      </div>
    </>
  );
};

// 파일 보내는 로직
const FileUploader = ({currentMember, pageOwnerId, clientHeader}) => {

  
  // H. 사용자가 업로드한 파일용 useState
   const [chatFile, setChatFile] = useState("");


   // [ D. 사용자가 업로드한 파일 -> 음성이든, 사진이든 다루는 함수 ]
 
   // D-3 파일을 형변환 해서 소켓으로 보내는 함수 
   const handleFileChange = async (e) => {

         // D-1 파일 추출
         const file = e.target.files?.[0];
         console.log(e.target.files);
     
          var base64;

         // D-2 파일을 Base64로 형변환 
         if(file) {
           base64 = await convertBase64(file);
           console.log(base64)
           setChatFile(base64);
         }

     var messageInfo = {
       messageType: 'VOICE',
       textContent: null,
       voiceURL: base64,
       senderId: currentMember.member_id,
       senderProfileUrl: currentMember.member_profile_url,
       receiverId: pageOwnerId,
       senderNickname: currentMember.member_nickname,
       isOpened: false
     };
 
     stompClient.send("/pub/api/socket/talk", clientHeader, JSON.stringify(messageInfo));
   }
 
   // D-4 BASE 64 형변환 
   const convertBase64 = (file) => {
     return new Promise((resolve, reject) => {
       const fileReader = new FileReader();
       fileReader.readAsDataURL(file);
 
       fileReader.onload = () => {
         resolve(fileReader.result);
       };
 
       fileReader.onerror = (error) => {
         reject(error);
       };
     });
   };

 return(
   <form style={{display: 'flex', flexDirection: 'row'}}>
    <label className='btn glass' htmlFor="file-input">녹음하기</label>
     <input id='file-input' type='file' onChange={handleFileChange}/>
   </form>
 )
}


const MyResponsiveRadialBar2 = ({ data }) => (
  <ResponsiveRadialBar
      data={data}
      valueFormat=" >-0,.2~r"
      startAngle={0}
      endAngle={359}
      padding={0.6}
      cornerRadius={7}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      colors={['#FFCB23']} 
      tracksColor={["#F9DD84"]}
      enableRadialGrid={false}
      enableCircularGrid={false}
      radialAxisStart={null}
      circularAxisOuter={null}
      maxValue={10000}
      legends={[
          {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 1000,
              translateY: 1000,
              itemsSpacing: 6,
              itemDirection: 'left-to-right',
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              symbolSize: 18,
              symbolShape: 'square',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemTextColor: '#000'
                      }
                  }
              ]
          }
      ]}
  />
)


export default SocketPage4Member;