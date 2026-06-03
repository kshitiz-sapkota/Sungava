const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Booking = require('./models/Booking');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sungava-futsal';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB database');
})
.catch((err) => {
    console.error('❌ MongoDB connection error:', err);
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
        status: 'OK', 
        message: 'Sungava Futsal API is running',
        database: dbStatus,
        timestamp: new Date().toISOString()
    });
});

// Get all bookings for a specific date
app.get('/api/bookings/:date', async (req, res) => {
    try {
        const { date } = req.params;
        const bookings = await Booking.find({ 
            date: date,
            status: { $ne: 'cancelled' }
        }).select('timeSlot status');
        
        res.json({
            success: true,
            date: date,
            bookings: bookings
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings',
            error: error.message
        });
    }
});

// Create a new booking
app.post('/api/bookings', async (req, res) => {
    try {
        const { date, timeSlot, customerName, customerPhone, customerEmail, price, paymentMethod } = req.body;
        
        // Validation
        if (!date || !timeSlot || !customerName || !customerPhone || !price) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        
        // Check if slot is already booked
        const existingBooking = await Booking.findOne({
            date: date,
            timeSlot: timeSlot,
            status: { $ne: 'cancelled' }
        });
        
        if (existingBooking) {
            return res.status(409).json({
                success: false,
                message: 'This time slot is already booked'
            });
        }
        
        // Create booking
        const booking = new Booking({
            date,
            timeSlot,
            customerName,
            customerPhone,
            customerEmail: customerEmail || '',
            price,
            paymentMethod: paymentMethod || 'cash',
            status: 'pending',
            paymentStatus: 'pending'
        });
        
        await booking.save();
        
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking: booking
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        
        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'This time slot is already booked'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error creating booking',
            error: error.message
        });
    }
});

// Update booking status
app.patch('/api/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, paymentStatus, notes } = req.body;
        
        const updateData = {};
        if (status) updateData.status = status;
        if (paymentStatus) updateData.paymentStatus = paymentStatus;
        if (notes !== undefined) updateData.notes = notes;
        
        const booking = await Booking.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Booking updated successfully',
            booking: booking
        });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating booking',
            error: error.message
        });
    }
});

// Delete a booking
app.delete('/api/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const booking = await Booking.findByIdAndDelete(id);
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Booking deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting booking',
            error: error.message
        });
    }
});

// Get all bookings (admin) with pagination and filters
app.get('/api/bookings', async (req, res) => {
    try {
        const { page = 1, limit = 50, status, date, phone } = req.query;
        
        // Build query
        const query = {};
        if (status) query.status = status;
        if (date) query.date = date;
        if (phone) query.customerPhone = { $regex: phone, $options: 'i' };
        
        // Execute query with pagination
        const bookings = await Booking.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        
        const count = await Booking.countDocuments(query);
        
        res.json({
            success: true,
            bookings: bookings,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalBookings: count
        });
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings',
            error: error.message
        });
    }
});

// Get booking statistics
app.get('/api/bookings/stats/summary', async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const pendingBookings = await Booking.countDocuments({ status: 'pending' });
        const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
        const completedBookings = await Booking.countDocuments({ status: 'completed' });
        
        // Revenue calculation
        const revenueResult = await Booking.aggregate([
            { $match: { paymentStatus: 'paid' } },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);
        
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
        
        res.json({
            success: true,
            stats: {
                totalBookings,
                pendingBookings,
                confirmedBookings,
                completedBookings,
                totalRevenue
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        
        const contact = new Contact({
            name,
            email,
            phone,
            message,
            status: 'new'
        });
        
        await contact.save();
        
        res.status(201).json({
            success: true,
            message: 'Message received successfully',
            contact: contact
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving message',
            error: error.message
        });
    }
});

// Get all contact messages (admin)
app.get('/api/contact', async (req, res) => {
    try {
        const { page = 1, limit = 50, status } = req.query;
        
        const query = {};
        if (status) query.status = status;
        
        const messages = await Contact.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        
        const count = await Contact.countDocuments(query);
        
        res.json({
            success: true,
            messages: messages,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalMessages: count
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching messages',
            error: error.message
        });
    }
});

// Update contact message status
app.patch('/api/contact/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, response } = req.body;
        
        const updateData = {};
        if (status) updateData.status = status;
        if (response !== undefined) updateData.response = response;
        
        const contact = await Contact.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Contact updated successfully',
            contact: contact
        });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating message',
            error: error.message
        });
    }
});

// Get pricing
app.get('/api/pricing', (req, res) => {
    const pricing = {
        morning: {
            label: 'Morning Slot',
            time: '6:00 AM - 12:00 PM',
            slots: ['06:00 - 07:00', '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00'],
            price: 800
        },
        afternoon: {
            label: 'Afternoon Slot',
            time: '12:00 PM - 5:00 PM',
            slots: ['12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'],
            price: 1000
        },
        evening: {
            label: 'Evening Slot',
            time: '5:00 PM - 10:00 PM',
            slots: ['17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00'],
            price: 1200
        }
    };
    
    res.json({
        success: true,
        pricing: pricing
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║        🏟️  SUNGAVA FUTSAL NEPAL - API SERVER                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

✅ Server running on port ${PORT}
📍 API endpoint: http://localhost:${PORT}/api
🗄️  Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting...'}
📅 Started: ${new Date().toLocaleString()}

Available Endpoints:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET    /api/health              - Check API status
GET    /api/bookings/:date      - Get bookings for a date
POST   /api/bookings            - Create new booking
PATCH  /api/bookings/:id        - Update booking status
DELETE /api/bookings/:id        - Delete booking
GET    /api/bookings            - Get all bookings (admin)
GET    /api/bookings/stats/summary - Get statistics
POST   /api/contact             - Submit contact form
GET    /api/contact             - Get all messages (admin)
PATCH  /api/contact/:id         - Update contact status
GET    /api/pricing             - Get pricing information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Press Ctrl+C to stop the server
    `);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n\n🛑 Shutting down gracefully...');
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
});
