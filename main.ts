import Api from "./api/api.js";
import dotenv from "dotenv";
import DC from "./api/dc/dc.js";
import RestApi from "./server/server.js";
import * as fs from 'fs';
import * as path from 'path';
import Lexer from "./fml/lexer/lexer.js";
import TokenKind from "./fml/lexer/utils/kind.js";

const md_path = "test.fml";

dotenv.config();




async function main() {

    const PUBLIC_KEY = process.env.PUBLIC_KEY;
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const DC_API_KEY = process.env.DC_API_KEY;
    
    //var m = new Api(PUBLIC_KEY!, PRIVATE_KEY!,CLIENT_ID!,CLIENT_SECRET!, DC_API_KEY!);

    //var server = new RestApi(8000);

    var source = fs.readFileSync(path.join(path.resolve(), md_path), {encoding: "utf8"});




    var l = new Lexer(source);

    while (true){
        var token = l.consume()
        console.log(token)
        if (token.kind == TokenKind.EOF ) break
    }


}

main();