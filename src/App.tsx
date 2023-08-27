import './App.css';
import { Header } from '@/components/header/header.tsx';
import { Outlet } from 'react-router-dom';
// import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
// import {Button} from "@/components/ui/button.tsx";
//
// const FRAMEWORKS = [
//     {"value": "one-piece", "label": "One Piece"},
//     {"value": "naruto", "label": "Naruto"},
//     {"value": "attack-on-titan", "label": "Attack on Titan"},
//     {"value": "my-hero-academia", "label": "My Hero Academia"},
//     {"value": "death-note", "label": "Death Note"},
//     {"value": "fullmetal-alchemist", "label": "Fullmetal Alchemist"},
//     {"value": "dragon-ball-z", "label": "Dragon Ball Z"},
//     {"value": "one-punch-man", "label": "One Punch Man"},
//     {"value": "hunter-x-hunter", "label": "Hunter x Hunter"},
//     {"value": "tokyo-ghoul", "label": "Tokyo Ghoul"},
//     {"value": "bleach", "label": "Bleach"},
//     {"value": "sailor-moon", "label": "Sailor Moon"},
//     {"value": "fairy-tail", "label": "Fairy Tail"},
//     {"value": "black-clover", "label": "Black Clover"},
//     {"value": "demon-slayer", "label": "Demon Slayer"},
//     {"value": "neon-genesis-evangelion", "label": "Neon Genesis Evangelion"},
//     {"value": "code-geass", "label": "Code Geass"},
//     {"value": "cowboy-bebop", "label": "Cowboy Bebop"},
//     {"value": "no-game-no-life", "label": "No Game No Life"},
//     {"value": "steins-gate", "label": "Steins;Gate"}
// ];

// export type Option = Record<'value' | 'label', string> & Record<string, string>

// const plot = {
//     anime_name: 'Code Geass',
//     keywords: [
//         {uuid: '1', keyword_name: 'Geopolitical Chess'},
//         {uuid: '2', keyword_name: 'Mysterious Power'},
//         {uuid: '3', keyword_name: 'Rebellion Rises'},
//         {uuid: '4', keyword_name: 'Masked Strategist'},
//         {uuid: '5', keyword_name: 'Resistance Movement'},
//         {uuid: '6', keyword_name: 'Sacrificial Tactics'},
//         {uuid: '7', keyword_name: 'Dual Identities'},
//         {uuid: '8', keyword_name: 'Tyrannical Regime'},
//         {uuid: '9', keyword_name: 'Revolution Sparks'},
//         {uuid: '11', keyword_name: 'Supernatural Contract'},
//         {uuid: '12', keyword_name: 'Ethical Dilemmas'},
//     ],
// }

// interface Anime {
//     id: string
//     anime_name_jp: string
//     anime_name_en: string
//     anime_description: string
// }
//
// const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY)

