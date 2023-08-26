import { Link } from 'react-router-dom'

export function Header() {
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
                  className="h-6 w-6 text-muted-foreground/50"
               >
                  <path d="M16.88 3.549L7.12 20.451"></path>
               </svg>
               <div className="flex items-center justify-between">
                  <button
                     className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-none hover:bg-accent hover:text-accent-foreground h-8 px-2 py-2"
                     type="button"
                     id="radix-:rg:"
                     aria-haspopup="menu"
                     aria-expanded="false"
                     data-state="closed"
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
                           'https://chat.vercel.ai/_next/image?url=https%3A%2F%2Fvercel.com%2Fapi%2Fwww%2Favatar%2F%3Fu%3Dlorikkmehmeti%26s%3D60&w=64&q=75 2x'
                        }
                        src={
                           'https://chat.vercel.ai/_next/image?url=https%3A%2F%2Fvercel.com%2Fapi%2Fwww%2Favatar%2F%3Fu%3Dlorikkmehmeti%26s%3D60&w=64&q=75'
                        }
                     />
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}
