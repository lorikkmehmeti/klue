import React from 'react';
import { Link } from 'react-router-dom';
import { useBreadcrumb } from '@/lib/providers/BreadcrumbProvider.tsx';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { useDailyStore } from '@/lib/store/useDailyStore.ts';

export function Header() {
   const { breadcrumbs } = useBreadcrumb();

   const lives = useDailyStore((state) => state.lives);

   return (
      <div className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
         <div className="flex items-center max-w-7xl w-full mx-auto">
            <Link
               to={'/'}
               className="items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-none hover:bg-accent hover:text-accent-foreground -ml-2 h-9 w-9 p-0 flex"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
               >
                  <path
                     fill="currentColor"
                     d="M1 19.025v-5h2v3h18v-3h2v5H1ZM9.55 15v-.85h-.075q-.325.5-.875.788t-1.25.287q-1.225 0-1.925-.637t-.7-1.738q0-1.05.813-1.712t2.087-.663q.575 0 1.063.088t.837.287v-.35q0-.675-.463-1.075t-1.262-.4q-.525 0-.987.225t-.788.65L4.95 9.1q.475-.675 1.2-1.025t1.675-.35q1.55 0 2.375.738t.825 2.137V15H9.55ZM7.9 11.65q-.8 0-1.225.313t-.425.887q0 .5.375.813t.975.312q.8 0 1.363-.562t.562-1.363q-.35-.2-.8-.3t-.825-.1ZM12.525 15V4.975h1.55V7.8L14 8.8h.075q.075-.125.6-.638t1.65-.512q1.6 0 2.525 1.15t.925 2.65q0 1.5-.912 2.638t-2.538 1.137q-1.025 0-1.563-.45t-.687-.7H14V15h-1.475ZM16.1 9.05q-1 0-1.55.738T14 11.425q0 .925.55 1.65t1.55.725q1 0 1.563-.725t.562-1.65q0-.925-.563-1.65T16.1 9.05Z"
                  />
               </svg>
               <span className="sr-only">Toggle Sidebar</span>
            </Link>
            <div className="flex items-center">
               <svg
                  fill="none"
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 text-muted-foreground/50 flex-none"
               >
                  <path d="M16.88 3.549L7.12 20.451"></path>
               </svg>
               <div className="w-full flex items-center flex-wrap flex-none">
                  {breadcrumbs.map(({ label, link }, index) => {
                     return (
                        <React.Fragment key={index}>
                           <Link
                              to={link}
                              className="py-1 cursor-pointer overflow-hidden whitespace-nowrap shrink text-sm font-medium flex items-center select-none transition-all p-2 rounded-md
                     hover:bg-zinc-300/30"
                           >
                              <span className="no-underline text-ellipsis whitespace-nowrap">
                                 {label}
                              </span>
                           </Link>
                           {index !== breadcrumbs.length - 1 && (
                              <div className="flex text-zinc-300 leading-0">
                                 <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M16 12a.804.804 0 0 0-.255-.592L9.439 5.24A.813.813 0 0 0 8.847 5a.83.83 0 0 0-.607.236.79.79 0 0 0-.24.588c0 .22.082.418.245.592L13.949 12l-5.704 5.584a.843.843 0 0 0-.245.593c0 .234.08.43.24.587a.83.83 0 0 0 .607.236c.231 0 .429-.08.592-.241l6.306-6.167c.082-.087.145-.179.189-.276A.755.755 0 0 0 16 12Z"
                                       fill="currentColor"
                                    ></path>
                                 </svg>
                              </div>
                           )}
                        </React.Fragment>
                     );
                  })}
               </div>
            </div>
            <div className="flex items-center justify-between flex-none ml-auto gap-3">
               <button className="bg-zinc-100 shadow-sm ring-1 ring-gray-200 border-transparent inline-flex relative items-center justify-center align-middle whitespace-nowrap overflow-hidden font-semibold rounded text-xs h-[28px]">
                  <span className="flex flex-grow justify-center px-2 gap-2">
                     <span>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="16px"
                           height="16px"
                           viewBox="0 0 24 24"
                        >
                           <path
                              fill="currentColor"
                              d="m8.962 18.91l.464-.588l-.464.589ZM12 5.5l-.54.52a.75.75 0 0 0 1.08 0L12 5.5Zm3.038 13.41l.465.59l-.465-.59Zm-5.612-.588C7.91 17.127 6.253 15.96 4.938 14.48C3.65 13.028 2.75 11.334 2.75 9.137h-1.5c0 2.666 1.11 4.7 2.567 6.339c1.43 1.61 3.254 2.9 4.68 4.024l.93-1.178ZM2.75 9.137c0-2.15 1.215-3.954 2.874-4.713c1.612-.737 3.778-.541 5.836 1.597l1.08-1.04C10.1 2.444 7.264 2.025 5 3.06C2.786 4.073 1.25 6.425 1.25 9.137h1.5ZM8.497 19.5c.513.404 1.063.834 1.62 1.16c.557.325 1.193.59 1.883.59v-1.5c-.31 0-.674-.12-1.126-.385c-.453-.264-.922-.628-1.448-1.043L8.497 19.5Zm7.006 0c1.426-1.125 3.25-2.413 4.68-4.024c1.457-1.64 2.567-3.673 2.567-6.339h-1.5c0 2.197-.9 3.891-2.188 5.343c-1.315 1.48-2.972 2.647-4.488 3.842l.929 1.178ZM22.75 9.137c0-2.712-1.535-5.064-3.75-6.077c-2.264-1.035-5.098-.616-7.54 1.92l1.08 1.04c2.058-2.137 4.224-2.333 5.836-1.596c1.659.759 2.874 2.562 2.874 4.713h1.5Zm-8.176 9.185c-.526.415-.995.779-1.448 1.043c-.452.264-.816.385-1.126.385v1.5c.69 0 1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16l-.929-1.178Z"
                           ></path>
                        </svg>
                     </span>
                     <span className="flex items-center text-xs">Lives</span>
                  </span>
                  <span className="bg-zinc-200 px-3 flex items-center self-stretch">
                     {lives}
                  </span>
               </button>
               {['Sign up', 'Login'].map((button: string) => {
                  return (
                     <TooltipProvider key={button}>
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <button
                                 disabled
                                 className={`max-sm:hidden focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-3.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center`}
                              >
                                 {button}
                              </button>
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>Not available right now</p>
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  );
               })}

               <button
                  className="hidden items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-none hover:bg-accent hover:text-accent-foreground rounded-full"
                  type="button"
               >
                  <img
                     alt="Avatar"
                     loading="lazy"
                     width="60"
                     height="60"
                     decoding="async"
                     data-nimg="1"
                     className="h-6 w-6 select-none rounded-full ring-1 ring-zinc-100/10 transition-opacity duration-300 hover:opacity-80"
                     srcSet={
                        'https://64.media.tumblr.com/a44fd2891a5c16a1c32a75eb42f2e345/7d5e3d4360544ca1-0e/s640x960/0c7074c675f8c3d417418a999451a3e45f2a1a75.jpg'
                     }
                     src={
                        'https://64.media.tumblr.com/a44fd2891a5c16a1c32a75eb42f2e345/7d5e3d4360544ca1-0e/s640x960/0c7074c675f8c3d417418a999451a3e45f2a1a75.jpg'
                     }
                  />
               </button>
            </div>
         </div>
      </div>
   );
}
