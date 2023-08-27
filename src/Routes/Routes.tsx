import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.tsx'
import { DailyPage } from '@/pages/daily/daily.tsx'
import { UnlimitedPage } from '@/pages/unlimited/unlimited.tsx'

export const routerRoutes = createBrowserRouter([
   {
      path: '/',
      element: <App />,

      children: [
         {
            path: '/daily',
            element: <DailyPage />,
         },
         {
            path: '/unlimited',
            element: <UnlimitedPage />,
         },
      ],
      // loader: () => {
      //    return redirect('/home')
      // },
   },
   {
      path: '*',
      element: <div>Not found</div>,
   },
])
