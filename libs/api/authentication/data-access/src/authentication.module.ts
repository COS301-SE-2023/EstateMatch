import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthenticationSchema } from "@estate-match/api/authentication/schema";
import { AuthRepository } from "./authentication.repository";


@Module({
    imports: [
            MongooseModule.forFeature([{name : 'Authentication', schema : AuthenticationSchema}]),
    ],
    exports: [ AuthRepository, ],
    providers: [ AuthRepository, ],
})
export class AuthenticationModule {}