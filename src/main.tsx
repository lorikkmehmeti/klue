import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routerRoutes as router } from './Routes';
import { SupabaseProvider } from '@/lib/providers';
import { BreadcrumbProvider } from '@/lib/providers/BreadcrumbProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <SupabaseProvider>
         <BreadcrumbProvider>
            <RouterProvider router={router} />
         </BreadcrumbProvider>
      </SupabaseProvider>
   </React.StrictMode>
);
