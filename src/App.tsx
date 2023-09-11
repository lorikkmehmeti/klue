import React from 'react';
import './App.css';
import { Header } from '@/components/header/header.tsx';
import { Outlet } from 'react-router-dom';

function App() {
   return (
      <React.Fragment>
         {/*<div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-blue-100 z-[-1]"></div>*/}
         <div className="mx-auto flex h-screen w-full flex-1 flex-col bg-mushroom-100 md:max-w-[1600px] md:p-3 max-sm:px-1">
            <Header />
            <div className="mt-8">
               <Outlet />
            </div>
         </div>
      </React.Fragment>
   );
}

export default App;
