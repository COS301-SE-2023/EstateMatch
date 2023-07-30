import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AIPrefrencesSchema, PrefrencesSchema } from "@estate-match/api/prefrences/schema";
import { PreferencesRepository } from "./preferences.repository";
import { AIPreferencesRepository } from "./ai-preferences.repository";


@Module({
    imports: [
        MongooseModule.forFeature([{name : 'Prefrences', schema : PrefrencesSchema}]),
        MongooseModule.forFeature([{name : 'AIPrefrences', schema : AIPrefrencesSchema}])
    ],
    exports: [ PreferencesRepository, AIPreferencesRepository ],
    providers: [ PreferencesRepository, AIPreferencesRepository],
})
export class PreferenceModule {}