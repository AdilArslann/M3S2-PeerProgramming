import { expect } from 'vitest';
import { Insertable } from 'kysely';
import { Movies } from '@/database';
import supertest from 'supertest';
import createTestDatabase from '@tests/utils/createTestDatabase';
import { selectAllFor } from '@tests/utils/records';
import createApp from '@/app';

const movieFactory = (
  overrides: Partial<Insertable<Movies>> = {}
): Insertable<Movies> => ({
  title: 'test Movie title',
  year: 2020,
  ...overrides,
});

const movieMatcher = (overrides: Partial<Insertable<Movies>> = {}) => ({
  id: expect.any(Number),
  ...overrides,
  ...movieFactory(overrides),
});

const db = await createTestDatabase();
const app = createApp(db);
const selectMovies = selectAllFor(db, 'movies');

afterEach(async () => {
  await db.deleteFrom('movies').execute();
});

describe('Post', () => {
  it('should create a new movie', async () => {
    const response = await supertest(app)
      .post('/movies')
      .send(movieFactory())
      .expect(201);

    expect(response.body).toMatchObject(movieMatcher());
    expect(await selectMovies()).toEqual([movieMatcher()]);
  });
  it('should return 400 if title is missing', async () => {
    await supertest(app)
      .post('/movies')
      .send(movieFactory({ title: undefined }))
      .expect(400);
  });
  it('should return 400 if year is missing', async () => {
    await supertest(app)
      .post('/movies')
      .send(movieFactory({ year: undefined }))
      .expect(400);
  });
});
describe('Get', () => {
  it('should return all movies', async () => {
    await db
      .insertInto('movies')
      .values([movieFactory(), movieFactory({ title: 'test2 Movie title' })])
      .execute();

    const response = await supertest(app).get('/movies').expect(200);

    expect(response.body).toMatchObject([
      movieMatcher(),
      movieMatcher({ title: 'test2 Movie title' }),
    ]);
    expect(await selectMovies()).toEqual([
      movieMatcher(),
      movieMatcher({ title: 'test2 Movie title' }),
    ]);
  });

  it('should return all movies with given ids', async () => {
    const movie = await supertest(app)
      .post('/movies')
      .send(movieFactory())
      .expect(201);
    const movie2 = await supertest(app)
      .post('/movies')
      .send(movieFactory({ title: 'test2 Movie title' }))
      .expect(201);
    const response = await supertest(app)
      .get(`/movies?id=${movie.body.id}`)
      .expect(200);

    expect(response.body).toMatchObject([movieMatcher()]);
    expect(await selectMovies()).toEqual([
      movieMatcher(),
      movieMatcher({ title: 'test2 Movie title' }),
    ]);
  });

  it('should return 400 if movie does not exist', async () => {
    await supertest(app).get('/movies?id=1').expect(400);
  });
});
