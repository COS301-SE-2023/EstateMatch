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
            floorDataPoints: aiPrefrences.flooring,
            flooring: aiPrefrences.flooring,
            buildingStyleDataPoints: aiPrefrences.buildingStyle,
            buildingStyle: aiPrefrences.buildingStyle,
            buildingTypeDataPoints: aiPrefrences.buildingType,
            buildingType: aiPrefrences.buildingType,
            buildingAreaDataPoints: aiPrefrences.buildingArea,
            buildingArea: aiPrefrences.buildingArea,
            buildingFeaturesDataPoints: aiPrefrences.buildingFeatures,
            buildingFeatures: aiPrefrences.buildingFeatures,
            materialDataPoints: aiPrefrences.materials,
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
            userAIPreferences.floorDataPoints.push(...prefrences.flooring);
            const floorDataPoints = userAIPreferences.floorDataPoints;

            userAIPreferences.flooring = await this.getTopFiveCharacteristics(floorDataPoints);

            userAIPreferences.buildingStyleDataPoints.push(...prefrences.buildingStyle);
            const buildingStyleDataPoints = userAIPreferences.buildingStyleDataPoints;

            userAIPreferences.buildingStyle = await this.getTopFiveCharacteristics(buildingStyleDataPoints);

            userAIPreferences.buildingTypeDataPoints.push(...prefrences.buildingType);
            const buildingTypeDataPoints = userAIPreferences.buildingTypeDataPoints;

            userAIPreferences.buildingType = await this.getTopFiveCharacteristics(buildingTypeDataPoints);

            userAIPreferences.buildingAreaDataPoints.push(...prefrences.buildingArea);
            const buildingAreaDataPoints = userAIPreferences.buildingAreaDataPoints;
            
            userAIPreferences.buildingArea = await this.getTopFiveCharacteristics(buildingAreaDataPoints);

            userAIPreferences.buildingFeaturesDataPoints.push(...prefrences.buildingFeatures);
            const buildingFeaturesDataPoints = userAIPreferences.buildingFeaturesDataPoints;
          
            userAIPreferences.buildingFeatures = await this.getTopFiveCharacteristics(buildingFeaturesDataPoints);

            userAIPreferences.materialDataPoints.push(...prefrences.materials);
            const materialDataPoints = userAIPreferences.materialDataPoints;
           
            userAIPreferences.materials = await this.getTopFiveCharacteristics(materialDataPoints);


            return await userAIPreferences.save();
        }
    }

    async getTopFiveCharacteristics(characteristics: string[]): Promise<string[]> {
        const counts: Record<string, number> = {};
      
        for (const element of characteristics) {
          // Remove double quotes from the element
          const strElement = element.replace(/"/g, '');
      
          if (counts[strElement]) {
            counts[strElement]++;
          } else {
            counts[strElement] = 1;
          }
        }
      
        const tuples: [string, number][] = Object.entries(counts);
        tuples.sort((a, b) => b[1] - a[1]);
        const topFive = tuples.slice(0, 5);
      
        return topFive.map(tuple => tuple[0]);
      }
      
}