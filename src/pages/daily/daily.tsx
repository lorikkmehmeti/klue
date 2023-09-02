import React, {useCallback, useEffect, useState} from 'react';
import {AnimeOption, Keyword} from '@/lib/models';
import {Skeleton} from '@/components/ui/skeleton.tsx';
import {Command} from 'cmdk';
import {CommandGroup, CommandItem, CommandList,} from '@/components/ui/command.tsx';
import {cn} from '@/lib/utils.ts';
import {CheckIcon} from '@radix-ui/react-icons';
import {useAnimes, useDebounce, useKeywords} from '@/lib/hooks';
import {useBreadcrumb} from '@/lib/providers/BreadcrumbProvider.tsx';

// export const data = [
//    {
//       anime_name_jp: 'Jujutsu Kaisen',
//       anime_name_en: 'Jujutsu Kaisen',
//       anime_description:
//          'In a world of curses and spirits, students wield their own powers to battle malevolent forces',
//       release_date: '2020-10-03',
//    },
//    {
//       anime_name_jp: 'Hagane no Renkinjutsushi',
//       anime_name_en: 'Fullmetal Alchemist',
//       anime_description:
//          "Alchemical quests and brothers' journey to restore their bodies",
//       release_date: '2009-04-05',
//    },
//    {
//       anime_name_jp: 'Mob Psycho 100',
//       anime_name_en: 'Mob Psycho 100',
//       anime_description:
//          'Psychic Mob navigates adolescence with unique powers and life lessons',
//       release_date: '2016-07-11',
//    },
//    {
//       anime_name_jp: 'Grand Blue',
//       anime_name_en: 'Grand Blue',
//       anime_description:
//          "Iori navigates college life filled with alcohol and diving hilarity at his uncle's shop",
//       release_date: '2018-07-14',
//    },
//    {
//       anime_name_jp: 'Bleach',
//       anime_name_en: 'Bleach',
//       anime_description:
//          "Ichigo Kurosaki's life transforms when he becomes a Soul Reaper, defending humans from dark entities",
//       release_date: '2004-10-05',
//    },
// ];

// const animeKeywords: Keyword[] = [
//    {
//       "id": "26a7a1d1-7f6f-4507-8696-23a4d6bb8109",
//       "keyword": "Giants",
//       "anime_id": "8dc125eb-e46f-40f1-8755-ed6c23786d3e",
//       "updated_at": "2023-08-19T17:45:04.013722+00:00",
//       "created_at": "2023-08-19T17:45:04.013722+00:00"
//    },
//    {
//       "id": "8b5d72ef-a5ed-4416-a136-dd3f83c45dde",
//       "keyword": "Walls",
//       "anime_id": "8dc125eb-e46f-40f1-8755-ed6c23786d3e",
//       "updated_at": "2023-08-19T17:45:04.013722+00:00",
//       "created_at": "2023-08-19T17:45:04.013722+00:00"
//    },
//    {
//       "id": "4b11c3c3-45cd-4368-9674-0884bac652cc",
//       "keyword": "Military",
//       "anime_id": "8dc125eb-e46f-40f1-8755-ed6c23786d3e",
//       "updated_at": "2023-08-19T17:45:04.013722+00:00",
//       "created_at": "2023-08-19T17:45:04.013722+00:00"
//    },
//    {
//       "id": "a330a22a-d96f-4af8-a7cc-c160828652aa",
//       "keyword": "Survival",
//       "anime_id": "8dc125eb-e46f-40f1-8755-ed6c23786d3e",
//       "updated_at": "2023-08-19T17:45:04.013722+00:00",
//       "created_at": "2023-08-19T17:45:04.013722+00:00"
//    },
//    {
//       "id": "8e676d58-6f4a-439a-b4ea-b9b1f626eccb",
//       "keyword": "Trauma",
//       "anime_id": "8dc125eb-e46f-40f1-8755-ed6c23786d3e",
//       "updated_at": "2023-08-19T17:45:04.013722+00:00",
//       "created_at": "2023-08-19T17:45:04.013722+00:00"
//    },
//    {
//       "id": "b30cd7e9-3fe9-4b6f-9c20-66328b3d402e",
//       "keyword": "Mystery",
//       "anime_id": "8dc125eb-e46f-40f1-8755-ed6c23786d3e",
//       "updated_at": "2023-08-19T17:45:04.013722+00:00",
//       "created_at": "2023-08-19T17:45:04.013722+00:00"
//    },
//    {
//       "id": "462c0c2f-5f18-43d6-9ae8-ab6bcf23b52a",
//       "keyword": "Origin",
//       "anime_id": "8dc125eb-e46f-40f1-8755-ed6c23786d3e",
//       "updated_at": "2023-08-19T17:45:04.013722+00:00",
//       "created_at": "2023-08-19T17:45:04.013722+00:00"
//    },
//    {
//       "id": "9ee760cd-f350-45fa-bf83-baf4d83a4553",
//       "keyword": "Revenge",
//       "anime_id": "8dc125eb-e46f-40f1-8755-ed6c23786d3e",
//       "updated_at": "2023-08-19T17:45:04.013722+00:00",
//       "created_at": "2023-08-19T17:45:04.013722+00:00"
//    },
//    {
//       "id": "a6799367-08e6-4059-8c5d-16b9e9ab26a3",
//       "keyword": "Hope",
//       "anime_id": "8dc125eb-e46f-40f1-8755-ed6c23786d3e",
//       "updated_at": "2023-08-19T17:45:04.013722+00:00",
//       "created_at": "2023-08-19T17:45:04.013722+00:00"
//    },
//    {
//       "id": "7faac361-a980-4a24-8f5d-339c45f3c45e",
//       "keyword": "Courage",
//       "anime_id": "8dc125eb-e46f-40f1-8755-ed6c23786d3e",
//       "updated_at": "2023-08-19T17:45:04.013722+00:00",
//       "created_at": "2023-08-19T17:45:04.013722+00:00"
//    }
// ];

