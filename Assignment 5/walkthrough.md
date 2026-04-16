# Travel Agency Website - AstraVoyage

I have completed the development of your full-stack travel booking website. The project is split into an Express backend acting as a REST API and a React/Vite frontend for the modern user interface using Tailwind CSS. 

## Features Implemented

1. **Authentication System**:
   - Secure User Signup & Login with JWT authentication.
   - Passwords securely hashed using `bcryptjs`.
2. **Travel Packages**:
   - Four predefined packages included (Goa, Kashmir, Udaipur, Kerala) complete with day-wise itinerary, description, high-quality images from Unsplash, pricing, and available travel modes.
   - The data was inserted using a Node seeding script `seed.js` to populate your MongoDB.
3. **Booking System**:
   - A multi-step form calculating total pricing based on user selection.
   - Logged-in users can select travel dates, group size, and preferred travel modes.
   - Bookings are safely tied to the authenticated user ID.
4. **Modern Frontend Features** (located in `/client`):
   - Eye-catching Hero Area with Dynamic Calls to Action.
   - Responsive Glassmorphism cards and modern layouts (via TailwindCSS).
   - Dynamic user dashboard to view ongoing and upcoming bookings.
   - Fully interactive components like form validations and dynamic loading states powered by `React` and `axios`.

## Folder Structure

```
c:\Users\Anuj\Desktop\Fullstack\Ass 5\
│
├── config/              # MongoDB connection info
├── controllers/         # Logic handlers for auth, packages, bookings
├── middleware/          # JWT Verification Middleware
├── models/              # Mongoose schema definitions (User, Package, Booking)
├── routes/              # Express API Routes
├── seed.js              # Initial Data Seeding Script (Executed)
├── server.js            # Main backend entry point
├── package.json         # Backend Node dependencies
│
└── client/              # Modern React UI Front-end built with Vite
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    └── src/
        ├── App.jsx      # Core React Router config
        ├── components/  # Navbar, Footer
        ├── pages/       # Home, LoginSignup, Packages, PackageDetails, BookingForm, Dashboard
        └── index.css    # Global and Tailwind utilities
```

## Setup Instructions to Run Locally

You must run *two* separate terminal windows—one for the backend, and one for the frontend.

### 1. Run the Backend API

Open a new terminal in the root directory `c:\Users\Anuj\Desktop\Fullstack\Ass 5`:
```bash
# Start the Node Express Server
node server.js
```
*Note: Ensure your MongoDB server is up/running locally on port 27017, as the `.env` default points to `mongodb://127.0.0.1:27017/travel_agency`.*

### 2. Run the React Frontend

Open another terminal and change directory to `client`:
```bash
cd client

# Start the Vite development server
npm run dev
```

Navigate your browser to the URL provided by Vite (usually `http://localhost:5173`).

With these running, you can explore the entire journey:
- View gorgeous destinations.
- Sign up for a new account.
- Successfully log in.
- Click "Book" on a destination.
- View and manage your upcoming reservations from the user dashboard.
