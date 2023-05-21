import { Module } from '@nestjs/common';
import { LikedPropertiesRepository } from './liked-property.repository';

@Module({
  providers: [LikedPropertiesRepository],
  exports: [LikedPropertiesRepository],
})
export class PropertiesModule {}