export function DailyPage() {
   const [inputValue, setInputValue] = useState<string>('');

   const debouncedValue = useDebounce(inputValue, 1000);

   // const { data: anime } = useAnime("8dc125eb-e46f-40f1-8755-ed6c23786d3e")

   const { data: keywords, isLoading: loading } = useKeywords("764c2e6f-eb51-43fe-9a73-104fa0eef759");
   const { data: animes } = useAnimes(debouncedValue);

   const inputRef = React.useRef<HTMLInputElement | null>(null);

   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [selected, setSelected] = useState<AnimeOption | null>();

   const { addBreadcrumb, clearBreadcrumbs } = useBreadcrumb();

   useEffect(() => {
      addBreadcrumb({ label: 'Daily Challenge', link: '/daily' });

      return () => {
         clearBreadcrumbs();
      };
   }, [addBreadcrumb]);

   const handleSelectOption = useCallback((selectedOption: AnimeOption) => {
      setSelected(selectedOption);
      setInputValue(selectedOption.anime_name_jp);

      setTimeout(() => {
         inputRef?.current?.blur();
      }, 0);
   }, []);

   const handleBlur = useCallback(() => {
      setIsOpen(false);
   }, [selected]);

   const handleKeywordClick = (index: number) => {
      console.log(index);
      // if (keywords[index].revealed) return;
      // const updatedKeywords: Keyword[] = [...keywords]; // Create a copy of the array
      // updatedKeywords[index].revealed = true; // Modify the desired property

      // setAnimeKeywords(updatedKeywords); // Update the state with the modified copy
   };

   return (
      <div>
         <div className="flex flex-col w-full shadow-card rounded-lg mb-10 max-sm:mb-5 sticky z-49 top-[64px] left-0 z-10">
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
                                       (option: AnimeOption, index: number) => {
                                          const isSelected =
                                             selected?.anime_name_jp ===
                                             option.anime_name_jp;
                                          return (
                                             <CommandItem
                                                key={
                                                   option.anime_name_jp + index
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
                                                   !isSelected ? 'pl-8' : null,
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
               ? keywords.map(({ keyword, revealed }: Keyword, index) => {
                    return (
                       <button
                          key={index}
                          title={!revealed ? `Click to reveal` : ''}
                          onClick={() => handleKeywordClick(index)}
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
