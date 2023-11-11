# M3S2-PeerProgramming

## Introduction

This project aims to build a movie ticket booking system using the existing movies.db database. The system will allow users to book tickets for movies and administrators to perform basic management tasks.

## Requirements

### Users

1. **Get List of Movies**
   - Endpoint: `/movies`
   - Method: `GET`
   - Input: List of movie IDs
   - Output: Movie details (id, title, year) for the provided IDs

2. **Get List of Screenings for Booking**
   - Endpoint: `/screenings`
   - Method: `GET`
   - Output: List of available screenings with session information (timestamp, available tickets, total tickets) and movie details (title, year)

3. **Get List of Booked Tickets**
   - Endpoint: `/tickets`
   - Method: `GET`
   - Output: List of booked tickets for the user

4. **Create Booking for a Screening**
   - Endpoint: `/bookings`
   - Method: `POST`
   - Input: Movie ID, Screening timestamp, Number of tickets to book
   - Output: Confirmation of the booking

### Administrators

1. **Create New Viewing Screenings**
   - Endpoint: `/admin/screenings`
   - Method: `POST`
   - Input: Movie ID, Screening timestamp, Total tickets allocation
   - Output: Confirmation of the new screening

2. **Optional: Delete Empty Screenings**
   - Endpoint: `/admin/screenings/{screeningId}`
   - Method: `DELETE`
   - Output: Confirmation of deletion if the screening is empty

3. **Optional: Change Screening's Ticket Allocation**
   - Endpoint: `/admin/screenings/{screeningId}`
   - Method: `PUT`
   - Input: New total tickets allocation
   - Output: Confirmation of the ticket allocation change
