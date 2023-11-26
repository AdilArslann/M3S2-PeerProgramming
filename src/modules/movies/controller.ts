import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import buildRepository from './repository';
import * as schema from './schema';
import { jsonRoute, unsupportedRoute } from '@/utils/middleware';
import type { Database } from '@/database';
import BadRequest from '@/utils/errors/BadRequest';

export default (db: Database) => {
  const router = Router();
  const movies = buildRepository(db);

  router
    .route('/')
    .get(
      jsonRoute(async (req) => {
        if (req.query.id) {
          const idsS = req.query.id.toString().split(',');
          const ids = idsS.map((id) => parseInt(id));
          const moviess = await movies.findByIds(ids);
          if (moviess.length === 0) {
            throw new BadRequest('No movies found');
          }
          return moviess;
        }
        return await movies.findAll();
      })
    )
    .post(
      jsonRoute(async (req) => {
        const body = schema.parseInsertable(req.body);
        return await movies.create(body);
      }, StatusCodes.CREATED)
    );

  router
    .route('/:id')
    .get(unsupportedRoute)
    .delete(unsupportedRoute)
    .patch(unsupportedRoute)
    .put(unsupportedRoute);

  return router;
};