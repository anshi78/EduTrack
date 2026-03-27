# Full Stack Interview Task: CodeIgniter 4 + React Vite

This repository contains the completed full-stack application for the internship technical assessment. It features a CodeIgniter 4 backend with JWT-based authentication and a React frontend utilizing Tailwind CSS.

## Features Implemented
- **Database Architecture**: MySQL database (`interview_db`) structured with `auth_user` and `teachers` tables linked by a 1-to-1 relationship.
- **RESTful API**: Handled seamlessly through CodeIgniter 4 Resource Controllers, secured using a custom built JWT Token Filter.
- **Transactions**: Complete atomic handling so partial creation of a user or teacher does not occur in case of failure.
- **Modern Interface**: React Router enables protected and non-protected states, while Tailwind CSS creates a stunning Glassmorphism UI layout.

---

## How To Run The Project

### 1. Database Setup
1. Turn on your local MySQL server (XAMPP, WAMP, MySQL Workbench, etc.).
2. Navigate to your MySQL client (e.g., `http://localhost/phpmyadmin`).
3. Take the content of the `internship-backend/database.sql` script and execute it fully. This will instantly build the database and linked tables.

### 2. Backend (API)
This project uses PHP 8.1.
1. Open a terminal and navigate to the `internship-backend` folder.
2. Run the CodeIgniter development server:
   ```bash
   cd internship-backend
   php spark serve
   ```
3. The server will start successfully at `http://localhost:8080/`.

### 3. Frontend (React)
This project uses Vite + React 19 + Tailwind CSS v4.
1. Open a *new* separate terminal and navigate to the frontend folder.
2. Install the node packages:
   ```bash
   cd internship-frontend
   npm install
   ```
3. Boot up the Vite local layout server:
   ```bash
   npm run dev
   ```
4. Access the beautiful web interface at `http://localhost:5173/`!

---

## Technical Choices
- **Bypassing Composer limitations:** PHP versions inherently caused limits during composer install, so a custom JWT Handler `jwt_helper.php` was completely manually mapped out utilizing pure HMAC and Base64Url algorithms to bypass library limits. CodeIgniter version was formally downgraded to `~4.6.0` to actively support PHP 8.1 runtimes.
- **Tailwind v4:** Implemented the cutting-edge Tailwind CSS v4 paradigm via `@tailwindcss/vite` inline import rules for a significantly faster developer scale workflow.
