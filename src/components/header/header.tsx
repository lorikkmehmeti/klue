// import React from 'react';

export function Header() {
    return (
        <div
            className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
            <div className="flex items-center">
                <button
                    className="items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-none hover:bg-accent hover:text-accent-foreground -ml-2 flex h-9 w-9 p-0 lg:hidden"
                    type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rd:"
                    data-state="closed">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"
                         className="h-6 w-6">
                        <path
                            d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16ZM40 56h40v144H40Zm176 144H96V56h120v144Z"></path>
                    </svg>
                    <span className="sr-only">Toggle Sidebar</span></button>
                <button
                    className="items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-none hover:bg-accent hover:text-accent-foreground -ml-2 hidden h-9 w-9 p-0 lg:flex">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"
                         className="h-6 w-6">
                        <path
                            d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16ZM40 56h40v144H40Zm176 144H96V56h120v144Z"></path>
                    </svg>
                    <span className="sr-only">Toggle Sidebar</span></button>
                <div className="flex items-center">
                    <svg fill="none" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round"
                         strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" aria-hidden="true"
                         className="h-6 w-6 text-muted-foreground/50">
                        <path d="M16.88 3.549L7.12 20.451"></path>
                    </svg>
                    <div className="flex items-center justify-between">
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-none hover:bg-accent hover:text-accent-foreground h-8 px-4 py-2 pl-0"
                            type="button" id="radix-:rg:" aria-haspopup="menu" aria-expanded="false"
                            data-state="closed">
                            <img alt="Avatar" loading="lazy" width="60" height="60" decoding="async"
                                                     data-nimg="1"
                                                     className="h-6 w-6 select-none rounded-full ring-1 ring-zinc-100/10 transition-opacity duration-300 hover:opacity-80"
                                                     srcSet={"https://chat.vercel.ai/_next/image?url=https%3A%2F%2Fvercel.com%2Fapi%2Fwww%2Favatar%2F%3Fu%3Dlorikkmehmeti%26s%3D60&w=64&q=75 2x"}
                                                     src={"https://chat.vercel.ai/_next/image?url=https%3A%2F%2Fvercel.com%2Fapi%2Fwww%2Favatar%2F%3Fu%3Dlorikkmehmeti%26s%3D60&w=64&q=75"}/><span
                            className="ml-2"></span></button>
                    </div>
                </div>
            </div>
        </div>
);
}