import React from 'react';
import { cn } from '@/lib/utils.ts';

type LoadingType = React.HTMLAttributes<HTMLDivElement> & {
   width: number;
   height: number;
};

function Loading({ className, ...props }: LoadingType) {
   return (
      <div
         className={cn(
            `flex items-center justify-center py-[3rem] text-stone-400`,
            className
         )}
         {...props}
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width}
            height={props.height}
            viewBox="0 0 24 24"
         >
            <g stroke="currentColor">
               <circle
                  cx="12"
                  cy="12"
                  r="9.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeWidth="3"
               >
                  <animate
                     attributeName="stroke-dasharray"
                     calcMode="spline"
                     dur="1.5s"
                     keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                     keyTimes="0;0.475;0.95;1"
                     repeatCount="indefinite"
                     values="0 150;42 150;42 150;42 150"
                  />
                  <animate
                     attributeName="stroke-dashoffset"
                     calcMode="spline"
                     dur="1.5s"
                     keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                     keyTimes="0;0.475;0.95;1"
                     repeatCount="indefinite"
                     values="0;-16;-59;-59"
                  />
               </circle>
               <animateTransform
                  attributeName="transform"
                  dur="2s"
                  repeatCount="indefinite"
                  type="rotate"
                  values="0 12 12;360 12 12"
               />
            </g>
         </svg>
      </div>
   );
}

export { Loading };
