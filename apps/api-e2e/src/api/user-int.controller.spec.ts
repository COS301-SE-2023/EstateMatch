import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CoreModule } from './core.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose, { Schema, Document, Connection } from 'mongoose';
const TEST_CONNECTION = process.env['TEST_CONNECTION'] || '';
const dbUrl = TEST_CONNECTION;

const connectToDatabase = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(dbUrl);

    console.log('Connected to the database!');

    // Get the Mongoose connection
    const dbConnection = mongoose.connection;

    // Optional: You can add event listeners to handle connection events
    dbConnection.on('error', (error) => {
      console.error('Database connection error:', error);
    });

    dbConnection.on('disconnected', () => {
      console.log('Disconnected from the database');
    });

    // Return the Mongoose connection so you can use it in other parts of your application
    return dbConnection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

//create user interface
interface User extends Document {
  username: string;
  //password: string;
  email: string;
  firstName: string;
  lastName: string;
}

//create user schema
const UserSchema = new Schema<User> ({
  username: { type: String, required: true },
  //password: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

describe('UserController (integration)', () => {
  let app: INestApplication;
  let dbConnection: Connection;

  const setupTestApp = async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dbConnection = await connectToDatabase();
  };

  afterEach(async () => {
    await dbConnection.collection('users').deleteMany({});
  });

  beforeAll(async () => {
    await setupTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('User Testing', () => {

    const user1 = {
      //password: 'password1',
      email: 'user1@gmail.com',
      firstName: 'user1',
      lastName: 'user1',
      username: 'user1',
    };

    it('should set a user', async () => {

      const response = await request(app.getHttpServer())
        .post('/setUser')
        .send({ user: user1 });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(user1);
    });

    it('should get a user', async () => {

     await dbConnection.collection('users').insertOne(user1);

      const response = await request(app.getHttpServer())
        .post('/getUser')
        .send({ username: user1.username });

      expect(response.status).toBe(201);
      const data = JSON.stringify(response.body);
      console.log("Response data:"+data);
      //const data = { ...response.body};

      //expect(response.body).toMatchObject(user1);
    });

    it('should update a user', async () => {
        
        await dbConnection.collection('users').insertOne(user1);
  
        const updatedUser = {
          //password: 'password1',
          firstname : 'TestUser1',
          lastname : 'TestUser1',
          email: 'TestUser1@gmail.com',
          username: 'TestUser1',
        };

        const response = await request(app.getHttpServer())
          .post('/updateUser')
          .send({ 
            username: user1.username,
            user: updatedUser 
          });

        expect(response.status).toBe(201);

        const userData = response.body;
        
        const email = userData['email'];
        const firstname = userData['firstname'];
        const lastname = userData['lastname'];
        const username = userData['username'];

        const data = {
          email,
          firstname,
          lastname,
          username,
        };

        //expect(data).toMatchObject(updatedUser);

        //expect(response.body).toMatchObject(updatedUser);

        });

  });

  // describe('getting a user', () => {
   
  // });
});

//await dbConnection.collection('comment').insertOne(commentDtoStub());
