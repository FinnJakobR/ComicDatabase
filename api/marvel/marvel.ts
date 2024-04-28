import Base from "./base.js"
import Characters from "./modules/characters.js";
import Comics from "./modules/comics.js";
import Creators from "./modules/creators.js";
import Events from "./modules/events.js";
import Series from "./modules/series.js";
import Stories from "./modules/stories.js";

export default class marvel extends Base {
    
    characters: Characters;
    comics: Comics;
    creators: Creators;
    events: Events;
    series: Series;
    stories: Stories;

    constructor(PUBLIC_KEY: string, PRIVATE_KEY: string){
        
        super(PUBLIC_KEY, PRIVATE_KEY);
        this.characters = new Characters(this.Requester);
        this.comics = new Comics(this.Requester);
        this.creators = new Creators(this.Requester);
        this.events = new Events(this.Requester);
        this.series = new Series(this.Requester);
        this.stories = new Stories(this.Requester);
    }




}