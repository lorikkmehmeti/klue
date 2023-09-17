export interface Anime {
   id: string;
   anime_name_jp: string;
   anime_name_en: string;
   anime_description: string;
   created_at: string;
   updated_at: string;
   release_date: string;
}

export interface AnimeOption {
   anime_name_jp: string;
   anime_name_en: string;
   anime_description: string;
   release_date: string;
}

export interface StorageAttempt extends AnimeOption {
   is_correct: boolean;
}
