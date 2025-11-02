# Vignan Timetable Backend API

A minimal Node.js backend for the Vignan Timetable Manager.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB (if using local):
```bash
mongod
```

3. Start the server:
```bash
npm run dev  # Development with nodemon
npm start    # Production
```

## API Endpoints

### Timetables
- `GET /api/timetables` - Get all timetables
- `GET /api/timetables/:section` - Get timetable for specific section
- `GET /api/timetables/:section/current` - Get current class for section
- `POST /api/timetables` - Create new timetable
- `PUT /api/timetables/:section` - Update timetable

### Faculty
- `GET /api/faculty` - Get all faculty
- `GET /api/faculty/:name/schedule` - Get faculty schedule
- `POST /api/faculty` - Create faculty

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:roomNumber/schedule` - Get room schedule
- `POST /api/rooms` - Create room

### Health Check
- `GET /api/health` - API status check

## Environment Variables

Create a `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vignan_timetable
NODE_ENV=development
```