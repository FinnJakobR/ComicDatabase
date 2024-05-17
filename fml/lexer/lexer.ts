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
    public line: number;
    public indentation_stack: number[];
    constructor(source: string){
        this.source = source;
        this.buffer = []
        this.cursor = 0;
        this.line = 0;
        this.is_newline = true;
        this.current_indent_level = 0;
        this.is_logical_line = true
        this.indentation_stack = [0];

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

            if(is_space(current_char) || current_char == "\n"){
                    
                if(this.is_newline && current_char == "\t"){
                    this.current_indent_level += 8 - this.current_indent_level % 8

                }

                
                //hier ist carage return schon drin 

                else if(isnewline(current_char)){
                    this.is_logical_line = false;
                    this.next_char();
                    this.line++;
                    this.current_indent_level = 0;
                    this.is_newline = true
                    return new Token(TokenKind.NEWLINE, "\n");
                }

                else {
                    
                    if(this.is_newline){
                        
                        this.current_indent_level +=1;

                        this.next_char();

                        return this.consume(true)
                    }
                }

            }
            else if(current_char == "/" && this.source[this.cursor + 1] == "*"){
                
                this.next_char();
                current_char = this.next_char();
                
                while(current_char && current_char != "*" && this.source[this.cursor + 1] && this.source[this.cursor + 1] != "/"){
                    current_char =  this.next_char();
                }
                continue;
            }

            else if(current_char && !is_space(current_char) && this.is_newline){
                this.is_logical_line = true;

                var last_indend_block = this.indentation_stack[this.indentation_stack.length - 1 ]
                
                if(this.current_indent_level > last_indend_block){
                    this.indentation_stack.push(this.current_indent_level);
                
                    return new Token(TokenKind.INDENT, "INDENT");
                
                }

                else if(this.current_indent_level < last_indend_block){
                    var index_of_indent = this.indentation_stack.indexOf(this.current_indent_level);
                    if(index_of_indent < 0) throw Error("Indentation Error: mismatched Blocks");

                    this.indentation_stack.pop();

                    return new Token(TokenKind.DEDENT, "DEDENT")

                } 
                this.is_newline = false;
            }

                switch(current_char){
                    case "-":
                        this.next_char()
                        return new Token(TokenKind.MINUS, "-")
                    case "*":
                        this.next_char()
                        return new Token(TokenKind.STAR, "*")
                    case "+":
                        this.next_char()
                        return new Token(TokenKind.PLUS, "+")
                    case ".":
                        this.next_char()
                        return new Token(TokenKind.POINT, ".")
                    case "@":
                        this.next_char()
                        return new Token(TokenKind.AT, "@")
                    case "{":
                        this.next_char()
                        return new Token(TokenKind.OPENCURLYPAREN, "{")
                    case "}":
                        this.next_char()
                        return new Token(TokenKind.CLOSECURLYPAREN, "}")
                    case "<":
                        this.next_char()
                        return new Token(TokenKind.LT, "<");
            
                    case ">": 
                        this.next_char()
                        return new Token(TokenKind.GT, ">")
                    default: 
                        if(isint(current_char)){
                            var int = "";

                            while(isint(current_char)){
                                int += current_char;
                                current_char = this.next_char();
                            }

                            return new Token(TokenKind.INT, int);
                        }

                        var text = "";
                        while(current_char && isint(current_char) || isalpha(current_char) || is_space(current_char)){
                            text+= current_char;
                            current_char = this.next_char();
                        }

                        if(!current_char && !text){
                            if(this.indentation_stack[this.indentation_stack.length - 1] > 0){
                                this.indentation_stack.pop();
            
                                return new Token(TokenKind.DEDENT, "DEDENT");
                            }
            
                            return new Token(TokenKind.EOF, "EOF")
                        }

                        return new Token(TokenKind.TEXT, text);

                        
                        
                }
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