// import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';
//
// interface IDailyStore {
//    guesses: number;
//    decreaseGuess: () => void;
// }
//
//
// export const useDailyStore = create<IDailyStore>()(
//     persist(
//         (set, get) => ({
//             guesses: 5,
//             decreaseGuess: () => set({ guesses: get().guesses - 1 }),
//         }),
//         {
//             name: 'guesses-storage', // name of item in the storage (must be unique)
//             storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
//             partialize: (state) => ({ guesses: state.guesses }),
//         }
//     )
// )

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IDailyStore {
   guesses: number;
   lastResetDate: number; // Add a field to store the last reset date
   decreaseGuess: () => void;
   resetGuesses: () => void; // Add a function to reset guesses
}

export const useDailyStore = create<IDailyStore>()(
    persist(
        (set, get) => ({
            guesses: 5,
            lastResetDate: parseInt(localStorage.getItem('last-reset-date') || '') || Date.now(),
            decreaseGuess: () => {
                set(() => ({ guesses: get().guesses !== 0 ? get().guesses - 1 : 0 }));
            },
            resetGuesses: () => {
                set({ guesses: 5, lastResetDate: Date.now() });
                localStorage.setItem('last-reset-date', Date.now().toString());
            },
        }),
        {
            name: 'guesses-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                guesses: state.guesses > 5 ? 5 : state.guesses,
                lastResetDate: state.lastResetDate,
            }),
        }
    )
);

export function initializeDailyStore() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (useDailyStore.getState().lastResetDate < today.getTime()) {
        useDailyStore.getState().resetGuesses();
    }
}