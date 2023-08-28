import { Link } from 'react-router-dom';

export function Home() {
   return (
      <ul
         role="list"
         className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-2"
      >
         <li className="relative flex flex-col items-start p-6 hover:bg-zinc-800/5 rounded-md border border-transparent hover:border-zinc-800/5 transition-all">
            <Link to="/daily">
               <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="32"
                     height="32"
                     viewBox="0 0 24 24"
                  >
                     <g fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14v-2Z" />
                        <path
                           strokeLinecap="round"
                           d="M7 4V2.5M17 4V2.5M2 9h20"
                           opacity=".5"
                        />
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="m9 14.5l1.5-1.5v4"
                        />
                        <path
                           strokeLinecap="round"
                           d="M13 16v-2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0Z"
                        />
                     </g>
                  </svg>
               </div>
               <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  <span>
                     <span className="relative z-10">Daily Challenge</span>
                  </span>
               </h2>
               <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 pointer-events-none">
                  Test your plot knowledge daily! Decode anime from keywords.
                  New challenge, new story, every day.
               </p>
            </Link>
         </li>
         <li className="relative flex flex-col items-start p-6 hover:bg-zinc-800/5 rounded-md border border-transparent hover:border-zinc-800/5 transition-all">
            <Link to="/unlimited">
               <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="32"
                     height="32"
                     viewBox="0 0 24 24"
                  >
                     <g fill="currentColor">
                        <path
                           fillRule="evenodd"
                           d="M2.75 12a4.25 4.25 0 0 1 6.8-3.4a.75.75 0 1 0 .901-1.2A5.75 5.75 0 1 0 7 17.75c.784 0 1.464-.143 2.064-.435c.6-.292 1.079-.714 1.489-1.215c.66-.804 1.196-1.894 1.776-3.074l.339-.689a.755.755 0 0 0-.339-1.008a.745.745 0 0 0-1.003.337l-.366.743c-.584 1.183-1.027 2.082-1.567 2.74c-.307.375-.624.64-.986.817c-.362.177-.81.284-1.407.284A4.25 4.25 0 0 1 2.75 12Z"
                           clipRule="evenodd"
                        />
                        <path
                           d="M12.67 12.335a.755.755 0 0 0-.34-1.006a.746.746 0 0 0-.975.284c.108-.215.213-.429.316-.639c.58-1.18 1.117-2.27 1.776-3.074c.41-.501.89-.923 1.49-1.215c.6-.292 1.28-.435 2.063-.435a5.75 5.75 0 1 1-3.45 10.35a.75.75 0 0 1 .9-1.2A4.25 4.25 0 1 0 17 7.75c-.596 0-1.045.107-1.406.284c-.363.176-.68.442-.987.816c-.54.66-.983 1.558-1.567 2.741c-.116.237-.239.485-.369.744h-.001Z"
                           opacity=".5"
                        />
                     </g>
                  </svg>
               </div>
               <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  <span>
                     <span className="relative z-10">Unlimited Challenge</span>
                  </span>
               </h2>
               <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 pointer-events-none">
                  Endless plot puzzles await! Anime revealed by keywords. Dive
                  into limitless entertainment and guess them all.
               </p>
            </Link>
         </li>
         <li className="pointer-events-none disabled:opacity-30 relative flex flex-col items-start p-6 hover:bg-zinc-800/5 rounded-md border border-transparent hover:border-zinc-800/5 transition-all">
            <Link to="/" className="disabled pointer-events-none opacity-70">
               <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="32"
                     height="32"
                     viewBox="0 0 64 64"
                  >
                     <path
                        fill="currentColor"
                        d="M61.016 53.798c-1.404-1.171-1.901-1.459-2.191-1.244a1.816 1.816 0 0 0-.563-1.004c-.431-.39-1.018-.562-1.631-.543a1.835 1.835 0 0 0-.6-1.318c-.432-.391-1.02-.563-1.633-.544a1.83 1.83 0 0 0-.599-1.318c-.431-.391-1.019-.563-1.631-.545a1.828 1.828 0 0 0-.6-1.318c-.501-.455-1.212-.615-1.932-.516c1.663-2.698-.462-5.752-2.124-7.141c-1.043-.87-.545.283-2.389 3.103a186.522 186.522 0 0 1-7.242-6.393c4.246-2.936 8.923-6.394 13.626-10.321C63.236 14.903 61.959 4 61.959 4s-1.354 1.384-3.682 3.002c-3.294 2.29-8.542 5.06-14.677 5.06l-.273-.002s-.315 5.472-11.329 17.129C20.986 17.531 20.673 12.06 20.673 12.06l-.273.002c-6.135 0-11.383-2.77-14.677-5.06C3.395 5.384 2.041 4 2.041 4S.764 14.903 12.491 24.695c4.694 3.92 9.376 7.39 13.616 10.322a185.325 185.325 0 0 1-7.233 6.392c-1.843-2.819-1.345-3.973-2.388-3.103c-1.662 1.389-3.787 4.442-2.124 7.141c-.719-.1-1.431.061-1.932.516a1.833 1.833 0 0 0-.6 1.318c-.613-.019-1.2.154-1.631.545c-.391.354-.58.822-.599 1.318c-.613-.02-1.201.153-1.632.544c-.391.354-.58.822-.599 1.318c-.613-.019-1.201.153-1.631.543a1.82 1.82 0 0 0-.562 1.004c-.291-.215-.788.073-2.192 1.244c-2.438 2.038.236 1.152 1.75 2.947c2.231 2.646 8.058 5.167 12.837 1.175c3.932-3.281 5.668-8.577 3.903-12.668c1.348-.734 5.276-2.931 10.526-6.305c5.256 3.379 9.178 5.569 10.525 6.306c-1.765 4.091-.029 9.387 3.903 12.668c4.779 3.992 10.605 1.472 12.837-1.175c1.514-1.795 4.189-.909 1.751-2.947M7.173 55.487c.89.297 1.849.184 2.48-.389c.389-.353.578-.821.597-1.317c.613.02 1.2-.153 1.632-.543c.39-.354.579-.822.598-1.319c.613.02 1.201-.154 1.634-.544c.389-.353.578-.822.597-1.318c.613.02 1.201-.152 1.633-.543c.386-.352.576-.816.598-1.309c3.628 5.063-4.455 11.827-9.769 7.282m37.356-41.945c4.43-.188 8.369-1.681 11.469-3.369c-1.197 3.742-3.731 8.295-8.955 12.654c-4.173 3.485-8.326 6.596-12.17 9.299a122.867 122.867 0 0 1-1.846-1.86c8.319-8.816 10.786-14.322 11.502-16.724m-25.058 0c.951 3.187 4.944 11.821 21.674 26.438c-5.745-3.468-14.952-9.44-24.188-17.152c-5.223-4.359-7.757-8.912-8.955-12.654c3.1 1.687 7.04 3.18 11.469 3.368m3.384 26.437a170.332 170.332 0 0 0 4.52-4.093c.325.222.646.438.966.653a203.536 203.536 0 0 1-5.486 3.44m24.203 8.226c.022.492.212.957.598 1.309c.433.391 1.021.563 1.634.543c.019.496.208.966.597 1.318c.433.39 1.021.563 1.634.544c.02.497.208.966.598 1.319c.432.39 1.02.563 1.633.543c.019.496.207.965.597 1.317c.632.572 1.591.686 2.48.389c-5.316 4.545-13.399-2.219-9.771-7.282"
                     />
                  </svg>
               </div>
               <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  <span>
                     <span className="relative z-10">
                        Challenge your friends{' '}
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                           Coming soon
                        </span>
                     </span>
                  </span>
               </h2>
               <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 pointer-events-none">
                  Compete head-to-head! Who decodes anime names faster? Battle
                  wits in this thrilling challenge!
               </p>
            </Link>
         </li>
         <li className="pointer-events-none disabled:opacity-30 relative flex flex-col items-start p-6 hover:bg-zinc-800/5 rounded-md border border-transparent hover:border-zinc-800/5 transition-all">
            <Link to="/" className="disabled pointer-events-none opacity-70">
               <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="32"
                     height="32"
                     viewBox="0 0 24 24"
                  >
                     <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m3.604 7.197l7.138-3.109a.96.96 0 0 1 1.27.527l4.924 11.902a1 1 0 0 1-.514 1.304L9.285 20.93a.96.96 0 0 1-1.271-.527L3.09 8.5a1 1 0 0 1 .514-1.304zM15 4h1a1 1 0 0 1 1 1v3.5M20 6c.264.112.52.217.768.315a1 1 0 0 1 .53 1.311L19 13"
                     />
                  </svg>
               </div>
               <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  <span>
                     <span className="relative z-10">
                        Random Packs{' '}
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                           Coming soon
                        </span>
                     </span>
                  </span>
               </h2>
               <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 pointer-events-none">
                  Unlock the mystery! Select an anime pack, guess the titles
                  within. Will you conquer the randomness and name them all?
               </p>
            </Link>
         </li>
      </ul>
   );
}
