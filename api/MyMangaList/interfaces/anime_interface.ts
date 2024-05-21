import AnimeListAlternativeTitleInterface from "./utils/alternative_title_interface";
import AnimeListBroadcastInterface from "./utils/broadcast_interface";
import AnimeListGenreInterface from "./utils/genre_iterface";
import AnimeListPagingInterface from "./utils/paging_interface";
import AnimeListPictureInterface from "./utils/picture_interface";
import { AnimeListRankingInterface } from "./utils/ranking_interface";
import AnimeListStartSeasonInterface from "./utils/start_season_interface";
import AnimeListStatisticsInterface from "./utils/statistics_interface";
import { ANIME_MEDIA, NSFW, RATING, RELATION, SOURCE, STATUS } from "./utils/types";

export default interface AnimeList {
    data: AnimeListItem[],
    paging: AnimeListPagingInterface
}

export interface AnimeRankingList {
    data: AnimeRankingItem[],
    paging: AnimeListPagingInterface,

}

export interface AnimeRankingItem {
    node: AnimeListItem,
    ranking: AnimeListRankingInterface
}



export interface AnimeListItem {
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
        media_type: ANIME_MEDIA,
        status: STATUS,
        my_list_status: null, //TODO Wenn du einen Acess Token hättest
        num_episodes: number,
        start_season: AnimeListStartSeasonInterface,
        broadcast?: AnimeListBroadcastInterface,
        source?: SOURCE,
        average_episode_duration?: number,
        rating?: RATING
        studios: AnimeListGenreInterface
    }

}

export interface RelatedAnime {
    node: AnimeDetail,
    relation_type: RELATION,
    relation_type_formatted: string
}

export interface  AnimeRecommendation {
    node: AnimeDetail,
    num_recommendations: number,
}

export interface AnimeDetail {
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
    media_type: ANIME_MEDIA,
    status: STATUS,
    my_list_status: null, //TODO Wenn du einen Acess Token hättest
    num_episodes: number,
    start_season: AnimeListStartSeasonInterface,
    broadcast?: AnimeListBroadcastInterface,
    source?: SOURCE,
    average_episode_duration?: number,
    rating?: RATING
    studios: AnimeListGenreInterface,
    pictures: AnimeListPictureInterface[],
    background?: string, 
    related_anime: RelatedAnime[],
    related_manga: any,
    recommendations?: AnimeRecommendation[],
    statistics?: AnimeListStatisticsInterface


}