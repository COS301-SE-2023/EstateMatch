import { AIPrefrencesModel } from "@estate-match/api/prefrences/schema";
import { Inject, Injectable, NotImplementedException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { IAIPreference } from "@estate-match/api/prefrences/util";

@Injectable()
export class AIPreferencesRepository {
    constructor(@InjectModel('AIPrefrences') private readonly aiPrefrencesModel : Model<AIPrefrencesModel>){}

    async findOne(user: string) : Promise<AIPrefrencesModel | null> {
        const result =  await this.aiPrefrencesModel.findOne({user: user});
        return result ? result.toObject() : null;
    }   

    async create(aiPrefrences : IAIPreference) : Promise<AIPrefrencesModel> {
        const newRecord: AIPrefrencesModel = {
            user: aiPrefrences.user,
            floorDataPoints: [aiPrefrences.flooring],
            flooring: aiPrefrences.flooring,
            buildingStyleDataPoints: [aiPrefrences.buildingStyle],
            buildingStyle: aiPrefrences.buildingStyle,
            buildingTypeDataPoints: [aiPrefrences.buildingType],
            buildingType: aiPrefrences.buildingType,
            buildingAreaDataPoints: [aiPrefrences.buildingArea],
            buildingArea: aiPrefrences.buildingArea,
            buildingFeaturesDataPoints: [aiPrefrences.buildingFeatures],
            buildingFeatures: aiPrefrences.buildingFeatures,
            materialDataPoints: [aiPrefrences.materials],
            materials: aiPrefrences.materials,

        }

        const createdPrefrences = new this.aiPrefrencesModel(newRecord);
        return createdPrefrences.save();
    }

    async update(id : string, prefrences : IAIPreference) : Promise<AIPrefrencesModel | null> {
        const userAIPreferences = await this.aiPrefrencesModel.findOne({user: id});

        if(!userAIPreferences) {
            return null;
        }else{
            userAIPreferences.floorDataPoints.push(prefrences.flooring);
            const floorDataPoints = userAIPreferences.floorDataPoints;
            let laminateFlooring = 0;
            let tileFlooring = 0;
            let woodFlooring = 0;
            for(let i = 0; i < floorDataPoints.length; i++) {
                if(floorDataPoints[i] === 'Laminate flooring') {
                    laminateFlooring++;
                }else if(floorDataPoints[i] === 'Tile flooring'){
                    tileFlooring++;
                }else if(floorDataPoints[i] === 'Wood flooring'){
                    woodFlooring++;
                }
            }
            let max;
            if(laminateFlooring !== tileFlooring && Math.max(laminateFlooring, tileFlooring) === laminateFlooring && laminateFlooring !== woodFlooring && Math.max(laminateFlooring, woodFlooring) === laminateFlooring) {
                max = 'Laminate flooring';
            }
            else if(tileFlooring !== laminateFlooring && Math.max(tileFlooring, laminateFlooring) === tileFlooring && tileFlooring !== woodFlooring && Math.max(tileFlooring, woodFlooring) === tileFlooring) {
                max = 'Tile flooring';
            }
            else if(woodFlooring !== laminateFlooring && Math.max(woodFlooring, laminateFlooring) === woodFlooring && woodFlooring !== tileFlooring && Math.max(woodFlooring,tileFlooring) === woodFlooring) {
                max = 'Laminate flooring';
            }
            else{
                max = userAIPreferences.flooring;
            }
            userAIPreferences.flooring = max;

            userAIPreferences.buildingStyleDataPoints.push(prefrences.buildingStyle);
            const buildingStyleDataPoints = userAIPreferences.buildingStyleDataPoints;

            let urbanDesign = 0;

            for(let i = 0; i < buildingStyleDataPoints.length; i++) {
                if(buildingStyleDataPoints[i] === 'Urban design') {
                    urbanDesign++;
                }
            }
            let maxBuildingStyle;
            if(urbanDesign !== 0) {
                maxBuildingStyle = 'Urban design';
            }
            else{
                maxBuildingStyle = userAIPreferences.buildingStyle;
            }
            userAIPreferences.buildingStyle = maxBuildingStyle;

            userAIPreferences.buildingTypeDataPoints.push(prefrences.buildingType);
            const buildingTypeDataPoints = userAIPreferences.buildingTypeDataPoints;
            let apartment = 0;

            for(let i = 0; i < buildingTypeDataPoints.length; i++) {
                if(buildingTypeDataPoints[i] === 'Apartment') {
                    apartment++;
                }
            }
            let maxBuildingType;
            if(apartment !== 0) {
                maxBuildingType = 'Apartment';
            }
            else{
                maxBuildingType = userAIPreferences.buildingType;
            }
            userAIPreferences.buildingType = maxBuildingType;

            userAIPreferences.buildingAreaDataPoints.push(prefrences.buildingArea);
            const buildingAreaDataPoints = userAIPreferences.buildingAreaDataPoints;
            let neighborhood = 0;
            let residential = 0;
            let suburb = 0;
            
            for(let i = 0; i < buildingAreaDataPoints.length; i++) {
                if(buildingAreaDataPoints[i] === 'Neighborhood') {
                    neighborhood++;
                }else if(buildingAreaDataPoints[i] === 'Residential') {
                    residential++;
                }else if(buildingAreaDataPoints[i] === 'Suburb') {
                    suburb++;
                }
            }
            let maxBuildingArea;
            if(neighborhood !== residential && Math.max(neighborhood, residential) === neighborhood && neighborhood !== suburb && Math.max(neighborhood, suburb) === neighborhood) {
                maxBuildingArea = 'Neighborhood';
            }
            else if(residential !== neighborhood && Math.max(residential, neighborhood) === residential && residential !== suburb && Math.max(residential, suburb) === residential) {
                maxBuildingArea = 'Residential';
            }
            else if(suburb !== neighborhood && Math.max(suburb, neighborhood) === suburb && suburb !== residential && Math.max(suburb,residential) === suburb) {
                maxBuildingArea = 'Suburb';
            }
            else{
                maxBuildingArea = userAIPreferences.buildingArea;
            }
            userAIPreferences.buildingArea = maxBuildingArea;

            userAIPreferences.buildingFeaturesDataPoints.push(prefrences.buildingFeatures);
            const buildingFeaturesDataPoints = userAIPreferences.buildingFeaturesDataPoints;
            let garden = 0;
            let courtyard = 0;
            let swimmingPool = 0;
            let porch = 0;

            for(let i = 0; i < buildingFeaturesDataPoints.length; i++) {
                if(buildingFeaturesDataPoints[i] === 'Garden') {
                    garden++;
                }else if(buildingFeaturesDataPoints[i] === 'Courtyard') {
                    courtyard++;
                }else if(buildingFeaturesDataPoints[i] === 'Swimming pool') {
                    swimmingPool++;
                }else if(buildingFeaturesDataPoints[i] === 'Porch') {
                    porch++;
                }
            }
            let maxBuildingFeatures;
            if(garden !== courtyard && Math.max(garden, courtyard) === garden && garden !== swimmingPool && Math.max(garden, swimmingPool) === garden && garden !== porch && Math.max(garden, porch) === garden) {
                maxBuildingFeatures = 'Garden';
            }
            else if(courtyard !== garden && Math.max(courtyard, garden) === courtyard && courtyard !== swimmingPool && Math.max(courtyard, swimmingPool) === courtyard && courtyard !== porch && Math.max(courtyard, porch) === courtyard) {
                maxBuildingFeatures = 'Courtyard';
            }
            else if(swimmingPool !== garden && Math.max(swimmingPool, garden) === swimmingPool && swimmingPool !== courtyard && Math.max(swimmingPool,courtyard) === swimmingPool && swimmingPool !== porch && Math.max(swimmingPool, porch) === swimmingPool) {
                maxBuildingFeatures = 'Swimming pool';
            }
            else if(porch !== garden && Math.max(porch, garden) === porch && porch !== courtyard && Math.max(porch,courtyard) === porch && porch !== swimmingPool && Math.max(porch, swimmingPool) === porch) {
                maxBuildingFeatures = 'Porch';
            }
            else{
                maxBuildingFeatures = userAIPreferences.buildingFeatures;
            }
            userAIPreferences.buildingFeatures = maxBuildingFeatures;

            userAIPreferences.materialDataPoints.push(prefrences.materials);
            const materialDataPoints = userAIPreferences.materialDataPoints;
            let hardWood = 0;
            let plyWood = 0;
            let tile = 0;
            let naturalMaterial = 0;
            let cobbleStone = 0;

            for(let i = 0; i < materialDataPoints.length; i++) {
                if(materialDataPoints[i] === 'Hardwood') {
                    hardWood++;
                }else if(materialDataPoints[i] === 'Plywood') {
                    plyWood++;
                }else if(materialDataPoints[i] === 'Tile') {
                    tile++;
                }else if(materialDataPoints[i] === 'Natural material') {
                    naturalMaterial++;
                }else if(materialDataPoints[i] === 'Cobblestone') {
                    cobbleStone++;
                }
            }
            let maxMaterial;
            if(hardWood !== plyWood && Math.max(hardWood, plyWood) === hardWood && hardWood !== tile && Math.max(hardWood, tile) === hardWood && hardWood !== naturalMaterial && Math.max(hardWood, naturalMaterial) === hardWood && hardWood !== cobbleStone && Math.max(hardWood, cobbleStone) === hardWood) {
                maxMaterial = 'Hardwood';
            }
            else if(plyWood !== hardWood && Math.max(plyWood, hardWood) === plyWood && plyWood !== tile && Math.max(plyWood, tile) === plyWood && plyWood !== naturalMaterial && Math.max(plyWood, naturalMaterial) === plyWood && plyWood !== cobbleStone && Math.max(plyWood, cobbleStone) === plyWood) {
                maxMaterial = 'Plywood';
            }
            else if(tile !== hardWood && Math.max(tile, hardWood) === tile && tile !== plyWood && Math.max(tile, plyWood) === tile && tile !== naturalMaterial && Math.max(tile, naturalMaterial) === tile && tile !== cobbleStone && Math.max(tile, cobbleStone) === tile) {
                maxMaterial = 'Tile';
            }
            else if(naturalMaterial !== hardWood && Math.max(naturalMaterial, hardWood) === naturalMaterial && naturalMaterial !== plyWood && Math.max(naturalMaterial, plyWood) === naturalMaterial && naturalMaterial !== tile && Math.max(naturalMaterial, tile) === naturalMaterial && naturalMaterial !== cobbleStone && Math.max(naturalMaterial, cobbleStone) === naturalMaterial) {
                maxMaterial = 'Natural material';
            }
            else if(cobbleStone !== hardWood && Math.max(cobbleStone, hardWood) === cobbleStone && cobbleStone !== plyWood && Math.max(cobbleStone, plyWood) === cobbleStone && cobbleStone !== tile && Math.max(cobbleStone, tile) === cobbleStone && cobbleStone !== naturalMaterial && Math.max(cobbleStone, naturalMaterial) === cobbleStone) {
                maxMaterial = 'Cobblestone';
            }
            else{
                maxMaterial = userAIPreferences.materials;
            }
            userAIPreferences.materials = maxMaterial;


            return await userAIPreferences.save();
        }
    }
}