
/*

 SpeechSynthesis == TTS 자체의 컨트롤러 역할 하는 함수
                 역할) 1. 디바이스 내 목소리 정보 가져오기, 2. 스피치 시작, 3. 스피치 정지 
 
 SpeechSynthesisUtterance === speech 요청에 대한 정보를 인수로 받는 함수 
                 받는 정보) lang == 언어선택, pitch == 높낮이,  rate == 읽는 속도, voice == 스피치 목소리를 뭘로 할지 
                 Utterance란? 말을 뜻함
*/

export const getSpeech = (text) => {

    let voices = [];

    // A. 디바이스에 내장된 VOICE를 가져오기 
    const setVoiceList = () => {
        //A-1) getVoice() = 현재 사용하고 있는 디바이스에서 사용 가능한 목소리들을 가지고 올 수 있음
        voices = window.speechSynthesis.getVoices();
        console.log(voices);
    }

    setVoiceList();

    // B. Voice List가 변경 되었을 때, voice를 다시 가져온다.
    if(window.speechSynthesis.onvoiceschanged !== undefined){
        window.speechSynthesis.onvoiceschanged = setVoiceList;
    }

    // C. 음성에 대한 메타 데이터를 넣고 음성을 출력한다. 
    const speech = (txt) => {

        const lang = "ko-KR";

        // C-1 스피치 정보를 담을 함수 생성 
        const utterThis = new SpeechSynthesisUtterance(txt);
    
        // C-2 언어는 한국어로 하기 
        utterThis.lang = lang;

        // C-3 디바이스 별로 한국어는 ko-KR 혹은 ko_KR로 voice가 정의되어 있다. 
        const kor_voice = voices.find(
            (elem) => elem.lang === lang || elem.lang === lang.replace("-", "_")
        );

        // C-4 한국어 voice가 있다면? 우리가 만든 utterance 함수의 목소리로 한국어를 설정한다. 
        //     없다면? 함수를 리턴하여 소리가 나오지 않도록 한다. 
        if(kor_voice){
            utterThis.voice = kor_voice;
        }else{
            return;
        } 

        // utterance를 재생(speak)한다. 
        window.speechSynthesis.speak(utterThis);
    };

    speech(text);
}