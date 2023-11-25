import { Kysely, SqliteDatabase } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('movies')
    .addColumn('id', 'integer', (column) =>
      column.primaryKey().autoIncrement().notNull()
    )
    .addColumn('title', 'text', (column) => column.notNull())
    .addColumn('description', 'text', (column) => column.notNull())
    .addColumn('image_url', 'text', (column) => column.notNull())
    .execute();

  await db.schema
    .createTable('users')
    .addColumn('id', 'integer', (column) =>
      column.primaryKey().autoIncrement().notNull()
    )
    .addColumn('email', 'text', (column) => column.notNull())
    .execute();

  await db.schema
    .createTable('screenings')
    .addColumn('id', 'integer', (column) =>
      column.primaryKey().autoIncrement().notNull()
    )
    .addColumn('movie_id', 'integer', (column) =>
      column.references('movies.id').notNull()
    )
    .addColumn('timestamp', 'datetime', (column) => column.notNull())
    .addColumn('total_tickets', 'integer', (column) => column.notNull())
    .addColumn('tickets_left', 'integer', (column) => column.notNull())
    .execute();

  await db.schema
    .createTable('bookings')
    .addColumn('id', 'integer', (column) =>
      column.primaryKey().autoIncrement().notNull()
    )
    .addColumn('user_id', 'integer', (column) =>
      column.references('users.id').notNull()
    )
    .addColumn('screening_id', 'integer', (column) =>
      column.references('screenings.id').notNull()
    )
    .addColumn('number_of_tickets', 'integer', (column) => column.notNull())
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('bookings').execute();
  await db.schema.dropTable('screenings').execute();
  await db.schema.dropTable('users').execute();
  await db.schema.dropTable('movies').execute();
}
