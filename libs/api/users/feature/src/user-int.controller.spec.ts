import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '.';
import { UserSchema } from '../../schema/src';
import { UserService } from '.';
import { UserModel } from '../../schema/src';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Module } from 'module';
import { PrefrencesSchema } from '../../../prefrences/schema/src';

describe('UserController (Integration)', () => {
  let app: INestApplication;
  let mongodb: MongoMemoryServer;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [
        MongooseModule.forRoot('mongodb+srv://teambluecos301:Wtm7JJS8dY0g7vmQ@estate-match.sxjhyyy.mongodb.net/estate-match-db?retryWrites=true&w=majority'),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema },
                                  {name: 'Prefrences', schema: PrefrencesSchema},
                        ]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeTruthy();
  }
  );

  // it('should create a user', async () => {
  //   const user: UserModel = {
  //     username : 'INTUsername',
  //     email : 'INTEmail',
  //     firstName : 'INTFirstname',
  //     lastName : 'INTLastname',
  //   };

  //   const createdUser = await userService.createUser(user);
  //   expect(createdUser).toEqual(user);
  // });
});

//   beforeEach(async () => {
//     // mongodb = new MongoMemoryServer();
//     // const mongoUri = await mongodb.getUri();

//     // const moduleFixture: TestingModule = await Test.createTestingModule({
//     //   imports: [
//     //     Module,
//     //     MongooseModule.forRoot(mongoUri, {
//     //       useNewUrlParser: true,
//     //       useUnifiedTopology: true,
//     //     }),
//     //   ],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   afterAll(async () => {
//     await mongodb.stop();
//     await app.close();
//   });

//   it('/users (GET) - should return an empty array of users', async () => {
//     const response = await request(app.getHttpServer())
//       .get('/users')
//       .expect(200);
//     expect(response.body).toEqual([]);
//   });

//   it('/users (POST) - should create a user', async () => {
//     const userData = {
//       firstName: 'INTFirstname',
//       lastName: 'INTLastname',
//       username: 'INTUsername',
//       email: 'INTEmail',
//       password: 'INTPassword',
//     };

//     const response = await request(app.getHttpServer())
//       .post('/users')
//       .send(userData)
//       .expect(201);

//     //expect (response.body.toHaveProperty('id'));
//     expect(response.body.firstName).toEqual(userData.firstName);
//     expect(response.body.lastName).toEqual(userData.lastName);
//     expect(response.body.username).toEqual(userData.username);
//     expect(response.body.email).toEqual(userData.email);
//     expect(response.body.password).toEqual(userData.password);

//   });
// });