require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Course = require('./models/Course');

const seedCourses = async () => {
  await connectDB();

  const courses = [
    { courseName: 'Blockchain Technology', faculty: 'Dr. Smith' },
    { courseName: 'Operating Systems', faculty: 'Prof. Johnson' },
    { courseName: 'Design and Analysis of Algorithm', faculty: 'Dr. Alan' },
    { courseName: 'Software Engineering', faculty: 'Prof. Davis' },
    { courseName: 'Image and Video Processing', faculty: 'Dr. Turing' }
  ];

  try {
    // Optional: clear existing courses if you want a fresh list
    // await Course.deleteMany();
    
    for (let c of courses) {
      const exists = await Course.findOne({ courseName: new RegExp(c.courseName, 'i') });
      if (!exists) {
        await Course.create(c);
        console.log(`Added: ${c.courseName}`);
      } else {
        console.log(`Already exists: ${c.courseName}`);
      }
    }
    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedCourses();
