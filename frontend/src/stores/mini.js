import { create } from 'zustand';

export const useStore = create((set) => ({
  friendName: '개발자',
  setFriendName: (name) => set({ friendName: name }),

  friendIntro: '이스터 에그입니다 ㅎ 찾으셨네요 축하드려용',
  setFriendIntro: (intro) => set({ friendIntro: intro }),

  
  friendProfileImg: '/imgs/profile_img2.jpg',
  setFriendProfileImg: (img) => set({ friendProfileImg: img }),

  friendModalOpen: false,
  setFriendModalOpen: (boolean) => set({ friendModalOpen: boolean }),
}));
