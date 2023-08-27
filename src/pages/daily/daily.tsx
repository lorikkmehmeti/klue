import React, { useCallback, useEffect, useState } from 'react';
import { Anime, Keyword } from '@/lib/models';
import { useSupabase } from '@/lib/hooks/useSupabase.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Command } from 'cmdk';
import { CommandGroup, CommandItem } from '@/components/ui/command.tsx';
import { cn } from '@/lib/utils.ts';
import { CheckIcon } from '@radix-ui/react-icons';
import { useDebounce } from '@/lib/hooks';

export function DailyPage() {
   const { supabase } = useSupabase();
   const [keywords, setAnimeKeywords] = useState<Keyword[]>([]);
   const [loading, setIsLoading] = useState<boolean>(false);
   const [, setLoadingAnimes] = useState<boolean>(false);
   const inputRef = React.useRef<HTMLInputElement | null>(null);

   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [selected, setSelected] = useState<Anime | null>();

   const [animes, setAnimes] = useState<Anime[]>([]);

   const [inputValue, setInputValue] = useState<string>('');
   const debouncedValue = useDebounce(inputRef.current?.value, 1000);

   async function getKeywords() {
      setIsLoading(true);
      const randomAnimeQuery = await supabase
         .from('anime')
         .select('id')
         .eq('id', '8dc125eb-e46f-40f1-8755-ed6c23786d3e');

      if (randomAnimeQuery.error) {
         console.error(
            'Error fetching random anime ID:',
            randomAnimeQuery.error.message
         );
         return;
      }

      const randomAnimeId: string = randomAnimeQuery.data[0]?.id;

      if (randomAnimeId) {
         const { data, error } = await supabase
            .from('keywords')
            .select('*')
            .eq('anime_id', randomAnimeId);

         if (error) {
            return;
         }

         setAnimeKeywords(data);
      }
   }

   useEffect(() => {
      // if (!debouncedValue) return
      void getKeywords()
         .then(() => {
            setIsLoading(false);
         })
         .catch(() => {
            setIsLoading(false);
         });
   }, []);

   useEffect(() => {
      void getAnimes()
         .then(() => {
            setLoadingAnimes(false);
         })
         .catch(() => {
            setLoadingAnimes(false);
         });
   }, [debouncedValue]);

   async function getAnimes() {
      setLoadingAnimes(true);
      const { data, error } = await supabase
         .from('anime')
         .select(
            'anime_name_jp, anime_name_en, anime_description, release_date'
         )
         .or(
            `anime_name_jp.ilike.%${debouncedValue}%,anime_name_en.ilike.%${debouncedValue}%`
         )
         .limit(!debouncedValue!.length ? 5 : 10);

      if (error) {
         console.error('Error fetching random anime ID:', error.message);
         return;
      }

      console.log(data);

      setAnimes(data as Anime[]);
   }

   const handleSelectOption = useCallback((selectedOption: Anime) => {
      // setInputValue(selectedOption.anime_name_en);
      setSelected(selectedOption);
      setInputValue(selectedOption.anime_name_jp);
      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
         inputRef?.current?.blur();
      }, 0);
   }, []);

   const handleBlur = useCallback(() => {
      setIsOpen(false);
      // setAnimes([]);
      // setInputValue(selected?.anime_name_en || "");
   }, [selected]);

   return (
      <div>
         <div className="flex flex-col w-full bg-white shadow-card rounded-lg mb-4 sticky z-49 top-[64px] left-0 z-10">
            <div className="flex flex-row gap-10 items-center flex-1">
               <Command className="w-full z-50" shouldFilter={false}>
                  <Command.Input
                     ref={inputRef}
                     value={inputValue}
                     onBlur={handleBlur}
                     onValueChange={(val) => {
                        setInputValue(val);
                     }}
                     onFocus={() => setIsOpen(true)}
                     placeholder={'Search anime'}
                     disabled={false}
                     className="w-full rounded-lg border border-border py-1 xl:px-5 px-3 placeholder:text-tGray-600 text-[16px] lg:h-[54px] leading-7 flex-1 bg-tGray-100"
                  />
                  <div className={`bg-stone-50 relative z-50`}>
                     {isOpen && (
                        <div className="absolute top-0 z-20 w-full rounded-xl bg-stone-50 outline-none animate-in fade-in-0 zoom-in-95">
                           <Command.List className="ring-1 ring-slate-200 rounded-lg">
                              {animes.length > 0 ? (
                                 <CommandGroup
                                    style={{
                                       maxHeight: '300px',
                                       overflowY: 'auto',
                                    }}
                                 >
                                    {animes.map((option: Anime, index) => {
                                       const isSelected =
                                          selected?.anime_name_jp ===
                                          option.anime_name_jp;
                                       return (
                                          <CommandItem
                                             key={option.anime_name_jp + index}
                                             value={option.anime_name_jp}
                                             onMouseDown={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                             }}
                                             onSelect={() =>
                                                handleSelectOption(option)
                                             }
                                             className={cn([
                                                'flex items-center gap-2 w-full',
                                                !isSelected ? 'pl-8' : null,
                                             ])}
                                          >
                                             {isSelected ? <CheckIcon /> : null}
                                             {option.anime_name_jp ===
                                             option.anime_name_en
                                                ? option.anime_name_jp
                                                : `${option.anime_name_jp} / ${option.anime_name_en}`}
                                          </CommandItem>
                                       );
                                    })}
                                 </CommandGroup>
                              ) : null}
                           </Command.List>
                        </div>
                     )}
                  </div>
               </Command>
            </div>
         </div>
         {loading
            ? [1, 2, 3, 4, 5, 6].map((_, index) => {
                 return (
                    <Skeleton
                       key={index}
                       className="w-full h-[32px] mb-3 rounded-md bg-stone-200 z-0"
                    />
                 );
              })
            : null}
         <div className="pt-2">
            {!loading && keywords.length
               ? keywords.map(({ keyword }, index) => {
                    return (
                       <button
                          key={index}
                          className="w-full text-sm bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 px-2 py-1 rounded-md flex items-center transition-colors mb-2"
                       >
                          <span className="flex px-3 py-1">
                             <svg
                                className={
                                   'mr-2.5 h-5 w-5 flex-none fill-slate-400'
                                }
                                viewBox="0 0 256 256"
                             >
                                <path
                                   fill="currentColor"
                                   d="m196.2 132.81l-51.66-19a3.91 3.91 0 0 1-2.32-2.32l-19-51.66a11.93 11.93 0 0 0-22.38 0l-19 51.66a3.91 3.91 0 0 1-2.32 2.32l-51.66 19a11.93 11.93 0 0 0 0 22.38l51.66 19a3.91 3.91 0 0 1 2.32 2.32l19 51.66a11.93 11.93 0 0 0 22.38 0l19-51.66a3.91 3.91 0 0 1 2.32-2.32l51.66-19a11.93 11.93 0 0 0 0-22.38Zm-2.77 14.87l-51.65 19a11.93 11.93 0 0 0-7.07 7.07l-19 51.65a3.92 3.92 0 0 1-7.36 0l-19-51.65a11.93 11.93 0 0 0-7.07-7.07l-51.65-19a3.92 3.92 0 0 1 0-7.36l51.65-19a11.93 11.93 0 0 0 7.07-7.07l19-51.65a3.92 3.92 0 0 1 7.36 0l19 51.65a11.93 11.93 0 0 0 7.07 7.07l51.65 19a3.92 3.92 0 0 1 0 7.36ZM148 40a4 4 0 0 1 4-4h20V16a4 4 0 0 1 8 0v20h20a4 4 0 0 1 0 8h-20v20a4 4 0 0 1-8 0V44h-20a4 4 0 0 1-4-4Zm96 48a4 4 0 0 1-4 4h-12v12a4 4 0 0 1-8 0V92h-12a4 4 0 0 1 0-8h12V72a4 4 0 0 1 8 0v12h12a4 4 0 0 1 4 4Z"
                                />
                             </svg>
                             {keyword.toLowerCase()}
                          </span>
                       </button>
                    );
                 })
               : null}
         </div>
      </div>
   );
}
