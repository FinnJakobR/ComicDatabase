import express from "express";
import path from "path";
import dotenv from "dotenv";
import Api from "../api/api.js";
import { json } from "stream/consumers";
import { createConnection } from 'mysql2';
import ComicDatabase from "../database/comic_database.js";
import { dc_to_sql_comic, manga_to_sql_comic, marvel_to_sql_comic } from "../database/utilty.js";
import { writeFileSync } from "fs";
import MangaList from "../api/MyMangaList/interfaces/manga_interface.js";
import { Comic } from "../config/comic_def.js";

const PORT = 8000;

dotenv.config();

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const DC_API_KEY = process.env.DC_API_KEY;
const DATABASE_USERNAME = process.env.DATABASE_USER_NAME;
const DATABASE_PASSWORT = process.env.DATABASE_PASSWORT;
    
async function main(){


    var comic_database = new ComicDatabase(DATABASE_USERNAME!, DATABASE_PASSWORT!);

    await comic_database.createConnection();

    await comic_database.createComicTable();


    var api = new Api(PUBLIC_KEY!, PRIVATE_KEY!,CLIENT_ID!,CLIENT_SECRET!, DC_API_KEY!);

    var server = express();

    
    server.get("/:type/search",async(req:any, res: any)=>{
        
        var type = req.params.type;
        var query = req.query.q;
        var force = req.headers.force;

    
        if(!query){
            res.statusMessage = "Cannot read Search Query!"
            res.status(404).end();
            return;
        }

        if(!force){
            var res_from_database = await comic_database.searchForComicsByNameAndType(query, type);

            if(res_from_database.length > 0){
                res.status(200).send(JSON.stringify(res_from_database))
                return;
            }
        }

    
        switch(type){
            
            case "manga":
                
                var mangaList = await api.mangaAnime.manga.all(query)
                
                var converted_manga: Comic[] = manga_to_sql_comic(mangaList);

                for (var manga_data of converted_manga){
                    await comic_database.addComic(manga_data);
                }

                res.status(200).send(JSON.stringify(converted_manga))
                
                break;
            
            case "marvel":
                var result = await api.marvel.comics.all(["titleStartsWith", query,],["limit", 100]);
    
                if(result["data"]["results"].length == 0){
                    res.statusMessage = "Marvel Comic Name not Found!"
                    res.status(404).end(); 
                    break;
                }

                var converted_data =marvel_to_sql_comic(result);
    
                res.status(200).send(JSON.stringify(converted_data));    

                for (var marvel_data of converted_data){
                    await comic_database.addComic(marvel_data);
                }
                
                break;
            
            case "dc":
                var dc_res = await api.dc.search_comic(query);
    
                if(dc_res.length == 0){
                    res.statusMessage = "DC Comic Name not Found!"
                    res.status(404).end(); 
                    break;
                }

                var converted_dc_data = dc_to_sql_comic(dc_res);

                res.status(200).send(JSON.stringify(converted_dc_data));

                for (var dc_data of converted_dc_data){
                    await comic_database.addComic(dc_data);
                }

                break;
            
            default: 
                
                res.statusMessage = "Current Type not Found!"
                res.status(404).end()
                break;
        }
    })
    
    
    
    server.listen(PORT, ()=>{
        console.log("Server sucessfull started!");
    })
    
}

main()