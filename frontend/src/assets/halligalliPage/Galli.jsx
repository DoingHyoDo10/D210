import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./HalliGalli.module.css";
import { getGalley } from "../../apis/halleygalley";
import { useStore } from "../../stores/member";
import Calendar from "../common/calendar/Calendar";
import Loading from "../common/loading/Loading";

const Galli = function(){

    // 현재 날짜 생성
    var today = new Date();

    // 이번 달의 마지막 날짜 구하기
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // 남은 일 수 계산
    var remainingDays = lastDayOfMonth.getDate() - today.getDate();

    const {memberId, setMemberId} = useStore();
    useEffect(()=>{
        getGalley(memberId)
            .then(res=>{setGalleyInfo(res)})
    }, [])
    const navigate = useNavigate();

    const moveToMainPage = function () {
        navigate("/main")
    }

    const moveToMissionPage = function () {
        navigate("/galli/mission")
    }
    const [galleyInfo, setGalleyInfo] = useState(null);
    const[rest, setRest] = useState(false);
    

    const openRestModal = function(){
        setRest(!rest);
    }
    if(!galleyInfo){
        return(<Loading text="조회중..."></Loading>)
    }

    return(
        <>
            {rest && (
                <>
                    <div className={styles.modal_background}></div>
                    <div className={styles.rest_modal_container}>
                        <div className={styles.rest_title_container}>
                            <img src="/imgs/x.png" alt="x" className={styles.rest_modal_x} onClick={openRestModal}></img>
                        </div>
                        <div className={styles.rest_content}>
                            <p className={styles.rest_detail}>휴일권을 정말<br></br>사용하시겠습니까?</p>
                            <img src="/imgs/ch2_bol_q.png" alt="할리 물음표" className={styles.rest_img}></img>
                        </div>
                        <div className={styles.rest_ok_container} onClick={openRestModal}>
                            <p>확인</p>
                        </div>
                       
                    </div>
                </>
            )}
            <div className={styles.main_container}>
                <div className={styles.title_container}>
                    <img src="/imgs/direct.png" alt="뒤로가기" className={styles.back_btn} onClick={moveToMainPage}></img>
                    <p className={styles.title_txt}>나의 갈리 {galleyInfo.nickname}</p>
                </div>
                <div className={styles.profile_container}>
                    <p className={styles.profile_txt}>나의 갈리</p>
                    <img src={galleyInfo.profileUrl} alt="프로필 이미지" className={styles.profile_img}></img>
                    <p className={styles.profile_name_txt}>{galleyInfo.nickname}</p>
                </div>
                <div className={styles.mission_container}>
                    <p className={styles.mission_title}>회원님이 건 미션</p>
                    
                    <div className={styles.mission_back}>
                        <p className={styles.content_txt}>내용</p>
                        <div className={styles.bottom_line}></div>
                        <div className={styles.content_container}>
                            <img src="/imgs/ch2_bol_money.png" alt="할리 돈 오리" className={styles.ch2_money}></img>
                            <div className={styles.content_txt_container}>
                                <p className={styles.content_detail_txt} style={{marginTop: 25}}>일일 목표 시간 : {galleyInfo.requestedTime == -1 ? 0 : galleyInfo.requestedTime}분</p>
                                <p className={styles.content_detail_txt} style={{marginTop: -5}}>총 휴일권 : {galleyInfo.dayoff}개</p>
                            </div>
                        </div>
                        <p className={styles.money_content_txt}>금액</p>
                        <div className={styles.money_bottom_line}></div>
                        <div className={styles.money_content_container}>
                            <img src="/imgs/money.png" alt="할리 돈 오리" className={styles.money}></img>
                            <div className={styles.money_content_txt_container}>
                                <p className={styles.money_content_detail_txt} style={{marginTop: 25}}>총<span style={{fontSize : '0.7rem', color : "#7F7F7E"}}>(월 단위)</span> : {`${galleyInfo.reward * remainingDays}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                                <p className={styles.money_content_detail_txt} style={{marginTop: -5}}>일일<span style={{fontSize : '0.7rem', color : "#7F7F7E"}}>(월/해당 월 날짜 수)</span> : {`${galleyInfo.reward}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mission_btn} onClick={moveToMissionPage}>
                        <p>미션 설정하기</p>
                    </div>
                </div>

                <div className={styles.calendar_container}>
                    <p className={styles.mission_title2}>회원님이 등록한 미션 현황</p>
                    <Calendar type="detail"></Calendar>
                    
                </div>


            </div>
        </>
    )
}

export default Galli