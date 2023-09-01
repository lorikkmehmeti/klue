import { useQuery } from '@tanstack/react-query';
import { getAnimes } from '@/lib/api/get-animes.ts';
import { useSupabase } from '@/lib/hooks/use-supabase.ts';

export function useAnimes(searchQuery: string) {
   const client = useSupabase();
   const key = ['animes', searchQuery]; // Adjust the key as needed

   return useQuery(key, async () => {
      return getAnimes(client, searchQuery).then((result) => result?.data);
   });
}