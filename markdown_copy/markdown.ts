import { Token_hash, TokenKind } from "./utils/kind.js";
import Token from "./utils/tokens.js";
import Queue from "./utils/queue.js"
import Stack from "./utils/stack.js";

export default class Markdown {

    private source: string;
    private cursor: number;
    private length: number;
    private current_char: string;
    private save_state: number; //For lookups
    private kind_to_str_func: Map<TokenKind,string> = Token_hash
    private current_indentation : number

    private enviorment: Queue<Stack<TokenKind>>
    private tokens: Token[]
    private last_line:Token[]
    
    constructor(source: string){
        this.source = source;
        this.cursor = 0;
        this.length = source.length;
        this.current_char = this.source[0]
        this.enviorment = new Queue()
        this.save_state = -1
        this.tokens = []
        this.last_line = []
        this.current_indentation = 0;
        this.enviorment.enqueue(new Stack())
    }

    add_token(kind: TokenKind, literal: string){
        this.tokens.push(new Token(kind, literal))
    }

    set_save_state(){
        this.save_state = this.cursor;
    }

    set_indention(){
        
        this.current_indentation = 0;

        while(this.is_space() && !this.is_new_line()){
            this.current_indentation++;
            
            if(this.current_indentation == 3) break;

            this.next_char();

            if(this.is_end()) break;
        }

    }


    check(c: string): boolean{
        return this.current_char == c
    }

    match(c: string){
        if(!this.check(c)){
            this.go_back_to_save_state()
            throw new Error("Token did not match");
        } 

        return true;
    }

    go_back_to_save_state(){

        if(this.save_state < 0) return;
        
        this.cursor = this.save_state;
        
        this.current_char = this.source[this.cursor]
        
        this.delete_save_state()

    }

    delete_save_state(){
        this.save_state = -1;
    }

    next_char(){
        this.cursor+=1;
        this.current_char = this.source[this.cursor];
    }


    is_end(){
        return this.source.length <= this.cursor;
    }

    is_space(){
    

        return this.current_char.trim().length == 0
    }

    is_new_line(){

        return this.is_space() && this.current_char.replace("\n","").length == 0
    }

    close_all_stacks(){

        while(this.enviorment.size() > 0){
            var current_stack = this.enviorment.dequeue()

            while(current_stack!.size() > 0){
                var current_element = current_stack!.pop()
                var literal = Token_hash.get(current_element!)
                this.add_token(current_element!, "/"+ literal!);
            }
        }
        this.enviorment.enqueue(new Stack())
    }


