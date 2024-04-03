import { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import { ResponsiveBar } from "@nivo/bar";
import { color } from "d3-color";
import { getGalleyList, getHalleyList, postGalleyRequest, getHalley, responseGalley, postMission, putMission } from "../../apis/halleygalley";
import { searchGalleyMemberList } from "../../apis/friend";
import { getRealtimeExerciseData, getWeeklyExerciseData, getExerciseCriteria } from "../../apis/exercise";
import { useStore } from "../../stores/member";
import { useSignupStore } from "../../stores/member";
import Lottie from 'react-lottie';
import confetti from '../../lotties/confetti_full.json';
import { useToolbar } from "../../stores/toolbar";
import styles2 from "../alarmPage/Alarm.module.css";
import Loading from "../common/loading/Loading";
import LoadingModal from "../common/loading/LoadingModal";

const Main = function(){
    const {memberId, setMemberId} = useStore();
    const {updateState} = useToolbar();
    useEffect(()=>{
        getExerciseCriteria()
            .then(res=>{setCriteriaData(res); console.log(res)})
        getWeeklyExerciseData()
            .then(res=>{setWeeklyExerciseData(res);})
        getRealtimeExerciseData()
            .then((res)=>{
              setRealtimeExerciseData(res);
            })
        updateHalliGalliList();
    }, [])

    const navigate = useNavigate();
    

    const moveToHalliPage = function (memberId) {
        setMemberId(memberId);
        navigate("/halli")
    }

    const moveToGalliPage = function (memberId) {
        setMemberId(memberId);
        navigate("/galli")
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        // 입력 값에 대한 즉각적인 유효성 검사를 추가
        
        setKeyword(value);
      };
    const handleSearchClick = ()=>{
        searchGalleyMemberList(keyword)
        .then((res)=>{
            setMemberList(res);
        })  
        .catch((err)=>{
            console.log(err);
        })
    }

    
    const onKeyDownHandler = (e)=>{
        if(e.key == 'Enter'){
            handleSearchClick();
        }
    }

    const [tabIndex, settabIndex] = useState(0);
    const [halli, setHalli] = useState(true);
    const [galli, setGalli] = useState(true);
    const [isHalliOpen, setIsHalliOpen] = useState(false);
    const [isGalliOpen, setIsGalliOpen] = useState(false);
    const [isHalliListOpen, setIsHalliListOpen] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [memberList, setMemberList] = useState([]);
    const [galliList, setGalliList] = useState([]);
    const [halliList, setHalliList] = useState([]);
    const [realtimeExerciseData, setRealtimeExerciseData] = useState({});
    const [halliRoadmapList, setHalliRoadmapList] = useState([]);
    const [weeklyExerciseData, setWeeklyExerciseData] = useState(null);
    const [criteriaData, setCriteriaData] = useState({steps:0, exerciseMinute:0});
    const [halliRequestList, setHalliRequestList] = useState([]);
    const [maxHalliVal, setMaxHalliVal] = useState(0);
    const [giveMeMoneyList, setGiveMeMoneyList] = useState({});
    const [missionSuccess, setMissionSuccess] = useState(false);
    const [finishedHallyList, setFinishedHallyList] = useState([{}]);

    const updateHalliGalliList = () => {
        getHalleyList()
        .then((res)=>{
            if(res){
                let data1 = [];
                let data2 = [];
                let data3 = [];
                res.forEach(element => {
                    if(element.requestedTime != null && element.requestedTime != 0){
                        data1.push(element);
                    }
                    if(element.isAccepted){
                        data2.push(element);
                    } else{
                        data3.push(element);
                    }
                });
                setHalliRoadmapList(data1);
                setHalliList(data2);
                setHalliRequestList(data3);
                calculateMaxValue(data1);
                setGiveMeMoneyList(data1);
                const hallyList = [];
                const hallyFullList = [];
                data1.forEach(d=>{
                    if(!d.getRewardAt && realtimeExerciseData.time >= d.requestedTime){
                        hallyList.push(d.memberId);
                        hallyFullList.push(d);
                    }
                })
                setFinishedHallyList(hallyFullList);
                putMission(hallyList)
                    .then(res=>{
                        if(res === 'success'){
                            setMissionSuccess(true);
                            updateState();
                        }
                    })
                if(data2.length == 0){
                    setHalli(false);
                }
                else{
                    setHalli(true);
                }
            }
            else{
                setHalliList([])
                setHalli(false);
            }
        })
    }

    const openHalliModal = function() {
        setIsHalliOpen(!isHalliOpen);
        updateHalliGalliList();
    }

    const openGalliModal = function(){
        setIsGalliOpen(!isGalliOpen);
    }

    const tabClickHandler = function(index){
        settabIndex(index)
        if(index == 0){

        }
        else if(index == 1){
            updateHalliGalliList();
        }
        else{
            // 갈리 리스트 조회
            getGalleyList()
                .then((res)=>{
                    if(res){
                        setGalliList(res);
                        console.log(res)
                        setGalli(true);
                    }
                    else{
                        setGalliList([])
                        setGalli(false);
                    }
                })
        }
    }

    const openHalliListModal = function(){
        updateHalliGalliList();
        setIsHalliListOpen(!isHalliListOpen);   
    }

    const longGalliList = function(){
        setExpanded(!expanded)
    }

    const responseToRequest = (data)=>{
        if(data.isAccept){
            alert("요청을 수락했습니다.")
        }
        else{
            alert('요청을 거절했습니다.')
        }
        responseGalley(data)
            .then(res=>{
                openHalliModal();
            });
    }

    const calculateMaxValue = (array)=>{
        let maxVal = 0;
        array.forEach(data=>{
            maxVal = Math.max(maxVal, data.requestedTime)
        })
        setMaxHalliVal(maxVal);
    }

    //===========================================================================
    //===========================================================================
    // 나 모달
    const 운동데이터 = {
        criteriaTime: 120,       // 기준 운동시간
        criteriaSteps: 6000,    // 기준 걸음수
    };
    const 프로그래스바 = {
        calculatedTime: realtimeExerciseData.time/criteriaData.exerciseMinute*320 < 70 ? 70 : realtimeExerciseData.time/criteriaData.exerciseMinute*320,
        calculatedSteps: realtimeExerciseData.steps/criteriaData.steps*320 < 90 ? 90 : realtimeExerciseData.steps/criteriaData.steps*320,
    }

    const 프로그래스바2 = {
        calculatedTime: realtimeExerciseData.time/maxHalliVal*300 < 70 ? 70 : realtimeExerciseData.time/maxHalliVal*300,
    }
    

    // 할리 모달
    const 할리API요청결과 = {
        data: {
            timeStamp: "2024-12-11 21:10:10",
            exerciseTime: 10,
            maxExerciseTime: 120,
            
        },
    }

    const tabArr=[{
        tabTitle:(
            <div className={tabIndex===0 ? styles.mode_choose : styles.mode_my} onClick={()=>tabClickHandler(0)}>
                <p className={styles.mode_my_txt}>나</p>
            </div>
        ),
        tabCont:(
            <div className={styles.my_content}>
                <div className={styles.my_progress_container}>
                    <div className={styles.my_walk_time}>
                        <p className={styles.time_txt}>오늘 내가 걸은 시간</p>
                        <div className={styles.my_time_progress_container}>
                            <div className={styles.my_time_progress_base}>
                                <div className={styles.my_time_progress_move} style={{width: 프로그래스바.calculatedTime > 320 ? 320 : 프로그래스바.calculatedTime}}></div>
                                <div className={styles.my_time_ori_container} style={{width: 프로그래스바.calculatedTime > 320 ? 320 : 프로그래스바.calculatedTime}}>
                                    <p className={styles.my_time_mine} style={{color: 프로그래스바.calculatedTime > 320 ? 'red' : 'white'}}>{realtimeExerciseData.time}분</p>
                                    <img src={프로그래스바.calculatedTime > 320 ? "/imgs/ch1_bol_samerun.gif" : "/imgs/ch1_bol_samewalk.gif"} alt="제자리걸음 오리" className={styles.ch1_2}></img>
                                </div>
                                <div className={styles.my_time_number_base}>
                                    <p className={styles.my_time_min}>0분</p>
                                    <p className={styles.my_time_min2}>{criteriaData.exerciseMinute}분</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.my_walk_foot}>
                        <p className={styles.foot_txt}>오늘 내가 걸은 걸음수</p>
                        <div className={styles.my_walk_progress_container}>
                            <div className={styles.my_walk_progress_base}>
                                <div className={styles.my_walk_progress_move} style={{width: 프로그래스바.calculatedSteps > 320 ? 320 : 프로그래스바.calculatedSteps}}></div>
                                <div className={styles.my_walk_ori_container} style={{width: 프로그래스바.calculatedSteps > 320 ? 320 : 프로그래스바.calculatedSteps}}>
                                    <p className={styles.my_walk_mine} style={{color: 프로그래스바.calculatedSteps > 320 ? 'red' : 'white'}}>{`${realtimeExerciseData.steps}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}보</p>
                                    <img src={프로그래스바.calculatedSteps > 320 ? "/imgs/ch1_bol_samerun.gif" : "/imgs/ch1_bol_samewalk.gif"} alt="제자리걸음 오리" className={styles.ch1_2}></img>
                                </div>
                                <div className={styles.my_walk_number_base}>
                                    <p className={styles.my_walk_min}>0보</p>
                                    <p className={styles.my_walk_min2}>{`${criteriaData.steps}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}보</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        tabTitle:(
            <div className={tabIndex===1 ? styles.mode_choose : styles.mode_halli} onClick={()=>tabClickHandler(1)}>
                <p className={styles.mode_halli_txt}>할리</p>
            </div>
        ),
        tabCont:(
            <>
                {halli ? (
                    <div className={styles.halli_content}>
                        <div className={styles.halli_container}>
                            <div className={styles.halli_box}>
                                <p className={styles.halli_detail}>나의 할리 목록</p>
                                <div className={styles.halli_add} onClick={openHalliModal}>
                                    <p>요청목록</p>
                                </div> 
                            </div>
                            <div className={styles.my_halli_list_container} onClick={openHalliListModal}>
                                <p className={styles.halli_goal_title}>목표 걷기 시간</p>
                                { halliRoadmapList.length != 0 ?
                                    <div className={styles.halli_time_progress_container}>
                                        <div className={styles.halli_time_progress_base}>
                                            {halliRoadmapList.map((data, index) =>{
                                                return (
                                                    <div key={index} className={styles.halli_mission_container} style={{left: `${data.requestedTime/maxHalliVal*16}rem`, backgroundImage: realtimeExerciseData.time >= data.requestedTime ? 'url(/imgs/yes_marker.png)' : 'url(/imgs/no_marker.png)'}}>
                                                        <div className={styles.halli_mission_profile}>
                                                            <img src={data.profileUrl}/>
                                                        </div>
                                                        <h4>
                                                            {data.requestedTime}분
                                                        </h4>
                                                    </div>
                                                )
                                            })}
                                            
                                            <div className={styles.halli_time_progress_move} style={{width: 프로그래스바2.calculatedTime > 300 ? 300 : 프로그래스바2.calculatedTime}}></div>
                                            <div className={styles.halli_time_ori_container} style={{width: 프로그래스바2.calculatedTime > 300 ? 300 : 프로그래스바2.calculatedTime}}>
                                                <p className={styles.halli_time_mine} style={{color: 프로그래스바2.calculatedTime > 300 ? 'red' : 'white'}}>{realtimeExerciseData.time}분</p>
                                                <img src={프로그래스바2.calculatedTime > 300 ? "/imgs/ch1_bol_samerun.gif" : "/imgs/ch1_bol_samewalk.gif"} alt="제자리걸음 오리" className={styles.ch1_2}></img>
                                            </div>
                                            <div className={styles.halli_time_number_base}>
                                                <p className={styles.halli_time_min}>0분</p>
                                                {/* <p className={styles.halli_time_min2}>{maxHalliVal}</p> */}
                                            </div>
                                        </div>
                                    </div>  
                                    : <div>미션을 건 할리가 없습니다...</div>
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.no_halli_content}>
                        <div className={styles.no_halli_container}>
                            <p className={styles.no_halli_detail}> 등록된 <br></br> 나의 할리가 <br></br> 없습니다.</p> 
                            <img src="/imgs/ch2_bol_q.png" alt="오리무중 오리" className={styles.no_halli_img}></img>
                        </div>
                        <div className={styles.no_halli_btn} onClick={openHalliModal}>
                            <p className={styles.no_halli_btn_txt} >요청 목록 보러가기</p>
                        </div>

                    </div>
                )}
            </>
            
            
        )
    },
    {
        tabTitle:(
            <div className={tabIndex===2 ? styles.mode_choose : styles.mode_galli} onClick={()=>tabClickHandler(2)}>
                <p className={styles.mode_galli_txt}>갈리</p>
            </div>
        ),
        tabCont:(
            <>
            {galli ? (
                <div className={styles.galli_content} style={{overflow: expanded && 'hidden'}}>
                    <div className={styles.galli_container}>
                        <div className={styles.galli_list_title_container}>
                            <p className={styles.galli_detail}>나의 갈리 목록</p>
                            <img src="/imgs/direct.png" alt="확장 버튼" className={`${styles.galli_direct_btn} ${expanded ? '' : styles.galli_direct_btn2}`} onClick={longGalliList}></img>
                        </div>
                        <div className={styles.galli_expanded} style={{height: 240 * galliList.length, overflow: !expanded && 'scroll'}}>
                        {galliList.map((data, index) => {
                            return(
                                <div key={index} className={styles.my_galli_list_container}>
                                    <p className={styles.galli_goal_title} onClick={()=>moveToGalliPage(data.memberId)}>나의 갈리 <span style={{color: "#186647", fontFamily: "bc_b"}}>{data.nickname}</span>님의 <br></br>운동기록</p>
                                    <div className={styles.galli_time_progress_container}>
                                        {data.requestedTime == null ? <p>등록한 미션이 없습니다...</p> :<div className={styles.galli_time_progress_base}>
                                            <div className={styles.galli_time_progress_move} style={{width: 프로그래스바2.calculatedTime > 300 ? 300 : 프로그래스바2.calculatedTime}}></div>
                                            <div className={styles.galli_time_ori_container} style={{width: 프로그래스바2.calculatedTime > 300 ? 300 : 프로그래스바2.calculatedTime}}>
                                                <p className={styles.galli_time_mine} style={{color: 프로그래스바2.calculatedTime > 300 ? 'red' : 'white'}}>{운동데이터.currentTime}분</p>
                                                <img src={프로그래스바2.calculatedTime > 300 ? "/imgs/ch1_bol_samerun.gif" : "/imgs/ch1_bol_samewalk.gif"} alt="제자리걸음 오리" className={styles.ch1_2}></img>
                                            </div>  
                                            <div className={styles.galli_time_number_base}>
                                                <p className={styles.galli_time_min}>0분</p>
                                                <p className={styles.galli_time_min2}>{운동데이터.criteriaTime}분</p>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            )
                        })}
                        <div className={styles.galli_btn} onClick={openGalliModal}>
                            <div className={styles.galli_btn_txt}>나의 갈리 추가하기</div>
                        </div>

                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.no_galli_content}>
                    <div className={styles.no_galli_container}>
                        <p className={styles.no_galli_detail}> 등록된 <br></br> 나의 갈리가 <br></br> 없습니다.</p> 
                        <img src="/imgs/ch1_bol_q.png" alt="오리무중 오리" className={styles.no_halli_img}></img>
                    </div>    
                    <div className={styles.no_galli_btn} onClick={openGalliModal}>
                        <p className={styles.no_galli_btn_txt}>나의 갈리 등록하기</p>
                    </div>
                </div>
                )}
            </>
        )
    }    
    ]

    const handleMissionSuccessModal = () =>{
        if(missionSuccess){
            setFinishedHallyList([{}]);
        }
        setMissionSuccess(!missionSuccess);
    }

    const { isFirstVisit, setIsFirstVisit } = useSignupStore();
    const handleFirstVisit = (isGoing) => {
        // 이동 여부 상관없이 isFirstVisit 변경
        setIsFirstVisit(false);

        if (isGoing) {
            // ios 디바이스인지 확인
            const userAgent = navigator.userAgent.toLowerCase();
            const isIOS = /iphone|ipad|ipod/.test(userAgent);
            
            if (isIOS) {
                window.location.href = 'https://apps.apple.com/kr/app/google-%ED%94%BC%ED%8A%B8%EB%8B%88%EC%8A%A4-%ED%99%9C%EB%8F%99-%EC%B6%94%EC%A0%81%EA%B8%B0/id1433864494';
            } else {
                window.location.href = 'https://play.google.com/store/apps/details?id=com.google.android.apps.fitness';
            }
        }
    };
    // lottifiles 옵션
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: confetti,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    if(!memberList || !realtimeExerciseData || !weeklyExerciseData || !criteriaData){
        return(<Loading text="로딩중..."></Loading>)
    }
    if(!halliList || !galliList || !halliRoadmapList || !halliRequestList){
        return(<LoadingModal text="조회중..."></LoadingModal>)
    }
    return(
        <>
        <div>
        {missionSuccess && (
            <>
                <div className={styles2.modal_background}></div>
                <div className={styles2.alarm_modal_container}>
                    <div className={styles2.alarm_title_container}>
                        <p className={styles2.alarm_modal_title}>알림</p>
                        <img src="/imgs/x.png" alt="x" className={styles2.alarm_modal_x} onClick={handleMissionSuccessModal}></img>
                    </div>
                    <div className={styles2.alarm_content}>
                        <img src="/imgs/money.png" alt="알림" className={styles2.alarm_img}></img>
                        {
                            finishedHallyList.map(element => {
                                return(
                                    <span>{element.nickname}님 </span>
                                )  
                            })
                        }
                        <span>의</span>
                        <p className={styles2.alarm_detail}>미션을 달성했습니다!</p>
                    </div>
                    
                </div>
            </>
        )}





            {isFirstVisit && (
                <div className={styles.first_visit_container}>
                    <div className={styles.first_visit_lottie}>
                        <Lottie options={defaultOptions}/>
                    </div>
                    <div className={styles.first_visit_modal_container}>
                        <h2>회원가입을 환영합니다!</h2>
                        <div>운동데이터를 연동하려면</div>
                        <div>Google 피트니스 앱이 필요합니다</div>
                        <div>앱 스토어로 이동하시겠어요?</div>
                        <div className={styles.first_visit_btn_container}>
                            <button className={styles.first_visit_yes_btn} onClick={() => handleFirstVisit(true)}>네</button>
                            <button className={styles.first_visit_no_btn} onClick={() => handleFirstVisit(false)}>아니오</button>
                        </div>
                    </div>
                </div>
            )}
            {isHalliOpen && (
                <>
                    <div className={styles.modal_background}></div>
                    <div className={styles.halli_modal_container}>
                        <div className={styles.halli_title_container}>
                            <p className={styles.halli_modal_title}>할리 요청 목록</p>
                            <img src="/imgs/x.png" alt="x" className={styles.halli_modal_x} onClick={openHalliModal}></img>
                        </div>
                        <div className={styles.halli_list_container}>
                                {halliRequestList.length != 0
                                    ? halliRequestList.map((data, index) => {
                                        console.log(data)
                                        return(
                                            <>
                                                <div key={index} className={styles.halli_name_container}>
                                                    <img src={data.profileUrl} alt="프로필 사진" className={styles.halli_img_container} ></img>
                                                    <p className={styles.halli_name_txt}>{data.nickname}</p>
                                                    <div className={styles.halli_btn_container}>
                                                        <div className={styles.halli_ok_btn}>
                                                            <p className={styles.btn_txt} onClick={()=>responseToRequest({memberId: data.memberId, isAccept: true})}>수락</p>
                                                        </div>
                                                        <div className={styles.halli_no_btn}>
                                                            <p className={styles.btn_txt} onClick={()=>responseToRequest({memberId: data.memberId, isAccept: false})}>거절</p>
                                                        </div>
                                                    </div>
                                                </div>  
                                            </>
                                        )
                                    })
                                    : <div className={styles.main_default}>
                                        <img className={styles.main_default_img1} src="imgs/ch1_bol_money.png" />
                                        <img className={styles.main_default_img2} src="imgs/ch2_bol_hir.png" />
                                        <h3>아직 요청받은 기록이 없어요...</h3>
                                      </div>
                                }
                        </div>
                       
                    </div>
                </>
            )}

            {isGalliOpen && (
                <>
                    <div className={styles.modal_background}></div>
                    <div className={styles.galli_modal_container}>
                        <div className={styles.galli_title_container}>
                            <p className={styles.galli_modal_title}>갈리 요청하기</p>
                            <img src="/imgs/x.png" alt="x" className={styles.galli_modal_x} onClick={openGalliModal}></img>
                        </div>                                
                        
                        <div className={styles.galli_search_container}>
                            <input className={styles.galli_search_box}  value={keyword} onChange={handleInputChange} onKeyDown={onKeyDownHandler}></input>
                            <img className={styles.galli_search_icon} src="/imgs/search.png" alt="찾기 아이콘" onClick={handleSearchClick}></img>
                        </div>

                        <div className={styles.galli_list_container}>
                            <div className={styles.galli_names_container}>

                                {memberList.length != 0 
                                    ? memberList.map((data, index) => {
                                        return(
                                            <div key={index} className={styles.galli_name_container}>
                                                <img src={data.profileUrl} alt="프로필 사진" className={styles.galli_img_container} ></img>
                                                <p className={styles.galli_name_txt}>{data.nickname}</p>
                                                <div className={styles.galli_btn_container}>
                                                    <div className={styles.galli_put_btn}>
                                                        <p className={styles.btn_txt} onClick={()=>{
                                                            postGalleyRequest({'memberId': data.memberId});
                                                            setIsGalliOpen(false);
                                                            setMemberList([]);
                                                            }}>신청</p>
                                                    </div>
                                                </div>
                                            </div>  
                                        )
                                    })
                                    : <div className={styles.main_default}>
                                    <img className={styles.main_default_img1} src="imgs/ch2_bol_money.png" />
                                    <img className={styles.main_default_img2} src="imgs/ch1_bol.png" />
                                    <h3>닉네임으로 갈리를 검색해요</h3>
                                  </div>
                                }
                            </div>
                        </div>
                       
                    </div>
                </>
            )}

            {isHalliListOpen && (
                <>
                    <div className={styles.modal_background}></div>
                    <div className={styles.my_halli_list_modal_container}>
                        <div className={styles.my_halli_list_title_container}>
                            <p className={styles.my_halli_list_modal_title}>나의 할리 목록</p>
                            <img src="/imgs/x.png" alt="x" className={styles.my_halli_list_modal_x} onClick={openHalliListModal}></img>
                        </div>
                        <div className={styles.my_halli_list_list_container}>
                            <div className={styles.my_halli_list_names_container}>
                                {halliList.map((data, index) => {
                                    console.log(data)
                                    return(
                                        <div key={index} className={styles.my_halli_list_name_container} onClick={()=>moveToHalliPage(data.memberId)}>
                                            <img src={data.profileUrl} alt="프로필 사진" className={styles.my_halli_list_img_container} ></img>
                                            <p className={styles.my_halli_list_name_txt}>{data.nickname}</p>
                                            <div className={styles.my_halli_list_btn_container}>
                                                <img src="/imgs/direct.png" alt="화살표" className={styles.direct_btn}></img>
                                            </div>
                                        </div>  
                                    )
                                })}
                            </div>
                        </div>
                       
                    </div>
                </>
            )}
            <div className={styles.main_container}>
                <div className={styles.tab_container}>
                    <div className={styles.mode_tabs}>
                        {tabArr.map((mode, index)=>{
                            return <div key={index}>{mode.tabTitle}</div>
                        })}
                    </div>

                    <div>
                        {tabArr[tabIndex].tabCont}
                    </div>
                </div>

                
                <div className={styles.week_graph_container}>
                    <div className={styles.week_content_container}>
                        <p className={styles.week_title}>이번주 나의 기록</p>
                        <p className={styles.week_detail}>걸음 수 평균</p>
                        <div className={styles.avg_container}>
                            <p className={styles.week_avg_number}>{`${weeklyExerciseData.avg}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p className={styles.week_avg_walk}>걸음</p>
                        </div>
                        <div className={styles.graph_container}>
                            <div className={styles.graph_back}></div>
                            <div className={styles.graph_style}>
                            <ResponsiveBar /**
                         * chart에 사용될 데이터
                         */
                         data={[
                            {
                                "요일": "월",
                                "걸음 수": weeklyExerciseData.content[0].steps,
                              },
                              {
                                "요일": "화",
                                "걸음 수": weeklyExerciseData.content[1].steps,
                              },
                              {
                                "요일": "수",
                                "걸음 수": weeklyExerciseData.content[2].steps,
                              },
                              {
                                "요일": "목",
                                "걸음 수": weeklyExerciseData.content[3].steps,
                              },
                              {
                                "요일": "금",
                                "걸음 수": weeklyExerciseData.content[4].steps,
                              },
                              {
                                "요일": "토",
                                "걸음 수": weeklyExerciseData.content[5].steps,
                              },
                              {
                                "요일": "일",
                                "걸음 수": weeklyExerciseData.content[6].steps,
                              }
                        ]}
                        keys={[
                            '걸음 수',
                        ]}
                        indexBy="요일"
                        margin={{ top: 40, right: 5, bottom: 30, left: 60 }}
                        padding={0.4}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={['#5F5745']} // 커스텀해서 사용할 때
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                fontFamily: 'bc_b',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        borderRadius={6}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        axisLeft={{
                            tickValues: [0, ...weeklyExerciseData.avg != 0 ? [3000, 6000, 10000, 20000] : []], // 0만 포함하도록 설정
                            format: value => value.toLocaleString(),
                            text: {
                                fontSize: 10,
                                fontFamily: "bc_b",
                                fill: '#000000',
                            },
                            tickLineSize: (value) => (value === 0 ? 5 : 3), // 0에 해당하는 기준선만 크기를 더 크게 설정
                        }}
                        theme={{
                            /**
                             * label style (pad에 표현되는 글씨)
                             */
                            labels: {
                                text: {
                                    fontSize: 10,
                                    fontFamily: "bc_b",
                                    fill: '#000000',
                                },
                            },
                            /**
                             * legend style (default로 하단에 있는 색상별 key 표시)
                             */
                            legends: {
                                text: {
                                    fontSize: 12,
                                    fontFamily: "bc_b",
                                    fill: '#000000',
                                },
                            },

                            tooltip: {
                                container: {
                                    background: '#FFF3CE',
                                    color: '#00000',
                                    fontFamily: 'bc_b', // 원하는 글꼴로 변경
                                    fontSize: '1rem', // 원하는 크기로 변경
                                    borderRadius: '1.2rem',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                                },
                                basic: {
                                    fontFamily: 'bc_b', // 원하는 글꼴로 변경
                                    fontSize: '1rem', // 원하는 크기로 변경
                                    lineHeight: '1.4',
                                    textAlign: 'center',
                                },
                            },
                            axis: {
                                legend: {
                                    text: {
                                        fontSize: 8,
                                        fontFamily: "bc_b",
                                        fill: '#000000',
                                    },
                                },
                                ticks: {
                                    text: {
                                        fontSize: 14,
                                        fontFamily: "bc_b",
                                        fill: '#000000',
                                    },
                                },
                                line: {
                                    stroke: '#000000',
                                    strokeWidth: 2,
                                },
                            },

                            grid: {
                                line: {
                                    stroke: '#000000',
                                    strokeWidth: 0.5,
                                    strokeDasharray: '4 4' // 점선 스타일
                                }
                            }
                        }}
                        axisTop={null}
                        axisRight={null}
                        enableLabel={false}
                        enableTotals={true}

                        totalsOffset={14}
                        labelSkipWidth={12}
                        labelSkipHeight={12}

                        labelTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        role="application"
                        ariaLabel="Nivo bar chart demo"
                        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Main;