function App() {
   // const inputRef = React.useRef<HTMLInputElement | null>(null)
   // const [isOpen, setOpen] = useState(false)
   //
   // const [selected, setSelected] = useState<Anime | null>()
   // const [, setInputValue] = useState<string>('')
   // const debouncedValue = useDebounce<string>(
   //    inputRef.current?.value || '',
   //    500
   // )
   //
   // const [isLoading, setIsLoading] = useState<boolean>(false)
   //
   // const [animes, setAnimes] = useState<Anime[]>([])
   //
   // useEffect(() => {
   //    // if (!debouncedValue) return
   //    void getAnimes()
   //       .then(() => {
   //          setIsLoading(false)
   //       })
   //       .catch(() => {
   //          setIsLoading(false)
   //       })
   // }, [debouncedValue])
   //
   // async function getAnimes() {
   //    setIsLoading(true)
   //    const { data } = await supabase
   //       .from('anime')
   //       .select()
   //       .or(
   //          `anime_name_jp.ilike.%${debouncedValue}%,anime_name_en.ilike.%${debouncedValue}%`
   //       )
   //       .order('anime_name_jp')
   //       .range(0, 3)
   //
   //    setAnimes(data as Anime[])
   // }
   //
   // const handleKeyDown = useCallback(
   //    (event: React.KeyboardEvent<HTMLDivElement>) => {
   //       const input = inputRef.current
   //       if (!input) {
   //          return
   //       }
   //
   //       // Keep the options displayed when the user is typing
   //       if (!isOpen) {
   //          setOpen(true)
   //       }
   //
   //       if (event.key === 'Escape') {
   //          input.blur()
   //       }
   //    },
   //    [isOpen]
   // )
   //
   // const handleBlur = useCallback(() => {
   //    setOpen(false)
   //    // setAnimes([]);
   //    // setInputValue(selected?.anime_name_en || "");
   // }, [selected])
   //
   // const handleSelectOption = useCallback(
   //    (selectedOption: Anime) => {
   //       setInputValue(selectedOption.anime_name_en)
   //
   //       setSelected(selectedOption)
   //
   //       // This is a hack to prevent the input from being focused after the user selects an option
   //       // We can call this hack: "The next tick"
   //       setTimeout(() => {
   //          inputRef?.current?.blur()
   //       }, 0)
   //    },
   //    [setInputValue]
   // )

   return (
      <div>
         <Header />
         <div className="max-w-7xl mx-auto lg:pt-[5rem] sm:px-3 lg:px-0">
            <Outlet />
         </div>
         {/*<div className={'max-w-[1280px] mx-auto my-2 flex gap-6 flex-col'}>*/}
         {/*   <CommandPrimitive*/}
         {/*      className={'w-full'}*/}
         {/*      shouldFilter={false}*/}
         {/*      onKeyDown={handleKeyDown}*/}
         {/*   >*/}
         {/*      <div className="flex w-full gap-1">*/}
         {/*         <CommandPrimitive.Input*/}
         {/*            ref={inputRef}*/}
         {/*            // onValueChange={(val) => {*/}
         {/*            //     setInputValue(val)*/}
         {/*            // }}*/}
         {/*            onBlur={handleBlur}*/}
         {/*            onFocus={() => {*/}
         {/*               setOpen(true)*/}
         {/*            }}*/}
         {/*            placeholder={'Search anime'}*/}
         {/*            disabled={false}*/}
         {/*            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"*/}
         {/*         />*/}
         {/*         <button*/}
         {/*            disabled={!selected}*/}
         {/*            className={cn(*/}
         {/*               'disabled:opacity-50 pointer-events-auto relative rounded-md bg-white h-9 w-9 flex items-center justify-center text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900'*/}
         {/*            )}*/}
         {/*            onClick={() => {*/}
         {/*               if (*/}
         {/*                  selected &&*/}
         {/*                  plot.anime_name === selected.anime_name_jp*/}
         {/*               ) {*/}
         {/*                  window.alert('e sakte')*/}
         {/*                  setInputValue('')*/}
         {/*                  setSelected(null)*/}
         {/*               } else {*/}
         {/*                  window.alert('e pasakte')*/}
         {/*                  setInputValue('')*/}
         {/*                  setSelected(null)*/}
         {/*               }*/}
         {/*            }}*/}
         {/*         >*/}
         {/*            <CheckIcon />*/}
         {/*         </button>*/}
         {/*      </div>*/}
         {/*      <div className="mt-1 relative">*/}
         {/*         {isOpen && (*/}
         {/*            <div className="absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none animate-in fade-in-0 zoom-in-95">*/}
         {/*               <CommandList className="ring-1 ring-slate-200 rounded-lg">*/}
         {/*                  {isLoading ? (*/}
         {/*                     <CommandPrimitive.Loading>*/}
         {/*                        <div className="p-1">Loading</div>*/}
         {/*                     </CommandPrimitive.Loading>*/}
         {/*                  ) : null}*/}
         {/*                  {!animes.length && (*/}
         {/*                     <CommandPrimitive.Empty>*/}
         {/*                        No results found.*/}
         {/*                     </CommandPrimitive.Empty>*/}
         {/*                  )}*/}
         {/*                  {!isLoading && animes.length > 0 ? (*/}
         {/*                     <CommandGroup*/}
         {/*                        style={{*/}
         {/*                           maxHeight: '300px',*/}
         {/*                           overflowY: 'auto',*/}
         {/*                        }}*/}
         {/*                     >*/}
         {/*                        {animes.length > 0 &&*/}
         {/*                           animes.map((option: Anime) => {*/}
         {/*                              const isSelected =*/}
         {/*                                 selected?.anime_name_en ===*/}
         {/*                                 option.anime_name_en*/}
         {/*                              return (*/}
         {/*                                 <CommandItem*/}
         {/*                                    key={option.id}*/}
         {/*                                    value={option.anime_name_en}*/}
         {/*                                    onMouseDown={(event) => {*/}
         {/*                                       event.preventDefault()*/}
         {/*                                       event.stopPropagation()*/}
         {/*                                    }}*/}
         {/*                                    onSelect={() =>*/}
         {/*                                       handleSelectOption(option)*/}
         {/*                                    }*/}
         {/*                                    className={cn([*/}
         {/*                                       'flex items-center gap-2 w-full',*/}
         {/*                                       !isSelected ? 'pl-8' : null,*/}
         {/*                                    ])}*/}
         {/*                                 >*/}
         {/*                                    {isSelected ? <CheckIcon /> : null}*/}
         {/*                                    {option.anime_name_en}*/}
         {/*                                 </CommandItem>*/}
         {/*                              )*/}
         {/*                           })}*/}
         {/*                     </CommandGroup>*/}
         {/*                  ) : null}*/}
         {/*               </CommandList>*/}
         {/*            </div>*/}
         {/*         )}*/}
         {/*      </div>*/}
         {/*   </CommandPrimitive>*/}
         {/*   <div className={'flex flex-col gap-2'}>*/}
         {/*      /!*{plot.keywords.map((keyword) => {*!/*/}
         {/*      /!*    return <div*!/*/}
         {/*      /!*        key={keyword.uuid}*!/*/}
         {/*      /!*        className="pointer-events-auto relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10">*!/*/}
         {/*      /!*        <div className="flex px-3 py-2">*!/*/}
         {/*      /!*            <svg className={"mr-2.5 h-5 w-5 flex-none fill-slate-400"} viewBox="0 0 256 256">*!/*/}
         {/*      /!*                <path fill="currentColor"*!/*/}
         {/*      /!*                      d="m196.2 132.81l-51.66-19a3.91 3.91 0 0 1-2.32-2.32l-19-51.66a11.93 11.93 0 0 0-22.38 0l-19 51.66a3.91 3.91 0 0 1-2.32 2.32l-51.66 19a11.93 11.93 0 0 0 0 22.38l51.66 19a3.91 3.91 0 0 1 2.32 2.32l19 51.66a11.93 11.93 0 0 0 22.38 0l19-51.66a3.91 3.91 0 0 1 2.32-2.32l51.66-19a11.93 11.93 0 0 0 0-22.38Zm-2.77 14.87l-51.65 19a11.93 11.93 0 0 0-7.07 7.07l-19 51.65a3.92 3.92 0 0 1-7.36 0l-19-51.65a11.93 11.93 0 0 0-7.07-7.07l-51.65-19a3.92 3.92 0 0 1 0-7.36l51.65-19a11.93 11.93 0 0 0 7.07-7.07l19-51.65a3.92 3.92 0 0 1 7.36 0l19 51.65a11.93 11.93 0 0 0 7.07 7.07l51.65 19a3.92 3.92 0 0 1 0 7.36ZM148 40a4 4 0 0 1 4-4h20V16a4 4 0 0 1 8 0v20h20a4 4 0 0 1 0 8h-20v20a4 4 0 0 1-8 0V44h-20a4 4 0 0 1-4-4Zm96 48a4 4 0 0 1-4 4h-12v12a4 4 0 0 1-8 0V92h-12a4 4 0 0 1 0-8h12V72a4 4 0 0 1 8 0v12h12a4 4 0 0 1 4 4Z"/>*!/*/}
         {/*      /!*            </svg>*!/*/}
         {/*      /!*            {keyword.keyword_name}*!/*/}
         {/*      /!*        </div>*!/*/}
         {/*      /!*    </div>*!/*/}
         {/*      /!*})}*!/*/}
         {/*      {plot.keywords.map((keyword) => {*/}
         {/*         return (*/}
         {/*            <button*/}
         {/*               key={keyword.uuid}*/}
         {/*               className={*/}
         {/*                  'text-sm bg-neutral-200/50 backdrop-blur px-2 py-0.5 rounded-md flex items-center transition-colors'*/}
         {/*               }*/}
         {/*            >*/}
         {/*               <span className="flex px-3 py-1">*/}
         {/*                  <svg*/}
         {/*                     className={*/}
         {/*                        'mr-2.5 h-5 w-5 flex-none fill-slate-400'*/}
         {/*                     }*/}
         {/*                     viewBox="0 0 256 256"*/}
         {/*                  >*/}
         {/*                     <path*/}
         {/*                        fill="currentColor"*/}
         {/*                        d="m196.2 132.81l-51.66-19a3.91 3.91 0 0 1-2.32-2.32l-19-51.66a11.93 11.93 0 0 0-22.38 0l-19 51.66a3.91 3.91 0 0 1-2.32 2.32l-51.66 19a11.93 11.93 0 0 0 0 22.38l51.66 19a3.91 3.91 0 0 1 2.32 2.32l19 51.66a11.93 11.93 0 0 0 22.38 0l19-51.66a3.91 3.91 0 0 1 2.32-2.32l51.66-19a11.93 11.93 0 0 0 0-22.38Zm-2.77 14.87l-51.65 19a11.93 11.93 0 0 0-7.07 7.07l-19 51.65a3.92 3.92 0 0 1-7.36 0l-19-51.65a11.93 11.93 0 0 0-7.07-7.07l-51.65-19a3.92 3.92 0 0 1 0-7.36l51.65-19a11.93 11.93 0 0 0 7.07-7.07l19-51.65a3.92 3.92 0 0 1 7.36 0l19 51.65a11.93 11.93 0 0 0 7.07 7.07l51.65 19a3.92 3.92 0 0 1 0 7.36ZM148 40a4 4 0 0 1 4-4h20V16a4 4 0 0 1 8 0v20h20a4 4 0 0 1 0 8h-20v20a4 4 0 0 1-8 0V44h-20a4 4 0 0 1-4-4Zm96 48a4 4 0 0 1-4 4h-12v12a4 4 0 0 1-8 0V92h-12a4 4 0 0 1 0-8h12V72a4 4 0 0 1 8 0v12h12a4 4 0 0 1 4 4Z"*/}
         {/*                     />*/}
         {/*                  </svg>*/}
         {/*                  {keyword.keyword_name.toLowerCase()}*/}
         {/*               </span>*/}
         {/*            </button>*/}
         {/*         )*/}
         {/*      })}*/}
         {/*   </div>*/}
         {/*</div>*/}
      </div>
   );
}

export default App;
