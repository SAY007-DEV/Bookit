# Experiences Booking Platform

A full-stack project for managing and booking curated experiences such as kayaking, forest walks, and more.

## Table of Contents

- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Development Notes](#development-notes)
- [Troubleshooting](#troubleshooting)

---

## Project Structure

```
root/
│
├── back-end/
│   ├── Config/
│   │   └── dbconnect.js
│   ├── Controller/
│   │   ├── bookingcontroller.js
│   │   ├── experiencecontroller.js
│   │   └── promocontoller.js
│   ├── Middleware/
│   │   └── errorhandle.js
│   ├── Model/
│   │   ├── booking.js
│   │   └── promo.js
│   ├── Routes/
│   │   ├── bookingRoutes.js
│   │   ├── experienceRoutes.js
│   │   └── promoRoutes.js
│   ├── Server.js
│   ├── package.json
│   
├── front-end/ (if exists)
```

---

## Requirements

- Node.js v18+
- npm v9+
- MongoDB (local or cloud, if you want persistence)
- [Optional] Postman or similar for API testing

---

## Environment Variables

Create a `.env` file in `back-end/`:

```
MONGO_URL=mongodb://127.0.0.1:27017
PORT=8000
```

- Change `MONGO_URL` to your MongoDB URI if using a cloud provider.

---

## Setup Instructions

1. **Clone the repo and install dependencies:**
   ```sh
   cd back-end
   npm install
   ```

2. **Setup your .env as described above.**

3. **Start MongoDB**  
   (Make sure your Mongo server is running locally or use your cloud connection string.)

4. **Start the backend server:**
   ```sh
   npm run dev
   ```
   You should see `MongoDB Connected:` and `server is running`.

---

## Available Scripts

Inside `back-end/`:

- `npm run dev` - Start backend with auto-reload via `nodemon`
- `npm start` - (If configured) Start backend

---

## API Endpoints

### Experience

- `GET /api/experiences`  
  Returns all available experiences.

- `GET /api/experiences/:id`  
  Returns detail about one experience, including slots by date.

### Booking

- `POST /api/bookings`  
  Creates a new booking. See backend controller for required payload.

### Promo

- `POST /api/promo/validate`  
  Validate a promo code. Payload: `{ "subtotal": number, "code": "PROMO" }`

---

## Development Notes

- Experiences data is currently simulated in-memory in `experiencecontroller.js`.
- MongoDB is connected for booking persistence.
- Error handling middleware is set up.
- CORS & JSON body parsing are enabled.

---

## Troubleshooting

- **Frontend gets `net::ERR_CONNECTION_REFUSED` or `Failed to load experiences`:**
  - Make sure backend is running: `npm run dev`
  - Open `http://localhost:8000/api/experiences` in your browser; if you don’t get JSON, check backend logs for errors.
  - Check your `.env` matches the variable name used in `Server.js` and in your database connect code.
  - Ensure MongoDB is running and accessible.

- **Port Already in Use:**
  - Change the `PORT` number in `.env` and update your frontend accordingly.

- **Environment variables not loaded:**
  - Ensure you run `npm run dev` from inside the `back-end` folder.

---

## Contact

For help or collaboration, open an issue or contact the repository maintainer.
