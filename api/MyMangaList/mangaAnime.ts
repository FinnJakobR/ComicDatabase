import Anime from "./modules/anime.js";

export default class MangaAnime {
    
    client_id:string;
    client_secret:string;
    anime: Anime; 


    constructor(client_id: string, client_secret:string){
        
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.anime = new Anime(this.client_id);

    }
}