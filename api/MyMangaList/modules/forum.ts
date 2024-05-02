import clientRequester from "../clientRequester.js";


export default class Forum extends clientRequester {
    
    constructor(client_id: string){
        
        super(client_id);

    }
    
    public async boards(...kwargs: any[]): Promise<any> {
        const data = await this.request("boards",  kwargs);
        return data;
    }

    public async topic_detail(id: string, ...kwargs: any[]): Promise<any> {
        const data  = await this.request("topic", kwargs, null, id);

        return data;
    }

    public async topics(...kwargs: any[]): Promise<any> {
        const data = await this.request("topics",  kwargs);
        return data;
    }



   



}