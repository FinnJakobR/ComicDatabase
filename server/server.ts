import express from "express";
import path from "path";

export default class RestApi {
    private server_instance: any;
    private port: number; 
    
    constructor(port: number){
        this.server_instance = express();
        
        this.port = port;
        var __dirname = path.resolve();
        
        this.server_instance.use("/",(req:any, res:any)=>{
            res.sendFile(__dirname + "/server/public/docs.html")
        })

        this.server_instance.listen(this.port, ()=>{
            console.log("Server started at Port " +  this.port + " !");
        })
    }


}