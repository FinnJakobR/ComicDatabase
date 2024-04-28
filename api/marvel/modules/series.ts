import BaseModule from "./base-module.js";

// Definiere die Klasse Series, die von BaseModule erbt
export default class Series extends BaseModule {
    
    // Konstruktor, der die Instanz von BaseModule initialisiert
    constructor(requester: any) {
        super(requester);
    }

    // Methode, um alle Serien zu erhalten
    public async all(...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("series", kwargs);
        return data;
    }

    // Methode, um eine spezifische Serie über ihre ID zu erhalten
    public async get(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("series", kwargs, null, identifier);
        return data;
    }

    // Methode, um die Charaktere einer spezifischen Serie zu erhalten
    public async characters(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("series", kwargs, "characters", identifier);
        return data;
    }

    // Methode, um die Comics einer spezifischen Serie zu erhalten
    public async comics(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("series", kwargs, "comics", identifier);
        return data;
    }

    // Methode, um die Ersteller einer spezifischen Serie zu erhalten
    public async creators(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("series", kwargs, "creators", identifier);
        return data;
    }

    // Methode, um die Ereignisse einer spezifischen Serie zu erhalten
    public async events(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("series", kwargs, "events", identifier);
        return data;
    }

    // Methode, um die Geschichten einer spezifischen Serie zu erhalten
    public async stories(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("series", kwargs, "stories", identifier);
        return data;
    }
}