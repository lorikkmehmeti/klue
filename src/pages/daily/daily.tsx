import React, { useEffect, useState } from 'react';
import { Keyword } from '@/lib/models';
import { useSupabase } from '@/lib/hooks/useSupabase.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';

export function DailyPage() {
   const { supabase } = useSupabase();
   const [keywords, setAnimeKeywords] = useState<Keyword[]>([]);
   const [loading, setIsLoading] = useState<boolean>(false);

   async function getAnimes() {
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

      console.log(randomAnimeQuery);

      const randomAnimeId: string = randomAnimeQuery.data[0]?.id;

      console.log('8dc125eb-e46f-40f1-8755-ed6c23786d3e' === randomAnimeId);

      if (randomAnimeId) {
         console.log('a po hin qitu');
         const { data, error } = await supabase
            .from('keywords')
            .select('*')
            .eq('anime_id', randomAnimeId);

         if (error) {
            console.error(
               'Error fetching keywords for random anime:',
               error.message
            );
            return;
         }

         console.log(data);

         setAnimeKeywords(data);
      }
   }

   useEffect(() => {
      // if (!debouncedValue) return
      void getAnimes()
         .then(() => {
            setIsLoading(false);
         })
         .catch(() => {
            setIsLoading(false);
         });
   }, []);
   return (
      <React.Fragment>
         {loading &&
            [1, 2, 3, 4, 5, 6].map(() => {
               return <Skeleton className="w-full h-[32px] mb-3 rounded-md" />;
            })}
         <div className="pt-2">
            {!loading &&
               keywords.length &&
               keywords.map(({ keyword }, index) => {
                  return (
                     <button
                        key={index}
                        className="w-full text-sm bg-neutral-200/50 backdrop-blur px-2 py-0.5 rounded-md flex items-center transition-colors mb-2"
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
               })}
         </div>
      </React.Fragment>
   );
}
