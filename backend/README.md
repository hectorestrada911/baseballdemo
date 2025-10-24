# Baseball Backend API

Backend API for the Baseball Data Platform.

## Setup

```bash
npm install
npm run dev
```

## API Endpoints

- `GET /api/players` - Get all players
- `GET /api/players/:id` - Get player by ID
- `POST /api/upload` - Upload TrackMan CSV data
- `GET /api/stats` - Get team statistics

## Environment Variables

Create a `.env` file with:

```
PORT=3001
NODE_ENV=development
```
