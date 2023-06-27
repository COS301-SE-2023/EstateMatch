import {UserEntity} from './user-entity.schema';
import {
    UserController,
    UserService,
}from '@estate-match/api/users/feature';
import {Test} from '@nestjs/testing';
import { IUser } from '../../util/src/interfaces';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { APP_PIPE } from '@nestjs/core';
import * as request from 'supertest';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<unknown>;
  };
  
  export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      findOne: jest.fn((entity) => entity),
      findOneBy: jest.fn(() => ({})),
      save: jest.fn((entity) => entity),
      findOneOrFail: jest.fn(() => ({})),
      delete: jest.fn(() => null),
      find: jest.fn((entities) => entities),
    })
  );

describe('UserController Integration', () => {
    const userUrl = `/users`;
    let app: INestApplication;
    let repoMock: MockType<Repository<IUser>>;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useFactory: repositoryMockFactory,
                },
                {
                    provide: APP_PIPE,
                    useValue: new ValidationPipe({
                        whitelist: true,
                        forbidNonWhitelisted: true,
                        transform: true,
                    }),
                },
            ],
            imports: [],
        }).compile();

        app = moduleRef.createNestApplication();
        repoMock = moduleRef.get(getRepositoryToken(UserEntity));
        await app.init();
    }
    );

    describe('GET /users', () => {
        it('should return an array of users', async () => {
            return request(app.getHttpServer())
                .get(userUrl)
                .expect(HttpStatus.OK)
        });
    });

});