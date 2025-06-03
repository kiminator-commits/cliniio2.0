import { create } from 'zustand';

interface HomeState {
  // State
  totalScore: number;
  availablePoints: number;
  showFilters: boolean;
  isStatsModalOpen: boolean;
  isLeaderboardModalOpen: boolean;
  isChallengeModalOpen: boolean;
  drawerOpen: boolean;

  // Actions
  setTotalScore: (value: number) => void;
  setAvailablePoints: (value: number) => void;
  setShowFilters: (value: boolean) => void;
  setIsStatsModalOpen: (value: boolean) => void;
  setIsLeaderboardModalOpen: (value: boolean) => void;
  setIsChallengeModalOpen: (value: boolean) => void;
  setDrawerOpen: (value: boolean) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  // Initial state
  totalScore: 0,
  availablePoints: 0,
  showFilters: false,
  isStatsModalOpen: false,
  isLeaderboardModalOpen: false,
  isChallengeModalOpen: false,
  drawerOpen: false,

  // Actions
  setTotalScore: (value) => set({ totalScore: value }),
  setAvailablePoints: (value) => set({ availablePoints: value }),
  setShowFilters: (value) => set({ showFilters: value }),
  setIsStatsModalOpen: (value) => set({ isStatsModalOpen: value }),
  setIsLeaderboardModalOpen: (value) => set({ isLeaderboardModalOpen: value }),
  setIsChallengeModalOpen: (value) => set({ isChallengeModalOpen: value }),
  setDrawerOpen: (value) => set({ drawerOpen: value }),
}));
