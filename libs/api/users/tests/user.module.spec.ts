import {Test, TestingModule} from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '../feature/src';
import { UserSchema } from '../schema/src';
import { UserService } from '../feature/src';
import {INestApplication} from '@nestjs/common';

import * as request from 'supertest';
import {MongoMemoryServer} from 'mongodb-memory-server';
import { Module } from 'module';
