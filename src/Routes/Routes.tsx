import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '@/App.tsx';
import { DailyPage } from '@/pages/daily/daily.tsx';
import { UnlimitedPage } from '@/pages/unlimited/unlimited.tsx';
import { Home } from '@/pages/home/home.tsx';

export const routerRoutes = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      children: [
         // added this so router redirects to '/home' directly
         {
            path: '/',
            loader: () => {
               return redirect('/home');
            },
         },
         {
            path: 'home',
            element: <Home />,
         },
         {
            path: '/daily',
            element: <DailyPage />,
         },
         {
            path: '/unlimited',
            element: <UnlimitedPage />,
         },
      ],
   },
   {
      path: '*',
      element: <div>Not found</div>,
   },
]);
