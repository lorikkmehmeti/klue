import React, { useEffect, useState } from 'react';
import { useSupabase } from '@/lib/providers/SupabaseClient.tsx';
import { useDebounce } from '@/lib/hooks';

export function DailyPage() {
   const inputRef = React.useRef<HTMLInputElement | null>(null);
   const { supabase } = useSupabase();
   // const [, setAnimes] = useState<Anime[]>([]);
   const [, setAnimeKeywords] = useState<any | any[]>([]);
   const [, setIsLoading] = useState<boolean>(false);
   const debouncedValue = useDebounce<string>(
      inputRef.current?.value || '',
      500
   );

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
   }, [debouncedValue]);
   return <div>daily</div>;
}
