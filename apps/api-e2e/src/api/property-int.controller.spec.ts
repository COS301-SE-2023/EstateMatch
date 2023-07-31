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

interface PropertiesModel extends Document {
    title: string,
    location: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    garages: number | null,
    amenities: string[],
    images: string[],
  
    //username : UserModel;
  }
  
  const PropertiesSchema = new Schema<PropertiesModel>({
    title: {type: String, required: true},
    location: {type: String, required: true},
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    garages: Number,
    amenities: [String],
    images: [String],
  });

  describe('Properties Controller (Integration)', () => {
    let app: INestApplication;
  let dbConnection: Connection;

  const setupTestApp = async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        MongooseModule.forFeature([
          { name: 'Properties', schema: PropertiesSchema },
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
      user: user1.username,
      budget: 550000,
      location: 'Woodstock',
      bedrooms: 2,
      bathrooms: 3,
      garages: 1,
      extras: ['Pool'],
    };

    const UserProperty = {
        user: user1.username,
        address: 'test',
        price: 1000,
        bedrooms: 1,
        bathrooms: 1,
        garages: 1,
        amenities: [],
        liked: true,
        image: 'test image'
    }

    it('should like a property', async () => {
        const response = await request(app.getHttpServer())
        .post('/dislike')
        .send({ property: UserProperty });

        console.log("DISLIKE PROPERTY: "+JSON.stringify(response.body));

        const check = {
            message: "property disliked"
        }

        const data = JSON.stringify(response.body);



      expect(response.status).toBe(201);
      expect(check).toMatchObject(response.body);

    });




});

  });