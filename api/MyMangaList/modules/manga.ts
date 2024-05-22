import clientRequester from "../clientRequester.js";
import MangaList, { MangaDetail } from "../interfaces/manga_interface.js";
import { zod_schema_manga_list } from "../interfaces/validation/manga_interface_validation.js";


export default class Manga extends clientRequester {
    
    constructor(client_id: string){
        
        super(client_id);

    }
    
    public async all(q: string, ...kwargs: any[]): Promise<MangaList> {
        const data = await this.request("manga",  kwargs.concat([`q=${q}&fields=id,title,start_date,rank,popularity,source,desc`]));
        
        var x =  zod_schema_manga_list.parse(data)
        
        return x;
    }

    public async details(id: string, ...kwargs: any[]): Promise<MangaDetail> {
        
        const data = await this.request("manga", kwargs, null, id) as  MangaDetail;

        return data;
    }
}