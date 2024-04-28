export default class BaseModule {
    requestObj: any;

    constructor(requester:any){
        this.requestObj = requester;
    }
}