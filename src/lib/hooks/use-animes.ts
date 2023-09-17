import { useQuery } from '@tanstack/react-query';
import {
   getAnimeByColumn,
   getAnimesBySearch,
   getDailyWord,
   getRandomAnimes,
} from '@/lib/api/animes-api.ts';
import { useSupabase } from '@/lib/hooks/use-supabase.ts';
import { DailyRecord } from '@/lib/models/daily.ts';
import { Anime } from '@/lib/models';

export function useAnimes(searchQuery: string) {
   const client = useSupabase();
   const key = ['animes', searchQuery];

   const length = searchQuery.length > 0 ? 10 : 5;

   return useQuery(key, async () => {
      return getAnimesBySearch(client, searchQuery, length).then(
         (result) => result?.data
      );
   });
}

export function useRandomAnimes(searchQuery: string) {
   const client = useSupabase();
   const key = ['random-animes', searchQuery];

   const length = searchQuery.length > 0 ? 10 : 5;

   return useQuery({
      queryKey: key,
      queryFn: async () => {
         return getRandomAnimes(client, searchQuery, length).then(
            (result) => result.data as Anime
         );
      },
   });
}

export function useDailyAnime() {
   const client = useSupabase();
   const key = ['anime', 'anime-daily-word'];

   return useQuery(key, async () => {
      return getDailyWord(client).then((result) => result.data as DailyRecord);
   });
}

export function useAnime(id: string, condition = true) {
   const client = useSupabase();
   const key = ['single-anime', id, condition];

   return useQuery({
      queryKey: key,
      queryFn: async () => {
         return getAnimeByColumn(client, { column: 'id', value: id }).then(
            (result) => result.data as Anime
         );
      },
      enabled: condition,
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
