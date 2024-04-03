import styles from "./SendVoice.module.css"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getWhetherExerciseStart } from "../../apis/exercise";
import { getGalleyList } from "../../apis/halleygalley";


const SendVoice = function(){
    useEffect(()=>{
        getGalleyList()
            .then(res=>{
                const list = [];
                console.log(res)
                // 각 갈리가 운동중인지 체크
                res.forEach(data => {
                    getWhetherExerciseStart(data.memberId)
                        .then(r=>{
                            if(r){
                                list.push(data);
                            }
                        })
                })
                setGalliList(list);
            })
    },[])
    const navigate = useNavigate();
    const [galli, setGalli] = useState(false);
    const [galliList, setGalliList] = useState({});

    const moveToVoicePage = function(){
        navigate("/voice")
    }

    const moveToRealTimeVoicePage = function(memberId){
        navigate("/member/"+memberId)
    }

    const moveToNormalVoicePage = function(){
        navigate("/voice/sendvoice/sendingvoice")
    }

    const openGalliListModal = function(){
        setGalli(!galli);
        getGalleyList()
            .then(res=>{
                const list = [];
                console.log(res)
                // 각 갈리가 운동중인지 체크
                res.forEach(data => {
                    getWhetherExerciseStart(data.memberId)
                        .then(r=>{
                            if(r){
                                list.push(data);
                            }
                        })
                })
                setGalliList(list);
            })
    }

    // const galliList = [
    //     {
    //         profileUrl: "/imgs/profile_img1.jpg",
    //         nickname : "우주최강세현"
    //     },
    //     {
    //         profileUrl: "/imgs/profile_img1.jpg",
    //         nickname : "지구최강세현"
    //     },
    //     {
    //         profileUrl: "/imgs/profile_img1.jpg",
    //         nickname : "지상최강세현"
    //     },
    //     {
    //         profileUrl: "/imgs/profile_img1.jpg",
    //         nickname : "지하최강세현"
    //     },
    // ]


    return(
        <>            
            {galli && (
                <>
                    <div className={styles.modal_background}></div>
                    <div className={styles.my_galli_list_modal_container}>
                        <div className={styles.my_galli_list_title_container}>
                            <p className={styles.my_galli_list_modal_title}>운동중인 <br></br>나의 갈리 목록</p>
                            <img src="/imgs/x.png" alt="x" className={styles.my_galli_list_modal_x} onClick={openGalliListModal}></img>
                        </div>
                        <div className={styles.my_galli_list_list_container}>
                            <div className={styles.my_galli_list_names_container}>
                                {galliList.map((data, index) => {
                                    console.log(data)
                                    return(
                                        <div key={index} className={styles.my_galli_list_name_container} onClick={()=>moveToRealTimeVoicePage(data.memberId)}>
                                            <img src={data.profileUrl} alt="프로필 사진" className={styles.my_galli_list_img_container} ></img>
                                            <p className={styles.my_galli_list_name_txt}>{data.nickname}</p>
                                            <div className={styles.my_galli_list_btn_container}>
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
                <div className={styles.title_container}>
                    <img src="/imgs/direct.png" alt="뒤로가기" className={styles.back_btn} onClick={moveToVoicePage}></img>
                    <p className={styles.title_txt}>응원 메시지 보내기</p>
                </div>
                <div className={styles.voice_btn_container}>
                    <div className={styles.egg_container} onClick={openGalliListModal}>
                        <p className={styles.btn_txt}> 실시간 응원 메시지<br></br>보내기</p>
                        <img src="/imgs/mike.png" alt="마이크" className={styles.voice_img}></img>
                    </div>
                    <div className={styles.item_container} onClick={moveToNormalVoicePage}>
                        <p className={styles.btn_txt}>일반 응원 메시지<br></br>보내기</p>
                        <img src="/imgs/mike.png" alt="마이크" className={styles.voice_img}></img>
                    </div>
                    <div className={styles.back}>
                        <img src="/imgs/ch1_bol_jump.gif" alt="걷는 오리" className={styles.walk_ori}></img>
                        <img src="/imgs/ground.png" alt="땅 이미지" className={styles.ground}></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SendVoice;