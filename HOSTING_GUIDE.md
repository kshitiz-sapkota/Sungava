# 🚀 COMPLETE HOSTING & DEPLOYMENT GUIDE
## Royal Futsal Nepal - From Local to Live

---

## 📋 WHAT WE'LL DO

1. ✅ Setup MongoDB Atlas (Cloud Database) - **FREE**
2. ✅ Deploy Backend API - **FREE**
3. ✅ Deploy Frontend Website - **FREE**
4. ✅ Connect Everything
5. ✅ Test Live Website

**Total Cost: $0 (Everything is FREE!)** 🎉

---

## 🗄️ STEP 1: SETUP DATABASE (MongoDB Atlas)

### Why MongoDB Atlas?
- ✅ Free forever (up to 512MB)
- ✅ No credit card required
- ✅ Works anywhere
- ✅ Automatic backups
- ✅ Perfect for hosting

### Quick Setup (10 minutes)

1. **Create Account**
   ```
   🌐 Go to: https://www.mongodb.com/cloud/atlas/register
   📧 Sign up with email or Google
   ```

2. **Create Cluster**
   ```
   ✓ Choose FREE M0 tier
   ✓ Provider: AWS
   ✓ Region: Singapore (closest to Nepal)
   ✓ Name: RoyalFutsalCluster
   ✓ Click "Create"
   ⏱️ Wait 3-5 minutes
   ```

3. **Create Database User**
   ```
   📍 Go to: Database Access → Add New User
   👤 Username: royalfutsal
   🔐 Password: (use strong password - save it!)
   ✓ Privileges: Read and write to any database
   ```

4. **Allow Network Access**
   ```
   📍 Go to: Network Access → Add IP Address
   ✓ Click "Allow Access from Anywhere"
   ✓ IP: 0.0.0.0/0
   ✓ Confirm
   ```

5. **Get Connection String**
   ```
   📍 Go to: Database → Connect → Connect your application
   📋 Copy the connection string
   
   It looks like:
   mongodb+srv://royalfutsal:<password>@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   
   ✏️ Replace <password> with your actual password
   ✏️ Add /royal-futsal before the ?
   
   Final:
   mongodb+srv://royalfutsal:YourPass123@cluster.xxxxx.mongodb.net/royal-futsal?retryWrites=true&w=majority
   ```

✅ **Database Ready!** Save your connection string!

---

## 🔧 STEP 2: DEPLOY BACKEND API

We'll use **Render.com** (Free tier, no credit card needed)

### Why Render?
- ✅ Free tier available
- ✅ No credit card required
- ✅ Easy to use
- ✅ Auto-deploys from GitHub
- ✅ Provides HTTPS automatically

### Option A: Deploy with GitHub (Recommended)

#### Prepare Your Code

1. **Create .gitignore file**
   
   Create file: `C:\Royal\backend\.gitignore`
   ```
   node_modules/
   .env
   .DS_Store
   npm-debug.log
   ```

2. **Create GitHub Repository**
   ```
   🌐 Go to: https://github.com
   ➕ New Repository
   📝 Name: royal-futsal-backend
   ✓ Public or Private
   ✓ Create
   ```

3. **Push Code to GitHub**
   ```bash
   cd C:\Royal\backend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/royal-futsal-backend.git
   git push -u origin main
   ```

#### Deploy on Render

1. **Create Render Account**
   ```
   🌐 Go to: https://render.com
   📧 Sign up with GitHub
   ```

2. **Create New Web Service**
   ```
   ➕ New → Web Service
   🔗 Connect GitHub repository
   📝 Select: royal-futsal-backend
   ```

3. **Configure Service**
   ```
   Name: royal-futsal-api
   Environment: Node
   Region: Singapore (closest to Nepal)
   Branch: main
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

4. **Add Environment Variables**
   ```
   Click "Advanced" → Add Environment Variables:
   
   MONGODB_URI=mongodb+srv://royalfutsal:YourPass@cluster.xxxxx.mongodb.net/royal-futsal?retryWrites=true&w=majority
   NODE_ENV=production
   PORT=3000
   ```

5. **Deploy**
   ```
   ✓ Click "Create Web Service"
   ⏱️ Wait 5-10 minutes for deployment
   ✅ You'll get a URL like: https://royal-futsal-api.onrender.com
   ```

### Option B: Deploy Directly (Without GitHub)

1. **Install Render CLI** (optional)
2. **Or use Render Dashboard** to upload files directly

✅ **Backend Deployed!** Save your API URL!

---

## 🌐 STEP 3: DEPLOY FRONTEND WEBSITE

We'll use **Netlify** (Free, unlimited bandwidth)

### Why Netlify?
- ✅ Free forever
- ✅ Unlimited bandwidth
- ✅ Custom domain support
- ✅ Automatic HTTPS
- ✅ Drag & drop deployment

### Update Frontend Configuration

1. **Update API URL in Frontend**
   
   Open: `C:\Royal\frontend\js\script.js`
   
   Find (around line 1):
   ```javascript
   // Add at the top of the file
   const API_URL = 'https://royal-futsal-api.onrender.com/api';
   ```
   
   Replace `https://royal-futsal-api.onrender.com` with YOUR actual Render URL!

