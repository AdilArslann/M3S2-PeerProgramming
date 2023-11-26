import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Bookings {
  id: Generated<number>;
  userId: number;
  screeningId: number;
  numberOfTickets: number;
}

export interface Movies {
  id: Generated<number>;
  title: string;
  year: number;
}

export interface Screenings {
  id: Generated<number>;
  movieId: number;
  timestamp: string;
  totalTickets: number;
  ticketsLeft: number;
}

export interface Users {
  id: Generated<number>;
  email: string;
}

export interface DB {
  bookings: Bookings;
  movies: Movies;
  screenings: Screenings;
  users: Users;
}
