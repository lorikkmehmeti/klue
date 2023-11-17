import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IDailyStore {
   lives: number; // track how many lives do the user have
   lastResetTime: number; // field to store the last reset date
   decrement: () => void; // decrement lives
   reset: () => void; // reset lives
}

export const useDailyStore = create<IDailyStore>()(
    persist(
        (set, get) => ({
            lives: 5,
            lastResetTime: Date.now(),
            decrement: () => {
                set(() => ({ lives: get().lives !== 0 ? get().lives - 1 : 0 }));
            },
            reset: () => {
                set({ lives: 5, lastResetTime: Date.now() });
                localStorage.setItem('last-reset-date', Date.now().toString());
            },
        }),
        {
            name: 'lives-storage',
            storage: createJSONStorage(() => localStorage) ,
            partialize: (state) => ({
                lives: state.lives > 5 ? 5 : state.lives,
                lastResetDate: state.lastResetTime,
            }),
        }
    )
);

export function initializeDailyStore() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (useDailyStore.getState().lastResetTime < today.getTime()) {
        useDailyStore.getState().reset();
    }
}