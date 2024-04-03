import styles from "./Store.module.css"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Store = function(){
    const navigate = useNavigate();    

    const moveToMainPage = function () {
        navigate("/main")
    }

    const [item, setItem] = useState(false);

    const openItemModal = function(){
        setItem(!item);
    }

    return(
        <>

            {item && (
                <>
                    <div className={styles.modal_background}>
                        <div className={styles.select_item_container}>
                            <img src='/imgs/x.png' alt='x' className={styles.x} onClick={openItemModal}></img>
                            <div className={styles.select_item_type_container} >
                                <img src="/imgs/foot.png" alt="오리발" className={styles.select_item}></img>
                            </div>
                            <p className={styles.select_item_detail}>운동을 하지 못한 날 사용하면<br></br>스트릭이 유지되지만<br></br>배당된 돈은 받지 못합니다,</p>
                            <p className={styles.select_item_detail2}>해당 아이템을 구매하시겠습니까?</p>
                            <div className={styles.buy_btn} onClick={openItemModal}>
                                <p>구매</p>
                            </div>
                        </div>
                    </div>
                </>
                )
            }

            <div className={styles.main_container}>
                <div className={styles.title_container}>
                    <img src="/imgs/direct.png" alt="뒤로가기" className={styles.back_btn} onClick={moveToMainPage}></img>
                    <p className={styles.title_txt}>상점</p>
                </div>
                <div className={styles.egg_container}>
                    <p className={styles.egg_txt}>내 보유 에그</p>
                    <div className={styles.egg_num_container}>
                        <img src="/imgs/egg.png" alt="알" className={styles.egg}></img>
                        <p className={styles.egg_num_txt}>200알</p>
                    </div>
                </div>
                <div className={styles.item_container}>
                    <p className={styles.item_txt}>아이템</p>
                    <div className={styles.item_type_container} onClick={openItemModal}>
                        <img src="/imgs/foot.png" alt="오리발" className={styles.item}></img>
                    </div>
                    <div className={styles.item_detail}>
                        <p className={styles.item_name}>오리발 내밀권</p>
                        <div className={styles.item_egg_num_container}>
                            <img src="/imgs/egg.png" alt="알" className={styles.item_egg}></img>
                            <p className={styles.item_egg_num_txt}>200알</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Store;