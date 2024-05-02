import Anime from "./modules/anime.js";
import Forum from "./modules/forum.js";
import Manga from "./modules/manga.js";

export default class MangaAnime {
    
    client_id:string;
    client_secret:string;
    anime: Anime; 
    forum: Forum;
    manga: Manga;


    constructor(client_id: string, client_secret:string){
        
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.anime = new Anime(this.client_id);
        this.forum = new Forum(this.client_id);
        this.manga = new Manga(this.client_id);
    }
}