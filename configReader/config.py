from enum import Enum
import os
import re

class TokenType(Enum):
    EQUAL = 0;
    NEWLINE = 1;
    IDENTIFIER = 2;
    PATH = 3;
    TRUE = 4;
    FALSE = 5;
    MINUS = 6;
    SPACE = 7;
    SEMICOLON = 8;
    NUMBER = 9;
    

KEYWORDS = {
    "TRUE": TokenType(4),
    "FALSE": TokenType(5),
}

    
class Token:
    def __init__(self, type, literal) -> None:
        self.type = type
        self.literal = literal


class Config:
    def __init__(self, argv) -> None:
        
        self.argv = argv
        self.path = ""
        self.source = ""
        self.tokens = []
        self.start = 0
        self.current = 0
        self.line = 1
        
        self.read_argv()
        self.scan()
        self.pretty_print_token()
        
        
        
    def pretty_print_token(self):
        for token in range(len(self.tokens)):
            print("----")
            print("TYPE: ", self.tokens[token].type)
            print("LITERAL:", self.tokens[token].literal)
            print("----")
    
    def file_exists(self):
        isFile = os.path.isfile(os.getcwd() + self.path)
        return isFile
    
    def read_file(self):
            f = open(self.path, "r")
            self.source = f.read()
    
    def read_argv(self):
        
        pattern = r"^CONFIG_PATH=(.+\/[^\/]+.conf)$"
        
        results = re.search(pattern, self.argv,re.IGNORECASE)
        
        
        if(not results): raise ValueError("could not find Config Path!")
        
        path = results.group(1)
        
        self.path = path
        
        if(not self.file_exists()): raise ValueError("could not read Config File!")
        
        self.path = os.getcwd() + self.path
        
        self.read_file()                
         
    def scan(self):
        while(not self.isAtEnd()):
            self.start = self.current
            self.scanToken()
            
    def advance(self):
        currentChar = self.source[self.current]
        self.current+=1
        return currentChar
                    
    def isAtEnd(self):
        return self.current >= len(self.source)
    
    def addToken(self,type,literal):
        self.tokens.append(Token(type, literal))
    
    def peek(self):
        if(self.isAtEnd()): return "\0"
        return self.source[self.current]
    
    def peekNext(self):
         if(self.current + 1 >= len(self.source)): return '\0'

         return self.source[self.current + 1];
        
    def scanToken(self):
        c = self.advance()
        
        match (c):
            case "=":
                self.addToken(TokenType(0), "=")
            case "\n":
                self.addToken(TokenType(1), "\\\\n")
                self.line+=1
            case "-":
                self.addToken(TokenType(6), "-")
            case ";":
                self.addToken(TokenType(8), ";")
            case _:
                if c.isspace():
                    if(c == "\t"):
                        for t in range(4):
                            self.addToken(TokenType(7), "\s")
                    else: 
                        self.addToken(TokenType(7), "\s")
                elif(c.isdigit()):
                    self.scanDigit(c)
                else:
                    self.scanIdentifier() 
                    
                    

    def scanDigit(self, c):
        while(self.peek().isdigit()): self.advance()
        
        if(self.peek() == "." and  self.peekNext().isdigit()): 
            self.advance()
            while(self.peek().isdigit()): self.advance()
            
        self.addToken(TokenType(9), self.source[self.start:self.current])
            
    def scanIdentifier(self):
        while(self.peek() != "\n" and not self.peek() == "=" and not self.peek().isspace() and not self.isAtEnd()): self.advance()
        
        text = self.source[self.start: self.current]
        type = KEYWORDS.get(text)
        
        if(not type): type = TokenType(2)
        
        self.addToken(type, text)
        
        
        
    def parse(self):
        pass    
        