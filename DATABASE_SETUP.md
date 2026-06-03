# 🗄️ DATABASE SETUP GUIDE - ROYAL FUTSAL NEPAL

## 📋 Table of Contents
1. [Database Options](#database-options)
2. [MongoDB Atlas Setup (Recommended - Cloud)](#mongodb-atlas-setup-recommended)
3. [Local MongoDB Setup](#local-mongodb-setup)
4. [Backend Installation](#backend-installation)
5. [Testing](#testing)
6. [Deployment](#deployment)

---

## 🎯 DATABASE OPTIONS

You have **TWO options** for your database:

### Option 1: MongoDB Atlas (☁️ Cloud) - **RECOMMENDED**
- ✅ **FREE** (up to 512MB)
- ✅ No installation needed
- ✅ Works anywhere (perfect for hosting)
- ✅ Automatic backups
- ✅ Easy to use
- ✅ **BEST FOR HOSTING YOUR WEBSITE**

### Option 2: Local MongoDB (💻 Your Computer)
- ✅ Free and unlimited storage
- ✅ Full control
- ❌ Requires installation
- ❌ Only works on your computer
- ❌ Need to setup separately for hosting

**👉 We recommend Option 1 (MongoDB Atlas) for hosting!**

---

## 📘 MONGODB ATLAS SETUP (Recommended)

### Step 1: Create Free Account

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   
2. **Sign Up**
   - Click "Try Free"
   - Use your email or Google account
   - Create password

3. **Answer Survey** (optional)
   - Just click through the questions

### Step 2: Create Your Database Cluster

1. **Choose Free Tier**
   - Select **"M0 Free"** option
   - Storage: 512 MB (free forever)

2. **Choose Provider & Region**
   - Provider: AWS (recommended)
   - Region: Choose closest to Nepal
     - **Singapore** (best for Nepal)
     - Or **Mumbai, India**

3. **Name Your Cluster**
   - Cluster Name: `RoyalFutsalCluster` (or any name)
   - Click **"Create Cluster"**
   - Wait 3-5 minutes for cluster to deploy

### Step 3: Setup Database Access

1. **Create Database User**
   - Go to "Database Access" in left menu
   - Click "+ ADD NEW DATABASE USER"
   - Authentication Method: **Password**
   - Username: `royalfutsal` (or your choice)
   - Password: Click "Autogenerate Secure Password" (copy this!)
   - Or create your own password (remember it!)
   - Database User Privileges: **Read and write to any database**
   - Click "Add User"

### Step 4: Setup Network Access

1. **Allow Access from Anywhere** (needed for hosting)
   - Go to "Network Access" in left menu
   - Click "+ ADD IP ADDRESS"
   - Click "ALLOW ACCESS FROM ANYWHERE"
   - IP Address: `0.0.0.0/0` (automatically filled)
   - Click "Confirm"
   - Wait for status to become "Active"

### Step 5: Get Your Connection String

1. **Connect to Your Cluster**
   - Go back to "Database" in left menu
   - Click "Connect" button on your cluster

2. **Choose Connection Method**
   - Select "Connect your application"
   - Driver: **Node.js**
   - Version: **5.5 or later**

3. **Copy Connection String**
   - You'll see something like:
   ```
   mongodb+srv://royalfutsal:<password>@royalfutsalcluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   
4. **Replace `<password>`**
   - Replace `<password>` with your actual password
   - Example:
   ```
   mongodb+srv://royalfutsal:MyPassword123@royalfutsalcluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **Add Database Name**
   - Add `/royal-futsal` before the `?`
   - Final format:
   ```
   mongodb+srv://royalfutsal:MyPassword123@royalfutsalcluster.xxxxx.mongodb.net/royal-futsal?retryWrites=true&w=majority
   ```

### Step 6: Update Your .env File

1. **Open**: `C:\Royal\backend\.env`

2. **Update MONGODB_URI**:
   ```env
   MONGODB_URI=mongodb+srv://royalfutsal:YourPassword@cluster.xxxxx.mongodb.net/royal-futsal?retryWrites=true&w=majority
   ```

3. **Save the file**

✅ **MongoDB Atlas Setup Complete!**

---

## 💻 LOCAL MONGODB SETUP

### Step 1: Download MongoDB

1. **Visit**: https://www.mongodb.com/try/download/community
2. **Download**: MongoDB Community Server
3. **Version**: Latest stable version
4. **Platform**: Windows

### Step 2: Install MongoDB

1. **Run the installer**
2. **Setup Type**: Complete
3. **Service Configuration**:
   - ✅ Install MongoDB as a Service
   - ✅ Run service as Network Service user
   - Data Directory: `C:\Program Files\MongoDB\Server\7.0\data`
   - Log Directory: `C:\Program Files\MongoDB\Server\7.0\log`
4. **Install MongoDB Compass**: ✅ (GUI for database)
5. Click "Install"
6. Wait for installation (5-10 minutes)

### Step 3: Verify Installation

1. **Open Command Prompt**
2. **Run**:
   ```bash
   mongod --version
   ```
3. You should see version info

### Step 4: Update .env File

Your `.env` file should already have:
```env
MONGODB_URI=mongodb://localhost:27017/royal-futsal
```

✅ **Local MongoDB Setup Complete!**

---

## 🚀 BACKEND INSTALLATION

### Step 1: Install Node.js

1. **Check if installed**:
   ```bash
   node --version
   ```

2. **If not installed**:
   - Download from: https://nodejs.org/
   - Install LTS version
   - Restart computer after installation

### Step 2: Install Backend Dependencies

1. **Open Command Prompt**

2. **Navigate to backend folder**:
   ```bash
   cd C:\Royal\backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```
   
   This installs:
   - express (web server)
   - mongoose (database connection)
   - cors (security)
   - dotenv (environment variables)
   - body-parser (request handling)
   - nodemon (auto-restart for development)

4. **Wait for installation** (1-2 minutes)

### Step 3: Configure Environment

1. **Your .env file should have**:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=your_connection_string_here
   FRONTEND_URL=http://localhost:5500
   ```

2. **Make sure MONGODB_URI is correct**:
   - MongoDB Atlas: Full connection string
   - Local: `mongodb://localhost:27017/royal-futsal`

### Step 4: Start the Server

**Option A: Development Mode** (auto-restarts on changes)
```bash
npm run dev
```

**Option B: Production Mode**
```bash
npm start
```

You should see:
```
╔══════════════════════════════════════════════════════════════╗
║        🏟️  ROYAL FUTSAL NEPAL - API SERVER                  ║
╚══════════════════════════════════════════════════════════════╝

✅ Server running on port 3000
📍 API endpoint: http://localhost:3000/api
🗄️  Database: Connected
```

✅ **Backend is Running!**

---

## ✅ TESTING

### Test 1: Check API Health

**Open browser and go to**:
```
http://localhost:3000/api/health
```

**You should see**:
```json
{
  "status": "OK",
  "message": "Royal Futsal API is running",
  "database": "connected",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

### Test 2: Seed Sample Data (Optional)

**Add some test bookings and contacts**:
```bash
npm run seed
```

This creates:
- 3 sample bookings
- 2 sample contact messages

### Test 3: Get Pricing

**Browser**:
```
http://localhost:3000/api/pricing
```

**You should see pricing information**

### Test 4: Create a Booking

**Use a tool like Postman, or test through your website**

**API Endpoint**: `POST http://localhost:3000/api/bookings`

**Body** (JSON):
```json
{
  "date": "2025-01-20",
  "timeSlot": "18:00 - 19:00",
  "customerName": "Test User",
  "customerPhone": "9841234567",
  "customerEmail": "test@example.com",
  "price": 1200,
  "paymentMethod": "cash"
}
```

---

## 🌐 CONNECTING FRONTEND TO BACKEND

### Update Frontend to Use API

1. **Open**: `C:\Royal\frontend\js\script.js`

2. **Find the booking storage line** (around line 50):
   ```javascript
   const bookings = {};
   ```

3. **Replace with API calls**:

```javascript
// API Base URL
const API_URL = 'http://localhost:3000/api';

// Function to get bookings for a date
async function getBookingsForDate(date) {
    try {
        const response = await fetch(`${API_URL}/bookings/${date}`);
        const data = await response.json();
        return data.bookings;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
}

// Function to create booking
async function createBooking(bookingData) {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating booking:', error);
        return { success: false, message: 'Error creating booking' };
    }
}
```

---

## 🚀 DEPLOYMENT

### Option 1: Deploy Backend (Render.com - Free)

1. **Go to**: https://render.com
2. **Sign up** with GitHub
3. **Create New Web Service**
4. **Connect your repository**
5. **Settings**:
   - Name: `royal-futsal-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. **Environment Variables**:
   - Add `MONGODB_URI` with your Atlas connection string
   - Add `PORT` = `3000`
   - Add `NODE_ENV` = `production`
7. **Deploy**

### Option 2: Deploy Backend (Railway - Free)

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **New Project** → **Deploy from GitHub**
4. **Select your repository**
5. **Add variables**:
   - `MONGODB_URI`
   - `PORT` = `3000`
6. **Deploy**

### Deploy Frontend (Netlify)

1. **Go to**: https://netlify.com
2. **Drag and drop** your `frontend` folder
3. **Update API_URL** in `script.js` to your deployed backend URL
4. **Done!**

---

## 📊 DATABASE STRUCTURE

### Collections

**1. bookings**
- date (String): "2025-01-20"
- timeSlot (String): "18:00 - 19:00"
- customerName (String)
- customerPhone (String)
- customerEmail (String)
- price (Number)
- status (String): pending/confirmed/cancelled/completed
- paymentMethod (String): esewa/khalti/bank/cash
- paymentStatus (String): pending/paid/refunded
- timestamps (Date): createdAt, updatedAt

**2. contacts**
- name (String)
- email (String)
- phone (String)
- message (String)
- status (String): new/read/responded/archived
- timestamps (Date): createdAt, updatedAt

---

## 🔧 TROUBLESHOOTING

### "Cannot connect to MongoDB"

**If using Atlas**:
- ✅ Check internet connection
- ✅ Verify connection string in .env
- ✅ Make sure password doesn't have special characters (use simple password)
- ✅ Check Network Access allows 0.0.0.0/0

**If using Local**:
- ✅ Make sure MongoDB service is running
- ✅ Open Services (Windows) → Find MongoDB → Start
- ✅ Or run: `net start MongoDB`

### "Port 3000 already in use"

**Change port in .env**:
```env
PORT=5000
```

### "Module not found"

**Reinstall dependencies**:
```bash
cd C:\Royal\backend
npm install
```

---

## 📞 SUPPORT

If you have issues:
1. Check your .env file
2. Make sure MongoDB is connected
3. Check server logs for errors
4. Make sure all dependencies are installed

---

## ✅ CHECKLIST

- [ ] MongoDB Atlas account created (or local MongoDB installed)
- [ ] Database cluster created
- [ ] Connection string obtained
- [ ] .env file updated with MONGODB_URI
- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] Server starts successfully (`npm start`)
- [ ] API health check works
- [ ] Database connected successfully
- [ ] (Optional) Sample data seeded

---

**🎉 Your database is ready for hosting!**

Choose MongoDB Atlas for the easiest hosting experience!
