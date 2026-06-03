// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Calendar functionality
let currentDate = new Date();
let selectedDate = null;
let selectedTimeSlot = null;

// Pricing based on time slots
const pricing = {
    '06:00 - 07:00': 800,
    '07:00 - 08:00': 800,
    '08:00 - 09:00': 800,
    '09:00 - 10:00': 800,
    '10:00 - 11:00': 800,
    '11:00 - 12:00': 800,
    '12:00 - 13:00': 1000,
    '13:00 - 14:00': 1000,
    '14:00 - 15:00': 1000,
    '15:00 - 16:00': 1000,
    '16:00 - 17:00': 1000,
    '17:00 - 18:00': 1200,
    '18:00 - 19:00': 1200,
    '19:00 - 20:00': 1200,
    '20:00 - 21:00': 1200,
    '21:00 - 22:00': 1200
};

// Store bookings (in production, this would be connected to a backend)
const bookings = {};

// Initialize booking system
function initBookingSystem() {
    renderCalendar();
    setupCalendarControls();
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonth = document.getElementById('currentMonth');
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    currentMonth.textContent = currentDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
    });
    
    calendarGrid.innerHTML = '';
    
    // Add weekday headers
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdays.forEach(day => {
        const weekdayElement = document.createElement('div');
        weekdayElement.classList.add('calendar-weekday');
        weekdayElement.textContent = day;
        calendarGrid.appendChild(weekdayElement);
    });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        dayCell.textContent = day;
        
        const cellDate = new Date(year, month, day);
        
        // Disable past dates
        if (cellDate < today.setHours(0, 0, 0, 0)) {
            dayCell.classList.add('disabled');
        } else {
            // Mark today
            if (cellDate.toDateString() === new Date().toDateString()) {
                dayCell.classList.add('today');
            }
            
            dayCell.addEventListener('click', () => selectDate(cellDate, dayCell));
        }
        
        calendarGrid.appendChild(dayCell);
    }
}

function setupCalendarControls() {
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

function selectDate(date, element) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    element.classList.add('selected');
    selectedDate = date;
    
    // Update selected date display
    document.getElementById('selectedDate').textContent = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Render time slots
    renderTimeSlots(date);
}

function renderTimeSlots(date) {
    const timeSlotsContainer = document.getElementById('timeSlots');
    timeSlotsContainer.innerHTML = '<h3 style="grid-column: 1 / -1; margin-bottom: 1rem;">Available Time Slots</h3>';
    
    const dateKey = date.toISOString().split('T')[0];
    
    Object.entries(pricing).forEach(([timeSlot, price]) => {
        const slotElement = document.createElement('div');
        slotElement.classList.add('time-slot');
        
        // Check if slot is already booked
        const isBooked = bookings[dateKey] && bookings[dateKey].includes(timeSlot);
        
        if (isBooked) {
            slotElement.classList.add('booked');
        }
        
        slotElement.innerHTML = `
            <div class="time-slot-time">${timeSlot}</div>
            <div class="time-slot-price">${isBooked ? 'Booked' : 'NPR ' + price}</div>
        `;
        
        if (!isBooked) {
            slotElement.addEventListener('click', () => selectTimeSlot(timeSlot, price, slotElement, dateKey));
        }
        
        timeSlotsContainer.appendChild(slotElement);
    });
}

function selectTimeSlot(timeSlot, price, element, dateKey) {
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    element.classList.add('selected');
    selectedTimeSlot = { time: timeSlot, price: price, dateKey: dateKey };
    
    // Show booking summary
    const bookingSummary = document.getElementById('bookingSummary');
    bookingSummary.style.display = 'block';
    
    document.getElementById('summaryDate').textContent = selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    document.getElementById('summaryTime').textContent = timeSlot;
    document.getElementById('summaryPrice').textContent = `NPR ${price}`;
    
    // Scroll to summary
    bookingSummary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Cancel booking
document.getElementById('cancelBooking').addEventListener('click', () => {
    document.getElementById('bookingSummary').style.display = 'none';
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    selectedTimeSlot = null;
    
    // Clear customer info
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerEmail').value = '';
});

// Proceed to payment
document.getElementById('proceedPayment').addEventListener('click', () => {
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    
    if (!customerName || !customerPhone) {
        alert('Please fill in your name and phone number.');
        return;
    }
    
    if (!selectedTimeSlot) {
        alert('Please select a time slot.');
        return;
    }
    
    // Show payment modal
    showPaymentModal(customerName, customerPhone, customerEmail);
});

function showPaymentModal(name, phone, email) {
    const modal = document.getElementById('paymentModal');
    modal.classList.add('active');
    
    document.getElementById('paymentDate').textContent = selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    document.getElementById('paymentTime').textContent = selectedTimeSlot.time;
    document.getElementById('paymentName').textContent = name;
    document.getElementById('paymentAmount').textContent = `NPR ${selectedTimeSlot.price}`;
    
    // Setup payment options
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', () => {
            const method = option.dataset.method;
            processPayment(method, name, phone, email);
        });
    });
}

function processPayment(method, name, phone, email) {
    // In production, this would integrate with actual payment gateways
    // For now, we'll simulate the booking process
    
    // Add booking to storage
    if (!bookings[selectedTimeSlot.dateKey]) {
        bookings[selectedTimeSlot.dateKey] = [];
    }
    bookings[selectedTimeSlot.dateKey].push(selectedTimeSlot.time);
    
    // Close payment modal
    document.getElementById('paymentModal').classList.remove('active');
    
    // Show success modal
    showSuccessModal();
    
    // Send WhatsApp message (opens WhatsApp with pre-filled message)
    const message = `Hi! I've booked a futsal slot:\n\nName: ${name}\nPhone: ${phone}\n${email ? 'Email: ' + email + '\n' : ''}Date: ${selectedDate.toLocaleDateString()}\nTime: ${selectedTimeSlot.time}\nAmount: NPR ${selectedTimeSlot.price}\nPayment Method: ${method}\n\nPlease confirm my booking.`;
    const whatsappUrl = `https://wa.me/__________?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 2000);
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    
    // Reset booking form
    document.getElementById('bookingSummary').style.display = 'none';
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerEmail').value = '';
    
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    selectedTimeSlot = null;
    
    // Re-render time slots to show the newly booked slot
    if (selectedDate) {
        renderTimeSlots(selectedDate);
    }
}

// Close modals
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('paymentModal').classList.remove('active');
});

document.getElementById('closeSuccess').addEventListener('click', () => {
    document.getElementById('successModal').classList.remove('active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const paymentModal = document.getElementById('paymentModal');
    const successModal = document.getElementById('successModal');
    
    if (e.target === paymentModal) {
        paymentModal.classList.remove('active');
    }
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const message = `New contact form submission:\n\nName: ${formData.get('name')}\nEmail: ${formData.get('email')}\nPhone: ${formData.get('phone')}\nMessage: ${formData.get('message')}`;
    
    // In production, this would send to a backend
    // For now, open WhatsApp
    const whatsappUrl = `https://wa.me/__________?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    alert('Thank you! We will get back to you soon.');
    e.target.reset();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initBookingSystem();
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});