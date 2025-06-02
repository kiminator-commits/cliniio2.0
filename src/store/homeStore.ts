import { create } from 'zustand';

interface HomeState {
  totalPoints: number;
  setTotalPoints: (points: number) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  totalPoints: 1625,
  setTotalPoints: (points) => set({ totalPoints: points }),
}));
