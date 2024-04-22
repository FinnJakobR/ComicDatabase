from api import Marvel
from dotenv import load_dotenv
import os

def main():
    
    load_dotenv()

    public_key = os.getenv('PUBLIC_KEY')
    private_key = os.getenv("PRIVATE_KEY")
    
    api = Marvel(public_key,private_key)
    print(api.comics.all())
    
main()