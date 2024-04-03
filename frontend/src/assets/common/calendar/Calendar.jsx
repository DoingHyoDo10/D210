import { useEffect, useState } from 'react';
import styles from './Calendar.module.css';
import styles2 from '../../halligalliPage/HalliGalli.module.css';
import { getMonthlyExerciseData } from '../../../apis/exercise';
import {useStore} from '../../../stores/member';
import { useDayoff } from '../../../apis/halleygalley';
import { useToolbar } from '../../../stores/toolbar';

const Calendar = (props) => {
  const {memberId, setMemberId} = useStore();
  const {updateState} = useToolbar();

  useEffect(()=>{
    getMonthlyExerciseData(memberId).then(res=>{setExerciseData(res); console.log(res)});
    console.log('dayoff: ' + props.dayoff)
  },[])
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exerciseData, setExerciseData] = useState([{}]);
  const [selectedDaysExercise, setSelectedDaysExercise] = useState({exerciseMinute:0, exerciseDistance:0, steps:0});
  const[rest, setRest] = useState(false);
  const [dayoff, setDayoff] = useState(props.dayoff);

  const openRestModal = function(){
      setRest(!rest);
      if(rest){
        if(props.dayoff > 0){
          useDayoff(memberId)
            .then(res => {
              updateState();
              setDayoff(dayoff-1);
              alert('휴식권을 사용했습니다.');

            });
        }
        else{
          alert('휴식권이 부족합니다..');
        }
      }
  }

  const createCalendar = (year, month) => {
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    
    let days = [];
    for (let i = 0; i < 7; i++) {
      days.push(<div className={`${styles.day} ${styles.day_label} ${i==0 ? ` ${styles.sunday}` : i==6 ? ` ${styles.saturday}` : ''}`}>{dayNames[i]}</div>);
    } 
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div className={styles.day} key={`empty-${i}`}></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const className = getClassNames(i, month);
      days.push(<div className={className} key={i} onClick={() => handleDateClick(i)}>{i}</div>);
    }
    return days;
  };

  const getClassNames = (day, month) => {
    if(props.type === 'detail'){
      let classNames = `${styles.day}`;
      // if (day === currentDate.getDate() && month === currentDate.getMonth()) {
        
      // }
      if (selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth()) {
        classNames += ` ${styles.selected}`;
      }
      if (new Date(currentDate.getFullYear(), month, day).getDay() === 0) {
        classNames += ` ${styles.sunday}`;
      } else if (new Date(currentDate.getFullYear(), month, day).getDay() === 6) {
        classNames += ` ${styles.saturday}`;
      }
      
      exerciseData.forEach(data=>{
        if(new Date(data.exerciseDay).getMonth() === month && new Date(data.exerciseDay).getDate() === day){
          classNames += ` ${styles.exerciseDay}`;
        }
      })
      
      return classNames;
    }
  };

  const handleDateClick = (day) => {
    const selectedDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selectedDay);
    let flag = true;
    exerciseData.forEach((data)=>{
      if(new Date(data.exerciseDay).getDate() === selectedDay.getDate()){
        // 여기
        setSelectedDaysExercise(data);
        flag = false;
      }
    })
    if(flag){
      setSelectedDaysExercise({exerciseMinute:0, exerciseDistance:0, steps:0});
    }
  };

  // const changeMonth = (delta) => {
  //   const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1);
  //   setCurrentDate(newDate);
  //   setSelectedDate(null); // Change month, reset selectedDate
  // };

  return (
    <>
      {rest && (
            <>
                <div className={styles2.modal_background}></div>
                <div className={styles2.rest_modal_container}>
                    <div className={styles2.rest_title_container}>
                        <img src="/imgs/x.png" alt="x" className={styles2.rest_modal_x} onClick={openRestModal}></img>
                    </div>
                    <div className={styles2.rest_content}>
                        <p className={styles2.rest_detail}>휴일권을 정말<br></br>사용하시겠습니까?</p>
                        <img src="/imgs/ch2_bol_q.png" alt="할리 물음표" className={styles2.rest_img}></img>
                    </div>
                    <div className={styles2.rest_ok_container} onClick={openRestModal}>
                        <p>확인</p>
                    </div>
                
                </div>
            </>
        )}

      <div className={styles.calendar} style={{textAlign: 'center'}}>
        <div className={styles.month}>{currentDate.getMonth()+1}</div>
        <div className={styles.days}>
          {createCalendar(currentDate.getFullYear(), currentDate.getMonth())}
        </div>
        {/* <button onClick={() => changeMonth(-1)}>Prev</button>
        <button onClick={() => changeMonth(1)}>Next</button> */}
        <div style={{position:'relative'}}>
        <img className={styles.calendar_bottom} src='/imgs/calendar_bottom.png'/>
        <img className={styles.duck_img} src='/imgs/ch1_nobol_samewalk.gif'/>
        </div>
      </div>
      {/* <div style={{marginTop:'20px'}}>Selected Date: {selectedDate && selectedDate.toLocaleDateString()}</div> */}

      {props.type === 'detail'
       ?
      <div className={styles2.days_content_box_container}>
        <div className={styles2.content_title_container}>{}
            <p className={styles2.calen_title}>{selectedDate.toLocaleDateString()}</p>
            {props.sort === 'halli' &&
                <div className={styles2.rest_btn_container} onClick={openRestModal}>
                    <p>휴식권 사용</p>
                </div>
            }
        </div>
        <div className={styles2.ff_btn_container}>
            <div className={styles2.walk_cnt_btn_container}>
                <img src="/imgs/foot.png" alt="걸음 수 아이콘" className={styles2.foot_icon}></img>
                <p className={styles2.base_walk_cnt}>걸음수</p>
                <p className={styles2.record_walk_cnt}>{`${selectedDaysExercise.steps}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}보</p>
            </div>
            <div className={styles2.walk_time_btn_container}>
                <img src="/imgs/clock_icon.png" alt="시간 아이콘" className={styles2.clock_icon}></img>
                <p className={styles2.base_time_cnt}>걸은 시간</p>
                <p className={styles2.record_time_cnt}>{selectedDaysExercise.exerciseMinute}분</p>
            </div>
            <div className={styles2.walk_road_btn_container}>
                <img src="/imgs/map_icon.png" alt="맵 아이콘" className={styles2.road_icon}></img>
                <p className={styles2.base_road_cnt}>걸은 거리</p>
                <p className={styles2.record_road_cnt}>{`${Math.floor(selectedDaysExercise.exerciseDistance)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}m</p>
            </div>
        </div>
        <div className={styles2.sf_btn_container}>
            <div className={styles2.mission_money_btn_container}>
                <p className={styles2.base_money_cnt}>누적 미션 금액</p>
                <p className={styles2.record_money_cnt}>10,000원 <span style={{color: "#727768", fontSize: 12}}>(1*10,000)</span></p>
            </div>
            <div className={styles2.mission_cp_btn_container}>
                <p className={styles2.base_cp_cnt}>남은 휴식권</p>
                <p className={styles2.record_cp_cnt}>{dayoff}개</p>
            </div>
        </div>
      </div>
      : <></>
    }
    </>
  );
}

export default Calendar;
