# SpaceLink - Real-Time Unified Rental Platform

A comprehensive MERN stack application for property rentals, featuring real-time filtering, user authentication, booking system, and property management.

## 🏗️ Project Structure

```
spacelink/
├── client/          # React frontend (Vite + Bootstrap)
├── server/          # Node.js backend (Express + MongoDB)
├── README.md
└── package.json     # Root package.json for workspace
```

## ✨ Features

### 🏠 Property Management

- **Categories**: Property Rentals, Commercial, Land, Parking, Events
- **Smart Filtering**: Real-time search by category, price, location, availability
- **Owner Tools**: Add, edit, disable properties, view bookings

# SpaceLink

SpaceLink is a MERN-stack rental marketplace that connects property owners with renters. It includes property listings, advanced filtering, property management tools for owners, a booking system, notifications, and an admin moderation dashboard.

This README summarizes the project, how to run it locally, important API endpoints, environment variables, and recommended next steps.

## Table of contents

- About
- Quick start
- Project structure
- Environment variables
- API endpoints
- Database schema
- Development notes & tips
- Contributing

## About

- Frontend: React 18 (Vite) + Bootstrap 5 + react-select
- Backend: Node.js + Express + MongoDB (Mongoose)
- Auth: JWT + bcryptjs, Google OAuth support
- Goal: Lightweight rental marketplace with easy owner workflows and simple booking flow.

## Quick start (local development)

Prerequisites

- Node.js (>= 16)
- npm or yarn
- MongoDB (local or Atlas)

Install & run

1. Clone the repository

```powershell
git clone <repo-url>
cd spacelink
```

2. Install server dependencies and start the API

```powershell
cd server
npm install
npm run dev
```

3. Install client dependencies and start the frontend

```powershell
cd ../client
npm install
npm run dev
```

Default URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project structure (high level)

```
spacelink/
├── client/                 # React frontend
├── server/                 # Node/Express backend
   ├── models/              # Mongoose models
   ├── routes/              # Express routes
   ├── middleware/          # Auth, error handling
   └── index.js
```

## Environment variables

Create a `.env` in `server/` and `client/` (examples below):

server/.env

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/spacelink
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=471401453680-e7h4dbp214igd7bpa2agt29j4uspts2m.apps.googleusercontent.com
```

client/.env

```
VITE_API_URL=http://localhost:5000/api
```

## API endpoints (summary)

All responses follow the standard envelope:

```json
{ "success": boolean, "message": string, "data": any }
```

Authentication

- POST /api/auth/register — register a new user
- POST /api/auth/login — login (returns JWT)
- POST /api/auth/google — login/register using Google ID token

Users

- GET /api/users/me — get profile (protected)
- PUT /api/users/me — update profile (protected)

Properties

- GET /api/properties — list properties (supports filters and pagination)
  - query params: category, subtype, city, state, search, minPrice, maxPrice, page, limit
- GET /api/properties/:id — get single property details
- POST /api/properties — create property (protected)
- PUT /api/properties/:id — update property (protected: owner/admin)
- DELETE /api/properties/:id — delete property (protected: owner/admin)

Bookings

- POST /api/bookings — create a booking (protected)
- GET /api/bookings — get current user's bookings (protected)
- PATCH /api/bookings/:id/cancel — cancel booking (protected)

Admin

- GET /api/admin/properties/pending — list pending properties (admin)
- PUT /api/admin/properties/:id/verify — verify or reject property (admin)

## Example requests

Login (email/password)

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

List properties (filters)

```bash
curl "http://localhost:5000/api/properties?city=Chennai&category=Apartment&search=sea"
```

Create booking (authenticated)

```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"propertyId":"<id>","fromDate":"2025-10-10","toDate":"2025-10-15"}'
```

## Database schemas (short)

Users

```js
{
  email, password(hashed), name, city, state, profileComplete;
}
```

Properties

```js
{ ownerId, category, subtype, title, description, price, address: { city, state }, image, isDisabled }
```

Bookings

```js
{
  userId, propertyId, fromDate, toDate, totalPrice, status;
}
```

## Development notes & tips

- Filters: frontend `FindProperty` uses controlled react-select dropdowns. Filtering is applied when the "Search" button is pressed.
- Navbar: responsive mobile-first menu, dropdowns are styled to display inline in mobile collapsed view.
- Authentication: tokens are stored in localStorage by default.

## Recommended next steps

- Add test coverage (Jest + Supertest for server; React Testing Library for client)
- Add CI workflow (GitHub Actions) for lint/test/build
- Move images to cloud storage (S3/Cloudinary) for production

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit and push
4. Open a PR and describe the change

---

If you'd like, I can also:

- Add a dedicated `API.md` with full request/response examples and sample payloads
- Add a Postman collection or OpenAPI spec

---

SpaceLink — connecting spaces with people.
