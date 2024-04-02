import { ethers } from 'ethers';
import FitnessTracker from './FitnessTracker.json';

// 환경 설정
const endPoint = 'https://eth-sepolia.g.alchemy.com/v2/7mSBp_od0HOmQy9s-vLF4k5NnrohXhc5';
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(endPoint);
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, FitnessTracker.abi, wallet);

// 정보 기록 함수
export async function recordExercise(memberId, date, steps, duration, distance) {
    // addExerciseData 함수 호출을 위한 트랜잭션 생성
    const tx = await contract.addExerciseData(memberId, date, steps, duration, distance);
    await tx.wait(); // 트랜잭션 영수증 대기
    console.log('기록 성공 func:', tx.hash); // 트랜잭션 해시 출력
}

export async function getExerciseData(memberId, date) {
  const exerciseData = await contract.getExerciseDataByDate(memberId, date);
  console.log('조회 성공 func: ', exerciseData);
  return exerciseData;
}