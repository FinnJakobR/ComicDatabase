import DC from "./dc/dc.js";
import marvel from "./marvel/marvel.js";
import MangaAnime from "./MyMangaList/mangaAnime.js";

export default class Api {
    
    marvel: marvel;
    mangaAnime: MangaAnime;
    dc: DC;

    
    constructor(PUBLIC_KEY: string, PRIVATE_KEY: string, CLIENT_ID: string, CLIENT_SECRET:string, DC_API_KEY: string){
        
        this.marvel = new marvel(PUBLIC_KEY, PRIVATE_KEY);
        this.mangaAnime = new MangaAnime(CLIENT_ID, CLIENT_SECRET);
        this.dc = new DC(DC_API_KEY)
    }


}