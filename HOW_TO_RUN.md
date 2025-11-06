# How to Run the Epicure Skin Website

This guide explains how to run both the frontend (client) and backend (server) of the website.

## Prerequisites

1. **Node.js** (version 18 or higher recommended)
2. **npm** (comes with Node.js)
3. **MongoDB** (for the backend - optional if you just want to test the frontend)

## Quick Start (Recommended)

Run both frontend and backend together:

```bash
# From the root directory (Epicure-skin)
npm run dev
```

This will:
- Build the shared package
- Start the frontend (client) on `http://localhost:5173`
- Start the backend (server) on `http://localhost:3000`

## Detailed Setup

### Step 1: Install Dependencies

If you haven't installed dependencies yet:

```bash
# From the root directory
npm install
```

This will automatically install dependencies for:
- Shared package
- Client (frontend)
- Server (backend)

### Step 2: Set Up Backend Environment (Optional)

If you want to run the backend with a real database:

1. Create a `.env` file in the `server/` directory:
```bash
cd server
# Create .env file
```

2. Add the following to `server/.env`:
```
DATABASE_URL=mongodb://localhost:27017/epicure-skin
PORT=3000
```

**Note:** If you don't set up MongoDB, the frontend will still work with mock data (it will timeout after 2 seconds and default to email authentication).

### Step 3: Run the Application

#### Option A: Run Everything Together (Recommended)
```bash
# From root directory
npm run dev
```

#### Option B: Run Frontend Only
```bash
# From root directory
npm run client
# OR from client directory
cd client
npm run dev
```
Frontend will be available at: `http://localhost:5173`

#### Option C: Run Backend Only
```bash
# From root directory
npm run server
# OR from server directory
cd server
npm run dev
```
Backend will be available at: `http://localhost:3000`

## First-Time Setup

If this is your first time running the project:

1. **Install all dependencies:**
   ```bash
   npm install
   ```

2. **Build the shared package:**
   ```bash
   npm run shared-build
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Accessing the Website

Once running:
- **Frontend**: Open `http://localhost:5173` in your browser
- **Backend API**: Available at `http://localhost:3000/api`

## Troubleshooting

### Port Already in Use
If port 3000 or 5173 is already in use:
- **Backend**: Change `PORT=3000` in `server/.env` to a different port
- **Frontend**: Vite will automatically use the next available port

### MongoDB Connection Error
If you see MongoDB connection errors:
- The frontend will still work with mock data
- To use real database: Install MongoDB and update `DATABASE_URL` in `server/.env`

### "Nothing is displaying"
- Make sure both client and server are running
- Check browser console (F12) for errors
- The frontend will show login page even if backend is down (after 2-second timeout)

### Build Errors
If you see TypeScript errors:
```bash
# Rebuild shared package
npm run shared-build
```

## Available Scripts

From root directory:
- `npm run dev` - Run both client and server in development mode
- `npm run client` - Run only the frontend
- `npm run server` - Run only the backend
- `npm run shared-build` - Build the shared package
- `npm run lint` - Run linter on all packages

## Development Workflow

1. Start the development server: `npm run dev`
2. Open `http://localhost:5173` in your browser
3. Make changes to the code
4. Changes will hot-reload automatically (no need to restart)

## Login Information

### Patient Login
- Go to the Patient tab on the login page
- Use any email/password (currently using mock data)

### Doctor Login
- Go to the Doctor tab on the login page
- Use an email containing "doctor" or "doc" (for mock data)
- Or register a new doctor account

## Features by Role

### Patient Features:
- Predict skin disease
- Generate reports
- View live UV index
- Connect with dermatologists
- Send reports to doctors
- View appointments and messages

### Doctor Features:
- View appointments
- Access community forum
- View patient reports
- Manage appointments

