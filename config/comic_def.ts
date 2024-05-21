
export interface Comic {
    type: "manga" | "marvel" | "dc",
    id: string, 
    api_id: number,
    image: string,
    release_date: string,
    description?: string,
    name: string
}