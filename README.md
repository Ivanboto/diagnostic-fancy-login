# diagnostic-fancy-login

## Prerequisites

- Node.js
- npm
- Docker
- Docker Compose

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd diagnostic-fancy-login
```

### 2. Setup Backend (API)

#### a. Navigate to the API directory:

```bash
cd api
```

#### b. Install dependencies:

```bash
npm install
```

#### c. Configure Environment Variables:

Create a `.env` file in the `api` directory and add the following variables. Replace the placeholder values with your actual configuration.

```env
# PostgreSQL connection details for Docker Compose & Prisma
POSTGRES_USER=<your_postgres_user>
POSTGRES_PASSWORD=<your_postgres_password>
POSTGRES_DB=<your_postgres_database_name>
POSTGRES_PORT=<your_postgres_port> # e.g., 5432

# Database connection URL for Prisma (ensure this matches the above PG details for Docker setup)
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"

# pgAdmin configuration for Docker Compose
PGADMIN_EMAIL=<your_pgadmin_email>
PGADMIN_PASSWORD=<your_pgadmin_password>

# API Port
PORT=3000 # Or any port you prefer for the API

# SendGrid API Key
SENDGRID_API_KEY=<your_sendgrid_api_key>
SENDGRID_SINGLE_SENDER_EMAIL=<your_sender_email_address>

# Frontend URL (for CORS and email links)
FRONTEND_URL=http://localhost:5173 # Or your frontend's actual URL
```

#### d. Running the Backend Services:

**Step 1: Start Database Services (PostgreSQL & pgAdmin via Docker Compose)**

This will start the PostgreSQL database and pgAdmin services.

From the `api` directory:

```bash
make docker-compose-up
```

To view logs for these services:

```bash
make docker-compose-logs
```

To stop and remove these containers:

```bash
make docker-compose-down
```

**Step 2: Run Database Migrations**

After the database container is up and running, apply the migrations.
From the `api` directory:

```bash
npx prisma migrate dev
```

_(Ensure you have run `npm install` in the `api` directory before this step if you haven't already, to have `npx prisma` available)._

**Step 3: Running the API Server (Locally with Node.js)**

Ensure your PostgreSQL database (via Docker) is running and migrations have been applied.

From the `api` directory:

```bash
node index.js
```

The API will run on the port specified in your `.env` file (e.g., `http://localhost:3000`).

### 3. Setup Frontend

#### a. Navigate to the frontend directory:

```bash
cd ../frontend
# If you are in the root directory:
# cd frontend
```

#### b. Install dependencies:

```bash
npm install
```

#### c. Configure Environment Variables:

Create a `.env` file in the `frontend` directory and add the following variable.

```env
VITE_API_URL=http://localhost:3000 # Or your API's actual URL
```

#### d. Running the Frontend:

From the `frontend` directory:

```bash
npm run dev
```

The frontend development server will typically start on `http://localhost:5173`.

## Stopping Services

- **Database Services (Docker Compose)**:
  From the `api` directory:
  ```bash
  make docker-compose-down
  ```
- **API Server (Node.js local)**: Press `Ctrl+C` in the terminal where the API is running.
- **Frontend (Vite dev server)**: Press `Ctrl+C` in the terminal where the frontend is running.
