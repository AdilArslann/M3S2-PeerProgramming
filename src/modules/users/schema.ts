import { z } from 'zod';
import type { Users } from '@/database';

type Record = Users;
const schema = z.object({
  id: z.coerce.number().int().positive(),
  email: z.string().email(),
});

const insertable = schema.omit({ id: true });
const partial = insertable.partial();

export const parseId = (id: unknown) => schema.shape.id.parse(id);
export const parse = (record: unknown) => schema.parse(record);
export const parseInsertable = (record: unknown) => insertable.parse(record);
export const parsePartial = (record: unknown) => partial.parse(record);

// matches database and validation schema keys
export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[];
