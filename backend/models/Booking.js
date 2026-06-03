const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        index: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerPhone: {
        type: String,
        required: true,
        trim: true
    },
    customerEmail: {
        type: String,
        trim: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['esewa', 'khalti', 'bank', 'cash'],
        default: 'cash'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Index for faster queries
bookingSchema.index({ date: 1, timeSlot: 1 });
bookingSchema.index({ customerPhone: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });

// Prevent duplicate bookings for same date and time
bookingSchema.index({ date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
