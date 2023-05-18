import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://teambluecos301:dadel@teamblue301@estate-match.sxjhyyy.mongodb.net/?retryWrites=true&w=majority'),
  ],
})
export class CoreModule {}