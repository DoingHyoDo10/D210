import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./HalliGalli.module.css";
import { gray } from "d3-color";
import { getHalley } from "../../apis/halleygalley";
import { useStore } from "../../stores/member";
import Calendar from "../common/calendar/Calendar";

const Halli = function(){
    const {memberId, setMemberId} = useStore();
    useEffect(()=>{
        getHalley(memberId)
            .then(res=>{setHalleyInfo(res)})
    }, [])
    const navigate = useNavigate();

    const moveToMainPage = function () {
        navigate("/main")
    }
    const [halleyInfo, setHalleyInfo] = useState({});
    const[rest, setRest] = useState(false);
    

    const openRestModal = function(){
        setRest(!rest);
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
                    <p className={styles.title_txt}>나의 할리 {halleyInfo.nickname}</p>
                </div>
                <div className={styles.profile_container}>
                    <p className={styles.profile_txt}>나의 할리</p>
                    <img src={halleyInfo.profileUrl} alt="프로필 이미지" className={styles.profile_img}></img>
                    <p className={styles.profile_name_txt}>{halleyInfo.nickname}</p>
                </div>
                <div className={styles.mission_container}>
                    <p className={styles.mission_title_h}><span style={{color: "#186647", fontFamily: "bc_b"}}>{halleyInfo.nickname}</span>님이 등록한 미션</p>
                    

                    <div className={styles.mission_back}>
                        { halleyInfo.requestedTime != -1 ?
                            <>
                                <p className={styles.content_txt}>내용</p>
                                <div className={styles.bottom_line}></div>
                                <div className={styles.content_container}>
                                    <img src="/imgs/ch2_bol_money.png" alt="할리 돈 오리" className={styles.ch2_money}></img>
                                    <div className={styles.content_txt_container}>
                                        <p className={styles.content_detail_txt} style={{marginTop: 25}}>일일 목표 시간 : {halleyInfo.requestedTime}분</p>
                                        <p className={styles.content_detail_txt} style={{marginTop: -5}}>총 휴일권 : {halleyInfo.dayoff}개</p>
                                    </div>
                                </div>
                                <p className={styles.money_content_txt}>금액</p>
                                <div className={styles.money_bottom_line}></div>
                                <div className={styles.money_content_container}>

                                    <img src="/imgs/money.png" alt="할리 돈 오리" className={styles.money}></img>
                                    <div className={styles.money_content_txt_container}>
                                        <p className={styles.money_content_detail_txt} style={{marginTop: 25}}>총<span style={{fontSize : '0.7rem', color : "#7F7F7E"}}>(월 단위)</span> : {halleyInfo.reward}원</p>
                                        <p className={styles.money_content_detail_txt} style={{marginTop: -5}}>일일<span style={{fontSize : '0.7rem', color : "#7F7F7E"}}>(월/해당 월 날짜 수)</span> : 10,000원</p>
                                    </div>
                                </div>
                            </>
                            : <>
                                <div className={styles.no_mission_container}>
                                    <p className={styles.no_mission_txt}>나의 할리가<br></br>설정한 미션이 <br></br>존재하지 않습니다.</p>
                                    <img src="/imgs/ch1_bol_q.png" alt="갈리 오리둥절" className={styles.no_mission_img}></img>
                                </div>
                            </>
                        }
                    </div>
                    
                </div>

                <div className={styles.calendar_container}>
                    <p className={styles.mission_title2}>회원님이 등록한 미션 현황</p>
                    <Calendar></Calendar>
                    <div className={styles.days_content_box_container}>
                        <div className={styles.content_title_container}>
                            <p className={styles.calen_title}>3월 12일</p>
                            <div className={styles.rest_btn_container} onClick={openRestModal}>
                                <p>휴식권 사용</p>
                            </div>
                        </div>
                        <div className={styles.ff_btn_container}>
                            <div className={styles.walk_cnt_btn_container}>
                                <img src="/imgs/foot.png" alt="걸음 수 아이콘" className={styles.foot_icon}></img>
                                <p className={styles.base_walk_cnt}>걸음수</p>
                                <p className={styles.record_walk_cnt}>1231보</p>
                            </div>
                            <div className={styles.walk_time_btn_container}>
                                <img src="/imgs/clock_icon.png" alt="시간 아이콘" className={styles.clock_icon}></img>
                                <p className={styles.base_time_cnt}>걸은 시간</p>
                                <p className={styles.record_time_cnt}>10분</p>
                            </div>
                            <div className={styles.walk_road_btn_container}>
                                <img src="/imgs/map_icon.png" alt="맵 아이콘" className={styles.road_icon}></img>
                                <p className={styles.base_road_cnt}>걸은 거리</p>
                                <p className={styles.record_road_cnt}>0.2 Km</p>
                            </div>
                        </div>
                        <div className={styles.sf_btn_container}>
                            <div className={styles.mission_money_btn_container}>
                                <p className={styles.base_money_cnt}>누적 미션 금액</p>
                                <p className={styles.record_money_cnt}>10,000원 <span style={{color: "#727768", fontSize: 12}}>(1*10,000)</span></p>
                            </div>
                            <div className={styles.mission_cp_btn_container}>
                                <p className={styles.base_cp_cnt}>남은 휴식권</p>
                                <p className={styles.record_cp_cnt}>4개</p>
                            </div>
                        </div>
  
                    </div>
                </div>



            </div>
        </>
    )
}

export default Halli