import styles from "./Treasure.module.css"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMonthlyExerciseData } from "../../apis/exercise";
import { getEggMoney,  } from "../../apis/wallet";


const Treasure = function(){
    const navigate = useNavigate();    

    const moveToMainPage = function () {
        navigate("/main")
    }
    useEffect(()=>{
      const profile_url = JSON.parse(localStorage.getItem('tokens')).member_profile_url;
      const nickname = JSON.parse(localStorage.getItem('tokens')).nickname;
      setProfileUrl(profile_url);
      setNickname(nickname);
      getMonthlyExerciseData(JSON.parse(localStorage.getItem('tokens')).member_id)
        .then(r=>{
          let totalSteps = 0;
          r.forEach(d=>{
            totalSteps += d.steps;
          })
          setTotalSteps(totalSteps);
          let pos = 0;
          const arr = [0, 10000,50000,100000,300000,500000]
          for(let i=0; i<arr.length; i++){
            if(totalSteps<arr[i]){
              if(i==0){
                pos = 0;
                setPos(position[0]);
                setIdx(pos)
              }
              else{
                pos = i-1;
                setPos(position[i-1]);
                setIdx(pos);
              }
              break;
            }
          }

        });
        getEggMoney()
          .then(res=>setEgg(res.egg))
    }, [])


    const [profileUrl, setProfileUrl] = useState(JSON.parse(localStorage.getItem('tokens')).member_profile_url);
    const [nickname, setNickname] = useState(JSON.parse(localStorage.getItem('tokens')).nickname);
    const [pos, setPos] = useState({});
    const [idx, setIdx] = useState(0);
    const [egg, setEgg] = useState(0);
    const [totalsteps, setTotalSteps] = useState(0);

    const position = [
      {x:'24%', y:'15%'}, 
      {x:'67.5%', y:'28%'}, 
      {x:'18%', y:'39%'},
      {x:'65%', y:'55%'},
      {x:'28%', y:'70%'},
      {x:'65%', y:'82%'},
    ]
    const boxPosition = [
      {x:'5%', y:'13%'}, 
      {x:'78.5%', y:'27%'}, 
      {x:'4%', y:'40%'},
      {x:'78%', y:'55%'},
      {x:'10%', y:'68%'},
      {x:'76%', y:'80%'},
    ]

    return(
        <>
            <div className={styles.main_container}>
                <div className={styles.title_container}>
                    <img src="/imgs/direct.png" alt="뒤로가기" className={styles.back_btn} onClick={moveToMainPage}></img>
                    <p className={styles.title_txt}>보물찾기</p>
                </div>
                <div className={styles.map_container}>
                <div style={{width:'200px', height:'54px', borderRadius:'1rem', position:'absolute', background: 'orange', left:'1rem', top:'5rem', textAlign:'center'}}>보유 에그 {egg}<br/>한달 걸음 수 {totalsteps} </div>
                  
                  {
                    boxPosition.map((data, index)=>{
                      return(index != 0 && <img className={`${styles.box} ${index>idx ? styles.animation1 : ''}`} src={index>idx ?"/imgs/box_closed.png":"/imgs/box_opened.png"} style={{left: data.x, bottom: data.y}}/>)
                    })
                  }
                  <div className={styles.marker_container} style={{left: `${pos.x}`, bottom: `${pos.y}`, backgroundImage: 'url(/imgs/yes_marker.png)'}}>
                    <div className={styles.marker_inside}>
                      <img src={profileUrl}/>
                    </div>
                  </div>
                    <img src="/imgs/treasure_map.png" alt="해변가" className={styles.map_img}></img>
                </div>
            </div>
        </>
    )
}

export default Treasure;