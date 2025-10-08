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

SpaceLink is a modern, full-featured rental marketplace built with the MERN stack. It empowers property owners to list, manage, and rent out spaces, while providing renters with a seamless search and booking experience.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://spacelink-rental.vercel.app)

> **Live Project:** [https://spacelink-rental.vercel.app](https://spacelink-rental.vercel.app)

---

## 🚀 Key Features

- **Advanced property search & filtering** (category, subtype, city, state, price)
- **Owner dashboard**: add/edit/manage properties, view bookings
- **Booking system**: real-time availability, secure booking flow
- **Authentication**: JWT (email/password) & Google OAuth
- **Admin dashboard**: property verification & moderation
- **Responsive UI**: mobile-first, fast, and modern

---

## 🏗️ Project Structure

```
spacelink/
├── client/   # React frontend (Vite + Bootstrap)
├── server/   # Node.js backend (Express + MongoDB)
```

---

## ⚡ Getting Started

**Requirements:** Node.js >= 16, npm/yarn, MongoDB

1. Clone the repo

```bash
git clone <repo-url>
cd spacelink
```

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

## 📝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit and push
4. Open a PR

---

## 📣 Project Links

- **Live Demo:** [https://spacelink-rental.vercel.app](https://spacelink-rental.vercel.app)

---

SpaceLink — connecting spaces with people.
VITE_API_URL=http://localhost:5000/api
