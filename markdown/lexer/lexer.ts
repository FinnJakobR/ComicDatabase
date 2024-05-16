import { resourceUsage } from "process";
import isalpha from "../../helper/isalpha.js";
import isint from "../../helper/isint.js";
import isnewline from "../../helper/isnewline.js";
import is_space from "../../helper/isspace.js";
import TokenKind from "./utils/kind.js";
import Token from "./utils/token.js";

class tokenizer {
    public source: string;
    public buffer: Token[];
    public cursor: number;
    public is_newline: boolean;
    public current_indent_level: number;
    public is_logical_line: boolean;
    public is_indent: boolean;
    public is_dedent: boolean;
    constructor(source: string){
        this.source = source;
        this.buffer = []
        this.cursor = 0;
        this.is_newline = true;
        this.current_indent_level = 0;
        this.is_logical_line = true
        this.is_dedent = false;
        this.is_indent = false;

    }

    next_char(): string {
        this.cursor++;

        return this.source[this.cursor];
    }

    peek(k:number = 1): Token[]{



        while(k > 0){
            
            this.buffer.push(this.consume(true));
            k--;
        
        }


        return this.buffer;


    }

    consume(keep_buffer: boolean = false): Token{
        
        if(this.buffer.length > 0 && !keep_buffer){
            var c = this.buffer[0]
            this.buffer.shift()
            return c;
        }

        var current_char = this.source[this.cursor];

        while(true){
           
            if(is_space(current_char)){
                
                if(current_char == "\t"){
                    
                    if(this.is_newline){
                        this.current_indent_level = 3;
                        return new Token(TokenKind.INDENT, "INDENT");
                    }
                }

                if(this.is_newline){
                    
                    this.current_indent_level+=1;
                    this.next_char();
                    return this.consume(true);

                }
            }

        

            if(isnewline(current_char)){

                
                var char = this.next_char();

                if(!is_space(char) && this.is_indent){
                    this.is_indent = false;
                    return new Token(TokenKind.DEDENT, "DEDENT")
                }

                this.is_newline = true;
                
                this.is_indent = false;
                
                this.is_dedent = false;


                this.current_indent_level = 0;

                return new Token(TokenKind.NEWLINE, "\n");
            }

            if(current_char && !isnewline(current_char)){
                
                this.is_logical_line = true;
            

                if(this.current_indent_level < 3 && !this.is_indent && !this.is_dedent){
                    
                    this.is_indent = true;
                    this.is_dedent = true;

                    return new Token(TokenKind.DEDENT, "DEDENT")


                }
                
                if(this.current_indent_level >= 3 && !this.is_indent){
                    
                    this.is_indent = true;

                    this.current_indent_level -= 3;
                    
                    return new Token(TokenKind.INDENT, "INDENT");

                }else if(this.current_indent_level > 0 && this.is_indent) {
                    this.current_indent_level --;

                    return new Token(TokenKind.WHITESPACE, " ");
                }


                if(this.is_newline){
                    var t = ""
                    while(isint(current_char)){
                        t+= current_char;
                        current_char = this.next_char();
                    }

                    if(t.length > 0) return new Token(TokenKind.INT, t);
                }

                this.is_newline = false;

                switch(current_char) {
                    case "#":
                        this.next_char();
                        return new Token(TokenKind.HASH, "#");

                    case ">":
                        this.next_char();
                        return new Token(TokenKind.GT, ">");
                    case "<":
                        this.next_char();
                        return new Token(TokenKind.LT, "<")
                    case "-":
                        this.next_char();
                        return new Token(TokenKind.MINUS, "-");
                    case "+":
                        this.next_char();
                        return new Token(TokenKind.PLUS, "+");
                    case "*":
                        this.next_char();
                        return new Token(TokenKind.STAR, "*")
                    case "`":
                        this.next_char();
                        return new Token(TokenKind.FENCE, "`")
                    case "_":
                        this.next_char();
                        return new Token(TokenKind.UNDER_SCORE, "_")
                    case "=":
                        this.next_char();
                        return new Token(TokenKind.EQUAL, "=");
                    case "|":
                        this.next_char();
                        return new Token(TokenKind.OR, "|");
                    case "~":
                        this.next_char();
                        return new Token(TokenKind.SPILE, "~");
                    case ":":
                        this.next_char();
                        return new Token(TokenKind.COLON, ":");
                    case "(":
                        this.next_char();
                        return new Token(TokenKind.OPENPAREN, "(");
                    case ")":
                        this.next_char();
                        return new Token(TokenKind.CLOSEPAREN, ")");
                    case "[":
                        this.next_char();
                        return new Token(TokenKind.OPENSQUAREPAREN, "[");
                    case "]":
                        this.next_char();
                        return new Token(TokenKind.CLOSESQUAREPAREN, "]");
                    case "{":
                        this.next_char();
                        return new Token(TokenKind.OPENCURLYPAREN, "{");
                    case "}":
                        this.next_char();
                        return new Token(TokenKind.CLOSECURLYPAREN, "}")
                    case "/":
                        this.next_char();
                        return new Token(TokenKind.SLASH, "/")
                    case "?":
                        this.next_char();
                        return new Token(TokenKind.MARK, "?")
                    case "!":
                        this.next_char();
                        return new Token(TokenKind.MARK, "!")
                    case ",":
                        this.next_char();
                        return new Token(TokenKind.MARK, ",")
                    case ";":
                        this.next_char();
                        return new Token(TokenKind.SEMICOLON, ";")
                    case "^":
                        this.next_char();
                        return new Token(TokenKind.UP, "^")
                    case `"`:
                        current_char = this.next_char()
                        var str = ""
                        while(current_char != `"`){

                           //TODO HANDLE ESCAPED CHARACTERS
                           str += current_char;

                           current_char = this.next_char();
                        }

                        this.next_char();

                        return new Token(TokenKind.DOUBLE_QUOTES, str);

                    case "h":
                        var start_index = this.cursor;
                        
                        try {
                            return this.lex_url(current_char);
                        } catch(e) {
                            this.cursor = start_index;
                            current_char = this.source[this.cursor]
                        }
                        

                    default: 
                    var t = ""; 

                    while(isalpha(current_char) || isint(current_char) || is_space(current_char) || current_char == "."){
                        t+= current_char;
                        current_char = this.next_char();
                       }

                       if(t.length > 0) return new Token(TokenKind.TEXT, t);

                    

                }

            }


            if(!current_char)
            return new Token(TokenKind.EOF, "EOF")


        }
    }

