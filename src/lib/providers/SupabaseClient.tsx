import React from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ENV } from '../constants'; // Update the import path for constants
import { SupabaseContext } from '../hooks/use-supabase.ts';

const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY);

export interface SupabaseContextType {
   supabase: SupabaseClient;
}

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
   return (
      <SupabaseContext.Provider value={supabase}>
         {children}
      </SupabaseContext.Provider>
   );
}
