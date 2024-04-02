import YouMsg from "./YouMsg";
import MyMsg from "./MyMsg";
const Message = ({
    currentTypingId,
    message,
    currentMember,
    length,
    index
  }) => {
    
    // console.log(currentTypingId)
    // console.log(length)

    return (
      //메세지 타입에 따라 클래스 이름이 달라지도록! 
      <div>
        {Number(currentMember.member_id) == message.senderId ?  (<MyMsg message={message} index={index} length={length} />) : (<YouMsg message={message}  index={index} length={length}   />)}
      </div>
    );
  };

  export default Message;