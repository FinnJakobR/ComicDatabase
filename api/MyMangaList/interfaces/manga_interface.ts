import AnimeListAlternativeTitleInterface from "./utils/alternative_title_interface";
import AnimeListGenreInterface from "./utils/genre_iterface";
import AnimeListPagingInterface from "./utils/paging_interface";
import AnimeListPersonInterface from "./utils/person_interface";
import AnimeListPictureInterface from "./utils/picture_interface";
import { MANGA_MEDIA, NSFW, STATUS } from "./utils/types";

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