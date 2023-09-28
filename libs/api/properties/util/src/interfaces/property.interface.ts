export interface IProperty{
    title: string,
    location: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    garages: number | null,
    amenities: string[],
    images: string[],
    seen : boolean,
    aiLabel : string[],
    rgbColour : number[],
    description : string[],

    // //added user specific fields
    // userId: string,
    // username: string,
    // seen : boolean,

    //used references to make the properties user specific
   // user : string[]//hold the username of the user
}