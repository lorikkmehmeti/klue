import { useQuery } from '@tanstack/react-query';
import { getAnime, getAnimesBySearch } from '@/lib/api/animes-api.ts';
import { useSupabase } from '@/lib/hooks/use-supabase.ts';

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

export function useAnime(id: string) {
   const client = useSupabase();
   const key = ['anime', id];

   return useQuery(key, async () => {
      return getAnime(
          client,
          id
      ).then((result) => result?.data);
   });
}
