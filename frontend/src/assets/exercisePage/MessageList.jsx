import Stack from 'react-bootstrap/Stack';
import Message from './Message';
 const MessageList = ({ messages, currentTypingId, onEndTyping, pageOwnerId, currentMember, chatContainerRef}) => (
    <Stack className="messages-list" ref={chatContainerRef}>
      {/* 메세지 배열을 map 함수 돌려서 Message 배열에 넣고 있다. */}
      {messages.map((message, index) => (
        // 메세지 하나하나를 나타내는 컴포넌트
        <Message
          key={index}
          message={message}
          onEndTyping={onEndTyping}
          currentTypingId={index}
          pageOwnerId={pageOwnerId}
          currentMember={currentMember}
        />
      ))}
    </Stack>
  );
  


  export default MessageList;