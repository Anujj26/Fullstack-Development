# AstraVoyage – Travel Agency Web Application

AstraVoyage is a full-stack travel booking platform designed to deliver a smooth and modern user experience. The application combines a robust backend built with Node.js and Express, and a responsive frontend powered by React and Tailwind CSS. It allows users to explore curated travel packages, authenticate securely, and manage bookings efficiently.

---

## Overview

This project simulates a real-world travel agency system where users can browse destinations, view detailed itineraries, and book trips based on their preferences. The architecture separates concerns clearly between frontend and backend, making the system scalable and easy to maintain.

---

## Core Functionalities

### User Authentication

* Secure registration and login system
* Password encryption using bcrypt
* Token-based authentication using JWT
* Persistent user sessions

### Travel Packages

* Preloaded destinations including Goa, Kashmir, Udaipur, and Kerala
* Each package contains:

  * Detailed descriptions
  * Day-by-day itinerary
  * Pricing and duration
  * Travel modes (flight, train, bus)
  * High-quality images

### Booking System

* Users can select travel details such as:

  * Travel date
  * Number of travelers
  * Duration
  * Preferred mode of transport
* Booking data is linked to authenticated users
* Dynamic cost calculation based on inputs

### User Dashboard

* Displays all bookings associated with the logged-in user
* Tracks upcoming and ongoing trips
* Provides booking management capabilities

### Frontend Experience

* Clean and responsive design using Tailwind CSS
* Smooth navigation with React Router
* Interactive UI elements with real-time validation
* Optimized loading and state handling using Axios

---

## Project Structure

```
Ass 5/
│
├── config/              # Database configuration
├── controllers/         # Business logic handlers
├── middleware/          # Authentication middleware
├── models/              # Database schemas
├── routes/              # API endpoints
├── seed.js              # Script to populate initial data
├── server.js            # Backend entry point
├── package.json         # Backend dependencies
│
└── client/              # Frontend application
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── components/
        ├── pages/
        └── index.css
```

---

## Installation and Setup

### Prerequisites

* Node.js installed
* MongoDB running locally (default: mongodb://127.0.0.1:27017)

---

### Backend Setup

Open terminal in the root project directory:

```
node server.js
```

Ensure MongoDB is active before starting the server.

---

### Frontend Setup

Open a second terminal:

```
cd client
npm run dev
```

Access the application through the local development URL (typically http://localhost:5173).

---

## API Endpoints

### Authentication

* POST /api/auth/signup
* POST /api/auth/login

### Packages

* GET /api/packages
* GET /api/packages/:id

### Bookings

* POST /api/bookings
* GET /api/bookings/user
* DELETE /api/bookings/:id

---

## Database Models

### User

* Name
* Email
* Password (hashed)

### Package

* Name
* Description
* Price
* Duration
* Itinerary
* Images

### Booking

* User reference
* Package reference
* Travel date
* Number of people
* Mode of travel
* Duration
* Contact number

---

## Additional Notes

* Environment variables should be configured using a `.env` file
* MongoDB connection string and JWT secret must be defined
* Initial package data is inserted via `seed.js`

---

## Summary

AstraVoyage demonstrates the implementation of a complete travel booking system with modern design and secure backend integration. It is suitable as an academic project or as a base for further enhancements such as payment integration, admin dashboards, or deployment.

---
