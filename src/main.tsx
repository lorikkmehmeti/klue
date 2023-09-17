import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routerRoutes as router } from './Routes';
import { BreadcrumbProvider } from '@/lib/providers/BreadcrumbProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseProvider } from '@/lib/providers';
import { initializeDailyStore } from '@/lib/store/useDailyStore.ts';
import { Toaster } from 'sonner';

declare global {
   interface Array<T> {
      getRandomElement(): T | undefined;
   }
}

Array.prototype.getRandomElement = function () {
   const randomIndex = Math.floor(Math.random() * this.length);
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return this[randomIndex];
};

initializeDailyStore();

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
      },
   },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <SupabaseProvider>
            <BreadcrumbProvider>
               <RouterProvider router={router} />
               <Toaster position="top-right" duration={3000} />
            </BreadcrumbProvider>
         </SupabaseProvider>
      </QueryClientProvider>
   </React.StrictMode>
);
