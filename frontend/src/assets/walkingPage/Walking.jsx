import styles from "./Walking.module.css"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ResponsiveRadialBar } from '@nivo/radial-bar'
import { getRealtimeExerciseData } from "../../apis/exercise"
import Calendar from "../common/calendar/Calendar"



const Walking = function(){


    const currentMember =  JSON.parse(localStorage.getItem('tokens')) || {
        member_id: 1000,
        member_nickname: "지나가는 오리 1 ",
        member_profile_url: "https://d210.s3.ap-northeast-2.amazonaws.com/duck.gif",
        Authorization: null
      };

    const navigate = useNavigate(); 
   

    const moveToSockeForMember = function () {
        navigate(`/member/${currentMember.member_id}`)
    }
    const [realtimeExerciseData, setRealtimeExerciseData] = useState({});
    const [data, setData] = useState([
        {
          "id": "걸음수",
          "data": [
            {
              "x": '진행 정도',  
              "y":  6432
            }
          ]
        },
        {
          "id": "걸은 시간",
          "data": [
            {
              "x": '진행 정도',  
              "y": 44
            }
          ]
        },
        {
          "id": "거리",
          "data": [
            {
              "x": '진행 정도',  
              "y": 2
            }
          ]
        }
      ]);

    useEffect(() => {

        getRealtimeExerciseData()
        .then((res) => {
            setRealtimeExerciseData(res);
        })
    },[])

    useEffect(() => {
        setData([
            {
              "id": "걸음수",
              "data": [
                {
                  "x": "진행 정도",  
                  "y": realtimeExerciseData.steps
                }
              ]
            },
            {
              "id": "걸은 시간",
              "data": [
                {
                  "x": "진행 정도",  
                  "y": realtimeExerciseData.time
                }
              ]
            },
            {
              "id": "거리",
              "data": [
                {
                  "x": "진행 정도",  
                  "y": 34
                }
              ]
            }
          ]);
    }, [realtimeExerciseData])

   

  return(
    <div className={styles.walking_container}>
        <div className={styles.walking_title}>
            <p>오늘의 운동</p>
        </div>  
        <div className={styles.walking_content_container} >
           <div className={styles.walking_graph_container}>
            <MyResponsiveRadialBar data={data}/>
           </div>
            <div className={styles.walking_info_box}>
                <div className="m-2 w-20">
                    <div>걸음 수</div>
                    <div className={styles.info_box}>
                        6000/ 
                        <br/> 
                        100000
                    </div>
                </div>
                <div className="ml-2 mr-2  w-20">
                    <div>걸은 시간</div>
                    <div className={styles.info_box}>60/<br/> 100분</div>
                </div>
                <div className="ml-2 mr-2  w-20">
                    <div>거리</div>
                    <div className={styles.info_box}>4.5 <br/> / 7km</div>
                </div>  
            </div>
        </div>
        
        <div className={styles.go_exercise_btn} onClick={moveToSockeForMember}>
             <img src="https://d210.s3.ap-northeast-2.amazonaws.com/walking_duck.gif" width={"50rem"}/>
             <p className={styles.go_exercise_btn_txt}>운동 하러 가볼껴?</p>
        </div>
         <Calendar/>
    </div>
  )
}

const MyResponsiveRadialBar = ({ data }) => (
    <ResponsiveRadialBar
        data={data}
        valueFormat=" >-0,.2~r"
        startAngle={0}
        endAngle={359}
        padding={0.2}
        cornerRadius={7}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        colors={['#FFCB23']} 
        tracksColor={["#F9DD84"]}
        enableRadialGrid={false}
        enableCircularGrid={false}
        radialAxisStart={null}
        circularAxisOuter={null}
        maxValue={1000}
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 1000,
                translateY: 1000,
                itemsSpacing: 6,
                itemDirection: 'left-to-right',
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'square',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

export default Walking;