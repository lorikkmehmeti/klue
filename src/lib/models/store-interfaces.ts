import { StorageAttempt } from '@/lib/models/anime.ts';

export interface IDailyStore {
   lives: number; // track how many lives do the user have
   lastResetTime: number; // field to store the last reset date
   decrement: () => void; // decrement lives
   reset: () => void; // reset lives
   canPlay: boolean;
   foundRightAnswer: () => void; // reset lives
   attempts: Array<StorageAttempt>;
   addAttempt: (item: StorageAttempt) => void;
   resetAttempts: () => void;
}
