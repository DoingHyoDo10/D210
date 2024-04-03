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
      getMonthlyExerciseData(JSON.parse(localStorage.getItem('tokens')).member_id)
        .then(r=>{
          let totalSteps = 0;
          r.forEach(d=>{
            totalSteps += d.steps;
          })
          let pos = 0;
          const arr = [10000,50000,100000,200000,300000,400000]
          for(let i=0; i<arr.length; i++){
            if(totalSteps<arr[i]){
              pos = i;
              setPos(position[i]);
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
    const [egg, setEgg] = useState(0);

    const position = [
      {x:'24%', y:'13%'}, 
      {x:'67.5%', y:'26%'}, 
      {x:'18%', y:'37%'},
      {x:'65%', y:'53%'},
      {x:'28%', y:'68%'},
      {x:'65%', y:'80%'},
    ]

    return(
        <>
            <div className={styles.main_container}>
                <div className={styles.title_container}>
                    <img src="/imgs/direct.png" alt="뒤로가기" className={styles.back_btn} onClick={moveToMainPage}></img>
                    <p className={styles.title_txt}>보물찾기</p>
                </div>
                <div className={styles.map_container}>
                <div style={{width:'100px', height:'50px', position:'absolute', background: 'orange', left:'1rem', top:'5rem', textAlign:'center'}}>보유 에그 {egg}</div>
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