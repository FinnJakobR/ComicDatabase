from enum import Enum
import os

class TokenType(Enum):
    EQUAL = 0;
    NEWLINE = 1;
    IDENTIFIER = 2;
    PATH = 3;
    TRUE = 4;
    FALSE = 5;
    MINUS = 6;
    SQL = 7;
    GENERAL = 8;
    API = 9;
    

KEYWORDS = {
    "TRUE": TokenType(4),
    "FALSE": TokenType(5),
    "SQL": TokenType(7),
    "GENERAL": TokenType(8),
    "API": TokenType(9)
}

    
class Token:
    def __init__(self, type, literal) -> None:
        self.type = type
        self.literal = literal


class Config:
    def __init__(self, argv) -> None:
        self.argv = argv
        self.path = ""
    
    def file_exists(self):
        isFile = os.path.isfile(os.getcwd() + self.path)
        return isFile    
    
    def read_argv(self):
        
        size = len(self.argv)
        current_index = 0
        tokens = []
        
        while(size > current_index): 
            char = self.argv[current_index]
            current_index+=1
            
            match char: 
                case "=":
                    tokens.append(Token(TokenType(4), "="))
                case "\n":
                    raise TypeError("LineBreaks not allowed in Path!")
                case " ":
                    pass 
                
                case _:
                    if(char.isalpha()):
                        start = current_index
                        current_index+=1
                        char = self.argv[current_index]
                        
                        while(char.isalnum() or char == "_" and current_index < size):
                            current_index+=1
                            char = self.argv[current_index]
                            
                        identifier = self.argv[start-1: current_index]
                        tokens.append(Token(TokenType(2), identifier))
                         
                    elif(char == "/" or char == "."):
                        start = current_index
                        current_index+=1
                        char = self.argv[current_index]
                        
                        while(char.isalnum() or char == "_" or char == "/" or char == "." and current_index < size):
                            current_index+=1
                            
                            if(current_index >= size): break
                            
                            char = self.argv[current_index]
                            
                        identifier = self.argv[start-1: current_index]
                        tokens.append(Token(TokenType(3), identifier))
                            
                    else: 
                        raise TypeError("unknown Token in argv Path!")


        if(not tokens[0].literal == "CONFIG_PATH"):
            raise TypeError("could not read CONFIG_PATH")
        if(not tokens[1].literal == "="):
            raise TypeError("could not read Path")
        if(not tokens[2].type == TokenType(3)):
            raise TypeError("Please provide a Path!")
        if(not tokens[2].literal.endswith(".conf")):
            raise TypeError("Please provide a .conf file!")
        
        self.path = tokens[2].literal
        
        if(not self.file_exists()):
            raise TypeError("Path not exists!")
        
        return True
                        
                