require('dotenv').config();
const connectDB = require('../config/database');
const seedData = require('../config/seedData');

const runSeed = async () => {
  try {
    await connectDB();
    await seedData();
    console.log('Seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

runSeed();