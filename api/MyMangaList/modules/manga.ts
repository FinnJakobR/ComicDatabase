import clientRequester from "../clientRequester.js";


export default class Manga extends clientRequester {
    
    constructor(client_id: string){
        
        super(client_id);

    }
    
    public async all(q: string, ...kwargs: any[]): Promise<any> {
        const data = await this.request("manga",  kwargs.concat([`q=${q}`]));
        return data;
    }

    public async details(id: string, ...kwargs: any[]): Promise<any> {
        
        const data = await this.request("manga", kwargs, null, id);

        return data;
    }

    public async ranking(...kwargs: any[]): Promise<any> {
        
        const data = await this.request("manga", kwargs, "ranking");

        return data;
    }

    public async user_manga(user_name: string, ...kwargs: any[]): Promise<any> {
        
        const data = await this.request("manga", kwargs, `${user_name}/mangalist`);

        return data;
    }

}