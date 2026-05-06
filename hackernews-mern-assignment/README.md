# Hacker News MERN Assignment

Mini full-stack MERN web application that scrapes top Hacker News stories, stores them in MongoDB, and allows users to authenticate and bookmark stories.

## Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js
- JWT Authentication
- Cheerio + Axios Scraper

## Features

- Scrapes top 10 stories from Hacker News
- Stores title, URL, points, author, and posted time in MongoDB
- Scraper runs automatically on backend server start
- Scraper can also be triggered manually using `POST /api/scrape`
- User register and login with JWT
- Fetch all stories sorted by points descending
- Fetch single story by id
- Toggle bookmark for authenticated users
- Protected bookmarks page
- React Context API for authentication state
- Pagination support with `page` and `limit`

## Folder Structure

```bash
hackernews-mern-assignment/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
└── frontend/
    └── src/
        ├── api/
        ├── components/
        ├── context/
        └── pages/
```

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Backend Environment Variables

Create a `.env` file inside `backend`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hackernews_assignment
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Frontend Environment Variables

Create a `.env` file inside `frontend`:

```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

### Stories

```http
POST /api/scrape
GET /api/stories
GET /api/stories?page=1&limit=10
GET /api/stories/:id
POST /api/stories/:id/bookmark
```

`POST /api/stories/:id/bookmark` requires JWT token:

```http
Authorization: Bearer <token>
```

## Suggested Commit History

Do not submit the assignment in one commit. Use multiple meaningful commits like:

```bash
git add .
git commit -m "Initial project setup"
git commit -m "Add backend models and database connection"
git commit -m "Implement Hacker News scraper"
git commit -m "Add authentication APIs"
git commit -m "Add story and bookmark APIs"
git commit -m "Build React authentication flow"
git commit -m "Create story listing and bookmark UI"
git commit -m "Add README and final cleanup"
```

## Loom Video Points

In the walkthrough, explain:

- Project folder structure
- How scraper works using Axios and Cheerio
- How data is stored and updated in MongoDB
- JWT auth flow
- Protected bookmark API and page
- React Context API usage
- Pagination implementation
