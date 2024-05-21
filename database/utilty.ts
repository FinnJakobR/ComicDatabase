import { IssueListItem } from "comic-vine-sdk/lib/cjs/resources/issue/types";
import moment from 'moment';
import MangaList from "../api/MyMangaList/interfaces/manga_interface";
import { Comic } from "../config/comic_def";


export function marvel_to_sql_comic(marvel_obj :any): Comic[]{
    var res = marvel_obj["data"]["results"];

    var comic_res:Comic[]  = [];

    for(var comic of res){

        comic.thumbnail.path = comic.thumbnail.path.replace("i.annihil.us", "cdn.marvel.com");

        comic.thumbnail.path+= "/clean.jpg"

        if(comic.textObjects[0]?.text){
            comic.textObjects[0].text = comic.textObjects[0]!.text.replace("\n", "");
            comic.textObjects[0].text = comic.textObjects[0]!.text.replace(/'/g, "''")
        }else {
            comic.textObjects.push({text: "NO_DESC"});
        }


        var comic_row: Comic = {type: "marvel", id: "", image: comic.thumbnail.path, release_date: moment(comic.dates[0].date).format('YYYY-MM-DD'), api_id: comic.id, name: comic.title, description: comic.textObjects[0]?.text}

        comic_res.push(comic_row);

    }

    return comic_res;
}

export function manga_to_sql_comic(mangaList: MangaList): Comic[]{
    
    var mangas : Comic[] = [];


    for(var manga of mangaList.data){
        var node = manga["node"];

        var comic_row : Comic = {type: "manga", id: "", api_id: node["id"], image: node["main_picture"] ? node["main_picture"]["medium"] : "", release_date: node["start_date"] ?? "", description: "NO_DESC", name: node["title"] }
        mangas.push(comic_row);
    }

    return mangas;


}

export function dc_to_sql_comic(dc_obj: IssueListItem[]): Comic[]{
    
    var dc_comics: Comic[] = [];

    for (var comic of dc_obj) {
        var comic_row: Comic = {type: "dc", id: "", api_id: comic["id"], image: comic.image.originalUrl, release_date: moment(comic.dateAdded).format('YYYY-MM-DD'), description: comic.description ?? undefined, name: comic.name ?? ""}
        dc_comics.push(comic_row);
    }

    return dc_comics;
}