import React from 'react';
import { Header } from '@/components/header/header.tsx';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
   return (
      <React.Fragment>
         {/*<div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-blue-100 z-[-1]"></div>*/}
         <Header />
         <div className="max-w-7xl mx-auto lg:pt-[5rem] py-2 px-2 xl:px-0 z-1">
            <Outlet />
         </div>
      </React.Fragment>
   );
}

export default App;
