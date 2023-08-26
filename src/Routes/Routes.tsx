import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.tsx'

export const routerRoutes = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      // loader: () => {
      //    return redirect('/home')
      // },
   },
   {
      path: '/home',
      element: <App />,
   },
   {
      path: '*',
      element: <div>Not found</div>,
   },
])
