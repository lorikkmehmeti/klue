import { SupabaseClient } from '@supabase/supabase-js';

export async function getAnimes(client: SupabaseClient, searchQuery: string) {
   return client
      .from('anime')
      .select('anime_name_jp, anime_name_en, anime_description, release_date')
      .or(
         `anime_name_jp.ilike.%${searchQuery}%,anime_name_en.ilike.%${searchQuery}%`
      )
      .limit(searchQuery.length > 0 ? 10 : 5);
}