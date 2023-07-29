import "text-encoding-utf-8"
import { MongooseModule } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { PrefrencesSchema } from '../../../prefrences/schema/src';
import { UserSchema } from '../../schema/src';
import { UserService } from '.';


describe('UserService (Integration)', () => {
    let service : UserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports : [
                MongooseModule.forRoot('mongodb+srv://teambluecos301:Wtm7JJS8dY0g7vmQ@estate-match.sxjhyyy.mongodb.net/estate-match-db?retryWrites=true&w=majority'),
                MongooseModule.forFeature([{ name: 'User', schema: UserSchema },
                                          {name: 'Prefrences', schema: PrefrencesSchema},
                                ]),
            ],
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);

    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(service).toBeTruthy();
    });

});