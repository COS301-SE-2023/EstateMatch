import {

} from '@estate-match/api/authentication/util';
  import { Injectable } from '@nestjs/common';
  import { CommandBus } from '@nestjs/cqrs';
  
  @Injectable()
  export class AuthService {
    constructor(private readonly commandBus: CommandBus) {}

  }
  