import React, {
   ElementRef,
   useCallback,
   useEffect,
   useMemo,
   useState,
} from 'react';
import { Anime, AnimeOption, Keyword } from '@/lib/models';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Command } from 'cmdk';
import {
   CommandGroup,
   CommandItem,
   CommandList,
} from '@/components/ui/command.tsx';
import { useAnimes, useDebounce, useKeywords, useSupabase } from '@/lib/hooks';
import { useBreadcrumb } from '@/lib/providers/BreadcrumbProvider.tsx';
import { useAnime, useDailyAnime } from '@/lib/hooks/use-animes.ts';
import { DailyRecord } from '@/lib/models/daily.ts';
import { getAnimeByColumn } from '@/lib/api/animes-api.ts';
import { useDailyStore } from '@/lib/store/useDailyStore.ts';
import { toast } from 'sonner';
import { message } from '@/lib/constants/messages.ts';
import { CircleIcon, CountdownTimerIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Button } from '@/components/ui';

export function DailyPage() {
   const {
      decrement,
      canPlay,
      reset,
      lives,
      foundRightAnswer,
      addAttempt,
      resetAttempts,
   } = useDailyStore((state) => state);
   const attempts = useDailyStore((state) => state.attempts);

   const filteredAttempts = useMemo(() => {
      return attempts.filter(
         (attempt, index, self) =>
            index ===
            self.findIndex(
               (a) =>
                  a.anime_name_jp === attempt.anime_name_jp &&
                  a.anime_name_en === attempt.anime_name_en &&
                  a.anime_description === attempt.anime_description &&
                  a.release_date === attempt.release_date &&
                  a.is_correct === attempt.is_correct
            )
      );
   }, [attempts]);

   console.log({ attempts, filteredAttempts });

   const inputRef = React.useRef<ElementRef<'input'> | null>(null);

   const client = useSupabase();

   const [inputValue, setInputValue] = useState<string>('');
   const debouncedValue = useDebounce(inputValue, 1000);

   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [selected, setSelected] = useState<AnimeOption | null>();

   // [explain] get the daily anime
   const { data: anime } = useDailyAnime();

   // [explain] get the keywords for the daily anime
   const { data: keywords, isLoading: loading } = useKeywords(
      (anime as DailyRecord)?.anime_id
   );

   // [explain] get the anime list for the search
   const {
      data: animes,
      isLoading: animesLoading,
      isFetched,
   } = useAnimes(debouncedValue);

   // [explain]: Activate the correct anime selection
   // [explain]: This action is triggered when the user can no longer play, indicating they have either found the correct answer or lost the game.
   const { data: correctAnime } = useAnime(
      (anime as DailyRecord)?.anime_id,
      !canPlay && !!anime
   );

   const [attemptLoading, setAttemptLoading] = useState<boolean>(false);

   const { addBreadcrumb, clearBreadcrumbs } = useBreadcrumb();

   useEffect(() => {
      addBreadcrumb({ label: 'Daily Challenge', link: '/daily' });

      return () => {
         clearBreadcrumbs();
      };
   }, [addBreadcrumb]);

   async function CheckAnswer(selected: AnimeOption) {
      if (!canPlay) return;

      /*** Set the value to empty string.*/
      setInputValue('');

      /**
       * from the selected answer, we search on database based on the field `anime_name_jp`
       *
       * @remarks
       * (database: anime table)
       */
      setAttemptLoading(true);
      const answer = await getAnimeByColumn(client, {
         column: 'anime_name_jp',
         value: selected?.anime_name_jp,
      })
         .then((result) => result?.data as Anime)
         .finally(() => {
            setAttemptLoading(false);
         });

      /**
       * Compares the selected answer (id) with the daily anime (anime_id) and returns a boolean value indicating whether they match.
       * @returns {boolean} `true` if the answer (id) matches the anime (anime_id), `false` otherwise.
       */
      const isCorrect = answer.id === (anime as DailyRecord).anime_id;

      /**
       * Based on isCorrect value, it selects a random {title, description} for message.
       * @returns {Object} title and description in an object.
       */
      const answer_message = message(isCorrect);

      addAttempt({ ...selected, is_correct: isCorrect });

      setIsOpen(false);
      if (isCorrect) {
         toast(answer_message?.title, {
            description: answer_message?.description,
         });
         reset();
         foundRightAnswer();
         return;
      }

      /**
       * if the user is not correct, show the toast
       * fire decrement() to change the value of lives
       * set the value of selected to null
       * */
      toast(answer_message?.title, {
         description: lives !== 1 ? answer_message?.description : null,
      });
      decrement();
      setSelected(null);
   }

   async function handleSelectOption(selectedOption: AnimeOption) {
      if (!canPlay) return;
      setInputValue(selectedOption.anime_name_jp);

      await CheckAnswer(selectedOption);

      setTimeout(() => {
         inputRef?.current?.blur();
      }, 0);
   }

   const handleBlur = useCallback(() => {
      setIsOpen(false);
   }, [selected]);

   return (
      <React.Fragment>
         <Button
            onClick={() => {
               reset();
               resetAttempts();
               window.location.reload();
            }}
            className="mb-2"
            size="sm"
         >
            Reset localStorage
         </Button>
         <div className="mb-2 flex flex-wrap items-center gap-1">
            {Array.from({ length: 5 }).map((_, index: number) => {
               return (
                  <button
                     key={index}
                     disabled
                     className={`focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex h-[32px] min-w-[100px] flex-shrink-0 items-center justify-center gap-x-1.5 rounded-md bg-gray-50 px-3.5 py-1.5 text-center text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:outline-none focus-visible:outline-0 focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-75 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800`}
                  >
                     {!attempts[index] ? (
                        <span>
                           {attempts.length === index && attemptLoading ? (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="15"
                                 height="15"
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
                           ) : (
                              `Attempt ${index + 1}`
                           )}
                        </span>
                     ) : (
                        <span className="flex items-center gap-1">
                           {attempts[index]?.anime_name_jp}
                           {attempts[index]?.is_correct ? (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="18"
                                 height="18"
                                 className="text-green-500"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    fill="currentColor"
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                                 />
                              </svg>
                           ) : (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="18"
                                 height="18"
                                 viewBox="0 0 24 24"
                                 className="text-red-500"
                              >
                                 <path
                                    fill="currentColor"
                                    d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"
                                 />
                              </svg>
                           )}
                        </span>
                     )}
                  </button>
               );
            })}
         </div>
         {correctAnime && (
            <div className="mb-2 flex w-full items-center justify-center rounded-md bg-white px-4 py-3 text-center text-xl shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition-colors dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
               <span className="ml-1 font-semibold">
                  {correctAnime.anime_name_en}
               </span>
            </div>
         )}

         <div
            className={`${
               !canPlay ? 'disabled-area select-none opacity-40' : ''
            }`}
         >
            <div
               className={`z-49 left-0 top-[64px] z-10 mb-4 flex w-full flex-col rounded-lg shadow-card max-sm:mb-5`}
            >
               <div className="flex flex-1 flex-row items-center gap-10">
                  <Command className="z-50 w-full" shouldFilter={false}>
                     <Command.Input
                        ref={inputRef}
                        value={inputValue}
                        onBlur={handleBlur}
                        onValueChange={(val) => {
                           if (!canPlay) return;
                           setInputValue(val);
                        }}
                        onFocus={() => setIsOpen(true)}
                        placeholder="Search anime"
                        disabled={!canPlay}
                        className="caret-ui-fg-base bg-ui-bg-field hover:bg-ui-bg-field-hover border-ui-border-base shadow-buttons-neutral placeholder-ui-fg-muted text-ui-fg-base transition-fg focus:border-ui-border-interactive focus:shadow-borders-active disabled:text-ui-fg-disabled disabled:!bg-ui-bg-disabled disabled:!border-ui-border-base disabled:placeholder-ui-fg-disabled aria-[invalid=true]:!border-ui-border-error aria-[invalid=true]:focus:!shadow-borders-error invalid:!border-ui-border-error invalid:focus:!shadow-borders-error txt-compact-medium relative mb-1 h-10 w-full appearance-none rounded-md border px-3 py-[9px] outline-none disabled:cursor-not-allowed disabled:!shadow-none [&::--webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                     />
                     <div className={`relative z-50`}>
                        {isOpen ? (
                           <div className="max-:smshadow-2xl absolute top-0 z-20 w-full rounded-md rounded-bl-xl rounded-br-xl border bg-white shadow-md outline-none animate-in fade-in-0 zoom-in-95">
                              <CommandList>
                                 <ScrollArea className="h-[280px] max-sm:h-[230px]">
                                    {!debouncedValue &&
                                    filteredAttempts.length > 0 ? (
                                       <CommandGroup heading="Recent searches">
                                          {filteredAttempts.map(
                                             (tri, index) => {
                                                return (
                                                   <CommandItem
                                                      key={index}
                                                      value={tri.anime_name_jp}
                                                      onMouseDown={(event) => {
                                                         event.preventDefault();
                                                         event.stopPropagation();
                                                      }}
                                                      onSelect={() =>
                                                         void handleSelectOption(
                                                            tri
                                                         )
                                                      }
                                                   >
                                                      <CountdownTimerIcon className="mr-2 h-4 w-4" />
                                                      <span>
                                                         {tri.anime_name_jp ===
                                                         tri.anime_name_en
                                                            ? tri.anime_name_jp
                                                            : `${tri.anime_name_jp} (${tri.anime_name_en})`}
                                                      </span>
                                                   </CommandItem>
                                                );
                                             }
                                          )}
                                       </CommandGroup>
                                    ) : null}
                                    {isFetched && animes?.length === 0 ? (
                                       <div className="py-6 text-center text-sm">
                                          No results found
                                       </div>
                                    ) : null}
                                    {animesLoading && (
                                       <div className="flex items-center justify-center py-[3rem] text-stone-400">
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="32"
                                             height="32"
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
                                    )}
                                    {!animesLoading &&
                                    animes &&
                                    animes.length > 0 ? (
                                       <CommandGroup
                                          className=""
                                          heading="Animes list"
                                       >
                                          {animes?.map(
                                             (
                                                option: AnimeOption,
                                                index: number
                                             ) => {
                                                return (
                                                   <CommandItem
                                                      key={
                                                         option.anime_name_jp +
                                                         index
                                                      }
                                                      value={
                                                         option.anime_name_jp
                                                      }
                                                      onMouseDown={(event) => {
                                                         event.preventDefault();
                                                         event.stopPropagation();
                                                      }}
                                                      onSelect={() =>
                                                         void handleSelectOption(
                                                            option
                                                         )
                                                      }
                                                      className={cn([
                                                         'flex w-full gap-2',
                                                      ])}
                                                   >
                                                      <CircleIcon className="h-4 w-4" />
                                                      <span>
                                                         {option.anime_name_jp ===
                                                         option.anime_name_en
                                                            ? option.anime_name_jp
                                                            : `${option.anime_name_jp} (${option.anime_name_en})`}
                                                      </span>
                                                   </CommandItem>
                                                );
                                             }
                                          )}
                                       </CommandGroup>
                                    ) : null}
                                 </ScrollArea>
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
                          className="z-0 mb-3 h-[32px] w-full rounded-md  bg-zinc-200/50"
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
                             className="mb-2 flex w-full items-center rounded-md bg-white px-2 py-1 text-sm shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition-colors dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
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
