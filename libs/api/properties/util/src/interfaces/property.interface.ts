export interface IProperty{
    title: string,
    location: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    garages: number | null,
    amenities: string[],
    images: string[],

    //array of rbg arrays
    rgbArray: number[],
    description: string,
}