import { createConnection } from "mysql2/promise";
import COMIC_TABLE from "../config/comic_table_def.js";
import { Comic } from "../config/comic_def.js";


export default class ComicDatabase{
    private user: string;
    private passwort: string;
    private connection?: any;

    constructor(user: string, passwort: string){
        this.user = user;
        this.passwort = passwort;

        console.log(this.passwort)
    }

    async createConnection(){
        this.connection = await createConnection({
            host: 'localhost',
            user: this.user,
            password: this.passwort,
            database: "COMICS"
          });
          
          try {
            this.connection!.connect();
            console.log("SQL Sucessfull connected!")        
          } catch (error) {
            console.log(error);
          }
    

    }

    async createComicTable(){

        await this.connection.query(COMIC_TABLE);

        return;
    }

    async getComicById(id: string): Promise<Comic[]>{
      
      var res = await this.connection.query(
        `SELECT * FROM comic WHERE comic_id=${id}`
      );

      return res[0] as Comic[]

    }


    async addComic(comic: Comic){

      const values = [
        comic.api_id,
        comic.name,
        comic.description,
        comic.release_date,
        comic.type,
        comic.image
      ];

      var res  = await this.connection.execute(`
        
        INSERT IGNORE INTO comic (comic_id, api_id, name, description, release_date, type, image)
        VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?, ?)
      
        `, values)
    }


    async searchForComicsByNameAndType(name: string, type: string) : Promise<Comic[]> {
      var res = await this.connection.query(
        `SELECT * from comic WHERE name like '%${name}%' and type='${type}'`
      );

      return res[0] as Comic[]
    }
}