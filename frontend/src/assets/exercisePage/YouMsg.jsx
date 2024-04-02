import { useEffect, useState } from "react";
import Msg from "./Msg.module.css"


export default function YouMsg({message, index, length}) {


  const [audio, setAudio] = useState(new Audio(message.voiceURL)); // 오디오 객체
  const [play, setPlay] = useState(false);                        // Play 
  const [source, setSource] = useState(); 




  useEffect(() => {
    if(play){
      audio.play();
    } else {
      audio.pause();
    }
  }, [play])


    // 상대방 채팅의 경우 상대방의 이름과 프사가 보여야 한다.
    const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    // console.log("youMsg");
    return (
      <>
        <div className="flex" style={{flexDirection: "row"}}>
          {/* 상대방 프사 */}
          <img
            src={message.senderProfileUrl}
            className="h-[45px] w-[45px] mt-1 rounded-full mx-2 shadow-md"
          />
          <div>
            {/* 상대방 이름 */}
            <p className="font-bold">
              {message.senderNickname}
            </p>
            <div className="flex">
              <div className={"other-message"}>
        {/* isTyping = 애니메이션을 할까말까 boolean값, curretTypingId는 제일 최근에 쳤던 메세지 ID */}
        {message.voiceURL !== ''? 
          <>
          {
            length === (index+1)? (<audio style={{display: "none"}} controls autoPlay>
            <source src={message.voiceURL} type="audio/mpeg" />
          </audio>) : (<audio style={{display: "none"}}>
            <source src={message.voiceURL} type="audio/mpeg" />
          </audio>)
          }
          {message.textContent !== ''? message.textContent : "음성메세지"}
            <button className="btn glass" onClick={()=>setPlay((prev) => !prev)}>🎧</button>
          </>: message.textContent}
              </div>
              <div className="text-xs mb-2 self-end">{formattedTime}</div>
            </div>
          </div>
        </div>
      </>
      
    );
  }