    parse_inline(is_header = false): Token[] {
        
        var inline_tokens = []
        var t = ""
        while(!this.is_new_line()){
            t += this.current_char;
            this.next_char();

            if(this.is_end()) break;
        }        


        if(t.length == 0) throw new Error("inline length  = 0")


        if(is_header){
            t = t.replace(/(\s+)((#)+)/, "")
        }

        inline_tokens.push(new Token(TokenKind.TEXT, t));

        return inline_tokens;
    }

    produce_last_line(){
        if(this.last_line.length > 0) this.try_parse_paragraph()
    }

    close_current_envoirment(){

        while(this.enviorment.peek()!.size() > 0){
            var current_stack = this.enviorment.peek()!
            var current_element = current_stack!.pop()
            var literal = Token_hash.get(current_element!)
            this.add_token(current_element!, "/"+ literal!);
        }
        return;
    }


    parse():any{


        if(this.save_state > -1){
             this.go_back_to_save_state()
        }

        if(this.is_end()){
            
            this.produce_last_line();

            this.close_all_stacks()
            return this.tokens
        }

        while(this.is_new_line()){
            this.next_char();
            
            if(this.is_end()) return this.parse()

            //wenn nach einem Linebreak noch ein Linebreak kommt schließe paragraph

            if(this.is_new_line()){                
                
                if(this.enviorment.peek()!.peek() === TokenKind.PARAGRAPH){
                    
                    this.tokens = this.tokens.concat(this.last_line);
                    this.last_line = [];

                    this.add_token(TokenKind.PARAGRAPH, "/p");
                    this.enviorment.peek()!.pop();
                }


            }

        }

        
        this.set_indention();

        try {
            this.try_parse_indented_code();

        }catch(e){
            
        }




        try {
            this.try_parse_header()
            this.delete_save_state()
            
        } catch (e) {
            this.go_back_to_save_state()
            if(this.is_end()) return this.parse(); 
            
        }
        


        try {
            this.try_parse_hr()
            this.delete_save_state()

        }catch(e){
           
            this.go_back_to_save_state()
          
            if(this.is_end()) return this.parse(); 
        }





        //für lazyness
        if(this.last_line.length == 0 ){
            this.last_line = this.parse_inline()
            //console.log(this.last_line);
        
        }else{

            this.try_parse_paragraph();

        }

        return this.parse()
    

    }

    try_parse_indented_code(){
        //indented codeblock können nichts schließen 
        if(this.current_indentation == 3 && this.enviorment.size() == 1 && this.enviorment.peek()!.size() == 0){

            this.enviorment.peek()!.push(TokenKind.CODE);
            this.add_token(TokenKind.CODE, "`");

            var t = "";
            while(!this.is_end()){
                var tt = ""
                while(!this.is_new_line()){

                    tt+= this.current_char;

                    this.next_char();

                    if(this.is_end()) {
                        this.add_token(TokenKind.TEXT, t);
                        throw Error();

                    };

                }

                t+= tt;

                while(this.is_new_line()){
                    t+= "\n"
                    this.next_char();

                    if(this.is_end()) {
                        this.add_token(TokenKind.TEXT, t);
                        throw Error();

                    };
                }

                this.set_indention();

                if(this.current_indentation < 3) {
                    this.add_token(TokenKind.TEXT, t);
                    this.add_token(TokenKind.CODE, "/`");

                    this.enviorment.peek()!.pop(); // remove Code from Stack

                    throw Error();
                }


            }

            this.add_token(TokenKind.TEXT, t);

            throw Error();

        }
    }

    try_parse_code_fences(){
        
        this.set_save_state();

        var depth = 0;


        while(this.check("`")){
            depth++;

            this.next_char();

            if(this.is_end()) throw Error("END")
        }

        if(depth < 3) {
            throw Error("Depth < 3");
        }

        var l = "";

        while(!this.is_new_line()){



            this.next_char();

            if(this.is_end()) throw Error();
        }

        if(!this.is_new_line()) throw Error();

        this.close_all_stacks();
    }

    try_parse_paragraph(){
        //füge einen neuen Paragraph hinzu wenn es keinen offnen gibt 
        if(this.enviorment.peek()!.peek() != TokenKind.PARAGRAPH){
            this.enviorment.peek()!.push(TokenKind.PARAGRAPH);
            this.add_token(TokenKind.PARAGRAPH, "p")
        }

        //füge die letzte line hinzu 
        this.tokens = this.tokens.concat(this.last_line);

        this.last_line = [];

    }

    try_parse_hr(){
        
        if(this.is_end()) throw Error("END");
        
        if(!this.check("-") && !this.check("_")) throw Error("Not - or _");

        this.set_save_state();

        var leading_char = this.current_char;
        var depth = 0;

        while(this.check(leading_char)){
            
            while(this.is_space() && !this.is_new_line()){
                this.next_char();

                if(this.is_end()) break;
            }

            this.next_char();

            depth++;

            if(this.is_end()) break;
        }

        
        if(depth < 3) throw Error("hr depth to Small");

        if(!this.is_end()){

            if(!this.is_new_line()) throw Error("In HR Line is another char!")
        }

        //wir checken ob wir uns im höchsten Envoirment befinden
        if(this.enviorment.size() == 1 && this.last_line.length > 0){
            if(leading_char == "-"){

                this.close_all_stacks()
                
                this.add_token(TokenKind.HEADER, "2");
                this.tokens = this.tokens.concat(this.last_line);
                this.add_token(TokenKind.HEADER, "/#2")
                this.last_line = []

                return true;

            }
        }

        //das es ein leaf block ist schließen wir alle stacks
        this.produce_last_line();
        this.close_all_stacks()


        this.add_token(TokenKind.HR, leading_char);

        return true;

    }

    try_parse_header() : boolean{
        if(this.is_end()) throw Error();

        this.set_save_state();

        this.match("#");

        var depth = 0;

        while(this.check("#")){
            
            while(this.is_space()) this.next_char();

            depth++;

            this.next_char();

        }

        if(depth > 6){
            throw new Error("depth > 6")
        }


        this.match(" ");

        while(this.is_space() && !this.is_new_line()){
            this.next_char()
            
            if(this.is_end()) break;

        }


        //da es ein leaf block ist, closen wir alle Stacks
        this.produce_last_line()
        this.close_all_stacks()


        this.add_token(TokenKind.HEADER, depth.toString())

        this.tokens = this.tokens.concat(this.parse_inline());

        this.add_token(TokenKind.HEADER, "/#" + depth.toString())

     
        return true;
        
    }











}