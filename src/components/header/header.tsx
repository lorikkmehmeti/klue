import React from 'react';
import { Link } from 'react-router-dom';
import { useBreadcrumb } from '@/lib/providers/BreadcrumbProvider.tsx';
import { useDailyStore } from '@/lib/store/useDailyStore.ts';
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/components/ui/avatar.tsx';

export function Header() {
   const { breadcrumbs } = useBreadcrumb();

   const lives = useDailyStore((state) => state.lives);

   return (
      <div className="z-navigation border-marble-400 border-marble-400 sticky top-[.75rem] z-50 flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3">
         <div className="mx-auto flex w-full items-center">
            <Link to={'/'} className="">
               <span className="text-logo font-variable ml-1 font-jetbrains font-light lowercase text-green-700">
                  klue {lives}
               </span>
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
                  className="h-6 w-6 flex-none text-muted-foreground/50"
               >
                  <path d="M16.88 3.549L7.12 20.451"></path>
               </svg>
               <div className="flex w-full flex-none flex-wrap items-center">
                  {breadcrumbs.map(({ label, link }, index) => {
                     return (
                        <React.Fragment key={index}>
                           <Link
                              to={link}
                              className="flex shrink cursor-pointer select-none items-center overflow-hidden whitespace-nowrap rounded-md p-2 py-1.5 text-sm font-medium transition-all
                     hover:bg-zinc-300/30"
                           >
                              <span className="text-ellipsis whitespace-nowrap no-underline">
                                 {label}
                              </span>
                           </Link>
                           {index !== breadcrumbs.length - 1 && (
                              <div className="leading-0 flex text-zinc-300">
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
            <div className="ml-auto flex flex-none items-center justify-between gap-3">
               {/*<button className="bg-zinc-100 shadow-sm ring-1 ring-gray-200 border-transparent inline-flex relative items-center justify-center align-middle whitespace-nowrap overflow-hidden font-semibold rounded text-xs h-[28px]">*/}
               {/*   <span className="flex flex-grow justify-center px-2 gap-2">*/}
               {/*      <span>*/}
               {/*         <svg*/}
               {/*            xmlns="http://www.w3.org/2000/svg"*/}
               {/*            width="16px"*/}
               {/*            height="16px"*/}
               {/*            viewBox="0 0 24 24"*/}
               {/*         >*/}
               {/*            <path*/}
               {/*               fill="currentColor"*/}
               {/*               d="m8.962 18.91l.464-.588l-.464.589ZM12 5.5l-.54.52a.75.75 0 0 0 1.08 0L12 5.5Zm3.038 13.41l.465.59l-.465-.59Zm-5.612-.588C7.91 17.127 6.253 15.96 4.938 14.48C3.65 13.028 2.75 11.334 2.75 9.137h-1.5c0 2.666 1.11 4.7 2.567 6.339c1.43 1.61 3.254 2.9 4.68 4.024l.93-1.178ZM2.75 9.137c0-2.15 1.215-3.954 2.874-4.713c1.612-.737 3.778-.541 5.836 1.597l1.08-1.04C10.1 2.444 7.264 2.025 5 3.06C2.786 4.073 1.25 6.425 1.25 9.137h1.5ZM8.497 19.5c.513.404 1.063.834 1.62 1.16c.557.325 1.193.59 1.883.59v-1.5c-.31 0-.674-.12-1.126-.385c-.453-.264-.922-.628-1.448-1.043L8.497 19.5Zm7.006 0c1.426-1.125 3.25-2.413 4.68-4.024c1.457-1.64 2.567-3.673 2.567-6.339h-1.5c0 2.197-.9 3.891-2.188 5.343c-1.315 1.48-2.972 2.647-4.488 3.842l.929 1.178ZM22.75 9.137c0-2.712-1.535-5.064-3.75-6.077c-2.264-1.035-5.098-.616-7.54 1.92l1.08 1.04c2.058-2.137 4.224-2.333 5.836-1.596c1.659.759 2.874 2.562 2.874 4.713h1.5Zm-8.176 9.185c-.526.415-.995.779-1.448 1.043c-.452.264-.816.385-1.126.385v1.5c.69 0 1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16l-.929-1.178Z"*/}
               {/*            ></path>*/}
               {/*         </svg>*/}
               {/*      </span>*/}
               {/*      <span className="flex items-center text-xs">Lives</span>*/}
               {/*   </span>*/}
               {/*   <span className="bg-zinc-200 px-3 flex items-center self-stretch">*/}
               {/*      {lives}*/}
               {/*   </span>*/}
               {/*</button>*/}
               {/*{['Sign up', 'Login'].map((button: string) => {*/}
               {/*   return (*/}
               {/*      <TooltipProvider key={button}>*/}
               {/*         <Tooltip>*/}
               {/*            <TooltipTrigger asChild>*/}
               {/*               <button*/}
               {/*                  disabled*/}
               {/*                  className={`max-sm:hidden focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-3.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center`}*/}
               {/*               >*/}
               {/*                  {button}*/}
               {/*               </button>*/}
               {/*            </TooltipTrigger>*/}
               {/*            <TooltipContent>*/}
               {/*               <p>Not available right now</p>*/}
               {/*            </TooltipContent>*/}
               {/*         </Tooltip>*/}
               {/*      </TooltipProvider>*/}
               {/*   );*/}
               {/*})}*/}

               <button
                  className="flex items-center justify-center rounded-full text-sm font-medium shadow-none ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  type="button"
               >
                  <Avatar className="h-8 w-8">
                     <AvatarImage src="https://github.com/lorikkmehmeti.png" />
                     <AvatarFallback className="bg-[#f5be5a] p-1.5">
                        <svg
                           width="48"
                           height="48"
                           viewBox="0 0 48 48"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              d="M31 20L38 24L45 20V12L38 16L31 12V20Z"
                              fill="#050A0A"
                           />
                           <path
                              d="M38 40L31 36V28L38 24V32L45 36L38 40Z"
                              fill="#050A0A"
                           />
                           <path
                              d="M24 32L17 36V44L24 48V40L31 36L24 32Z"
                              fill="#050A0A"
                           />
                           <path
                              d="M3 28L10 24L17 28V36L10 32L3 36L3 28Z"
                              fill="#050A0A"
                           />
                           <path
                              d="M10 8L17 12V20L10 24L10 16L3 12L10 8Z"
                              fill="#050A0A"
                           />
                           <path
                              d="M24 16L31 12V4L24 0V8L17 12L24 16Z"
                              fill="#050A0A"
                           />
                        </svg>
                     </AvatarFallback>
                  </Avatar>
               </button>
            </div>
         </div>
      </div>
   );
}
