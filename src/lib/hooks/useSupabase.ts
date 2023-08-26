import { createContext, useContext } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';

interface SupabaseContextType {
   supabase: SupabaseClient;
}

export const SupabaseContext = createContext<SupabaseContextType | undefined>(
   undefined
);

export const useSupabase = (): SupabaseContextType => {
   const context = useContext(SupabaseContext);
   if (!context) {
      throw new Error('useSupabase must be used within a SupabaseProvider');
   }
   return context;
};
