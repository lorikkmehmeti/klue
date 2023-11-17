import { useSupabase } from '@/lib/hooks/use-supabase.ts';
import { useQuery } from '@tanstack/react-query';
import { getKeywords } from '@/lib/api/keywords-api.ts';

export function useKeywords(id: string) {
   const client = useSupabase();
   const key = ['keywords', id];

   return useQuery({
      queryKey: key,
      queryFn: async () => {
         return getKeywords(client, id).then((result) => result.data);
      },
      enabled: !!id,
   });
}
