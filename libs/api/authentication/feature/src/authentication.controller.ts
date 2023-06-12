import { Body, Controller, Get, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ILogin, ILoginRequest, IRegister, IRegisterRequest } from '@estate-match/api/authentication/util';
import { AuthService } from './authentication.service';

const pass = 'password1234';

@Controller()
export class AuthController {
    constructor(private readonly service: AuthService) {}
    @Post('/login')
    async login(@Body() login: IRegister): Promise<any> {
        const loginRequest: ILoginRequest = {
            login: login
        };

        return this.service.login(loginRequest);
    }

    @Post('/register')
    async register(@Body() register: IRegister): Promise<any> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(register.password, saltOrRounds);

        //handle auth
        const registerRequest: IRegisterRequest = {
            register: {
                username: register.username,
                password: hash,
            }
        };

        return this.service.register(registerRequest);

        //handle user

    }

}