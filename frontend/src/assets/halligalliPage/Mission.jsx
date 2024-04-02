import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Mission.module.css";
import { getGalley, postMission } from "../../apis/halleygalley";
import { useStore } from "../../stores/member";

const Mission = function(){
    const {memberId, setMemberId} = useStore();
    useEffect(()=>{
        getGalley(memberId)
            .then(res=>{setGalleyInfo(res)})
    }, [])
    const navigate = useNavigate();

    const moveToGalliPage = function () {
        navigate("/galli")
    }
    const [galleyInfo, setGalleyInfo] = useState({});

    
    // 현재 날짜 생성
    var today = new Date();

    // 이번 달의 마지막 날짜 구하기
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // 남은 일 수 계산
    var remainingDays = lastDayOfMonth.getDate() - today.getDate();

    const [mission, setMission] = useState(false);
    const [exerciseMinute, setExerciseMinute] = useState(0);
    const [questMoney, setQuestMoney] = useState(0);
    const [dayoff, setDayoff] = useState(0);
    const [totalMoney, setTotalMoney] = useState(questMoney*remainingDays)

    const openMissionModal = function(){
        setMission(!mission);
    }
    
    const handleExerciseMinuteChange = (e) => {
        if(e.target.value > 1000){
            alert('최대 1000시간을 넘길 수 없습니다.');
            setExerciseMinute(1000);
        }
        else{
            setExerciseMinute(e.target.value);
        }
    }
    const handleQuestMoneyChange = (e) => {
        if(e.target.value > 10000000){
            alert('최대 천만원을 넘길 수 없습니다.');
            setQuestMoney(10000000);
            setTotalMoney(remainingDays * 10000000);
        }
        else{
            setQuestMoney(e.target.value);
            setTotalMoney(remainingDays * e.target.value);
        }
    }
    const handleDayoffChange = (e) => {
        if(e.target.value > remainingDays){
            alert('모든 날짜에 쉴 수는 없습니다...');
            setDayoff(remainingDays-1);
        }
        else{
            setDayoff(e.target.value);
        }
    }
    const handleSetMission = () => {
        postMission({
            memberId: memberId,
            exerciseMinute: exerciseMinute,
            questMoney: questMoney,
            period: remainingDays,
            dayoff: dayoff
        }).then(res=>{
            if(res){
                alert('미션 등록에 성공했습니다!')
            }
            else{
                alert('이미 등록된 미션이 존재합니다.')
            }
        })
    }

    return(
        <>
            {mission && (
                <>
                    <div className={styles.modal_background}></div>
                    <div className={styles.mission_modal_container}>
                        <div className={styles.mission_title_container}>
                            <img src="/imgs/x.png" alt="x" className={styles.mission_modal_x} onClick={openMissionModal}></img>
                        </div>
                        <div className={styles.mission_content}>
                            <p className={styles.mission_detail}>해당 변경사항은<br></br>다음달부터 적용됩니다.<br></br>변경하시겠습니까?</p>
                            <img src="/imgs/ch2_bol_q.png" alt="할리 물음표" className={styles.mission_img}></img>
                        </div>
                        <div className={styles.mission_ok_container} onClick={openMissionModal}>
                            <p>확인</p>
                        </div>
                       
                    </div>
                </>
            )}
            <div className={styles.main_container}>
                <div className={styles.title_container}>
                    <img src="/imgs/direct.png" alt="뒤로가기" className={styles.back_btn} onClick={moveToGalliPage}></img>
                    <p className={styles.title_txt}>미션 설정</p>
                </div>
                <div className={styles.profile_container}>
                    <p className={styles.profile_txt}>나의 갈리</p>
                    <img src={galleyInfo.profileUrl} alt="프로필 이미지" className={styles.profile_img}></img>
                    <p className={styles.profile_name_txt}>{galleyInfo.nickname}</p>
                </div>
                <div className={styles.mission_container}>
                    <p className={styles.mission_title}>미션 변경하기</p>
                    
                    <div className={styles.mission_back}>
                        <p className={styles.content_txt}>내용</p>
                        <div className={styles.bottom_line}></div>
                        <div className={styles.content_container}>
                            <img src="/imgs/ch2_bol_money.png" alt="할리 돈 오리" className={styles.ch2_money}></img>
                            <div className={styles.content_txt_container}>
                                <div className={styles.time_container}>
                                    <p className={styles.content_detail_txt} style={{marginTop: 25}}>일일 목표 시간 : </p>
                                    <input type="number" className={styles.input_time} style={{marginTop: 25}} value={exerciseMinute} onChange={handleExerciseMinuteChange}></input>
                                    <p className={styles.content_detail_txt} style={{marginTop: 25}}>분</p>
                                </div>
                                <div className={styles.rest_container}>
                                    <p className={styles.content_detail_txt} style={{marginTop: -5}}>총 휴일권 : </p>
                                    <input type="number" className={styles.input_time} style={{marginTop: -5}} value={dayoff} onChange={handleDayoffChange}></input>
                                    <p className={styles.content_detail_txt} style={{marginTop: -5}}>개</p>
                                </div>
                            </div>
                        </div>
                        <p className={styles.money_content_txt}>금액</p>
                        <div className={styles.money_bottom_line}></div>
                        <div className={styles.money_content_container}>
                            <img src="/imgs/money.png" alt="할리 돈 오리" className={styles.money}></img>
                            <div className={styles.money_content_txt_container}>
                                <p className={styles.money_content_detail_txt} style={{marginTop: 25}}>총<span style={{fontSize : '0.7rem', color : "#7F7F7E"}}>(월 단위)</span> : {totalMoney}원</p>
                                <div className={styles.day_money_container}>
                                    <p className={styles.money_content_detail_txt} style={{marginTop: -5}}>일일 : </p>
                                    <input type="number" className={styles.input_money} style={{marginTop: -5}} value={questMoney} onChange={handleQuestMoneyChange}></input>
                                    <p className={styles.money_content_detail_txt} style={{marginTop: -5}}>원</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mission_btn} onClick={handleSetMission}>
                        <p>미션 등록하기</p>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Mission