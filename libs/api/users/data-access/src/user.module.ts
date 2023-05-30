import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "@estate-match/api/users/schema";
import { UserRepository } from "./user.repository";

@Module({
    imports: [
            MongooseModule.forFeature([{name : 'User', schema : UserSchema}]),
    ],
    exports: [ UserRepository, ],
    providers: [ UserRepository, ],
})
export class UserModule {}