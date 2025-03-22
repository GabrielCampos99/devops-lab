import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new user (POST /users)', async () => {
    const createUserDto = { name: 'John Doe', email: 'john@example.com' };
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(Number),
      name: 'John Doe',
      email: 'john@example.com',
    });
  });

  it('should retrieve all users (GET /users)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a user by ID (GET /users/:id)', async () => {
    const createUserDto = { name: 'Jane Doe', email: 'jane@example.com' };
    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);

    const userId = createUserResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200);

    expect(response.body).toEqual({
      id: userId,
      name: 'Jane Doe',
      email: 'jane@example.com',
    });
  });

  it('should update a user (PATCH /users/:id)', async () => {
    const createUserDto = { name: 'Alice', email: 'alice@example.com' };
    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);

    const userId = createUserResponse.body.id;
    const updateUserDto = { name: 'Alice Updated' };

    const response = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send(updateUserDto)
      .expect(200);

    expect(response.body).toEqual({
      id: userId,
      name: 'Alice Updated',
      email: 'alice@example.com',
    });
  });

  it('should delete a user (DELETE /users/:id)', async () => {
    const createUserDto = { name: 'Bob', email: 'bob@example.com' };
    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);

    const userId = createUserResponse.body.id;

    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(404);
  });
});
