import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CoreModule } from './core.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose, { Schema, Document, Connection } from 'mongoose';
const DATABASE_CONNECTION = process.env['DATABASE_CONNECTION'] || '';
const dbUrl = DATABASE_CONNECTION;

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

//create preference interface
interface PrefrencesModel extends Document {
  user: string;
  budget: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  extras: string[];

  //username : UserModel;
}

const PreferenceSchema = new Schema({
  user: { type: String, required: true },
  budget: Number,
  location: String,
  bedrooms: Number,
  bathrooms: Number,
  garages: Number,
  extras: [String],
});

describe('Preference Controller (Integration)', () => {
  let app: INestApplication;
  let dbConnection: Connection;

  const setupTestApp = async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        MongooseModule.forFeature([
          { name: 'Preference', schema: PreferenceSchema },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dbConnection = await connectToDatabase();
  };

  afterEach(async () => {
    await dbConnection.collection('prefrences').deleteMany({});
  });

  beforeAll(async () => {
    await setupTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Preference Testing', () => {
    const user1 = {
      //password: 'password1',
      email: 'user1@gmail.com',
      firstName: 'user1',
      lastName: 'user1',
      username: 'user1',
    };

    

    const UserPreference = {
      user:'user1',
      budget: 550000,
      location: 'Woodstock',
      bedrooms: 2,
      bathrooms: 3,
      garages: 1,
      extras: ['Pool'],
    };

    it('should set preference', async () => {
        await dbConnection.collection('users').insertOne(user1);

      const response = await request(app.getHttpServer())
        .post('/setPreferences')
        .send({ perference: UserPreference });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(UserPreference);
    });

    it('should get preference', async () => {
        await dbConnection.collection('users').insertOne(user1);

      const response = await request(app.getHttpServer())
        .post('/getPreferences')
        .send({ username: user1.username });

      expect(response.status).toBe(201);
      //expect(response.body).toMatchObject(UserPreference);

    });
  });
});
