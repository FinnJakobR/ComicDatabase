import BaseModule from "./base-module.js";

// Definiere die Klasse Events, die von BaseModule erbt
export default class Events extends BaseModule {
    
    // Konstruktor, der die Instanz von BaseModule initialisiert
    constructor(requester: any) {
        super(requester);
    }

    // Methode, um alle Events zu erhalten
    public async all(...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("events", kwargs);
        return data;
    }

    // Methode, um ein spezifisches Event über seine ID zu erhalten
    public async get(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("events", kwargs, null, identifier);
        return data;
    }

    // Methode, um die Charaktere eines spezifischen Events zu erhalten
    public async characters(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("events", kwargs, "characters", identifier);
        return data;
    }

    // Methode, um die Comics eines spezifischen Events zu erhalten
    public async comics(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("events", kwargs, "comics", identifier);
        return data;
    }

    // Methode, um die Ersteller eines spezifischen Events zu erhalten
    public async creators(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("events", kwargs, "creators", identifier);
        return data;
    }

    // Methode, um die Serien eines spezifischen Events zu erhalten
    public async series(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("events", kwargs, "series", identifier);
        return data;
    }

    // Methode, um die Geschichten eines spezifischen Events zu erhalten
    public async stories(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("events", kwargs, "stories", identifier);
        return data;
    }
}