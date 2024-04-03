import styles from "./Walking.module.css"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ResponsiveRadialBar } from '@nivo/radial-bar'
import { getRealtimeExerciseData, getExerciseCriteria } from "../../apis/exercise"
import Calendar from "../common/calendar/Calendar"

const Walking = function () {
  const navigate = useNavigate();
  const [realtimeExerciseData, setRealtimeExerciseData] = useState({steps:0, time:0, distance:0});  
  const [myCriteria, setMyCriteria] = useState({steps:0, time:0, distance:0});

  useEffect(() => {
    (async () => {
      try {
        const response = await getRealtimeExerciseData();

        // 거리 단위 m -> km로 변환 & 소수점 첫 번째 자리까지 반올림
        const distanceInKm = (response.distance / 1000).toFixed(1);

        setRealtimeExerciseData({...response, distance: parseFloat(distanceInKm)});

        const criteriaRes = await getExerciseCriteria();
        setMyCriteria({steps: criteriaRes.steps, time: criteriaRes.exerciseMinute, distance: criteriaRes.exerciseDistance});
        console.log(criteriaRes);
      } catch (error) {
        console.log('운동 정보 조회 실패 :', error)
      }
    })();
  },[]);

  const [data, setData] = useState([
    {
      "id": "걸음 수",
      "data": [
        {
          "x": '현재',
          "y":  0
        }
      ]
    },
    {
      "id": "운동시간",
      "data": [
        {
          "x": '현재',  
          "y": 0
        }
      ]
    },
    {
      "id": "이동거리",
      "data": [
        {
          "x": '현재',  
          "y": 0
        }
      ]
    }
  ]);

  useEffect(() => {
    setData([
      {
        "id": "걸음 수",
        "data": [
          {
            "x": '현재',
            "y":  myCriteria.steps > 0 ? (realtimeExerciseData.steps / myCriteria.steps) * 100 : 0
          }
        ]
      },
      {
        "id": "운동시간",
        "data": [
          {
            "x": '현재',  
            "y": myCriteria.time > 0 ? (realtimeExerciseData.time / myCriteria.time) * 100 : 0
          }
        ]
      },
      {
        "id": "이동거리",
        "data": [
          {
            "x": '현재',  
            "y": myCriteria.distance > 0 ? (realtimeExerciseData.distance / myCriteria.distance) * 100 : 0
          }
        ]
      }
    ]);
    }, [realtimeExerciseData, myCriteria])

    const currentMember =  JSON.parse(localStorage.getItem('tokens')) || {
      member_id: 1000,
      member_nickname: "지나가는 오리 1 ",
      member_profile_url: "https://d210.s3.ap-northeast-2.amazonaws.com/duck.gif",
      Authorization: null    
      };

    const moveToSockeForMember = () => {
      navigate(`/member/${currentMember.member_id}`)
    }

  return(
    <div className={styles.walking_container}>
        <div className={styles.walking_title}>오늘의 운동</div>  
        <div className={styles.walking_content_container} >
          <div className={styles.walking_graph_container}>
            <MyResponsiveRadialBar data={data}/>
          </div>
            <div className={styles.walking_info_container}>
              <div className={styles.walking_info_sub_container}>
                <div className={styles.info_title}>걸음 수</div>
                <div className={styles.info_box}>
                  <div>{realtimeExerciseData.steps} /</div>
                  <div>{myCriteria.steps} 보</div>
                </div>
              </div>
                <div className={styles.walking_info_sub_container}>
                    <div className={styles.info_title}>운동 시간</div>
                    <div className={styles.info_box}>
                      <div>{realtimeExerciseData.time} /</div>
                      <div>{myCriteria.time} 분</div>
                    </div>
                </div>
                <div className={styles.walking_info_sub_container}>
                    <div className={styles.info_title}>이동 거리</div>
                    <div className={styles.info_box}>
                      <div>{realtimeExerciseData.distance} /</div>
                      <div>{myCriteria.distance} km</div>
                    </div>
                </div>  
            </div>
        </div>
        
        <div className={styles.go_exercise_btn} onClick={moveToSockeForMember}>
            <img className={styles.go_exercise_btn_img} src="/imgs/ch1_bol_walk.gif"/>
            <p className={styles.go_exercise_btn_txt}>운동 측정</p>
        </div>
        <Calendar/>
    </div>
)};

const MyResponsiveRadialBar = ({ data }) => (
    <ResponsiveRadialBar
        data={data}
        valueFormat=" >-0,.2f"
        startAngle={0}
        endAngle={359}
        padding={0.2}
        cornerRadius={7}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        colors={['#FFCB23']} 
        tracksColor={["#FFEFBC"]}
        enableRadialGrid={false}
        enableCircularGrid={false}
        radialAxisStart={null}
        circularAxisOuter={null}
        maxValue={100}
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
);

export default Walking;