import React, { useState, useEffect, useRef } from 'react';
import "./SocketPage4Member.css";
import TypeIt from 'typeit-react';
import { useLocation, useParams} from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import AudioRecord from './AudioRecord';
import './FileUploader.module.css';
import axios from 'axios';
import { getSpeech } from './getSpeech';

let stompClient;
var pageOwnerId;

// Static variable For Test
const currentMember =  JSON.parse(localStorage.getItem('tokens')) || {
  member_id: 1,
  member_nickname: "책 읽는 남자 전수민",
  member_profile_url: "https://lh3.googleusercontent.com/a/ACg8ocJRi2en1YGof4VbnYEB3r-wQBZEw_B2k-eLTZSJ_a-fM10=s96-c",
  Authorization: null
};


const SocketPage4Member = () => {

  

  //⭐ VARIABLES 
  
  // A. LocalStorage에 있는 Authorization 가져오기 
  var authorization = currentMember.Authorization;
  
  // B. 화면 이동하면서 현 사용자의 정보 가져오기 
  const location = useLocation();

  // C. 페이지 들어올 때 채팅창 스크롤이 항상 하단으로 가게 하기 위하여 사용 
  const chatContainerRef = useRef(null);

  // D. 채팅 입력 받은 것 
  const [inputChat, setInputChat] = useState("");

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
    getSpeech(receivedMsg.textContent);
    setMessages((preMessages) => [...preMessages, receivedMsg]);
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
      window.scrollTo(0, document.body.scrollHeight);
    },0);

    // C-2 이전 메세지 불러오기 
    getloadMessage();

    // D. 모바일인지 아닌지 확인 
    console.log(window.innerWidth)

    if(typeof window !== "undefined"){
      if(window.innerWidth > 412){ 
        setIsMobile(false);
    } else {
      setIsMobile(true);
    }

    }


    return () => {
      setTimeout(() => {
        var messageInfo = {
          messageType: "VOICE",
          textContent: currentMember.nickname +"님이 퇴장 하였습니다.",
          voiceURL: null,
          senderId: currentMember.member_id,
          receiverId: pageOwnerId,
          senderNickname: currentMember.member_nickname,
          senderProfileUrl: currentMember.member_profile_url,
          isOpened: false
        }
        stompClient.send("/pub/api/socket/quit", clientHeader, JSON.stringify(messageInfo));

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

  // 버튼 누를 시 맨 밑으로 
  const goBottomChat = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

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

  return (
    <div className="chat"
        ref={chatContainerRef}>
      <div className="chat-box">
        <div style={{fontWeight: 'bold', alignSelf: 'center'}}> 🏃{pageOwner.nickname}🤸님 응원하기</div> 

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


export default SocketPage4Member;