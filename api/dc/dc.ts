import ComicVine from 'comic-vine-sdk';

export default class DC extends ComicVine{
    
    constructor(api_key:string){
            super(api_key);
    }

    async search_comic(name:string){
        const data = await this.volume.list({limit: 50, filter: {name: name}});

        return data.data.filter((i)=> i.publisher.name == "DC Comics");
    }

    async find_comic(id: number){
        const data = await this.volume.retrieve(id);

        return data.publisher.name == "DC Comics" ? data : null;

    }

    async search_character(name:string){
        const data = await this.character.list({limit: 50, filter: {name: name}});

        return data.data.filter((i)=> i.publisher.name == "DC Comics");
    }

    async find_character(id: number){
        const data = await this.character.retrieve(id);

        return data.publisher.name == "DC Comics" ? data : null;

    }


}