export interface IPreference {
    user: string;
    location: string;
    budgetMin: number;
    budgetMax: number;
    type: string;
    bedrooms: number;
    bathrooms: number;
    garages: number;
    extras: string[];
}