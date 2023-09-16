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

});

//our model
export interface AIPrefrencesModel  {
    user : string;
    floorDataPoints: string[];
    flooring : String;
    buildingStyleDataPoints: string[];
    buildingStyle: String;
    buildingTypeDataPoints: string[];
    buildingType: String;
    buildingAreaDataPoints: string[];
    buildingArea: String;
    buildingFeaturesDataPoints: string[];
    buildingFeatures: String;
    materialDataPoints: string[];
    materials: String;
}