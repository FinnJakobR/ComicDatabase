import BaseModule from "./base-module.js";

// Definiere die Klasse Stories, die von BaseModule erbt
export default class Stories extends BaseModule {
    
    // Konstruktor, der die Instanz von BaseModule initialisiert
    constructor(requester: any) {
        super(requester);
    }

    // Methode, um alle Stories zu erhalten
    public async all(...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("stories", kwargs);
        return data;
    }

    // Methode, um eine spezifische Story über ihre ID zu erhalten
    public async get(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("stories", kwargs, null, identifier);
        return data;
    }

    // Methode, um die Charaktere einer spezifischen Story zu erhalten
    public async characters(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("stories", kwargs, "characters", identifier);
        return data;
    }

    // Methode, um die Comics einer spezifischen Story zu erhalten
    public async comics(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("stories", kwargs, "comics", identifier);
        return data;
    }

    // Methode, um die Ersteller einer spezifischen Story zu erhalten
    public async creators(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("stories", kwargs, "creators", identifier);
        return data;
    }

    // Methode, um die Ereignisse einer spezifischen Story zu erhalten
    public async events(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("stories", kwargs, "events", identifier);
        return data;
    }

    // Methode, um die Serien einer spezifischen Story zu erhalten
    public async series(identifier: string, ...kwargs: any[]): Promise<any> {
        const data = await this.requestObj.request("stories", kwargs, "series", identifier);
        return data;
    }
}