export interface ILikeProperty{
    user: string,
    title: string,
    address: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    garages: number | null,
    amenities: string[],
    liked: boolean,
    image: string,
    propertyURL: string,
}