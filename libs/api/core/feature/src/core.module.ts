import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreController } from './core.controller';
import { PreferenceModule } from '@estate-match/api/prefrences/feature';
import { PropertiesModule } from '@estate-match/api/properties/feature';
import { AuthenticationModule } from '@estate-match/api/authentication/feature';
import { UserModule } from '@estate-match/api/users/feature'
import { SearchModule } from '@estate-match/api/search/feature';
import { WebScraperModule } from '@estate-match/api/webscraper/feature';
import { TensorflowModule } from '@estate-match/api/ai/feature';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://teambluecos301:Wtm7JJS8dY0g7vmQ@estate-match.sxjhyyy.mongodb.net/estate-match-db?retryWrites=true&w=majority'),
    PreferenceModule,
    PropertiesModule,
    AuthenticationModule,
    UserModule,
    SearchModule,
    WebScraperModule,
    TensorflowModule,
  ],
  controllers: [CoreController],
})
export class CoreModule {}