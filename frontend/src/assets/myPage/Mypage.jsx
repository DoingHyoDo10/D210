import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Mypage.module.css";
import { getMypage } from "../../apis/member";

const Mypage = function () {
  const navigate = useNavigate();
  const [mypageInfo, setMypageInfo] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await getMypage();
        setMypageInfo(data);
      } catch (err) {
        console.error('mypage 정보를 가져오는 중 에러 발생:', err);
      }
    })();
  }, []);

  const handleLogout = () => {
    // 로컬 스토리지 값 비우기
    localStorage.clear()
    // 로그인화면으로 이동
    navigate('/')
  }

  const buttonInfos = [
    { text: "개인정보 변경", path: "/userinfo/update" },
    { text: "목표 수정", path: "/mygoal/update" },
    { text: "내 금고", path: "/mywallet" },
    { text: "내 배지", path: "/mybadge" }
  ];

  return(
    <div className={styles.mypage_container}>
      {mypageInfo && (
        <>
          <div className={styles.mypage_profile_container}>
            <div className={styles.mypage_profile_img_container}>
              <img className={styles.mypage_profile_img} src={mypageInfo.profileUrl} alt="my profile img" />
            </div>
            <div className={styles.mypage_profile_nickname}>{mypageInfo.nickname}</div>
            <div>{mypageInfo.comment}</div>
          </div>

          {buttonInfos.map((buttonInfo) => (
            <button className={styles.mypage_btn} onClick={() => navigate(buttonInfo.path)} key={buttonInfo.path}>
              <span>{buttonInfo.text}</span>
              <img className={styles.mypage_direct} src="/imgs/direct.png" alt="" />
            </button>
          ))}
          <button className={styles.mypage_logout_btn} onClick={handleLogout}>로그아웃</button>
        </>
      )}
    </div>
  )
}

export default Mypage;