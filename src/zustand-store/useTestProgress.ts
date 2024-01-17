import { create } from "zustand";

type ProgressState = {
  progressPrecentage: number;
  setProgressPrecentage: (precentage: number) => void;
};

export const useTestProgress = create<ProgressState>()((set) => ({
  progressPrecentage: 100,
  setProgressPrecentage: (precentage) =>
    set(() => ({ progressPrecentage: precentage })),
}));
