import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreController } from './core.controller';
import { PreferenceModule } from '@estate-match/api/prefrences/feature';
import { PropertiesModule } from '@estate-match/api/properties/feature';
import { AuthenticationModule } from '@estate-match/api/authentication/feature';
import { UserModule } from '@estate-match/api/users/feature'
 
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://teambluecos301:Wtm7JJS8dY0g7vmQ@estate-match.sxjhyyy.mongodb.net/estate-match-db?retryWrites=true&w=majority'),
    PreferenceModule,
    PropertiesModule,
    AuthenticationModule,
    UserModule
  ],
  controllers: [CoreController],
})
export class CoreModule {}