import { ethers } from 'ethers';
import WalkWalk from './WalkWalk.json';

// 환경 설정
const endPoint = 'https://eth-sepolia.g.alchemy.com/v2/7mSBp_od0HOmQy9s-vLF4k5NnrohXhc5';
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(endPoint);
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, WalkWalk.abi, wallet);

// 운동 기록 함수
export async function recordExercise(id, memberId, steps, exerciseMinute, exerciseDistance, exerciseDay, exerciseStart, exerciseEnd, calorie) {
  // addExerciseData 함수 호출을 위한 트랜잭션 생성
  const tx = await contract.addExerciseData(id, memberId, steps, exerciseMinute, exerciseDistance, exerciseDay, exerciseStart, exerciseEnd, calorie);
  await tx.wait(); // 트랜잭션 영수증 대기
  console.log('기록 성공 func:', tx.hash); // 트랜잭션 해시 출력
}

// 운동 조회 함수
export async function getExerciseData(id) {
const exerciseData = await contract.getExerciseData(id);
console.log('조회 성공 func: ', exerciseData);
return exerciseData;
}

// 영수증 조회 함수
export async function getReceiptData(receiptId) {
  try {
      const receiptData = await contract.getReceipt(receiptId);
      console.log('영수증 조회 성공 func:', receiptData);
      return receiptData;
  } catch (error) {
      console.error('영수증 조회 실패:', error);
      throw new Error('영수증 조회 중 오류가 발생했습니다.');
  }
}