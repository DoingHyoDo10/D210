import { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Friend.module.css";
import { searchMemberList, sendFriendRequest, getFriendList, getFriendSentList, getFriendReceivedList, putFriendRequest } from "../../apis/friend";

const Friend = function(){

    const [tabIndex, setTabIndex] = useState(0);
    const [findFriend, setFindFriend] = useState(false);
    const [searchedFriendList, setSearchedFriendList] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [sentFriendList, setSentFriendList] = useState([]);
    const [receivedFriendList, setReceivedFriendList] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(()=>{
        getFriendList()
            .then(res=>setFriendList(res));
    }, [])

    const tabClickHandler = function(index){
        if(index == 0){
            getFriendList()
            .then(res=>setFriendList(res));
        }
        else if(index == 1){
            getFriendSentList()
                .then(res=>setSentFriendList(res))
        }
        else{
            getFriendReceivedList()
                .then(res=>setReceivedFriendList(res))
        }
        setTabIndex(index)
    }

    const searchFriendByKeyword = () => {
        searchMemberList(keyword)
            .then(res=>setSearchedFriendList(res));
    }

    const openFindFriendModal = function(){
        if(!findFriend){
            searchFriendByKeyword();
        }
        else{
            getFriendList()
                .then(res=>setFriendList(res));
            getFriendSentList()
                .then(res=>setSentFriendList(res))
            getFriendReceivedList()
                .then(res=>setReceivedFriendList(res))
        }
        setFindFriend(!findFriend)
        setKeyword('');
    }

    const onChangeHandler = (e)=>{
        setKeyword(e.target.value)
    }

    const sendFriendRequestHandler = (memberId)=>{
        sendFriendRequest(memberId)
            .then(res=>{
                alert("친구 요청에 성공했습니다!"); 
                openFindFriendModal();
            });
    }

    const putFriendRequestHandler = (memberId, isAccept) =>{
        putFriendRequest({memberId: memberId, isAccept: isAccept})
            .then(res=>{
                if(isAccept){
                    alert('친구 요청을 수락했습니다!')
                }
                else{
                    alert('친구 요청을 거절했습니다...')
                }
                getFriendReceivedList()
                    .then(resp=>setReceivedFriendList(resp))
                getFriendSentList()
                    .then(resp=>setSentFriendList(resp))
                })
    }

    const onKeyDownHandler = (e)=>{
        if(e.key == 'Enter'){
            searchFriendByKeyword();
        }
    }
    const tabArr=[{
        tabTitle:(
            <div className={tabIndex===0 ? styles.mode_choose : styles.mode_friend_list} onClick={()=>tabClickHandler(0)}>
                <p className={styles.mode_friend_list_txt}>친구 목록</p>
            </div>
        ),
        tabCont:(
            <div className={styles.friend_list_content}>
                {friendList.map((data, index) => {
                    return(
                        <div key={index} className={styles.friend_container}>
                            <img src={data.profileUrl} alt="프로필 사진" className={styles.friend_img_container} ></img>
                            <div className={styles.friend_info_container}>
                                <p className={styles.friend_name_txt}>{data.nickname}</p>
                                <p className={styles.friend_intro}>{data.comment}</p>
                            </div>
                        </div>  
                    )
                })}
            </div>
        )
    },
    {
        tabTitle:(
            <div className={tabIndex===1 ? styles.mode_choose : styles.mode_send_list} onClick={()=>tabClickHandler(1)}>
                <p className={styles.mode_send_list_txt}>신청 목록</p>
            </div>
        ),
        tabCont:(
            <div className={styles.send_list_content}>
                {sentFriendList.map((data, index) => {
                    return(
                        <div key={index} className={styles.send_friend_container}>
                            <img src={data.profileUrl} alt="프로필 사진" className={styles.send_friend_img_container} ></img>
                            <div className={styles.send_friend_info_container}>
                                <p className={styles.send_friend_name_txt}>{data.nickname}</p>
                                <div className={styles.send_cancel_btn}>
                                    <p className={styles.cancel_btn_txt} onClick={()=>{putFriendRequestHandler(data.memberId, false)}}>취소</p>
                                </div>
                            </div>
                        </div>  
                    )
                })}
            </div>
        )
    },
    {
        tabTitle:(
            <div className={tabIndex===2 ? styles.mode_choose : styles.mode_receive_list} onClick={()=>tabClickHandler(2)}>
                <p className={styles.mode_receive_list_txt}>받은 목록</p>
            </div>
        ),
        tabCont:(
            <div className={styles.receive_list_content}>
                {receivedFriendList.map((data, index) => {
                    return(
                        <div key={index} className={styles.receive_friend_container}>
                            <img src={data.profileUrl} alt="프로필 사진" className={styles.receive_friend_img_container} ></img>
                            <div className={styles.receive_friend_info_container}>
                                <p className={styles.receive_friend_name_txt}>{data.nickname}</p>
                                <div className={styles.receive_btn_container}>
                                    <div className={styles.receive_ok_btn}>
                                        <p className={styles.receive_ok_btn_txt} onClick={()=>{putFriendRequestHandler(data.memberId, true)}}>수락</p>
                                    </div>
                                    <div className={styles.receive_cancel_btn}>
                                        <p className={styles.receive_cancel_btn_txt} onClick={()=>{putFriendRequestHandler(data.memberId, false)}}>거절</p>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    )
                })}
            </div>
        )
    }
]

    return(
        <>
            {findFriend && (
                <>
                    <div className={styles.modal_background}></div>
                    <div className={styles.find_friend_modal_container}>
                        <div className={styles.find_friend_title_container}>
                            <p className={styles.find_friend_modal_title}>친구 검색</p>
                            <img src="/imgs/x.png" alt="x" className={styles.find_friend_modal_x} onClick={openFindFriendModal}></img>
                        </div>                                
                        
                        <div className={styles.find_friend_search_container}>
                            <input className={styles.find_friend_search_box} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}></input>
                            <img className={styles.find_friend_search_icon} src="/imgs/search.png" alt="찾기 아이콘" onClick={searchFriendByKeyword}></img>
                        </div>

                        <div className={styles.find_friend_list_container}>
                            <div className={styles.find_friend_names_container}>

                                {searchedFriendList.map((data, index) => {
                                    return(
                                        <div key={index} className={styles.find_friend_name_container}>
                                            <img src={data.profileUrl} alt="프로필 사진" className={styles.find_friend_img_container} ></img>
                                            <p className={styles.find_friend_name_txt}>{data.nickname}</p>
                                            <div className={styles.find_friend_modal_btn_container}>
                                                <div className={styles.find_friend_put_btn}>
                                                    <p className={styles.find_friend_btn_txt} onClick={()=>{sendFriendRequestHandler(data.memberId)}}>신청</p>
                                                </div>
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
                <div className={styles.find_friend_btn_container}>
                    <div className={styles.find_friend_btn} onClick={openFindFriendModal}>
                        <p className={styles.btn_txt}>닉네임으로 친구찾기</p>
                    </div>
                </div>
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
            </div>
        </>
    )
}

export default Friend;