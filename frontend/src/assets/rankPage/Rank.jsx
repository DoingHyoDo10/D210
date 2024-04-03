import { useState, useEffect} from "react";
import styles from "./Rank.module.css"
import { getDailyRank, getWeeklyRank, getMonthlyRank, getStreakRank } from '../../apis/rank'
import Loading from '../common/loading/Loading'

const Rank = function(){
    const [month, setMonth] = useState('');
    const [todayDate, setTodayDate] = useState('');
    const [mondayDate, setMondayDate] = useState('');
    const [sundayDate, setSundayDate] = useState('');

    const [tabIndex, setTabIndex] = useState(0);
    const [daily, setDaily] = useState();
    const [weekly, setWeekly] = useState();
    const [monthly, setMonthly] = useState();
    const [streak, setStreak] = useState();
    // const [dailyContent, setDailyContent] = useState([]);
    // const [weeklyContent, setWeeklyContent] = useState([]);
    // const [monthlyContent, setMonthlyContent] = useState([]);
    // const [streakContent, setStreakContent] = useState([]);


    const tabClickHandler = function(index){
        setTabIndex(index)
    }

    useEffect(() => {
        (async () => {
            try {
                const resDaily = await getDailyRank();
                setDaily(resDaily);
                // setDailyContent(resDaily.content);
                const resWeekly = await getWeeklyRank();
                setWeekly(resWeekly);
                // setWeeklyContent(resWeekly.content);
                const resMonthly = await getMonthlyRank();
                setMonthly(resMonthly);
                // setMonthlyContent(resMonthly.content);
                const resStreak = await getStreakRank();
                setStreak(resStreak);
                // setStreakContent(resStreak.content);
            } catch (error) {
                console.error('랭킹 정보를 가져오는 중 에러 발생 : ', error)
            }
        })();

        const today = new Date();
        const dayOfWeek = today.getDay();
        const differenceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일이면 -6, 아니면 1에서 현재 요일을 뺀 값
        const differenceToSunday = 7 - dayOfWeek; // 일요일까지 남은 날짜

        setMonth(today.getMonth() + 1); // JavaScript는 월을 0부터 시작하므로 1을 더해줌
        setTodayDate(today.getDate());
        setMondayDate(today.getDate() + differenceToMonday);
        setSundayDate(today.getDate() + differenceToSunday);
    },[])

    if (!daily || !weekly || !monthly || !streak) {
        return <Loading text="조회 중..."></Loading>;
    }

    const tabArr=[{
        tabTitle:(
            <div className={tabIndex===0 ? styles.mode_choose : styles.day_rank_tab} onClick={()=>tabClickHandler(0)}>
                <p className={styles.day_rank_tab_txt}>일</p>
            </div>
        ),
        tabCont:(
            <div className={styles.day_rank_container}>
                <div className={styles.rank_day}>
                    <p>{month}월 {todayDate}일</p>
                </div>
                <div className={styles.top_rank_container}>
                    <div className={styles.top3_ranks}>
                        {
                        daily.content.length === 0 ? "[daily] 데이터가 아직 최신화되지 않았습니다." : 
                        (daily.content.slice(0, 3).map((data, index) => (
                            (
                                <div className={styles.first_rank_container} key={index}>
                                    <p className={styles.first_rank_title}>{data.rank}등</p>
                                    <img src={'./imgs/crown'+ (index+1) +'.png'} alt="왕관" className={styles.first_rank_crown}></img>
                                    <div className={styles.first_rank_profile_container}>
                                        <img src= {data.profileUrl} alt="프로필 사진" className={styles.first_rank_img}></img>
                                        <p className={styles.first_rank_name}>{data.nickname}</p>
                                    </div>
                                </div>
                            )
                        ))) 
                        }
                    </div>
                </div>
                <div className={styles.day_ranks_container}>
                    {daily.content.map((data, index) => {
                        return(
                            <>
                                <div key={index} className={styles.day_rank_friend_container}>
                                    <p className={styles.day_rank_txt}>{data.rank}</p>
                                    <img src={data.profileUrl} alt="프로필 사진" className={styles.day_rank_friend_img_container} ></img>
                                    <p className={styles.day_rank_friend_name_txt}>{data.nickname}</p>
                                    <p className={styles.day_rank_walk_num }>{data.value}보</p>
                                </div>
                            </>
                        )
                    })}
                
                </div>
                <div className={styles.day_rank_my_container}>
                    <p className={styles.day_rank_my_txt}>{daily.myExerciseInfo.rank}</p>
                    <img src={daily.myExerciseInfo.profileUrl} alt="프로필 사진" className={styles.day_rank_my_img_container} ></img>
                    <p className={styles.day_rank_my_name_txt}>{daily.myExerciseInfo.nickname}</p>
                    <p className={styles.day_rank_my_walk_num }>{daily.myExerciseInfo.value}보</p>
                </div>
            </div>
        )
    },
    {
        tabTitle:(
            <div className={tabIndex===1 ? styles.mode_choose : styles.week_rank_tab} onClick={()=>tabClickHandler(1)}>
                <p className={styles.week_rank_tab_txt}>주</p>
            </div>
        ),
        tabCont:(
            <div className={styles.week_rank_container}>
                <div className={styles.rank_week}>
                    <p>{month}월 {mondayDate}일 ~  {month}월 {sundayDate}일</p>
                </div>
                <div className={styles.top_rank_container}>
                    <div className={styles.top3_ranks}>
                    { weekly.content.length === 0? "[weekly] 데이터가 쌓인 친구가 없습니다!" : 
                        (weekly.content.slice(0, 3).map((data, index) => 
                            (
                                <div className={styles.first_rank_container}>
                                    <p className={styles.first_rank_title}>{data.rank}등</p>
                                    <img src={'./imgs/crown'+ (index+1) +'.png'} alt="금 왕관" className={styles.first_rank_crown}></img>
                                    <div className={styles.first_rank_profile_container}>
                                        <img src= {data.profileUrl} alt="프로필 사진" className={styles.first_rank_img}></img>
                                        <p className={styles.first_rank_name}>{data.nickname}</p>
                                    </div>
                                </div>
                            )
                            ))}
                    </div>
                </div>
                <div className={styles.day_ranks_container}>
                    { weekly.content.length === 0? "" : (
                        weekly.content.map((data, index) => {
                            return(
                                <>
                                    <div key={index} className={styles.day_rank_friend_container}>
                                        <p className={styles.day_rank_txt}>{data.rank}</p>
                                        <img src={data.profileUrl} alt="프로필 사진" className={styles.day_rank_friend_img_container} ></img>
                                        <p className={styles.day_rank_friend_name_txt}>{data.nickname}</p>
                                        <p className={styles.day_rank_walk_num }>{data.value}보</p>
                                    </div>
                                </>
                            )
                        })
                    )}
                
                </div>
                <div className={styles.day_rank_my_container}>
                    <p className={styles.day_rank_my_txt}>{weekly.myExerciseInfo.rank}</p>
                    <img src={weekly.myExerciseInfo.profileUrl} alt="프로필 사진" className={styles.day_rank_my_img_container} ></img>
                    <p className={styles.day_rank_my_name_txt}>{weekly.myExerciseInfo.nickname}</p>
                    <p className={styles.day_rank_my_walk_num }>{weekly.myExerciseInfo.value}보</p>
                </div>
            </div>
        )
    },
    {
        tabTitle:(
            <div className={tabIndex===2 ? styles.mode_choose : styles.month_rank_tab} onClick={()=>tabClickHandler(2)}>
                <p className={styles.month_rank_tab_txt}>월</p>
            </div>
        ),
        tabCont:(
            <div className={styles.month_rank_container}>
                <div className={styles.rank_month}>
                    <p>{month}월</p>
                </div>
                <div className={styles.top_rank_container}>
                    <div className={styles.top3_ranks}>
                    { monthly.content.length === 0? "[monthly] 데이터가 쌓인 친구가 없습니다!" : (                          
                        monthly.content.slice(0, 3).map((data, index) => (
                                <div className={styles.first_rank_container}>
                                    <p className={styles.first_rank_title}>{data.rank}등</p>
                                    <img src={'./imgs/crown'+ (index+1) +'.png'} alt="금 왕관" className={styles.first_rank_crown}></img>
                                    <div className={styles.first_rank_profile_container}>
                                        <img src={data.profileUrl} alt="프로필 사진" className={styles.first_rank_img}></img>
                                        <p className={styles.first_rank_name}>{data.nickname}</p>
                                    </div>
                                </div>
                            )))}
                    </div>
                </div>
                <div className={styles.day_ranks_container}>
                    { monthly.content.length === 0? "" : (
                        monthly.content.map((data, index) => {
                            return(
                                <>
                                    <div key={index} className={styles.day_rank_friend_container}>
                                        <p className={styles.day_rank_txt}>{data.rank}</p>
                                        <img src={data.profileUrl} alt="프로필 사진" className={styles.day_rank_friend_img_container} ></img>
                                        <p className={styles.day_rank_friend_name_txt}>{data.nickname}</p>
                                        <p className={styles.day_rank_walk_num }>{data.value}보</p>
                                    </div>
                                </>
                            )
                        })
                    )}
                
                </div>
                <div className={styles.day_rank_my_container}>
                    <p className={styles.day_rank_my_txt}>{monthly.myExerciseInfo.rank}</p>
                    <img src={monthly.myExerciseInfo.profileUrl} alt="프로필 사진" className={styles.day_rank_my_img_container} ></img>
                    <p className={styles.day_rank_my_name_txt}>{monthly.myExerciseInfo.nickname}</p>
                    <p className={styles.day_rank_my_walk_num }>{monthly.myExerciseInfo.value}보</p>
                </div>
            </div>
        )
    },
    {
        tabTitle:(
            <div className={tabIndex===3 ? styles.mode_choose : styles.strick_rank_tab} onClick={()=>tabClickHandler(3)}>
                <p className={styles.strick_rank_tab_txt}>스트릭</p>
            </div>
        ),
        tabCont:(
            <div className={styles.strick_rank_container}>
                <div className={styles.strick_top_rank_container}>
                    <div className={styles.strick_top3_ranks}>
                    { streak.content.length === 0? "[Streak] 데이터가 쌓인 친구가 없습니다!" : (                          
                        streak.content.slice(0, 3).map((data, index) => (
                                <div className={styles.first_rank_container}>
                                <p className={styles.first_rank_title}>{data.rank}등</p>
                                <img src={'./imgs/crown'+ (index+1) +'.png'} alt="금 왕관" className={styles.first_rank_crown}></img>
                                <div className={styles.first_rank_profile_container}>
                                    <img src= {data.profileUrl} alt="프로필 사진" className={styles.first_rank_img}></img>
                                    <p className={styles.first_rank_name}>{data.nickname}</p>
                                </div>
                                </div>
                            )))}
                    </div>
                </div>
                <div className={styles.strick_ranks_container}>
                    {streak.content.map((data, index) => {
                        return(
                            <>
                                <div key={index} className={styles.strick_rank_friend_container}>
                                    <p className={styles.strick_rank_txt}>{data.rank}</p>
                                    <img src={data.profileUrl} alt="프로필 사진" className={styles.strick_rank_friend_img_container} ></img>
                                    <p className={styles.strick_rank_friend_name_txt}>{data.nickname}</p>
                                    <p className={styles.strick_rank_walk_num }>{data.value + 1} 일째 </p>
                                </div>
                            </>
                        )
                    })}
                
                </div>
                <div className={styles.strick_rank_my_container}>
                    <p className={styles.day_rank_my_txt}>{streak.myExerciseInfo.rank}</p>
                    <img src={streak.myExerciseInfo.profileUrl} alt="프로필 사진" className={styles.day_rank_my_img_container} ></img>
                    <p className={styles.day_rank_my_name_txt}>{streak.myExerciseInfo.nickname}</p>
                    <p className={styles.day_rank_my_walk_num }>{streak.myExerciseInfo.value + 1} 일째 </p>
                </div>
            </div>
        )
    }]

    return(
        <>
            <div className={styles.main_container}>
                <div className={styles.rank_content_container}>
                    <div className={styles.rank_title}>
                        <p>친구 랭킹</p>
                    </div>  
                    <div className={styles.rank_list_content}>
                        <div className={styles.mode_tabs}>
                            {tabArr.map((mode, index)=>{
                                return mode.tabTitle
                            })}
                        </div>

                        <div>
                            {tabArr[tabIndex].tabCont}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rank;