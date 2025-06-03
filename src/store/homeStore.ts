import { create, StateCreator } from 'zustand';

export interface LeaderboardUser {
  name: string;
  score: number;
  avatar: string;
}

export interface HomeState {
  // State
  totalScore: number;
  availablePoints: number;
  showFilters: boolean;
  isStatsModalOpen: boolean;
  isLeaderboardModalOpen: boolean;
  isChallengeModalOpen: boolean;
  drawerOpen: boolean;
  leaderboard: LeaderboardUser[];

  // Actions
  setTotalScore: (value: number) => void;
  setAvailablePoints: (value: number) => void;
  setShowFilters: (value: boolean) => void;
  setIsStatsModalOpen: (value: boolean) => void;
  setIsLeaderboardModalOpen: (value: boolean) => void;
  setIsChallengeModalOpen: (value: boolean) => void;
  setDrawerOpen: (value: boolean) => void;
  setLeaderboard: (value: LeaderboardUser[]) => void;
}

type HomeStore = StateCreator<HomeState>;

export const useHomeStore = create<HomeState>((set: HomeStore['setState']) => ({
  // Initial state
  totalScore: 0,
  availablePoints: 0,
  showFilters: false,
  isStatsModalOpen: false,
  isLeaderboardModalOpen: false,
  isChallengeModalOpen: false,
  drawerOpen: false,
  leaderboard: [],

  // Actions
  setTotalScore: (value: number) => set({ totalScore: value }),
  setAvailablePoints: (value: number) => set({ availablePoints: value }),
  setShowFilters: (value: boolean) => set({ showFilters: value }),
  setIsStatsModalOpen: (value: boolean) => set({ isStatsModalOpen: value }),
  setIsLeaderboardModalOpen: (value: boolean) => set({ isLeaderboardModalOpen: value }),
  setIsChallengeModalOpen: (value: boolean) => set({ isChallengeModalOpen: value }),
  setDrawerOpen: (value: boolean) => set({ drawerOpen: value }),
  setLeaderboard: (value: LeaderboardUser[]) => set({ leaderboard: value }),
}));
