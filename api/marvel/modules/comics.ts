import BaseModule from "./base-module.js";

// Definiere die Klasse Comics, die von BaseModule erbt
export default class Comics extends BaseModule {
    
    // Konstruktor, der die Instanz von BaseModule initialisiert
    constructor(requester: any) {
        super(requester);
    }

    // Methode, um alle Comics zu erhalten
    public async all(...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("comics", ...kwargs);
        return data;
    }

    // Methode, um einen spezifischen Comic über seine ID zu erhalten
    public async get(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("comics", ...kwargs, null, identifier);
        return data;
    }

    // Methode, um die Charaktere eines spezifischen Comics zu erhalten
    public async characters(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("comics", ...kwargs, "characters", identifier);
        return data;
    }

    // Methode, um die Ersteller eines spezifischen Comics zu erhalten
    public async creators(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("comics", ...kwargs, "creators", identifier);
        return data;
    }

    // Methode, um die Ereignisse eines spezifischen Comics zu erhalten
    public async events(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("comics", ...kwargs, "events", identifier);
        return data;
    }

    // Methode, um die Geschichten eines spezifischen Comics zu erhalten
    public async stories(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("comics", ...kwargs, "stories", identifier);
        return data;
    }
}