import { RelatedAnime } from "./anime_interface";
import AnimeListAlternativeTitleInterface from "./utils/alternative_title_interface";
import AnimeListGenreInterface from "./utils/genre_iterface";
import AnimeListMagazine from "./utils/magazine_interface";
import AnimeListPagingInterface from "./utils/paging_interface";
import AnimeListPersonInterface from "./utils/person_interface";
import AnimeListPictureInterface from "./utils/picture_interface";
import { AnimeListRankingInterface } from "./utils/ranking_interface";
import { MANGA_MEDIA, NSFW, RELATION, STATUS } from "./utils/types";

export default interface MangaList {
    data: MangaListItem[],
    paging: AnimeListPagingInterface
}

export interface MangaListItem {
    node : {
        id: number;
        title: string;
        main_picture?: AnimeListPictureInterface,
        alternative_titles?: AnimeListAlternativeTitleInterface
        start_date?: string,
        end_date?: string,
        synopsis?: string,
        mean?: number,
        rank?: number,
        popularity?: number, 
        num_list_users: number,
        num_scoring_users: number,
        nsfw?: NSFW,
        genre: AnimeListGenreInterface[],
        created_at: string,
        updated_at: string,
        media_type: MANGA_MEDIA,
        status: STATUS,
        my_list_status: null, //TODO Wenn du einen Acess Token hättest
        num_volumes: number,
        num_chapters: number,
        authors: AnimeListPersonInterface[]
       
    }
}

export interface RelatedManga {
    node: MangaDetail,
    relation_type: RELATION,
    realtation_type_formatted: string
}

export interface RecommendationsManga {
    node: MangaDetail,
    num_recommendations: number
}

export interface SerializationManga {
    node: AnimeListMagazine,
    role: string,
}

export interface MangaRankingList {
    data: MangaRankingListItem[],
    paging: AnimeListPagingInterface
}


export interface MangaRankingListItem {
    node: MangaListItem,
    ranking: AnimeListRankingInterface
}

export interface MangaDetail {
    id: number,
    title: string,
    main_picture?: AnimeListPictureInterface,
    alternative_titles?: AnimeListAlternativeTitleInterface,
    start_date?: string,
    end_date?: string,
    synopsis?: string,
    mean?: number,
    rank?: number,
    popularity?: number,
    num_list_users?: number,
    nsfw?: NSFW,
    genres?: AnimeListGenreInterface,
    created_at?: string,
    updated_at?:string,
    media_type?: MANGA_MEDIA,
    status?: STATUS,
    my_list_status?: null,
    num_volumes: number,
    num_chapters: number,
    authors: AnimeListPersonInterface[],
    pictures: AnimeListPictureInterface[],
    background?: string,
    related_anime: RelatedAnime[],
    related_manga: RelatedManga[],
    recommendations: RecommendationsManga[],
    serialization: SerializationManga[]
}