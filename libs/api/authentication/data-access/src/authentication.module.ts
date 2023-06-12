import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthSchema } from "@estate-match/api/authentication/schema";
import { AuthRepository } from "./authentication.repository";


@Module({
    imports: [
            MongooseModule.forFeature([{name : 'Authentication', schema : AuthSchema}]),
    ],
    exports: [ AuthRepository, ],
    providers: [ AuthRepository, ],
})
export class AuthenticationModule {}