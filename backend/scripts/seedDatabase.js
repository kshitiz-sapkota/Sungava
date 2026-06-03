const mongoose = require('mongoose');
require('dotenv').config();

const Booking = require('../models/Booking');
const Contact = require('../models/Contact');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/royal-futsal';

// Sample bookings for testing
const sampleBookings = [
    {
        date: '2025-01-15',
        timeSlot: '07:00 - 08:00',
        customerName: 'John Doe',
        customerPhone: '9841234567',
        customerEmail: 'john@example.com',
        price: 800,
        status: 'confirmed',
        paymentMethod: 'esewa',
        paymentStatus: 'paid'
    },
    {
        date: '2025-01-15',
        timeSlot: '18:00 - 19:00',
        customerName: 'Jane Smith',
        customerPhone: '9851234567',
        customerEmail: 'jane@example.com',
        price: 1200,
        status: 'pending',
        paymentMethod: 'cash',
        paymentStatus: 'pending'
    },
    {
        date: '2025-01-16',
        timeSlot: '15:00 - 16:00',
        customerName: 'Ram Sharma',
        customerPhone: '9861234567',
        customerEmail: 'ram@example.com',
        price: 1000,
        status: 'confirmed',
        paymentMethod: 'khalti',
        paymentStatus: 'paid'
    }
];

// Sample contact messages for testing
const sampleContacts = [
    {
        name: 'Test User',
        email: 'test@example.com',
        phone: '9841111111',
        message: 'I would like to book a tournament. Do you offer group discounts?',
        status: 'new'
    },
    {
        name: 'Another User',
        email: 'user@example.com',
        phone: '9842222222',
        message: 'What are your operating hours?',
        status: 'read'
    }
];

async function seedDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('\n🗑️  Clearing existing data...');
        await Booking.deleteMany({});
        await Contact.deleteMany({});
        console.log('✅ Existing data cleared');

        // Insert sample bookings
        console.log('\n📅 Inserting sample bookings...');
        const bookings = await Booking.insertMany(sampleBookings);
        console.log(`✅ Inserted ${bookings.length} bookings`);

        // Insert sample contacts
        console.log('\n📧 Inserting sample contact messages...');
        const contacts = await Contact.insertMany(sampleContacts);
        console.log(`✅ Inserted ${contacts.length} contact messages`);

        console.log('\n🎉 Database seeded successfully!');
        console.log('\nSummary:');
        console.log(`  - Bookings: ${bookings.length}`);
        console.log(`  - Contact Messages: ${contacts.length}`);
        
        mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();
