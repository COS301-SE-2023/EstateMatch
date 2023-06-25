import { Module } from '@nestjs/common';
import { LikedPropertiesRepository } from './liked-property.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { LikedPropertiesSchema } from '@estate-match/api/properties/schema';

//added the properties schema to the module
import { PropertiesSchema } from '@estate-match/api/properties/schema';
import { PropertiesRepository } from './properties.repository';


@Module({
    imports: [
        MongooseModule.forFeature([{name : 'LikedProperties', schema : LikedPropertiesSchema}]),
        MongooseModule.forFeature([{name : 'Properties', schema : PropertiesSchema}])
],
  providers: [LikedPropertiesRepository,
    PropertiesRepository],
  exports: [LikedPropertiesRepository,
    PropertiesRepository],
})
export class PropertiesModule {}
