import Endpoint from "./endpoint.js";
import fetch from 'node-fetch';
import * as crypto from "crypto";
import MarvelException from "./error.js";

function generateMD5(inputString:string) {
    const hash = crypto.createHash('md5').update(inputString, 'utf-8').digest('hex');
    return hash;
  }

export default class Request extends Endpoint {
    private PUBLIC_KEY: string;
    private PRIVATE_KEY: string;
    private requestObj: any;
    
    constructor(PUBLIC_KEY: string, PRIVATE_KEY: string){
        super();
        this.PRIVATE_KEY = PRIVATE_KEY;
        this.PUBLIC_KEY = PUBLIC_KEY;
        this.requestObj = null;
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

        var query = this.get_query_with_authentication_params(payload);

        this.requestObj = await fetch(url + "?" + query);

        if(raw){
            return this.requestObj;
        }

        var json_data = await this.requestObj.json();
        this.check_for_exceptions(this.requestObj, json_data);
        return json_data;

    }

    private get_query_with_authentication_params(payload: any){

        var timestamp = Math.floor(Date.now() / 1000);

        var input_string = String(timestamp) + this.PRIVATE_KEY + this.PUBLIC_KEY;

        var hash = generateMD5(input_string);

        payload = new URLSearchParams();
        payload.append("ts", timestamp);
        payload.append("apikey", this.PUBLIC_KEY)
        payload.append("hash", hash);

        return payload;
    }

    private check_for_exceptions(response: Response, json_data: any){
        var status_code = response.status;

        if(status_code == 200) return;

        if(json_data["code"]){
            if(json_data["status"]){
                var error_message = `${json_data["code"]} ${json_data["status"]}`;
                throw new MarvelException(error_message);
            }

            else if(json_data["message"]){
                var error_message = `${json_data["code"]} ${json_data["message"]}`;
                throw new MarvelException(error_message);
            }

            else {
                var error_message = `Something went horribly wrong. ${json_data}`;
                throw new MarvelException(error_message);
            }
        }
        
        else {
            var error_message = `Something went horribly wrong. ${json_data}`;
            throw new MarvelException(error_message);
        }
    }

}