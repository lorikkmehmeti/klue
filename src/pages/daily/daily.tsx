import React, { ElementRef, useCallback, useEffect, useState } from 'react';
import { Anime, AnimeOption, Keyword } from '@/lib/models';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Command } from 'cmdk';
import {
   CommandGroup,
   CommandItem,
   CommandList,
} from '@/components/ui/command.tsx';
import { cn } from '@/lib/utils.ts';
import { CheckIcon } from '@radix-ui/react-icons';
import { useAnimes, useDebounce, useKeywords, useSupabase } from '@/lib/hooks';
import { useBreadcrumb } from '@/lib/providers/BreadcrumbProvider.tsx';
import { useAnime, useDailyAnime } from '@/lib/hooks/use-animes.ts';
import { DailyRecord } from '@/lib/models/daily.ts';
import { getAnimeByColumn } from '@/lib/api/animes-api.ts';
import { useDailyStore } from '@/lib/store/useDailyStore.ts';

export function DailyPage() {
   const inputRef = React.useRef<ElementRef<'input'> | null>(null);

   const client = useSupabase();

   const [inputValue, setInputValue] = useState<string>('');
   const debouncedValue = useDebounce(inputValue, 1000);

   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [selected, setSelected] = useState<AnimeOption | null>();

   // get the daily anime
   const { data: anime } = useDailyAnime();

   // get the keywords for the daily anime
   const { data: keywords, isLoading: loading } = useKeywords(
      (anime as DailyRecord)?.anime_id
   );

   const decreaseGuess = useDailyStore((state) => state.decreaseGuess);
   const guesses = useDailyStore((state) => state.guesses);

   // get the anime list for the search
   const { data: animes } = useAnimes(debouncedValue);

   const { data: correctAnime } = useAnime(
      (anime as DailyRecord)?.anime_id,
      guesses === 0 && !!anime
   );

   const { addBreadcrumb, clearBreadcrumbs } = useBreadcrumb();

   useEffect(() => {
      addBreadcrumb({ label: 'Daily Challenge', link: '/daily' });

      return () => {
         clearBreadcrumbs();
      };
   }, [addBreadcrumb]);

   async function CheckAnswer(selected: AnimeOption) {
      const answer = await getAnimeByColumn(client, {
         column: 'anime_name_jp',
         value: selected?.anime_name_jp,
      }).then((result) => result?.data as Anime);

      if (answer.id === (anime as DailyRecord).anime_id) {
         window.alert('e sakte');
      } else {
         window.alert('e pasakte');
         decreaseGuess();
         setInputValue('');
         setSelected(null);
      }
   }

   const handleSelectOption = (selectedOption: AnimeOption) => {
      setSelected(selectedOption);
      setInputValue(selectedOption.anime_name_jp);

      void CheckAnswer(selectedOption);

      // if (answer !== undefined && anime !== undefined) {
      //    console.log({ answer, anime });
      //    if ((answer as Anime)?.id === anime?.anime_id) {
      //       window.alert('e sakte');
      //    }
      // }

      setTimeout(() => {
         inputRef?.current?.blur();
      }, 0);
   };

   const handleBlur = useCallback(() => {
      setIsOpen(false);
   }, [selected]);

   return (
      <React.Fragment>
         {correctAnime && (
            <h1 className="text-2xl text-center mb-3">
               Anime is {correctAnime.anime_name_en}
            </h1>
         )}

         <div
            className={`${
               guesses === 0 ? 'opacity-40 select-none disabled-area' : ''
            }`}
         >
            <div
               className={`flex flex-col w-full shadow-card rounded-lg mb-10 max-sm:mb-5 sticky z-49 top-[64px] left-0 z-10`}
            >
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
                        placeholder="Search anime"
                        disabled={false}
                        className={`w-full transition-all border border-border ${
                           isOpen
                              ? 'rounded-tl-xl rounded-tr-xl border-b-transparent'
                              : 'rounded-xl'
                        } py-1 xl:px-5 px-3 placeholder:text-tGray-600 text-[16px] lg:h-[54px] leading-7 flex-1 bg-tGray-100`}
                     />
                     <div className={`relative z-50`}>
                        {isOpen ? (
                           <div className="absolute top-0 z-20 w-full border bg-white rounded-bl-xl rounded-br-xl outline-none animate-in fade-in-0 zoom-in-95">
                              <CommandList>
                                 {animes && animes?.length > 0 ? (
                                    <CommandGroup
                                       style={{
                                          maxHeight: '300px',
                                          overflowY: 'auto',
                                       }}
                                       className="p-2"
                                    >
                                       {animes?.map(
                                          (
                                             option: AnimeOption,
                                             index: number
                                          ) => {
                                             const isSelected =
                                                selected?.anime_name_jp ===
                                                option.anime_name_jp;
                                             return (
                                                <CommandItem
                                                   key={
                                                      option.anime_name_jp +
                                                      index
                                                   }
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
                                                      !isSelected
                                                         ? 'pl-8'
                                                         : null,
                                                   ])}
                                                >
                                                   {isSelected ? (
                                                      <CheckIcon />
                                                   ) : null}
                                                   {option.anime_name_jp ===
                                                   option.anime_name_en
                                                      ? option.anime_name_jp
                                                      : `${option.anime_name_jp} / ${option.anime_name_en}`}
                                                </CommandItem>
                                             );
                                          }
                                       )}
                                    </CommandGroup>
                                 ) : null}
                              </CommandList>
                           </div>
                        ) : null}
                     </div>
                  </Command>
               </div>
            </div>
            {loading
               ? [1, 2, 3, 4, 5, 6].map((_, index) => {
                    return (
                       <Skeleton
                          key={index}
                          className="w-full h-[32px] mb-3 rounded-md bg-zinc-200/50  z-0"
                       />
                    );
                 })
               : null}
            <div className="pt-2">
               {!loading && keywords?.length
                  ? keywords.map(({ keyword }: Keyword, index) => {
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
      </React.Fragment>
   );
}
