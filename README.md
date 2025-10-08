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

# SpaceLink Rental Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://spacelink-rental.vercel.app)

> **Live Project:** [https://spacelink-rental.vercel.app](https://spacelink-rental.vercel.app)

SpaceLink is a modern MERN-stack rental marketplace for property owners and renters. It features advanced property filtering, secure authentication, booking management, and a responsive UI.

---

## 🚀 Features

- Property listing, search, and filtering (category, subtype, city, state, price)
- Owner dashboard: add/edit/manage properties, view bookings
- Booking system with real-time availability
- JWT authentication (email/password + Google OAuth)
- Admin dashboard for property verification
- Responsive, mobile-first UI (React + Bootstrap)

---

## 🏗️ Project Structure

```

spacelink/
├── client/ # React frontend (Vite + Bootstrap)
├── server/ # Node.js backend (Express + MongoDB)

````

---

## ⚡ Quick Start

**Prerequisites:** Node.js >= 16, npm/yarn, MongoDB

1. Clone the repo
   ```bash
   git clone <repo-url>
   cd spacelink
````

2. Install backend & start API
   ```bash
   cd server
   npm install
   npm run dev
   ```
3. Install frontend & start client
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173)

---

## 🔑 Environment Variables

**server/.env**

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/spacelink
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=471401453680-e7h4dbp214igd7bpa2agt29j4uspts2m.apps.googleusercontent.com
```

**client/.env**

```
VITE_API_URL=http://localhost:5000/api
```

---

## 📚 API Endpoints (Summary)

All responses:

```json
{ "success": true/false, "message": string, "data": any }
```

**Auth**

- POST `/api/auth/register` — Register user
- POST `/api/auth/login` — Login (returns JWT)
- POST `/api/auth/google` — Google OAuth login

**Users**

- GET `/api/users/me` — Get profile
- PUT `/api/users/me` — Update profile

**Properties**

- GET `/api/properties` — List properties (filters: category, subtype, city, state, price, search)
- GET `/api/properties/:id` — Property details
- POST `/api/properties` — Add property
- PUT `/api/properties/:id` — Edit property
- DELETE `/api/properties/:id` — Delete property

**Bookings**

- POST `/api/bookings` — Create booking
- GET `/api/bookings` — List user bookings
- PATCH `/api/bookings/:id/cancel` — Cancel booking

**Admin**

- GET `/api/admin/properties/pending` — Pending properties
- PUT `/api/admin/properties/:id/verify` — Verify/reject property

---

## 🧑‍💻 Example Requests

Login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

List properties:

```bash
curl "http://localhost:5000/api/properties?city=Chennai&category=Apartment"
```

Create booking:

```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"propertyId":"<id>","fromDate":"2025-10-10","toDate":"2025-10-15"}'
```

---

## 🗄️ Database Schemas (Short)

**User**

```js
{
  email, password(hashed), name, city, state, profileComplete;
}
```

**Property**

```js
{ ownerId, category, subtype, title, description, price, address: { city, state }, image, isDisabled }
```

**Booking**

```js
{
  userId, propertyId, fromDate, toDate, totalPrice, status;
}
```

---

## 📝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit and push
4. Open a PR

---

## 📣 Project Links

- **Live Demo:** [https://spacelink-rental.vercel.app](https://spacelink-rental.vercel.app)
- **API Docs:** _coming soon_

---

SpaceLink — connecting spaces with people.
