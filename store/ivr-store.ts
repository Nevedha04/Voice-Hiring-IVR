import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type IVRStage = 'welcome' | 'language' | 'job' | 'confirmation' | 'error';

interface IVRState {
  stage: IVRStage;
  selectedLanguage: number | null;
  selectedJob: number | null;
  isCallActive: boolean;
  error: string | null;
  
  // Actions
  startCall: () => void;
  endCall: () => void;
  selectLanguage: (languageId: number) => void;
  selectJob: (jobId: number) => void;
  setStage: (stage: IVRStage) => void;
  setError: (error: string) => void;
  resetError: () => void;
  reset: () => void;
}

export const useIVRStore = create<IVRState>()(
  persist(
    (set) => ({
      stage: 'welcome',
      selectedLanguage: null,
      selectedJob: null,
      isCallActive: false,
      error: null,
      
      startCall: () => set({ isCallActive: true, stage: 'welcome' }),
      endCall: () => set({ isCallActive: false, stage: 'welcome', selectedLanguage: null, selectedJob: null, error: null }),
      selectLanguage: (languageId) => set({ selectedLanguage: languageId, stage: 'job' }),
      selectJob: (jobId) => {
        if (jobId >= 1 && jobId <= 8) {
          set({ selectedJob: jobId, stage: 'confirmation' });
        } else {
          set({ error: "Invalid number pressed", stage: 'error' });
        }
      },
      setStage: (stage) => set({ stage }),
      setError: (error) => set({ error, stage: 'error' }),
      resetError: () => set({ error: null }),
      reset: () => set({ stage: 'welcome', selectedLanguage: null, selectedJob: null, error: null }),
    }),
    {
      name: 'ivr-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);