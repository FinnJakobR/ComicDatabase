
class URL_ENDPOINTS extends Map<string,string>{
    
    constructor(){
        super();
    }

}



export default class Endpoint {
    private base_url = "https://api.myanimelist.net/v2/";
    private endpoints: URL_ENDPOINTS;

    private URLS = [
      "anime",
      "users",
      "forum",
      "manga"
    ]
    
    constructor(){
        this.endpoints = this.get_endpoints();    
    }

    get_endpoints(): URL_ENDPOINTS  {
        
        var endpoints: URL_ENDPOINTS = new URL_ENDPOINTS();
        for (let url = 0; url < this.URLS.length; url++) {
            endpoints.set(this.URLS[url], this.base_url + this.URLS[url])
        }

        return endpoints;

     }

     get_endpoint(name:string): string {
        
        return this.endpoints.get(name)!

     }

    }