export interface IPropSearch {
    location: string,
    budgetMin: number,
    budgetMax: number,
    bedrooms: number,
    bathrooms: number,
    garages: number | null,
    amenities: string[],
}