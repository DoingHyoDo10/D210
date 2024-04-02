import { create } from "zustand";

export const useToolbar = create((set) => ({
    state: false,
    updateState: (bool) => set({ state: bool }),
  }));