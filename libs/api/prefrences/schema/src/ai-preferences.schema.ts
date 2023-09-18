import * as mongoose from 'mongoose';

export const AIPrefrencesSchema = new mongoose.Schema({
    user: String,
    floorDataPoints: [String],
    flooring: String,
    buildingStyleDataPoints: [String],
    buildingStyle: String,
    buildingTypeDataPoints: [String],
    buildingType: String,
    buildingAreaDataPoints: [String],
    buildingArea: String,
    buildingFeaturesDataPoints: [String],
    buildingFeatures: String,
    materialDataPoints: [String],
    materials: String,
    /*additionalDataPoints: [String],
    additional: [String]*/
});

//our model
export interface AIPrefrencesModel  {
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
    /*additionalDataPoints: string[];
    additional: string[] ;*/
}