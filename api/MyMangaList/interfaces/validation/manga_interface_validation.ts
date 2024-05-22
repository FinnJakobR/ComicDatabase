import { number, z } from "zod";
import MangaList, { MangaDetail, MangaListItem } from "../manga_interface.js";
import { zod_enum_manga_media, zod_enum_nfsw, zod_enum_status, zod_schema_anime_alternative_title, zod_schema_anime_genre, zod_schema_anime_paging, zod_schema_anime_picture, zod_schema_manga_person, zod_schema_manga_recommendations, zod_schema_manga_serialization, zod_schema_related_anime, zod_schema_related_manga } from "./util_validation.js";

export const zod_schema_manga_list_item: z.ZodType<MangaListItem> = z.object({
    
    node: z.object({
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
        media_type: zod_enum_manga_media,
        status: zod_enum_status,
        my_list_status: z.null(),
        num_volumes: z.number(),
        num_chapters: z.number(),
        authors: z.array(zod_schema_manga_person),
    })
}) 

export const zod_schema_manga_list: z.ZodType<MangaList> = z.object({
    data: z.array(zod_schema_manga_list_item),
    paging: zod_schema_anime_paging
})

export const zod_schema_manga_detail: z.ZodType<MangaDetail> = z.object({
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
    media_type: zod_enum_manga_media,
    status: zod_enum_status,
    my_list_status: z.null(),
    num_volumes: z.number(),
    num_chapters: z.number(),
    authors: z.array(zod_schema_manga_person),
    pictures: z.array(zod_schema_anime_picture),
    background: z.string().optional(),
    related_anime: z.array(zod_schema_related_anime),
    related_manga: z.array(zod_schema_related_manga),
    recommendations: z.array(zod_schema_manga_recommendations),
    serialization: z.array(zod_schema_manga_serialization)
})

