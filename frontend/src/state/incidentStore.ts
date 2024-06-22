import {create} from 'zustand';
interface IncidentStore {
    isAccepted: boolean;
    acceptIncident: () => void;
  }
  
export const useIncidentStore = create<IncidentStore>((set) => ({
isAccepted: false,
acceptIncident: () => set((state) => ({ isAccepted: !state.isAccepted })),
}));