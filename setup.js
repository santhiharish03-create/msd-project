const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up Vignan Timetable System...');

// Install backend dependencies
console.log('Installing backend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'backend'), stdio: 'inherit' });
} catch (error) {
  console.error('Backend setup failed:', error.message);
}

// Install frontend dependencies
console.log('Installing frontend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'timetable'), stdio: 'inherit' });
} catch (error) {
  console.error('Frontend setup failed:', error.message);
}

console.log('Setup complete! Run "npm start" to launch the system.');