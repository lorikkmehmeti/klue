import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { SupabaseProvider } from '@/lib/providers/SupabaseClient.tsx'
import { RouterProvider } from 'react-router-dom'
import { routerRoutes as router } from './Routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <SupabaseProvider>
         <RouterProvider router={router} />
      </SupabaseProvider>
   </React.StrictMode>
)
