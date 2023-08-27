import React, { createContext, useContext } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ENV } from '../constants' // Update the import path for constants

const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY)

interface SupabaseContextType {
   supabase: SupabaseClient
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
   undefined
)

export function useSupabase(): SupabaseContextType {
   const context = useContext(SupabaseContext)
   if (!context) {
      throw new Error('useSupabase must be used within a SupabaseProvider')
   }
   return context
}

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
   const value: SupabaseContextType = {
      supabase,
   }

   return (
      <SupabaseContext.Provider value={value}>
         {children}
      </SupabaseContext.Provider>
   )
}