2. **Update Booking Functions**
   
   Replace the in-memory bookings with API calls (see DATABASE_SETUP.md for details)

### Deploy to Netlify

#### Method 1: Drag & Drop (Easiest)

1. **Go to Netlify**
   ```
   🌐 Visit: https://netlify.com
   📧 Sign up (free)
   ```

2. **Deploy Site**
   ```
   ➕ Sites → Add new site → Deploy manually
   📁 Drag your C:\Royal\frontend folder
   ⏱️ Wait 30 seconds
   ✅ You'll get a URL like: https://cheerful-unicorn-abc123.netlify.app
   ```

3. **Update Site Name** (optional)
   ```
   Site settings → Change site name
   📝 New name: royal-futsal-nepal
   ✅ URL becomes: https://royal-futsal-nepal.netlify.app
   ```

#### Method 2: GitHub (Auto-Deploy on Changes)

1. **Push Frontend to GitHub**
   ```bash
   cd C:\Royal\frontend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/royal-futsal-frontend.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   ```
   📍 Netlify → New site → Import existing project
   🔗 Connect GitHub
   📝 Select repository
   Build settings:
   - Build command: (leave empty)
   - Publish directory: /
   ✓ Deploy
   ```

✅ **Website Live!** 🎉

---

## 🔗 STEP 4: CONNECT EVERYTHING

### Update Environment Variables

1. **Backend .env** (on Render):
   ```
   MONGODB_URI=your_atlas_connection_string
   FRONTEND_URL=https://royal-futsal-nepal.netlify.app
   NODE_ENV=production
   ```

2. **Frontend API URL** (in script.js):
   ```javascript
   const API_URL = 'https://royal-futsal-api.onrender.com/api';
   ```

### Enable CORS

Your backend already has CORS enabled, but verify in `server.js`:
```javascript
app.use(cors({
    origin: process.env.FRONTEND_URL || '*'
}));
```

---

## ✅ STEP 5: TEST YOUR LIVE WEBSITE

### Test Checklist

1. **Open Your Website**
   ```
   🌐 https://royal-futsal-nepal.netlify.app
   ```

2. **Test Navigation**
   - ✓ Click all menu items
   - ✓ Scroll through sections
   - ✓ Check mobile view (resize browser)

3. **Test Booking System**
   - ✓ Click a date on calendar
   - ✓ Select a time slot
   - ✓ Fill customer information
   - ✓ Click "Proceed to Payment"
   - ✓ Check if booking saves to database

4. **Test Contact Form**
   - ✓ Fill out form
   - ✓ Submit
   - ✓ Check if message saves

5. **Test Social Buttons**
   - ✓ Click Facebook button (should open your page)
   - ✓ Test WhatsApp button
   - ✓ Test phone button

6. **Check API Health**
   ```
   🌐 https://royal-futsal-api.onrender.com/api/health
   
   Should show:
   {
     "status": "OK",
     "database": "connected"
   }
   ```

---

## 🎨 STEP 6: CUSTOM DOMAIN (Optional)

### Get Free Domain

**Option 1: Use Netlify Subdomain** (Free)
- Already have: royal-futsal-nepal.netlify.app

**Option 2: Buy Custom Domain** (~$10-15/year)
- Popular registrars:
  - Namecheap: https://namecheap.com
  - GoDaddy: https://godaddy.com
  - Google Domains: https://domains.google

### Connect Custom Domain to Netlify

1. **Buy Domain** (e.g., royalfutsalnepal.com)

2. **Add to Netlify**
   ```
   📍 Netlify → Domain settings → Add custom domain
   📝 Enter: royalfutsalnepal.com
   ✓ Add domain
   ```

3. **Update DNS**
   ```
   📍 Your domain registrar → DNS settings
   
   Add these records:
   Type: A
   Name: @
   Value: 75.2.60.5 (Netlify's IP)
   
   Type: CNAME
   Name: www
   Value: royal-futsal-nepal.netlify.app
   ```

4. **Wait for SSL** (automatic, ~24 hours max)

✅ **Custom domain working!**

---

## 📊 STEP 7: MONITOR & MAINTAIN

### Check Backend Status

**Render Dashboard**:
- View logs
- Monitor uptime
- Check performance

### Check Database Usage

**MongoDB Atlas**:
- Dashboard → Metrics
- See storage usage (512MB free)
- Monitor connections

### Update Website

**If you need to make changes:**

1. **Update Local Files**
   ```
   Edit: C:\Royal\frontend\...
   ```

2. **Redeploy**
   
   **Netlify**:
   - Drag & drop updated folder again
   - Or: Git push (if using GitHub)
   
   **Render**:
   - Git push → Auto-deploys

---

## 🔐 SECURITY CHECKLIST

Before going live:

- [ ] ✅ Update all phone numbers (replace __________)
- [ ] ✅ Strong MongoDB password
- [ ] ✅ .env file not in Git
- [ ] ✅ CORS configured properly
- [ ] ✅ API rate limiting (optional, for later)
- [ ] ✅ HTTPS enabled (automatic on Netlify/Render)

---

## 💰 COST BREAKDOWN

### FREE TIER LIMITS

**MongoDB Atlas (Free)**:
- Storage: 512MB
- Bandwidth: Unlimited
- Connections: 500/cluster
- Good for: 1000s of bookings

**Render (Free)**:
- Instance: 512MB RAM
- Hours: 750/month (always on)
- Bandwidth: 100GB/month
- Sleeps after 15 min inactivity

**Netlify (Free)**:
- Sites: Unlimited
- Bandwidth: 100GB/month
- Build minutes: 300/month
- Custom domain: ✅

### When You'll Need Paid Plans

- **MongoDB**: When you exceed 512MB
- **Render**: When you need always-on service ($7/month)
- **Netlify**: When you exceed 100GB bandwidth

For a futsal booking site, free tier should work for months/years!

---

## 🚨 TROUBLESHOOTING

### "API not connecting"

1. Check Render logs for errors
2. Verify MongoDB connection string
3. Check CORS settings
4. Test API health endpoint

### "Website loads but bookings don't work"

1. Open browser console (F12)
2. Check for errors
3. Verify API_URL in script.js
4. Test API endpoint directly

### "Database connection failed"

1. Check MongoDB Atlas:
   - Network access: 0.0.0.0/0
   - User password correct
   - Connection string correct
2. Check Render environment variables

### "Render app sleeping"

Free tier sleeps after 15 min inactivity:
- First request takes 30-60 seconds
- Consider upgrading to paid tier ($7/month) for always-on
- Or: Use cron job to ping every 10 minutes

---

## 📈 NEXT STEPS

After hosting:

1. **Add Google Analytics** (track visitors)
2. **Setup Backup System** (MongoDB has auto-backup)
3. **Add Admin Panel** (manage bookings)
4. **Integrate Payment Gateways** (eSewa, Khalti)
5. **Add Email Notifications**
6. **SEO Optimization**

---

## 📞 SUPPORT RESOURCES

**Documentation**:
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Render: https://render.com/docs
- Netlify: https://docs.netlify.com

**Community**:
- MongoDB Community: https://community.mongodb.com
- Stack Overflow: Tag your questions

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string obtained and saved
- [ ] Backend code on GitHub (or ready to deploy)
- [ ] Backend deployed on Render
- [ ] Backend environment variables configured
- [ ] Backend API health check works
- [ ] Frontend API_URL updated
- [ ] Frontend deployed on Netlify
- [ ] Website loads correctly
- [ ] Booking system works
- [ ] Contact form works
- [ ] Facebook button works
- [ ] WhatsApp button works (with your number)
- [ ] Mobile responsive tested
- [ ] All placeholders replaced with real info
- [ ] (Optional) Custom domain connected

---

## 🎉 CONGRATULATIONS!

Your Royal Futsal Nepal website is now **LIVE** on the internet!

**Your URLs**:
```
🌐 Website: https://royal-futsal-nepal.netlify.app
🔧 API: https://royal-futsal-api.onrender.com
🗄️ Database: MongoDB Atlas (Cloud)
```

Share your website with customers and start taking bookings! 🚀

**Made with ❤️ for Royal Futsal Nepal**
