import { expect } from 'vitest';
import { Insertable } from 'kysely';
import { Users } from '@/database';
import supertest from 'supertest';
import createTestDatabase from '@tests/utils/createTestDatabase';
import { selectAllFor } from '@tests/utils/records';
import createApp from '@/app';

const userFactory = (
  overrides: Partial<Insertable<Users>> = {}
): Insertable<Users> => ({
  email: 'test@gmail.com',
  ...overrides,
});

const userMatcher = (overrides: Partial<Insertable<Users>> = {}) => ({
  id: expect.any(Number),
  ...overrides,
  ...userFactory(overrides),
});

const db = await createTestDatabase();
const app = createApp(db);
// Selects all users from the database
const selectUsers = selectAllFor(db, 'users');

afterEach(async () => {
  await db.deleteFrom('users').execute();
});

describe('Post', () => {
  it('should create a new user', async () => {
    const response = await supertest(app)
      .post('/users')
      .send(userFactory())
      .expect(201);

    expect(response.body).toMatchObject(userMatcher());
    expect(await selectUsers()).toEqual([userMatcher()]);
  });
  it('should return 400 if email is missing', async () => {
    await supertest(app)
      .post('/users')
      .send(userFactory({ email: undefined }))
      .expect(400);
  });
  it('should return 400 if email is invalid', async () => {
    await supertest(app)
      .post('/users')
      .send(userFactory({ email: 'invalid' }))
      .expect(400);
  });
});
describe('Get', () => {
  it('should return all users', async () => {
    await db
      .insertInto('users')
      .values([userFactory(), userFactory({ email: 'test2@gmail.com' })])
      .execute();

    const response = await supertest(app).get('/users').expect(200);

    expect(response.body).toEqual([
      userMatcher(),
      userMatcher({ email: 'test2@gmail.com' }),
    ]);
  });
});
