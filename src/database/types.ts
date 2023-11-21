import type { ColumnType, Generated } from 'kysely';

// Add these interfaces to your types.ts
export interface Movie {
  id: Generated<number>;
  title: string;
  year: number;
}

export interface Screenings {
  id: Generated<number>;
  movieId: number;
  timestamp: string; // or Date if you prefer
  totalTickets: number;
  ticketsLeft: number;
}

export interface Bookings {
  id: Generated<number>;
  screeningId: number;
  userId: number; // Assuming you have a users table
  numberOfTickets: number;
}

// Extend the DB interface
export interface DB {
  movie: Movie;
  screenings: Screenings;
  bookings: Bookings;
  // ... include other tables from movies.db as needed
}
