// movies.test.ts

import { test, expect } from 'vitest';
import { createApp } from '../src/app'; // Adjust based on your app structure

const app = createApp(); // Assuming you have a function to create the app instance

test('should get a list of movies by providing their IDs', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/movies?id=133093,816692',
  });

  expect(response.statusCode).toBe(200);
  // Add more assertions based on the expected response structure
});
