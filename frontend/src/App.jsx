import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Main from "./assets/mainPage/Main";
import Login from "./assets/memberPage/Login";
import LoginRedirect from "./assets/memberPage/LoginRedirect";
import Signup from "./assets/memberPage/Signup";
import Halli from "./assets/halligalliPage/Halli";
import Rank from "./assets/rankPage/Rank";
import Walking from "./assets/walkingPage/Walking";
import Friend from "./assets/friendPage/Friend";
import Mypage from "./assets/myPage/Mypage";
import MyWallet from "./assets/myPage/MyWallet";
import UserInfoUpdate from "./assets/myPage/UserInfoUpdate";
import Alarm from "./assets/alarmPage/Alarm";
import Report from "./assets/reportPage/Report";
import Yesterday from "./assets/yesterdayPage/Yesterday";
import Treasure from "./assets/treasurePage/Treasure";
import Voice from "./assets/voicePage/Voice";
import Store from "./assets/storePage/Store";
import KakaoPayRedirect from "./assets/myPage/KakaoPayRedirect";
import './App.css'
import Galli from "./assets/halligalliPage/Galli";
import SocketPage4Member from "./assets/exercisePage/SocketPage4Member"; 
import MyBadege from "./assets/myPage/MyBadge";
import MyGoalUpdate from "./assets/myPage/MyGoalUpdate";
import SavedVoice from "./assets/voicePage/SavedVoice";
import SendVoice from "./assets/voicePage/SendVoice";
import SendingVoice from "./assets/voicePage/SendingVoice";
import { useEffect, useState } from "react";

function App() {
  const [alramFlag, setAlarmFlag] = useState(false);
  const [alarmInfo, setAlarmInfo] = useState(null);

  const AlarmFlagHandler = () => {
    setAlarmFlag(!alramFlag);
  }

  useEffect(()=>{
    const localItem = JSON.parse(localStorage.getItem('tokens'));
    // EventSource 생성 및 설정
    if (localItem !== null) {
      const source = new EventSource(`${import.meta.env.VITE_API_URI}/notifications/subscribe/${localItem.member_id}`);
      console.log(source)
      source.addEventListener('sse', event => {
        const notificationData = JSON.parse(event.data);
        setAlarmInfo(notificationData)
        setAlarmFlag(true);
      });

      // 컴포넌트가 언마운트될 때 EventSource 종료
      return () => {
        source.close();
      };
    }
  }, []);

  return (
    <BrowserRouter>
    {alramFlag && <div className="modal-background"><div className="modal-content-box"><p>{alarmInfo.notiContent}</p> <button onClick={AlarmFlagHandler}>닫기</button></div></div>}
      <Routes>
        {/* 상하단바 보이는 페이지 */}
        <Route element={<Layout />}>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/rank" element={<Rank />}></Route>
          <Route path="/walking" element={<Walking />}></Route>
          <Route path="/friend" element={<Friend />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
        </Route>
        {/* 상하단바 없는 페이지 */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/oauth/callback/google/token" element={<LoginRedirect />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/halli" element={<Halli />}></Route>
        <Route path="/galli" element={<Galli />}></Route>
        <Route path="/mywallet" element={<MyWallet />}></Route>
        <Route path="/userinfo/update" element={<UserInfoUpdate />}></Route>
        <Route path="/alarm" element={<Alarm />}></Route>
        <Route path="/report" element={<Report />}></Route>
        <Route path="/yesterday" element={<Yesterday />}></Route>
        <Route path="/treasure" element={<Treasure />}></Route>
        <Route path="/voice" element={<Voice />}></Route>
        <Route path="/store" element={<Store />}></Route>
        <Route path="/kakaopay/callback" element={<KakaoPayRedirect />}></Route>
        <Route path="/mybadge" element={<MyBadege />}></Route>
        <Route path="/mygoal/update" element={<MyGoalUpdate />}></Route>
        <Route path="/voice/savedvoice" element={<SavedVoice />}></Route>
        <Route path="/voice/sendvoice" element={<SendVoice />}></Route>
        <Route path="/member/:id" element={<SocketPage4Member/>}></Route>
        <Route path="/voice/sendvoice/sendingvoice" element={<SendingVoice />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
