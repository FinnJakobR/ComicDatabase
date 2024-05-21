import clientRequester from "../clientRequester.js";
import AnimeList, { AnimeDetail, AnimeRankingList } from "../interfaces/anime_interface.js";


export default class Anime extends clientRequester {
    
    constructor(client_id: string){
        
        super(client_id);

    }
    
    public async all(q: string, ...kwargs: any[]): Promise<AnimeList> {
        const data = await this.request("anime",  kwargs.concat([`q=${q}`])) as AnimeList;
        return data;
    }

    public async details(id: string, ...kwargs: any[]): Promise<AnimeDetail> {
        
        const data = await this.request("anime", kwargs, null, id) as AnimeDetail;

        return data;
    }

    public async ranking(...kwargs: any[]): Promise<AnimeRankingList> {
        
        const data = await this.request("anime", kwargs, "ranking") as AnimeRankingList;

        return data;
    }

    public async season(year: number, season: string, ...kwargs: any[]): Promise<AnimeList> {
        const data = await this.request("anime", kwargs, `season/${year}/${season}`) as AnimeList

        return data;
    }

    public async suggestions(...kwargs: any[]): Promise<AnimeList> {
        const data = await this.request("anime", kwargs, `suggestions`) as AnimeList;

        return data;
    }



}