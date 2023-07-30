import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { CoreController } from './core.controller';
import { PreferenceModule } from '@estate-match/api/prefrences/feature';
import { PropertiesModule } from '@estate-match/api/properties/feature';
import { AuthenticationModule } from '@estate-match/api/authentication/feature';
import { UserModule } from '@estate-match/api/users/feature'
import { SearchModule } from '@estate-match/api/search/feature';
import { WebScraperModule } from '@estate-match/api/webscraper/feature';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://teambluecos301:EQKMQ6y5tUKbChCp@testingcluster.sblumex.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }),
    PreferenceModule,
    PropertiesModule,
    AuthenticationModule,
    UserModule,
    SearchModule,
    WebScraperModule,
  ],
  //controllers: [CoreController],
})
export class CoreModule {}