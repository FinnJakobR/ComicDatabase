import clientRequester from "../clientRequester.js";
import MangaList, { MangaDetail, MangaRankingList } from "../interfaces/manga_interface.js";


export default class Manga extends clientRequester {
    
    constructor(client_id: string){
        
        super(client_id);

    }
    
    public async all(q: string, ...kwargs: any[]): Promise<MangaList> {
        const data = await this.request("manga",  kwargs.concat([`q=${q}&fields=id,title,start_date,rank,popularity,source,desc`])) as MangaList;
        return data;
    }

    public async details(id: string, ...kwargs: any[]): Promise<MangaDetail> {
        
        const data = await this.request("manga", kwargs, null, id) as  MangaDetail;

        return data;
    }

    public async ranking(...kwargs: any[]): Promise<MangaRankingList> {
        
        const data = await this.request("manga", kwargs, "ranking") as MangaRankingList;

        return data;
    }

}