import { SupabaseClient } from '@supabase/supabase-js';

export function getKeywords(client: SupabaseClient, id: string) {
   if (!id) throw new Error('Parameter id is missing');
   return client.from('keywords').select('*').eq('anime_id', id);
}