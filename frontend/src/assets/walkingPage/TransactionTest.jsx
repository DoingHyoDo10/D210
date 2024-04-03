
import { recordExercise, getExerciseData } from '../contracts/ethers'

const ContractTest = function(){
  
  const handleSubmit1 = async (e) => {
    try {
      await recordExercise(3, 20240402, 10000, 78, 4);
      alert('기록 성공');
    } catch (error) {
      alert('기록 실패 : ', error);
    }
  };

  const handleSubmit2 = async (e) => {
    try {
      const response = await getExerciseData(3, 20240402);
      alert('조회 성공')
    } catch (error) {
      alert('조회 실패 : ', error);
    }
  };

  return(
    <div>
      <h1>블록체인 테스트</h1>
      <button onClick={handleSubmit1}>기록</button>
      <button onClick={handleSubmit2}>조회</button>
    </div>
  )
}

export default ContractTest;