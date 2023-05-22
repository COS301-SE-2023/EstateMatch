import { Module } from '@nestjs/common';
import { LikedPropertiesRepository } from './liked-property.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { LikedPropertiesSchema } from '@estate-match/api/properties/schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name : 'LikedProperties', schema : LikedPropertiesSchema}]),
],
  providers: [LikedPropertiesRepository],
  exports: [LikedPropertiesRepository],
})
export class PropertiesModule {}
