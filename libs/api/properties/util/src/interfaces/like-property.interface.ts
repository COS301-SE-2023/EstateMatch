export interface ILikeProperty{
    user: string,
    address: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    garages: number | null,
    amenities: string[],
    liked: boolean,
    image: string,
}