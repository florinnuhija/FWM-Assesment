# FWM Assessment

A full-stack demonstration project using **React (TypeScript)**, **Node.js/Express**, and **MySQL**. The goal is to show a responsive grid of items with pagination, loading states, error handling, and a sticky header/footer. It also includes a modal dialog on item click and MUI-based styling.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Database Setup](#database-setup)
4. [Backend Setup & Scripts](#backend-setup--scripts)
5. [Frontend Setup](#frontend-setup)
6. [Running Tests](#running-tests)
7. [Additional Notes](#additional-notes)

---

## Tech Stack

- **Frontend:**

  - React 18+ (TypeScript)
  - Material-UI (MUI) for styling
  - Axios for API calls

- **Backend:**

  - Node.js 16+
  - Express.js
  - MySQL (via `mysql2`)

- **Testing:**
  - Frontend: Jest, React Testing Library
  - Backend: Jest, Supertest

---

## Prerequisites

1. **Node.js** (16+) and **npm**
2. **MySQL** server (either local install or a Docker container)

---

## Database Setup

1. Start or install MySQL.
2. Ensure you have correct credentials (e.g., `root` user, password if needed).
3. Navigate to `backend/scripts/` and run the two SQL scripts in order:

   ````bash
   # 1) Create and configure the database and table
   mysql -u root -p < create_table.sql

   # 2) Seed the table with mock data
   mysql -u root -p < seed_data.sql```
   ````

---

## Backend Setup & Scripts

1. Navigate to FWM-assesment/backend/.
2. Install dependencies:

   ```
       npm install
   ```

3. Create a .env file (if you need to override defaults). For example:

   ```
       DB_HOST=localhost
       DB_USER=root
       DB_PASSWORD=yourpassword
       DB_NAME=full_stack_assignment
       PORT=5000
   ```

4. Start the backend server:
   ```
       npm start
   ```

---

## Frontend Setup

1. Navigate to FWM-assesment/frontend/.
2. Install dependencies:
   ```
       npm install
   ```
3. Start the dev server:
   ```
       npm start
   ```

---

## Running Tests

### Frontend Tests

In FWM-assesment/frontend/:

```
    npm test
```

### Backend Tests

In FWM-assesment/backend/:

```
    npm test
```

---

## Additional Notes

- The sticky header and sticky footer remain visible as you scroll.
- Pagination is managed by MUI’s <Pagination> component, calling the Express endpoint with query params (?page=&limit=).
- Modal: Clicking a card opens a dialog with the item’s title and description. On mobile, the dialog is full screen and slides up from the bottom.
- Skeleton loaders appear while data is fetched.
- This setup demonstrates a simple full-stack pattern with MySQL, Express, and React + TypeScript for quick scaffolding or demonstration.
