
import { useEffect, useState } from "react";
import Msg from "./Msg.module.css"

export default function MyMsg({ message}) {

  const [audio, setAudio] = useState(new Audio(message.voiceURL)); // 오디오 객체
  const [play, setPlay] = useState(false);                        // Play 
  const [source, setSource] = useState();                         // 오디오 소스 담는 곳


  useEffect(() => {
    if(play){
      audio.play();
    } else {
      audio.pause();
    }
  }, [play])


  const formattedTime =
    typeof message.createdAt === "string"
      ? new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
  return (
    <div style={{display:"flex", flexDirection: "row-reverse"}}>
      <div className={ "user-message"}>
        {/* isTyping = 애니메이션을 할까말까 boolean값, curretTypingId는 제일 최근에 쳤던 메세지 ID */}
        {message.voiceURL !== ''? 
          <>
          <audio style={{display: "none"}} controls autoPlay>
            <source src={message.voiceURL} type="audio/mpeg" />
          </audio>
            음성메세지 
            <button className="btn glass" onClick={()=>setPlay((prev) => !prev)}>🎧</button>
          </>: message.textContent}
      </div>

      <div className={Msg.time}>{formattedTime}</div>
    </div>
  );
}
