const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('./models/Package');

dotenv.config();

const packages = [
  {
    name: 'Goa Getaway',
    price: 15000,
    duration: 4,
    itinerary: [
      { day: 1, description: 'Arrival and Check-in, relax at North Goa beaches.' },
      { day: 2, description: 'Sightseeing in South Goa.' },
      { day: 3, description: 'Water sports and Dudhsagar waterfall visit.' },
      { day: 4, description: 'Departure.' }
    ],
    description: 'Experience the magic of Goa beaches, vibrant nightlife, and Portuguese heritage.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop',
    travelModes: ['Flight', 'Train', 'Bus']
  },
  {
    name: 'Kashmir Paradise',
    price: 25000,
    duration: 5,
    itinerary: [
      { day: 1, description: 'Arrival in Srinagar, Shikara ride on Dal Lake.' },
      { day: 2, description: 'Day trip to Gulmarg, Gondola ride.' },
      { day: 3, description: 'Day trip to Pahalgam.' },
      { day: 4, description: 'Visit Mughal Gardens in Srinagar.' },
      { day: 5, description: 'Departure from Srinagar.' }
    ],
    description: 'Discover the paradise on earth with snow-capped mountains and beautiful valleys.',
    image: 'https://images.unsplash.com/photo-1581793745862-9ed1db6ce9a7?q=80&w=2070&auto=format&fit=crop',
    travelModes: ['Flight']
  },
  {
    name: 'Udaipur Royal Tour',
    price: 18000,
    duration: 3,
    itinerary: [
      { day: 1, description: 'Arrival in Udaipur, Lake Pichola boat ride.' },
      { day: 2, description: 'Visit City Palace, Jag Mandir, and Saheliyon ki Bari.' },
      { day: 3, description: 'Departure.' }
    ],
    description: 'Explore the City of Lakes and experience the royal heritage of Rajasthan.',
    image: 'https://images.unsplash.com/photo-1615836245337-f839d40a4ebd?q=80&w=2070&auto=format&fit=crop',
    travelModes: ['Flight', 'Train', 'Bus']
  },
  {
    name: 'Kerala Backwaters',
    price: 22000,
    duration: 4,
    itinerary: [
      { day: 1, description: 'Arrival in Kochi, drive to Munnar.' },
      { day: 2, description: 'Munnar sightseeing (Tea gardens, Mattupetty).' },
      { day: 3, description: 'Drive to Alleppey, Houseboat stay.' },
      { day: 4, description: 'Departure from Kochi.' }
    ],
    description: 'Relax in the serene backwaters and lush green hills of God\'s Own Country.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2069&auto=format&fit=crop',
    travelModes: ['Flight', 'Train']
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travel_agency')
  .then(async () => {
    console.log('MongoDB Connected. Seeding...');
    await Package.deleteMany(); // Clear existing
    await Package.insertMany(packages);
    console.log('Data seeded successfully!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
