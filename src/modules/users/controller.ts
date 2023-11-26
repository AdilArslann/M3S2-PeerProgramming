import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import buildRepository from './repository';
import * as schema from './schema';
import { jsonRoute, unsupportedRoute } from '@/utils/middleware';
import type { Database } from '@/database';

export default (db: Database) => {
  const router = Router();
  const repository = buildRepository(db);

  router
    .route('/')
    .post(
      jsonRoute(async (req) => {
        const body = schema.parseInsertable(req.body);
        return await repository.create(body);
      }, StatusCodes.CREATED)
    )
    .get(
      jsonRoute(async () => {
        return await repository.findAll();
      })
    );

  router
    .route('/:id')
    .get(unsupportedRoute)
    .delete(unsupportedRoute)
    .patch(unsupportedRoute)
    .put(unsupportedRoute);

  return router;
};
