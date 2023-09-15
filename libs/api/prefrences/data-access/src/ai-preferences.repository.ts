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
            labelDataPoints: [aiPrefrences.labels],
            labels: aiPrefrences.labels,
        }

        const createdPrefrences = new this.aiPrefrencesModel(newRecord);
        return createdPrefrences.save();
    }

    async update(id : string, prefrences : IAIPreference) : Promise<AIPrefrencesModel | null> {
        const userAIPreferences = await this.aiPrefrencesModel.findOne({user: id});

        if(!userAIPreferences) {
            return null;
        }else{
            userAIPreferences.labelDataPoints.push(prefrences.labels);
            const labelDataPoints = userAIPreferences.labelDataPoints;
            let buildingStyle = 0;
            let floorMaterials = 0;
            let interiorMaterials = 0;
            let buildingArea = 0;
            let buildingFeatures = 0;
            for(let i = 0; i < labelDataPoints.length; i++) {
                if(labelDataPoints[i] === 'Apartment' || labelDataPoints[i] === 'Urban design') {
                    buildingStyle++;
                }else if(labelDataPoints[i] === 'Laminate flooring' || labelDataPoints[i] === 'Wood flooring'){
                    floorMaterials++;
                }else if(labelDataPoints[i] === 'Neighbourhood' || labelDataPoints[i] === 'Residential area'){
                    buildingArea++;
                }else if(labelDataPoints[i] === 'Garden' || labelDataPoints[i] === 'Porch' || labelDataPoints[i] === 'Courtyard' || labelDataPoints[i] === 'Yard'|| labelDataPoints[i] === 'Natural landscape' || labelDataPoints[i] === 'Daylighting' ){
                    buildingFeatures++;
                }
                else{
                    interiorMaterials++;
                }
            }
            let max;
            if(buildingStyle !== floorMaterials && Math.max(buildingStyle, floorMaterials) === buildingStyle && buildingStyle !== interiorMaterials && Math.max(buildingStyle, interiorMaterials) === buildingStyle && buildingStyle !== buildingArea && Math.max(buildingStyle, buildingArea) === buildingStyle && buildingStyle !== buildingFeatures && Math.max(buildingStyle, buildingFeatures) === buildingStyle) {
                max = 'Building Style';
            }
            else if(floorMaterials !== interiorMaterials && Math.max(floorMaterials, interiorMaterials) === floorMaterials && floorMaterials !== buildingArea && Math.max(floorMaterials, buildingArea) === floorMaterials && floorMaterials !== buildingFeatures && Math.max(floorMaterials, buildingFeatures) === floorMaterials && floorMaterials !== buildingStyle && Math.max(floorMaterials, buildingStyle) === floorMaterials){
                max = 'Floor Materials';
            }
            else if(interiorMaterials !== buildingArea && Math.max(interiorMaterials, buildingArea) === interiorMaterials && interiorMaterials !== buildingFeatures && Math.max(interiorMaterials, buildingFeatures) === interiorMaterials && interiorMaterials !== buildingStyle && Math.max(interiorMaterials, buildingStyle) === interiorMaterials && interiorMaterials !== floorMaterials && Math.max(interiorMaterials, floorMaterials) === interiorMaterials){
                max = 'Interior Materials';
            }
            else if(buildingArea !== buildingFeatures && Math.max(buildingArea, buildingFeatures) === buildingArea && buildingArea !== buildingStyle && Math.max(buildingArea, buildingStyle) === buildingArea && buildingArea !== floorMaterials && Math.max(buildingArea, floorMaterials) === buildingArea && buildingArea !== interiorMaterials && Math.max(buildingArea, interiorMaterials) === buildingArea){
                max = 'Building Area';
            }
            else if(buildingFeatures !== buildingStyle && Math.max(buildingFeatures, buildingStyle) === buildingFeatures && buildingFeatures !== floorMaterials && Math.max(buildingFeatures, floorMaterials) === buildingFeatures && buildingFeatures !== interiorMaterials && Math.max(buildingFeatures, interiorMaterials) === buildingFeatures && buildingFeatures !== buildingArea && Math.max(buildingFeatures, buildingArea) === buildingFeatures){
                max = 'Building Features';
            }
            else{
                max = userAIPreferences.labels;
            }
            userAIPreferences.labels = max;
            return await userAIPreferences.save();
        }
    }
}