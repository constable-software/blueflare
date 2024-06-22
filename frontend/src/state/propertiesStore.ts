import {create} from 'zustand';

type State = {
  startTime: number;
  endTime: number;
  totalTravelTime: number;
  totalDistance: number;
  stopCount: number;
  setTravelData: (data: Partial<State>) => void;
};

export const usePropertiesStore = create<State>((set) => ({
  startTime: 0,
  endTime: 0,
  totalTravelTime: 0,
  totalDistance: 0,
  stopCount: 0,
  setTravelData: (data) => set((state) => ({ ...state, ...data })),
}));
