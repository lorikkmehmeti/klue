import { useSupabase } from '@/lib/hooks/use-supabase.ts';
import { useQuery } from '@tanstack/react-query';
import { getKeywords } from '@/lib/api/get-keywords.ts';

export function useKeywords(id: string) {
   const client = useSupabase();
   const key = ['keywords', id];

   return useQuery(key, async () => {
      return getKeywords(client, id).then((result) => result.data);
   });
}