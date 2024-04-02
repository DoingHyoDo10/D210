import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserInfoUpdate.module.css";
import { getMyInfo, updateMyInfo, checkDuplicated, uploadImgFile } from "../../apis/member";

const UserInfoUpdate = function () {
  const navigate = useNavigate();
  const [newInfo, setNewInfo] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [originalNickname, setOriginalNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('사용 가능한 닉네임입니다.');
  const [nicknameErrorType, setNicknameErrorType] = useState(true);
  const startYear = 1900;
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: currentYear - startYear + 1}, (val, index) => currentYear - index);
  
  useEffect(() => {
    (async () => {
      try {
        const data = await getMyInfo();
        const { dailyCriteria, ...rest } = data;
        setNewInfo(rest);
        setOriginalNickname(rest.nickname);
        console.log('기존 유저 정보 : ', rest)
      } catch (err) {
        console.error('userInfo 정보를 가져오는 중 에러 발생:', err);
      }
    })();
  }, []);

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    if (name === "birthYear") {
      setNewInfo((prevInfo) => ({...prevInfo, [name] : parseInt(value)}));
    } else if (name === "comment") {
      setNewInfo((prevInfo) => ({...prevInfo, [name] : value}));
    } else {
      setNewInfo((prevInfo) => ({...prevInfo, [name] : value.trim()}));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const validNumberRegex = /^\d{0,3}(\.\d)?$/; // 최대 세 자리 정수와 최대 한자리 소수점 정규 표현식
    const validPhoneRegex = /^\d{11}$/; // 숫자 11자리 정규 표현식

    // 전화번호 유효성 검사
    if (newInfo.phoneNumber && !validPhoneRegex.test(newInfo.phoneNumber)) {
      alert('전화번호를 잘못 입력했습니다.');
      return; // 함수 종료
    }

    // 키 유효성 검사
    if (newInfo.height && !validNumberRegex.test(newInfo.height)) {
      alert('키를 잘못 입력했습니다.');
      return; // 함수 종료
    }

    // 몸무게 유효성 검사
    if (newInfo.weight && !validNumberRegex.test(newInfo.weight)) {
      alert('몸무게를 잘못 입력했습니다.');
      return; // 함수 종료
    }

    let imgUrl = newInfo.profileUrl; 

    if (profileImage) {
      formData.append('file', profileImage);

      try {
        imgUrl = await uploadImgFile(formData);
        console.log(imgUrl)
      } catch (error) {
        console.error('이미지 업로드 중 에러 발생:', error);
        alert('이미지 업로드에 실패했습니다.');
        return; // 이미지 업로드 실패 시 함수 종료
      }
    }

    try {
      const updatedInfo = {...newInfo, profileUrl: imgUrl};
      const response = await updateMyInfo(updatedInfo);
      console.log('유저정보수정화면', response)
      alert('수정되었습니다!');
      navigate('/mypage')
    } catch (error) {
      console.error('업데이트 중 에러 발생:', error);
    }
  };

  // 프로필 사진
  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
    console.log('이미지 정보', e.target.files[0]);
  }

  // 유저가 입력 후 시간차를 두고 닉네임 중복 여부 확인
  useEffect(() => {
    const timer = setTimeout(() => {
      checkNickname(newInfo.nickname);
    }, 700);
    return () => clearTimeout(timer);
  }, [newInfo?.nickname, originalNickname]);

  // 닉네임 중복 체크
  const checkNickname = useCallback(async (nickname) => {
    const trimmedNickname = nickname.trim();
    if (!trimmedNickname || trimmedNickname.length > 10) {
      setNicknameError('닉네임은 1자 이상 10자 이하여야 합니다.');
      setNicknameErrorType(false);
      setIsButtonDisabled(true);
      return;
    }

    // 닉네임이 기존 값과 같으면 중복 검사를 스킵
    if (trimmedNickname === originalNickname) {
      setNicknameError('사용 가능한 닉네임입니다.');
      setNicknameErrorType(true); // 기존 닉네임은 이미 사용 가능한 상태임
      setIsButtonDisabled(false); // 버튼 활성화
      return;
    }

    try {
      const isDuplicated = await checkDuplicated(trimmedNickname);
      console.log('isDuplicated : ', isDuplicated)
      if (isDuplicated) {
        setNicknameError('이미 사용 중인 닉네임입니다.');
        setNicknameErrorType(false);
        setIsButtonDisabled(true);
      } else {
        setNicknameError('사용 가능한 닉네임입니다.');
        setNicknameErrorType(true);
        setIsButtonDisabled(false)
      }
    } catch (error) {
      console.error('닉네임 중복 검사 중 에러 발생:', error);
      setNicknameError('중복 검사 중 오류가 발생했습니다.');
      setNicknameErrorType(false);
      setIsButtonDisabled(true);
    }
  }, [originalNickname]);

  // 지역정보
  const handleAddressChange = (address) => {
    setNewInfo(prevInfo => ({...prevInfo, location: address}));
  };

  // 다음 주소 API
  const daumPost = () => {
    new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
          const roadAddr = data.roadAddress; // 도로명 주소 변수
          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          handleAddressChange(roadAddr);
      }
  }).open();
  }

  return(
    <div className={styles.userinfoupdate_container}>
      {newInfo && (
        <>
          <div className={styles.userinfoupdate_top_bar}>
            <img className={styles.userinfoupdate_back_direct} src="/imgs/direct.png" alt="back_direct" onClick={() => {navigate('/mypage')}}/>
            <span className={styles.userinfoupdate_title}>개인정보 변경</span>
          </div>

          <div className={styles.userinfoupdate_sub_container}>
            <div className={styles.userinfoupdate_profile_container}>
              <div className={styles.userinfoupdate_img_container}>
                <label htmlFor="profileInput">
                  <img className={styles.userinfoupdate_profile_img} src={newInfo.profileUrl} alt="profile_img"/>
                </label>
              </div>
              <img className={styles.userinfoupdate_camera_img} src="/imgs/camera.png" alt="camera_img" />
              <input id="profileInput" type="file" style={{'display': 'none'}} accept=".png, .jpg, .jpeg" onChange={handleFileChange}/>
            </div>

            <div className={styles.userinfoupdate_field_container}>
              <div className={styles.userinfoupdate_sub_title}>닉네임</div>
              <input className={styles.userinfoupdate_input} type="text" placeholder="닉네임을 입력해주세요" name="nickname" value={newInfo.nickname} onChange={handleInputChange}/>
              <p className={styles.userinfoupdate_error} style={{color: nicknameErrorType ? 'green' : 'red'}}>{nicknameError}</p>
            </div>

            <div className={styles.userinfoupdate_field_container}>
              <div className={styles.userinfoupdate_sub_title}>한줄소개</div>
              <input className={styles.userinfoupdate_input} type="text" placeholder="한줄소개를 입력해주세요" name="comment" value={newInfo.comment} onChange={handleInputChange}/>
            </div>

            <div className={styles.userinfoupdate_2col}>
              <div className={styles.userinfoupdate_col}>
                <div className={styles.userinfoupdate_sub_title}>출생연도</div>
                <select className={styles.userinfoupdate_input} name="birthYear" value={newInfo.birthYear || ''} onChange={handleInputChange}>
                  <option value="" disabled>출생연도 선택</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <img className={styles.userinfoupdate_dropdown_img} src="/imgs/direct_gray.png" alt="dropdown_img" />
              </div>

              <div className={styles.userinfoupdate_col}>
                <div className={styles.userinfoupdate_sub_title}>성별</div>
                <select className={styles.userinfoupdate_input} name="gender" value={newInfo ? newInfo.gender : ''}  onChange={handleInputChange}>
                  <option value="" disabled>성별 선택</option>
                  <option value="MALE">남성</option>
                  <option value="FEMALE">여성</option>
                </select>
                <img className={styles.userinfoupdate_dropdown_img} src="/imgs/direct_gray.png" alt="dropdown_img" />
              </div>
            </div>

            <div className={styles.userinfoupdate_2col}>
              <div className={styles.userinfoupdate_col}>
                <div className={styles.userinfoupdate_sub_title}>키</div>
                <input className={styles.userinfoupdate_input} type="number" placeholder="ex) 111.1 (cm)" name="height" value={newInfo.height} onChange={handleInputChange}/>
              </div>

              <div className={styles.userinfoupdate_col}>
                <div className={styles.userinfoupdate_sub_title}>몸무게</div>
                <input className={styles.userinfoupdate_input} type="number" placeholder="ex) 11.1 (kg)" name="weight" value={newInfo.weight} onChange={handleInputChange}/>
              </div>
            </div>
            
            <div className={styles.userinfoupdate_field_container}>
              <div className={styles.userinfoupdate_sub_title}>전화번호</div>
              <input className={styles.userinfoupdate_input} type="text" placeholder='ex) 01011111111' name="phoneNumber" value={newInfo.phoneNumber} onChange={handleInputChange}/>
            </div>

            <div className={styles.userinfoupdate_field_container}>
              <div className={styles.userinfoupdate_sub_title}>지역정보</div>
              <input className={styles.userinfoupdate_input} type="text" placeholder='주소를 입력해주세요' name="location" value={newInfo.location} onClick={daumPost} readOnly/>
              <img className={styles.userinfoupdate_search_img} src="/imgs/search_gray.png" alt="search_img" />
            </div>

            <button className={styles.userinfoupdate_btn} disabled={isButtonDisabled} onClick={handleSubmit}>변 경</button>
          </div>
        </>
      )}
    </div>
  )
}

export default UserInfoUpdate;