    private lex_url(current_char: string){
        if(this.next_char() == "t" &&  this.next_char() == "t" && this.next_char() == "p"){
            
            current_char = this.next_char();

            if(this.source[this.cursor] == "s")  current_char = this.next_char()


            if(current_char != ":") {
                throw Error();
            }

            current_char = this.next_char(); 

            if(this.next_char() != "/" && this.next_char() != "/"){
                throw Error()
            }

            current_char = this.next_char()

            var url = ""
            while( current_char 
                && isalpha(current_char) 
                || isint(current_char) 
                || current_char == "-" 
                || current_char == "_"
                || current_char == "."
                || current_char == "~"
                || current_char == ":"
                || current_char == "/"
                || current_char == "?"
                || current_char == "#"
                || current_char == "["
                || current_char == "]"
                || current_char == "@"
                || current_char == "!"
                || current_char == "$"
                ){
                url += current_char;
                current_char = this.next_char();

            }

            return new Token(TokenKind.TEXT, url);




        }else {
            throw Error();
        }
    }
}

export default class Lexer {
        public source: string;
        public tokenizer: tokenizer;

        constructor(source: string){
            this.source = source;

            this.tokenizer = new tokenizer(source);
        }

        peek(k = 1){
            return this.tokenizer.peek(k);
        }

        consume(){
            return this.tokenizer.consume();
        }
}