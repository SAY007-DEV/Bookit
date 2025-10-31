# BookIt: Experiences & Slots

## Task Summary: Fullstack Intern Assignment

**Objective:**  
Build a full-featured web application where users explore curated travel experiences, select available slots, and make bookings. This project tests your end-to-end abilities in frontend (React/javaScript/Tailwind) and backend (Node.js/Express/MongoDB ), with special attention to API integration, clean UI, and real-world workflow.

**[Figma Link Here – Add Before Submission]**

---

## Features & Requirements

### Frontend

- **Framework:** React + javaScript 
- **Styling:** TailwindCSS 
- **Key Pages:**
  - **Home:** Fetches and lists experiences from the backend
  - **Details:** Shows experience details including slot calendar & availability
  - **Checkout:** Collects user information, promo codes, and displays order summary
  - **Result:** Provides booking confirmation or failure messages
- **UX/UI:**
  - Fully responsive and mobile-friendly
  - Matches Figma design exactly: precise spacing, scale, colors, and states
  - Smooth feedback for loading, errors, success, and sold-out slots
- **Logic/Integration:**
  - Consume backend REST APIs using Axios or Fetch
  - Use clean state management with React hooks
  - Minimal form validation (e.g. email, name)

### Backend

- **Framework:** Node.js + Express 
- **Database:** MongoDB
- **API Endpoints:**
  - `GET /api/experiences` — List all experiences
  - `GET /api/experiences/:id` — View specific experience and its slot availability
  - `POST /api/bookings` — Store new bookings
  - `POST /api/promo/validate` — Validate promo codes (e.g. `SAVE10`, `FLAT100`)
- **Requirements:**
  - Persist all data in the database
  - Validate all required inputs
  - Prevent double booking for the same slot

---

## Integration Flow

1. **User Journey:** Home → Details → Checkout → Result
2. **Dynamic Data:** Experiences, slots, and confirmations are database-driven and always up-to-date
3. **API Communication:** Frontend interacts only with documented backend endpoints

---

## Setup Instructions

1. **Install dependencies:**  
   From the root, run separate installs for backend and frontend:
   ```sh
   cd back-end && npm install
   cd ../front-end && npm install
   ```
   
2. **Configure environment:**  
   - Create `.env` in `back-end/` with your database URI and server port.
   - Example:
     ```
     MONGO_URL=mongodb://127.0.0.1:27017
     PORT=8000
     ```

3. **Start backend:**  
   Ensure MongoDB (or your chosen DB) is running.
   ```sh
   cd back-end
   npm run dev
   ```

4. **Start frontend:**  
   ```sh
   cd ../front-end
   npm run dev
   ```
5. **Access the app:**  
   Open `http://localhost:<PORT>` (see frontend config) in your browser.

---

## Development Notes

- Experience data is dynamic and stored in the database.
- All bookings persist; slot conflicts are prevented by backend logic.
- Error handling and validation middleware are enabled on backend.
- CORS and JSON parsing are pre-configured.

---

## API Endpoint Reference

| Method | Endpoint               | Description                                    |
| ------ | ---------------------- | ---------------------------------------------- |
| GET    | /api/experiences       | Returns all available experiences              |
| GET    | /api/experiences/:id   | Returns details & slot calendar for one        |
| POST   | /api/bookings          | Creates a new booking                          |
| POST   | /api/promo/validate    | Validates supplied promo code                  |

**Note:** See controller files for request/response body examples.

---
