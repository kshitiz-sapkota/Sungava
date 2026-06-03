# 🏟️ Royal Futsal Nepal - Complete Website

A modern, professional futsal booking website with Facebook integration and separated frontend/backend architecture.

## 📁 Project Structure

```
C:\Royal\
├── frontend/                  # Frontend files (HTML, CSS, JS)
│   ├── index.html            # Main HTML file
│   ├── css/
│   │   └── styles.css        # All styling
│   ├── js/
│   │   └── script.js         # Frontend JavaScript
│   └── assets/               # Images and other assets
│
├── backend/                   # Backend API (Node.js/Express)
│   ├── server.js             # Main server file
│   ├── package.json          # Dependencies
│   └── .env.example          # Environment variables template
│
└── README.md                 # This file
```

## ✨ Features

### Frontend
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Interactive Booking System**: Calendar-based slot booking
- **Real-time Slot Availability**: See which slots are available
- **Multiple Payment Options**: eSewa, Khalti, Bank Transfer, Cash
- **Contact Form**: Easy customer communication
- **Social Media Integration**: 
  - ✅ **Facebook**: https://www.facebook.com/share/1NjpNRe2X9/
  - WhatsApp integration
  - Direct call button

### Backend API
- RESTful API endpoints
- Booking management
- Contact form handling
- Pricing management
- Admin functionality ready

## 🚀 Quick Start

### Frontend Setup (No Installation Required)

1. **Open the frontend**:
   ```
   Navigate to: C:\Royal\frontend\
   Double-click: index.html
   ```
   
2. **Or use Live Server** (Recommended):
   - Install "Live Server" extension in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"

### Backend Setup (Optional - for advanced features)

1. **Install Node.js** (if not installed):
   - Download from: https://nodejs.org/

2. **Navigate to backend folder**:
   ```bash
   cd C:\Royal\backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Create .env file**:
   ```bash
   copy .env.example .env
   ```
   Then edit `.env` with your actual values

5. **Start the server**:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

## 📱 Facebook Integration

The Facebook link is already integrated in the website:
- **Location**: Contact section social buttons
- **Link**: https://www.facebook.com/share/1NjpNRe2X9/
- **Button**: Blue Facebook button with icon

Users can click the Facebook button to visit your page directly!

## 🔧 Configuration

### Update Contact Information

Edit these files to add your contact details:

**Frontend (C:\Royal\frontend\index.html)**:
1. Search for `__________` (10 underscores)
2. Replace with your phone number (e.g., `9779812345678`)
3. Found in:
   - WhatsApp link
   - Phone link
   - Footer

**Frontend (C:\Royal\frontend\js\script.js)**:
1. Search for `__________`
2. Replace with your WhatsApp number
3. Format: Country code + number (e.g., `9779812345678`)

## 🎨 How Your Website Looks

### Desktop View:
- **Hero Section**: Full-screen with animated title
- **About**: 4 feature cards in a grid
- **Booking**: Side-by-side calendar and time slots
- **Pricing**: 3 pricing cards (Morning/Afternoon/Evening)
- **Contact**: Split layout with form and info

### Mobile View:
- Hamburger menu navigation
- Stacked sections
- Touch-friendly buttons
- Optimized forms

## 🌐 API Endpoints (Backend)

```
GET    /api/health              - Check API status
GET    /api/bookings/:date      - Get bookings for a date
POST   /api/bookings            - Create new booking
PATCH  /api/bookings/:id        - Update booking status
DELETE /api/bookings/:id        - Delete booking
GET    /api/bookings            - Get all bookings (admin)
POST   /api/contact             - Submit contact form
GET    /api/contact             - Get all messages (admin)
GET    /api/pricing             - Get pricing information
```

## 📦 What's Included

### Frontend Features:
✅ Responsive navigation with mobile menu
✅ Animated hero section
✅ Interactive booking calendar
✅ Time slot selection with pricing
✅ Customer information form
✅ Payment method selection
✅ Success confirmation modal
✅ Contact form
✅ **Facebook button with your link**
✅ WhatsApp integration
✅ Phone call button
✅ Professional footer

### Backend Features:
✅ RESTful API structure
✅ Booking management
✅ Contact form handling
✅ CORS enabled
✅ Error handling
✅ Ready for database integration
✅ Environment variables support

## 🎯 Next Steps

1. **Add Your Contact Info**:
   - Replace all `__________` with your phone number
   - Update location in HTML if needed

2. **Test the Website**:
   - Open `frontend/index.html` in browser
   - Try the booking system
   - Test the Facebook link
   - Test the contact form

3. **Deploy** (Optional):
   - **Frontend**: Upload to any web hosting (Netlify, Vercel, GitHub Pages)
   - **Backend**: Deploy to Heroku, Railway, or DigitalOcean

4. **Database** (Optional):
   - Add MongoDB for persistent storage
   - Update backend to use real database

5. **Payment Integration** (Future):
   - Integrate eSewa API
   - Integrate Khalti API

## 💡 Tips

- The frontend works standalone without backend
- Backend is optional but recommended for production
- Facebook link is already working - just click to test!
- All bookings currently stored in memory (backend)
- For production, connect to a real database

## 🆘 Support

For help or questions:
- Check the code comments
- Review the API documentation
- Test locally before deploying

## 📄 License

Private project for Royal Futsal Nepal

---

**Made with ❤️ for Royal Futsal Nepal**

**Facebook**: https://www.facebook.com/share/1NjpNRe2X9/
