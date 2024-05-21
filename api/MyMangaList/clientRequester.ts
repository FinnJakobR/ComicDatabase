import Endpoint from "./endpoint.js";
import MangaAnimeException from "./error.js";


export default class clientRequester extends Endpoint{
    
    private client_id:string;

    constructor(client_id:string){
        
        super();

        this.client_id = client_id;

    }

    async request(endpoint_name: string, payload:any = null, sub_endpoint: any = null, identifier: any = null, raw: any = null ){
        
        if(payload == null){
            payload = {};
        }

        var url: string = this.get_endpoint(endpoint_name);
        
        if(identifier != null){
            url+= "/" + String(identifier);
        }

        if(sub_endpoint != null) {
            url += "/" + String(sub_endpoint);
        }

        console.log(this.client_id);

        var headers = {
            "X-MAL-CLIENT-ID" : this.client_id,
        }

        var res = await fetch(url + "?" + payload, { method: 'GET', headers: headers})

        if(raw){
            return res;
        }

          var json_data = (await res.json());

        this.check_for_exceptions(res);

        return json_data;

    }

    private check_for_exceptions(response: Response){
        var status_code = response.status;

        if(status_code == 200) return;

        throw new MangaAnimeException(`${status_code}: ${response.statusText}`);

    }
}