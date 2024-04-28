import clientRequester from "../clientRequester.js";


export default class Anime extends clientRequester {
    
    constructor(client_id: string){
        
        super(client_id);

    }
    
    public async all(q: string, ...kwargs: any[]): Promise<any> {
        const data = await this.request("anime",  kwargs.concat([`q=${q}`]));
        return data;
    }

    public async details(id: string, ...kwargs: any[]): Promise<any> {
        
        const data = await this.request("anime", kwargs, null, id);

        return data;
    }

    public async ranking(...kwargs: any[]): Promise<any> {
        
        const data = await this.request("anime", kwargs, "ranking");

        return data;
    }

    public async season(year: number, season: string, ...kwargs: any[]): Promise<any> {
        const data = await this.request("anime", kwargs, `season/${year}/${season}`)

        return data;
    }

    public async suggestions(...kwargs: any[]): Promise<any> {
        const data = await this.request("anime", kwargs, `suggestions`);

        return data;
    }



}