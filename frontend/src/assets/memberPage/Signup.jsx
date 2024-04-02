import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Signup.module.css";
import { createWallet } from '../../apis/wallet';
import { submitUserInfo, checkDuplicated } from '../../apis/member';
import LoadingModal from '../common/loading/LoadingModal';
import { useSignupStore } from '../../stores/member';

const Signup = function () {
  const navigate = useNavigate();
  const { setIsFirstVisit } = useSignupStore();
  const [step, setStep] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameErrorType, setNicknameErrorType] = useState(false);
  const [debounce, setDebounce] = useState(null);
  const startYear = 1900;
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: currentYear - startYear + 1}, (val, index) => currentYear - index); // 연도 목록 생성: 1900년부터 현재까지
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    birthYear: '', // 임의의 초기값
    gender: '', // 초기값
    location: '',
    eoa: '',
    publicKey: '',
    comment: '', // 추후 입력
    phoneNumber: '01000000000', // 추후 입력
    height: 165, // 한국인 전체 평균값
    weight: 65, // 한국인 전체 평균값
    longitude: 0, // 사용안함
    latitude: 0, // 사용안함
  });
  const [isLoading, setIsLoading] = useState(false);

  // 유저가 입력 후 시간차를 두고 닉네임 중복 여부 확인
  useEffect(() => {
    if (debounce) clearTimeout(debounce);
    setDebounce(setTimeout(() => {
      checkNickname(userInfo.nickname);
    }, 1000))
  }, [userInfo.nickname]);

  // 입력값마다 유효성 검사하고 버튼 활성화
  useEffect(() => {
    if (step === 2) {
      if (userInfo.birthYear !== '') {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
    else if (step === 3) {
      if (userInfo.gender !== '') {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
    else if (step === 4) {
      if (userInfo.location !== '') {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
  }, [step, userInfo.birthYear, userInfo.gender, userInfo.location]);

  // 닉네임의 유효성 검사를 실행하고 에러 메시지 상태를 업데이트
  const checkNickname = useCallback(async (nickname) => {
      const trimmedNickname = nickname.trim()
      if (!trimmedNickname || trimmedNickname.length > 10) {
        setNicknameError('닉네임은 1자 이상 10자 이하여야 합니다.');
        setNicknameErrorType(false);
        setIsButtonDisabled(true);
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
          if (step === 1) {
            setIsButtonDisabled(false);
          }
        }
      } catch (error) {
        console.error('닉네임 중복 검사 중 에러 발생:', error);
        setNicknameError('중복 검사 중 오류가 발생했습니다.');
        setNicknameErrorType(false);
        setIsButtonDisabled(true);
      }
    }, [step]);

  const handleAddressChange = (address) => {
    setUserInfo(prevInfo => ({...prevInfo, location: address}));
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'birthYear') {
      setUserInfo((prevInfo) => ({...prevInfo, [name]: parseInt(value)}));
    } else {
      setUserInfo((prevInfo) => ({...prevInfo, [name]: value.trim()}));
    }
  };

  // 지갑 생성 API 호출 재시도
  const retryWalletCreate = async () => {
    const maxRetries = 3 // 최대 3번 재시도
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log('시도 횟수 :', attempt);
      try {
        const response = await createWallet();

        // 지갑 생성 응답 유효성 검사
        if (response.eoa && response.eoa !== "" && response.publicKey && response.publicKey !== "") {
          return response; // 유효한 경우 response 반환
        } else {
          lastError = new Error("eoa 또는 publicKey가 유효하지 않습니다.");
          throw lastError;
        }
      } catch (error) {
        lastError = error;
        // 마지막 시도가 아니면 재시도 대기
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 5000 * attempt));
        }
      } 
    }

    setIsLoading(false); // 모든 시도 후 로딩 모달 숨김
    // 모든 시도 후 유효한 response가 없으면 마지막 에러 throw
    throw lastError;
  };

  const handleClick = async () => {
    if (step === 4) {
      setIsLoading(true); // 로딩 모달 표시 시작
      try {
        // 블록체인 지갑 생성 API 및 재시도
        const walletInfo = await retryWalletCreate();
        
        const updatedUserInfo = {
          ...userInfo,
          eoa: walletInfo.eoa,
          publicKey: walletInfo.publicKey,
        }
        setUserInfo(updatedUserInfo);
        console.log('최종 정보 :', updatedUserInfo)

        await submitUserInfo(updatedUserInfo);
        setIsFirstVisit(true);
        navigate('/main')
      } catch (error) {
        console.log('회원가입 중 에러 발생', error);
        // 유효한 응답을 얻지 못했을 때 안내창 표시 및 루트 경로로 이동
        alert('회원가입 중 오류가 발생했습니다. 10초 후 로그인 화면으로 돌아갑니다.');
        setTimeout(() => {
          navigate('/');
        }, 10000); // 10초 후 루트 경로로 이동
      } finally {
        setIsLoading(false); // 로딩 모달 숨김
      }
    } else {
      setStep(step + 1);
      setIsButtonDisabled(true);
    } 
  };

  return(
    <div className={styles.signup_container}>
      {isLoading && <LoadingModal text="회원가입 중..."></LoadingModal>}
      {step >= 4 && (
        <div className={styles.signup_sub_container}>
          <div className={styles.signup_title}>지역정보</div>
          <input className={styles.signup_input} type="text" placeholder='주소를 입력해주세요' name="location" onClick={daumPost} value={userInfo.location} readOnly/>
          <img className={styles.signup_search_img} src="/imgs/search_gray.png" alt="search_img" />
        </div>
      )}
      {step >= 3 && (
        <div className={styles.signup_sub_container}>
          <div className={styles.signup_title}>성별</div>
          <select className={styles.signup_input} name="gender" defaultValue="" onChange={handleInputChange}>
            <option value="" disabled>성별을 선택해주세요</option>
            <option value="MALE">남성</option>
            <option value="FEMALE">여성</option>
          </select>
          <img className={styles.signup_dropdown_img} src="/imgs/direct_gray.png" alt="dropdown_img" />
        </div>
      )}
      {step >= 2 && (
        <div className={styles.signup_sub_container}>
          <div className={styles.signup_title}>출생연도</div>
          <select className={styles.signup_input} name="birthYear" value={userInfo.birthYear || ''} onChange={handleInputChange}>
            <option value="" disabled>출생연도를 선택해주세요</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <img className={styles.signup_dropdown_img} src="/imgs/direct_gray.png" alt="dropdown_img" />
        </div>
      )}
      {step >= 1 && (
        <div className={styles.signup_sub_container}>
          <div className={styles.signup_title}>닉네임</div>
          <input className={styles.signup_input} type="text" placeholder='닉네임을 입력해주세요' name="nickname" value={userInfo.nickname} onChange={handleInputChange}/>
          {nicknameError && <p className={styles.signup_error} style={{color: nicknameErrorType ? 'green' : 'red'}}>{nicknameError}</p>}
        </div>
      )}
      <button className={styles.signup_btn} disabled={isButtonDisabled} onClick={handleClick}>{step === 4 ? "가입 완료" : "다 음"}</button>
    </div>
  )
}

export default Signup;