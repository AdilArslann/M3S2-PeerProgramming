import express from 'express';
// import categories from './modules/categories/controller';
import users from './modules/users/controller';
import movies from './modules/movies/controller';
import jsonErrorHandler from './middleware/jsonError';
import { type Database } from './database';

export default function createApp(db: Database) {
  const app = express();

  app.use(express.json());

  app.use('/users', users(db));
  app.use('/movies', movies(db));

  app.use(jsonErrorHandler);

  return app;
}