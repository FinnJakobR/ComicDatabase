import { number, object, z } from "zod";
import AnimeListPictureInterface from "../utils/picture_interface.js";
import AnimeListAlternativeTitleInterface from "../utils/alternative_title_interface.js";
import { ANIME_MEDIA, MANGA_MEDIA, NSFW, RATING, RELATION, SOURCE, STATUS } from "../utils/types.js";
import AnimeListGenreInterface from "../utils/genre_iterface.js";
import AnimeListStartSeasonInterface from "../utils/start_season_interface.js";
import AnimeListBroadcastInterface from "../utils/broadcast_interface.js";
import AnimeListPagingInterface from "../utils/paging_interface.js";
import { AnimeRecommendation, RelatedAnime } from "../anime_interface.js";
import { zod_schema_anime_detail } from "./anime_interface_validation.js";
import AnimeListStatisticsInterface, { AnimeListStatisticsStatusInterface } from "../utils/statistics_interface.js";
import AnimeListPersonInterface from "../utils/person_interface.js";
import { RecommendationsManga, RelatedManga, SerializationManga } from "../manga_interface.js";
import { zod_schema_manga_detail } from "./manga_interface_validation.js";

export const zod_schema_anime_picture: z.ZodType<AnimeListPictureInterface> = z.object({
    large: z.string().optional(),
    medium: z.string()
})

export const zod_schema_anime_alternative_title: z.ZodType<AnimeListAlternativeTitleInterface> = z.object({
    synonyms: z.array(z.string()).optional(),
    en: z.string().optional(),
    ja: z.string().optional()
})

export const zod_enum_nfsw : z.ZodType<NSFW> = z.enum(["white", "gray", "black"]);

export const zod_schema_anime_genre: z.ZodType<AnimeListGenreInterface> = z.object({
    id: z.number(),
    name: z.string()
})

export const zod_enum_anime_media: z.ZodType<ANIME_MEDIA> = z.enum(["unknown","tv" ,"ova", "movie", "special", "ona", "music"])

export const zod_enum_status: z.ZodType<STATUS> = z.enum(["finished_airing", "currently_airing", "not_yet_aired"])

export const zod_schema_anime_start_season: z.ZodType<AnimeListStartSeasonInterface> = z.object({
    year: z.number().nonnegative(),
    season: z.enum(["winter", "spring", "summer", "fall"])
})

export const zod_schema_anime_broadcast: z.ZodType<AnimeListBroadcastInterface> = z.object({
    day_of_the_week: z.string(),
    start_time: z.string().optional()
})

export const zod_enum_anime_source: z.ZodType<SOURCE> = z.enum(["other", "original", "manga", "4_koma_manga", "novel", "light_novel", "visual_novel", "game", "card_game","book", "picture_book", "radio", "music"])

export const zod_enum_rating: z.ZodType<RATING> = z.enum(["g", "pg", "pg_13", "r", "r+", "rx"])

export const zod_schema_anime_paging: z.ZodType<AnimeListPagingInterface> = z.object({
    previous: z.string(),
    next: z.string()
})

export const zod_enum_relation: z.ZodType<RELATION> = z.enum(["sequel", "prequel", "alternative_setting", "alternative_version", "side_story", "parent_story", "summary", "full_story"])

export const zod_schema_related_anime: z.ZodType<RelatedAnime> = z.object({
    node: zod_schema_anime_detail,
    relation_type: zod_enum_relation,
    relation_type_formatted: z.string()
})

export const zod_schema_anime_recommendations: z.ZodType<AnimeRecommendation> = z.object({
    node: zod_schema_anime_detail, 
    num_recommendations: z.number().nonnegative()
})

export const zod_schema_anime_status: z.ZodType<AnimeListStatisticsStatusInterface> = z.object({
    watching: z.number().nonnegative(),
    complete: z.number().nonnegative(),
    on_hold: z.number().nonnegative(),
    dropped: z.number().nonnegative(),
    plan_to_watch: z.number().nonnegative()
})

export const zod_schema_anime_statistics: z.ZodType<AnimeListStatisticsInterface> = z.object({
    num_list_users: z.number(),
    status: zod_schema_anime_status
})

export const zod_enum_manga_media: z.ZodType<MANGA_MEDIA> = z.enum(["unknown", "manga", "one_shot", "doujinshi", "manhwa", "manhua", "oel"]);

export const zod_schema_manga_person: z.ZodType<AnimeListPersonInterface> = z.object({
    node: z.object({
        id: z.number(),
        first_name: z.string(),
        last_name: z.string()
    }),
    role: z.string()
})

export const zod_schema_related_manga: z.ZodType<RelatedManga> = z.object({
    node: zod_schema_manga_detail,
    relation_type: zod_enum_relation,
    relation_type_formatted: z.string(),
})

export const zod_schema_manga_recommendations: z.ZodType<RecommendationsManga> = z.object({
    node: zod_schema_manga_detail, 
    num_recommendations: z.number()
})

export const zod_schema_manga_serialization: z.ZodType<SerializationManga> = z.object({
    node: z.object({
        id: z.number(),
        name: z.string()
    }),
    role: z.string()
})