import * as mongoose from 'mongoose';

export const AIPrefrencesSchema = new mongoose.Schema({
    user: String,
    colourDataPoints: [String],
    colour: String,
});

//our model
export interface AIPrefrencesModel  {
    user : string;
    colourDataPoints: string[];
    colour : string;
}

/*
    user : string;
    floorDataPoints: string[];
    flooring : string;
    buildingStyleDataPoints: string[];
    buildingStyle: string;
    buildingTypeDataPoints: string[];
    buildingType: string;
    buildingAreaDataPoints: string[];
    buildingArea: string;
    buildingFeaturesDataPoints: string[];
    buildingFeatures: string;
    materialDataPoints: string[];
    materials: string;
    roofDataPoints: string[];
    roof: string;
    gardenDataPoints: string[];
    garden: string;
    additionalDataPoints: string[];
    additional: string[] ; //Some extra data points like garden features and patio
*/