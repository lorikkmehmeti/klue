import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { IDailyStore } from '@/lib/models/store-interfaces.ts';

export const useDailyStore = create<IDailyStore>()(
   persist(
      (set, get) => ({
         lives: 5,
         attempts: [],
         lastResetTime:
            Number(localStorage.getItem('last-reset-date')) || Date.now(),
         canPlay: true,
         decrement: () => {
            set(() => ({
               lives: get().lives !== 0 ? get().lives - 1 : 0,
               canPlay: get().lives - 1 > 0,
            }));
         },
         reset: () => {
            set({ lives: 5, lastResetTime: Date.now(), canPlay: true });
            localStorage.setItem('last-reset-date', Date.now().toString());
         },
         resetAttempts: () => {
            set({ attempts: [] });
         },
         foundRightAnswer: () => {
            set(() => ({ canPlay: false }));
         },
         addAttempt: (item) => {
            set(() => ({ attempts: [...get().attempts, item] })); // Add the new item to the tries array
         },
      }),
      {
         name: 'daily-storage',
         storage: createJSONStorage(() => localStorage),
         partialize: (state) => ({
            lives: state.lives > 5 ? 5 : state.lives,
            lastResetDate: state.lastResetTime,
            canPlay: state.canPlay,
            attempts: state.attempts,
         }),
      }
   )
);

export function initializeDailyStore() {
   const today = new Date();
   today.setHours(0, 0, 0, 0);

   if (useDailyStore.getState().lastResetTime < today.getTime()) {
      useDailyStore.getState().reset();
      useDailyStore.getState().resetAttempts();
   }
}
