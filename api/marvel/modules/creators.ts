import BaseModule from "./base-module.js";

// Definiere die Klasse Creators, die von BaseModule erbt
export default class Creators extends BaseModule {
    
    // Konstruktor, der die Instanz von BaseModule initialisiert
    constructor(requester: any) {
        super(requester);
    }

    // Methode, um alle Creators zu erhalten
    public async all(...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("creators", ...kwargs);
        return data;
    }

    // Methode, um einen spezifischen Creator über seine ID zu erhalten
    public async get(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("creators", ...kwargs, null, identifier);
        return data;
    }

    // Methode, um die Comics eines spezifischen Creators zu erhalten
    public async comics(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("creators", ...kwargs, "comics", identifier);
        return data;
    }

    // Methode, um die Events eines spezifischen Creators zu erhalten
    public async events(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("creators", ...kwargs, "events", identifier);
        return data;
    }

    // Methode, um die Serien eines spezifischen Creators zu erhalten
    public async series(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("creators", ...kwargs, "series", identifier);
        return data;
    }

    // Methode, um die Geschichten eines spezifischen Creators zu erhalten
    public async stories(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("creators", ...kwargs, "stories", identifier);
        return data;
    }
}