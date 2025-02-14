import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (state) => set({ isLoading: state }),
}));
