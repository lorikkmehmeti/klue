import { useQuery } from '@tanstack/react-query';
import {
   getAnimeByColumn,
   getAnimesBySearch,
   getDailyWord,
} from '@/lib/api/animes-api.ts';
import { useSupabase } from '@/lib/hooks/use-supabase.ts';
import { DailyRecord } from '@/lib/models/daily.ts';
import { Anime } from '@/lib/models';

export function useAnimes(searchQuery: string) {
   const client = useSupabase();
   const key = ['animes', searchQuery];

   return useQuery(key, async () => {
      return getAnimesBySearch(
         client,
         searchQuery,
         searchQuery.length > 0 ? 10 : 5
      ).then((result) => result?.data);
   });
}

export function useDailyAnime() {
   const client = useSupabase();
   const key = ['anime', 'anime-daily-word'];

   return useQuery(key, async () => {
      return getDailyWord(client).then((result) => result.data as DailyRecord);
   });
}

export function useCheckAnswer({
   column,
   value,
}: {
   column: string;
   value: string | undefined;
}) {
   const client = useSupabase();
   const key = ['check-answer', 'check-answer'];

   return useQuery({
      queryKey: key,
      queryFn: async () => {
         return getAnimeByColumn(client, { column, value }).then(
            (result) => result?.data as Anime
         );
      },
      enabled: !!value,
   });
}
