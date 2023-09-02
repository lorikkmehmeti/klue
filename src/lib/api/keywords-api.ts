import { SupabaseClient } from '@supabase/supabase-js';
import { TABLES } from '@/lib/constants/table.ts';

export function getKeywords(client: SupabaseClient, id: string) {
   if (!id) throw new Error('Parameter id is missing');
   return client.from(TABLES.KEYWORD_TABLE).select('*').eq('anime_id', id);
}
