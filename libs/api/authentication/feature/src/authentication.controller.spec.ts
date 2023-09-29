import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './authentication.controller';
import { AuthService } from './authentication.service';
import { CommandBus } from '@nestjs/cqrs';
import { ILogin, ILoginRequest, ILoginResponse, IRegister, IRegisterRequest, IRegisterResponse } from '@estate-match/api/authentication/util';

describe('AuthController', () => {
  let app: TestingModule;
  let controller: AuthController;
  let service: AuthService;
  let commandBusMock: { execute: jest.Mock };

  beforeAll(async () => {
    commandBusMock = { execute: jest.fn() };
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService,
        {
            provide: CommandBus,
            useValue: commandBusMock,
        }],
    }).compile();

    controller = app.get<AuthController>(AuthController);
    service = app.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should call auth service and logg the use rin', async () => {
      const request: ILogin = {
            username: 'test',
            password:  'test1234'
      };

      const expectedResult: ILoginResponse = {
        message: 'Login successful',
      };

      jest.spyOn(service, 'login').mockResolvedValue(expectedResult);
      const result = await controller.login(request);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('register', () => {
    it('should call auth service and create a new user', async () => {
      const request: IRegister = {
        username: 'test',
        password: 'test1234',
        email: 'test@gmail.com',
        firstName: 'TestFName',
        lastName: 'TestLName',
        languagePref: 'en'

      };

      const expectedResult: IRegisterResponse = {
        message: 'Register successful',
      };

      jest.spyOn(service, 'register').mockResolvedValue(expectedResult);
      const result = await controller.register(request);
      expect(result).toEqual(expectedResult);
    });
  });
});