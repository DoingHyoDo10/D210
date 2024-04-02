import { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Rank.module.css"
import { instance } from "../../apis/axiosModule";

const Rank = function(){
    
    const now = new Date();

    const [tabIndex, setTabIndex] = useState(0);
    const [daily, setDaily] = useState([]);
    const [weekly, setWeekly] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const [streak, setStreak] = useState([]);


    const tabClickHandler = function(index){
        setTabIndex(index)
    }


    // 1. Tab Bar 인덱스를 받아서 그때 그때 Ranking List를 
    //    만드는 함수 
   const getRanking = async (index) => {

    var url; 

    switch(index){
        case 0:
            url = `/walk/ranking/steps/daily`;
            break;
        case 1:
            url = `/walk/ranking/steps/weekly`;
            break;
        case 2:
            url = `/walk/ranking/steps/monthly`;
            break;
        case 3: 
            url = `/walk/ranking/streak`;
            break;
    }


    await instance.get(url)
    .then((res) => {
       console.log(res.data.data);

       switch(index){
        case 0:
            setDaily([...res.data.data.content]);
            break;
        case 1:
            setWeekly([...res.data.data.content]);
            break;
        case 2:
            setMonthly([...res.data.data.content]);
            break;
        case 3: 
            setStreak([...res.data.data.content]);
            break;
    }
       
    })
    .catch((error) => {console.log(error)});
   }

    useEffect(() => {
        getRanking(0);
        getRanking(1);
        getRanking(2);
        getRanking(3);
    },[])



    const tabArr=[{
        tabTitle:(
            <div className={tabIndex===0 ? styles.mode_choose : styles.day_rank_tab} onClick={()=>tabClickHandler(0)}>
                <p className={styles.day_rank_tab_txt}>일</p>
            </div>
        ),
        tabCont:(
            <div className={styles.day_rank_container}>
                <div className={styles.rank_day}>
                    <p>{now.getMonth() + 1}월  {now.getDate()}일</p>
                </div>
                <div className={styles.top_rank_container}>
                    <div className={styles.top3_ranks}>
                        {
                        daily.length === 0? "[daily] 데이터가 아직 최신화되지 않았습니다." :(daily.map((data, index) => {
                            {if(index === 3) { return; }}
                            {return (
                                <div className={styles.first_rank_container}>
                                <p className={styles.first_rank_title}>{index+1}등</p>
                                <img src={'./imgs/crown'+ (index+1) +'.png'} alt="금 왕관" className={styles.first_rank_crown}></img>
                                <div className={styles.first_rank_profile_container}>
                                    <img src= {data.profileUrl} alt="프로필 사진" className={styles.first_rank_img}></img>
                                    <p className={styles.first_rank_name}>{data.nickname}</p>
                                </div>
                                </div>
                            )}
                          }) ) 
                        }
                    </div>
                </div>
                <div className={styles.day_ranks_container}>
                    {daily.map((data, index) => {
                        return(
                            <>
                                <div key={index} className={styles.day_rank_friend_container}>
                                    <p className={styles.day_rank_txt}>{index + 1}</p>
                                    <img src={data.profileUrl} alt="프로필 사진" className={styles.day_rank_friend_img_container} ></img>
                                    <p className={styles.day_rank_friend_name_txt}>{data.nickname}</p>
                                    <p className={styles.day_rank_walk_num }>{data.value}보</p>
                                </div>
                            </>
                        )
                    })}
                
                </div>
                <div className={styles.day_rank_my_container}>
                    {daily.map((data,index) => {
                        {if(index === 1) {return}}
                        return(
                          <>
                           <p className={styles.day_rank_my_txt}>{index + 1}</p>
                            <img src={data.profileUrl} alt="프로필 사진" className={styles.day_rank_my_img_container} ></img>
                            <p className={styles.day_rank_my_name_txt}>{data.nickname}</p>
                            <p className={styles.day_rank_my_walk_num }>{data.value}</p>
                          </>  
                            
                        )
                    })}
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
                    <p>{now.getMonth() +1}월 {now.getDate()}일 ~  {now.getMonth() +1}월 {now.getDate() + 6}일</p>
                </div>
                <div className={styles.top_rank_container}>
                    <div className={styles.top3_ranks}>

                    { weekly.length === 0? "[weekly] 데이터가 쌓인 친구가 없습니다!" : (                          
                        weekly.map((data, index) => {
                            {if(index === 3) { return; }}
                            {return (
                                <div className={styles.first_rank_container}>
                                <p className={styles.first_rank_title}>{index+1}등</p>
                                <img src={'./imgs/crown'+ (index+1) +'.png'} alt="금 왕관" className={styles.first_rank_crown}></img>
                                <div className={styles.first_rank_profile_container}>
                                    <img src= {data.profileUrl} alt="프로필 사진" className={styles.first_rank_img}></img>
                                    <p className={styles.first_rank_name}>{data.nickname}</p>
                                </div>
                                </div>
                            )}
                          }))}
                    </div>
                </div>
                <div className={styles.day_ranks_container}>
                    <br/>
                    { weekly.length === 0? "" : (
                        weekly.map((data, index) => {
                            return(
                                <>
                                    <div key={index} className={styles.day_rank_friend_container}>
                                        <p className={styles.day_rank_txt}>{index + 1}</p>
                                        <img src={data.pimg} alt="프로필 사진" className={styles.day_rank_friend_img_container} ></img>
                                        <p className={styles.day_rank_friend_name_txt}>{data.nickname}</p>
                                        <p className={styles.day_rank_walk_num }>{data.walk}보</p>
                                    </div>
                                </>
                            )
                        })
                    )}
                
                </div>
                <div className={styles.day_rank_my_container}>
                { weekly.length === 0? "" : (weekly.map((data,index) => {
                        {if(index === 1) {return}}
                        return(
                          <>
                           <p className={styles.day_rank_my_txt}>{index + 1}</p>
                            <img src={data.profileUrl} alt="프로필 사진" className={styles.day_rank_my_img_container} ></img>
                            <p className={styles.day_rank_my_name_txt}>{data.nickname}</p>
                            <p className={styles.day_rank_my_walk_num }>{data.value}</p>
                          </>  
                            
                        )
                    }))}
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
                    <p>{now.getMonth() +1}월</p>
                </div>
                <div className={styles.top_rank_container}>
                    <div className={styles.top3_ranks}>
                    { monthly.length === 0? "[monthly] 데이터가 쌓인 친구가 없습니다!" : (                          
                        monthly.map((data, index) => {
                            {if(index === 3) { return; }}
                            {return (
                                <div className={styles.first_rank_container}>
                                <p className={styles.first_rank_title}>{index+1}등</p>
                                <img src={'./imgs/crown'+ (index+1) +'.png'} alt="금 왕관" className={styles.first_rank_crown}></img>
                                <div className={styles.first_rank_profile_container}>
                                    <img src= {data.profileUrl} alt="프로필 사진" className={styles.first_rank_img}></img>
                                    <p className={styles.first_rank_name}>{data.nickname}</p>
                                </div>
                                </div>
                            )}
                          }))}
                    </div>
                </div>
                <div className={styles.day_ranks_container}>
                <br/>
                    { monthly.length === 0? "" : (
                        monthly.map((data, index) => {
                            return(
                                <>
                                    <div key={index} className={styles.day_rank_friend_container}>
                                        <p className={styles.day_rank_txt}>{index + 1}</p>
                                        <img src={data.pimg} alt="프로필 사진" className={styles.day_rank_friend_img_container} ></img>
                                        <p className={styles.day_rank_friend_name_txt}>{data.nickname}</p>
                                        <p className={styles.day_rank_walk_num }>{data.walk}보</p>
                                    </div>
                                </>
                            )
                        })
                    )}
                
                </div>
                <div className={styles.day_rank_my_container}>
                { monthly.length === 0? "" : (monthly.map((data,index) => {
                        {if(index === 1) {return}}
                        return(
                          <>
                           <p className={styles.day_rank_my_txt}>{index + 1}</p>
                            <img src={data.profileUrl} alt="프로필 사진" className={styles.day_rank_my_img_container} ></img>
                            <p className={styles.day_rank_my_name_txt}>{data.nickname}</p>
                            <p className={styles.day_rank_my_walk_num }>{data.value}</p>
                          </>  
                            
                        )
                    }))}
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
                    { streak.length === 0? "[Streak] 데이터가 쌓인 친구가 없습니다!" : (                          
                        streak.map((data, index) => {
                            {if(index === 3) { return; }}
                            {return (
                                <div className={styles.first_rank_container}>
                                <p className={styles.first_rank_title}>{index+1}등</p>
                                <img src={'./imgs/crown'+ (index+1) +'.png'} alt="금 왕관" className={styles.first_rank_crown}></img>
                                <div className={styles.first_rank_profile_container}>
                                    <img src= {data.profileUrl} alt="프로필 사진" className={styles.first_rank_img}></img>
                                    <p className={styles.first_rank_name}>{data.nickname}</p>
                                </div>
                                </div>
                            )}
                          }))}
                    </div>
                </div>
                <div className={styles.strick_ranks_container}>
                    {streak.map((data, index) => {
                        return(
                            <>
                                <div key={index} className={styles.strick_rank_friend_container}>
                                    <p className={styles.strick_rank_txt}>{index + 1}</p>
                                    <img src={data.profileUrl} alt="프로필 사진" className={styles.strick_rank_friend_img_container} ></img>
                                    <p className={styles.strick_rank_friend_name_txt}>{data.nickname}</p>
                                    <p className={styles.strick_rank_walk_num }>{data.value + 1} 일째 </p>
                                </div>
                            </>
                        )
                    })}
                
                </div>
                <div className={styles.strick_rank_my_container}>
                { streak.length === 0? "" : (streak.map((data,index) => {
                        {if(index === 1) {return}}
                        return(
                          <>
                           <p className={styles.day_rank_my_txt}>{index + 1}</p>
                            <img src={data.profileUrl} alt="프로필 사진" className={styles.day_rank_my_img_container} ></img>
                            <p className={styles.day_rank_my_name_txt}>{data.nickname}</p>
                            <p className={styles.day_rank_my_walk_num }>{data.value + 1} 일째 </p>
                          </>  
                            
                        )
                    }))}
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