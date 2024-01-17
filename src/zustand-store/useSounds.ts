import { create } from "zustand";

type soundsState = {
  errorSound: boolean;
  keySound: boolean;
  toggleErrorSound: () => void;
  toggleKeySound: () => void;
};

export const useSounds = create<soundsState>()((set) => ({
  errorSound: false,
  keySound: false,
  toggleErrorSound: () => set((state) => ({ errorSound: !state.errorSound })),
  toggleKeySound: () => set((state) => ({ keySound: !state.keySound })),
}));
