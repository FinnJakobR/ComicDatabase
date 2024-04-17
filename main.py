import os
import sys
from configReader.config import Config

def main():
    CONFIG_PATH = sys.argv[1]
    
    if(not CONFIG_PATH):
        print("could not read CONFIG_PATH!")
    
    config = Config(CONFIG_PATH)
    
    
main()