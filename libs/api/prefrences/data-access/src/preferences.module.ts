import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PrefrencesSchema } from "@estate-match/api/prefrences/schema";
import { PreferencesRepository } from "./preferences.repository";


@Module({
    imports: [
            MongooseModule.forFeature([{name : 'Prefrences', schema : PrefrencesSchema}]),
    ],
    exports: [ PreferencesRepository, ],
    providers: [ PreferencesRepository, ],
})
export class PreferenceModule {}