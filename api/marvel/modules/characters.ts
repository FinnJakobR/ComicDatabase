import BaseModule from "./base-module.js";

export default class Characters extends BaseModule {
    
    constructor(requester:any){
        super(requester);
    }

    public async all(...kwargs:any[]){
        var data = await this.requestObj.request("characters", kwargs);
        
        return data;
    }

    public async get(identifier:string , ...kwargs:any[]){
        var data = await this.requestObj.request("characters", kwargs, null, identifier);
        
        return data; 
    }

    public async comics(identifier:string , ...kwargs:any[]){
        var data = await this.requestObj.request("characters", kwargs, "comics", identifier);
        
        return data; 
    } 

    public async events(identifier:string , ...kwargs:any[]){
        var data = await this.requestObj.request("characters", kwargs, "events", identifier);
        
        return data; 
    }

    public async series(identifier:string , ...kwargs:any[]){
        var data = await this.requestObj.request("characters", kwargs, "series", identifier);
        
        return data; 
    }

    public async stories(identifier:string , ...kwargs:any[]){
        var data = await this.requestObj.request("characters", kwargs, "stories", identifier);
        
        return data; 
    
    }

}