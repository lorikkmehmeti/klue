import { SupabaseClient } from '@supabase/supabase-js';
import { TABLES } from '@/lib/constants/table.ts';

export async function getAnimesBySearch(
   client: SupabaseClient,
   searchQuery: string,
   limit = 10
) {
   return client
      .from(TABLES.ANIME_TABLE)
      .select('anime_name_jp, anime_name_en, anime_description, release_date')
      .or(
         `anime_name_jp.ilike.%${searchQuery}%,anime_name_en.ilike.%${searchQuery}%`
      )
      .limit(limit);
}

// TODO rethink this
export async function getRandomAnimes(
   client: SupabaseClient,
   search_query: string,
   limit_count = 10
) {
   return client.rpc('select_random_anime', {
      limit_count,
      search_query,
   });
}

export async function getDailyWord(client: SupabaseClient) {
   const currentDate = new Date();
   const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
   };

   const date = new Intl.DateTimeFormat('en-US', options).format(currentDate);

   return client
      .from(TABLES.DAILY_TABLE)
      .select('*')
      .eq('display_date', date)
      .single();
}

export async function getRandomAnime(client: SupabaseClient, id: string) {
   return client
      .from(TABLES.ANIME_TABLE)
      .select('anime_name_jp, anime_name_en, anime_description, release_date')
      .eq('id', id);
}

export async function getAnimeByColumn(
   client: SupabaseClient,
   { column = 'id', value }: { column: string; value: string | undefined }
) {
   return client
      .from(TABLES.ANIME_TABLE)
      .select('*')
      .eq(column, value)
      .single();
}
