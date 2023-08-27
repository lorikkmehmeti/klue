import React from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ENV } from '../constants'; // Update the import path for constants
import { SupabaseContext } from '../hooks/useSupabase';

const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY);

interface SupabaseContextType {
   supabase: SupabaseClient;
}

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
   const value: SupabaseContextType = {
      supabase,
   };

   return (
      <SupabaseContext.Provider value={value}>
         {children}
      </SupabaseContext.Provider>
   );
}
