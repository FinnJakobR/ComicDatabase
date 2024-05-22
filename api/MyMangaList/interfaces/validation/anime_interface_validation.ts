import { number, z } from "zod";
import AnimeList, { AnimeDetail, AnimeListItem } from "../anime_interface.js";
import  { zod_schema_anime_picture, zod_enum_anime_media, zod_enum_anime_source, zod_enum_nfsw, zod_enum_rating, zod_enum_status, zod_schema_anime_alternative_title, zod_schema_anime_broadcast, zod_schema_anime_genre, zod_schema_anime_paging, zod_schema_anime_start_season, zod_schema_related_anime, zod_schema_anime_recommendations, zod_schema_anime_statistics, zod_schema_related_manga } from "./util_validation.js";

export const zod_schema_anime_list_item: z.ZodType<AnimeListItem> = z.object({

    node : z.object({
        id: z.number(),
        title: z.string(),
        main_picture: zod_schema_anime_picture.optional(),
        alternative_titles: zod_schema_anime_alternative_title.optional(),
        start_date: z.string().optional(),
        end_date: z.string().optional(),
        synopsis: z.string().optional(),
        mean: z.number().optional(),
        rank: z.number().optional(),
        popularity: z.number().optional(),
        num_list_users: z.number(),
        num_scoring_users: z.number(),
        nsfw: zod_enum_nfsw.optional(),
        genre: z.array(zod_schema_anime_genre),
        created_at: z.string(),
        updated_at: z.string(),
        media_type: zod_enum_anime_media,
        status: zod_enum_status,
        my_list_status: z.null(),
        num_episodes: z.number().nonnegative(),
        start_season: zod_schema_anime_start_season,
        broadcast: zod_schema_anime_broadcast.optional(),
        source: zod_enum_anime_source.optional(),
        average_episode_duration: z.number().nonnegative().optional(),
        rating: zod_enum_rating.optional(),
        studios: zod_schema_anime_genre
    })
        
})


export const zod_schema_anime_list : z.ZodType<AnimeList> = z.object({
    data: z.array(
        zod_schema_anime_list_item
    ),
    paging: zod_schema_anime_paging
})


export const zod_schema_anime_detail: z.ZodType<AnimeDetail> = z.object({
    id: z.number(),
    title: z.string(),
    main_picture: zod_schema_anime_picture.optional(),
    alternative_titles: zod_schema_anime_alternative_title.optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    synopsis: z.string().optional(),
    mean: z.number().optional(),
    rank: z.number().optional(),
    popularity: z.number().optional(),
    num_list_users: z.number(),
    num_scoring_users: z.number(),
    nsfw: zod_enum_nfsw.optional(),
    genre: z.array(zod_schema_anime_genre),
    created_at: z.string(),
    updated_at: z.string(),
    media_type: zod_enum_anime_media,
    status: zod_enum_status,
    my_list_status: z.null(),
    num_episodes: z.number().nonnegative(),
    start_season: zod_schema_anime_start_season,
    broadcast: zod_schema_anime_broadcast.optional(),
    source: zod_enum_anime_source.optional(),
    average_episode_duration: z.number().nonnegative().optional(),
    rating: zod_enum_rating.optional(),
    studios: zod_schema_anime_genre,
    pictures: z.array(zod_schema_anime_picture),
    background: z.string().optional(),
    related_anime: z.array(zod_schema_related_anime),
    related_manga: z.array(zod_schema_related_manga),
    recommendations: z.array(zod_schema_anime_recommendations).optional(),
    statistics: zod_schema_anime_statistics.optional()
})

