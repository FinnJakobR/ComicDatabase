import Request from "./requester.js";

export default class Base {
     Requester : Request;

    constructor(PUBLIC_KEY:string, PRIVATE_KEY:string){
        this.Requester = new Request(PUBLIC_KEY, PRIVATE_KEY)
    }


}