import { create } from "zustand";

type dialogState = {
  isOpen: boolean;
  toggle: () => void;
};

export const useSoundDialog = create<dialogState>()((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
