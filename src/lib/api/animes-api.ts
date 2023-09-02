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

export async function getAnime(client: SupabaseClient, id: string) {
   return client
      .from(TABLES.ANIME_TABLE)
      .select('id, anime_name_jp, anime_name_en, anime_description, release_date')
      .eq('id', id);
}

export async function getRandomAnime(client: SupabaseClient, id: string) {
   return client
      .from(TABLES.ANIME_TABLE)
      .select('anime_name_jp, anime_name_en, anime_description, release_date')
      .eq('id', id);
}
