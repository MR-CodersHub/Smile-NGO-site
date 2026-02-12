/**
 * Central Data Store
 * Handles Services, Blogs, Users, and Activity Logs.
 * Seeds data if localStorage is empty.
 */

const DEFAULT_SERVICES = [
    {
        id: 'clean-water',
        title: 'Clean Water Initiative',
        icon: 'fa-hand-holding-water',
        shortDesc: 'Providing access to clean, safe drinking water to remote villages preventing waterbourne diseases.',
        fullDesc: 'Millions of people around the world lack access to safe drinking water. Our Clean Water Initiative focuses on drilling sustainable wells, installing filtration systems, and training communities on water hygiene.',
        image: 'https://images.unsplash.com/photo-1541976844346-f18aeac57b06?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        goal: 50000,
        raised: 32450,
        category: 'Health',
        impactStats: [
            { label: 'Wells Built', value: '120+' },
            { label: 'People Served', value: '50,000' }
        ]
    },
    {
        id: 'child-education',
        title: 'Education for All',
        icon: 'fa-book-reader',
        shortDesc: 'Building schools, providing books, and empowering teachers to create a knowledgeable generation.',
        fullDesc: 'Education is the key to breaking the cycle of poverty. We build classrooms, provide textbooks, and sponsor teacher training in underserved regions to ensure every child has a chance to learn.',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        goal: 75000,
        raised: 45000,
        category: 'Education',
        impactStats: [
            { label: 'Schools Built', value: '45' },
            { label: 'Students', value: '12,000' }
        ]
    },
    {
        id: 'medical-aid',
        title: 'Medical Aid & Vaccines',
        icon: 'fa-briefcase-medical',
        shortDesc: 'Mobile clinics and vaccination drives ensuring no child suffers from preventable illnesses.',
        fullDesc: 'Our medical teams travel to hard-to-reach areas to provide life-saving vaccines, maternal care, and emergency medical treatment to those who otherwise have no access to healthcare.',
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        goal: 100000,
        raised: 87000,
        category: 'Health',
        impactStats: [
            { label: 'Vaccinations', value: '250k' },
            { label: 'Checkups', value: '15k' }
        ]
    },
    {
        id: 'food-nutrition',
        title: 'Food & Nutrition',
        icon: 'fa-utensils',
        shortDesc: 'Fighting malnutrition with sustainable food programs and emergency relief.',
        fullDesc: 'Hunger stunts growth and kills dreams. We provide emergency food packets for disaster victims and help communities establish sustainable farming practices for long-term food security.',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        goal: 60000,
        raised: 12000,
        category: 'Relief',
        impactStats: [
            { label: 'Meals Served', value: '1M+' },
            { label: 'Farms Started', value: '85' }
        ]
    },
    {
        id: 'women-empowerment',
        title: 'Women Empowerment',
        icon: 'fa-female',
        shortDesc: 'Empowering women through vocational training, microfinance, and leadership programs.',
        fullDesc: 'When you empower a woman, you empower an entire community. Our Women Empowerment program provides vocational skills training in tailoring, handicrafts, and entrepreneurship. We offer microloans to help women start their own businesses and become financially independent. Through leadership workshops and mentorship programs, we help women break barriers and become change-makers in their communities.',
        image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        goal: 80000,
        raised: 38500,
        category: 'Empowerment',
        impactStats: [
            { label: 'Women Trained', value: '3,200+' },
            { label: 'Businesses Started', value: '450' }
        ]
    },
    {
        id: 'disaster-relief',
        title: 'Emergency Disaster Relief',
        icon: 'fa-hands-helping',
        shortDesc: 'Rapid response teams providing immediate aid during natural disasters and humanitarian crises.',
        fullDesc: 'When disaster strikes, every second counts. Our Emergency Disaster Relief program deploys rapid response teams to provide immediate assistance to affected communities. We distribute emergency supplies including food, clean water, shelter materials, and medical aid. Our teams work around the clock to ensure that no family is left behind during their darkest hours. We also focus on long-term recovery, helping communities rebuild stronger and more resilient.',
        image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        goal: 120000,
        raised: 95000,
        category: 'Relief',
        impactStats: [
            { label: 'Families Assisted', value: '8,500+' },
            { label: 'Relief Missions', value: '42' }
        ]
    }
];

const DEFAULT_BLOGS = [
    {
        id: 'water-crisis-update',
        title: 'Update on the Water Crisis in Kenya',
        category: 'Field Report',
        date: 'Oct 24, 2024',
        author: 'Sarah Jenkins',
        image: 'https://images.unsplash.com/photo-1541976844346-f18aeac57b06?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Our team just returned from Kajiado with news on the new well projects.',
        content: `
            <p>The situation in Kajiado has been critical for months due to the prolonged drought. However, thanks to the generosity of our donors, we have successfully broken ground on three new boreholes.</p>
            <h3>The Impact</h3>
            <p>These wells will serve over 4,000 residents who previously walked up to 15 kilometers a day for water. The local school will also have a direct line, ensuring children can focus on their studies instead of thirst.</p>
            <blockquote>"Water is the beginning of everything." - Village Elder</blockquote>
            <p>We are continuing to monitor the situation and will provide further updates as the construction progresses.</p>
        `
    },
    {
        id: 'education-changes-lives',
        title: 'How Education Changed Maya\'s Life',
        category: 'Success Story',
        date: 'Oct 15, 2024',
        author: 'David Okello',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Meet the 12-year-old girl who defied the odds to become top of her class.',
        content: `
            <p>Maya was born into a family where girls were expected to work, not study. But when Smile NGO opened a free school in her village, her parents were convinced to let her attend.</p>
            <h3>A Star Student</h3>
            <p>Within two years, Maya has not only learned to read and write but is now tutoring younger children in her neighborhood. She dreams of becoming a doctor.</p>
            <p>Your sponsorship provides her uniform, books, and daily meals.</p>
        `
    },
    {
        id: 'volunteering-guide',
        title: 'A Guide to Volunteering Abroad',
        category: 'Guide',
        date: 'Sep 28, 2024',
        author: 'Emma Wilson',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Thinking of joining us in the field? Here is everything you need to know.',
        content: `
            <p>Volunteering is a life-changing experience, but it requires preparation. From vaccinations to cultural sensitivity, we cover the essentials for your first humanitarian trip.</p>
            <h3>What to Pack</h3>
            <ul>
                <li>Durable clothing</li>
                <li>First aid kit</li>
                <li>An open mind</li>
            </ul>
        `
    }
];

// Default donations removed to enforce strict real-data only rule
const DEFAULT_DONATIONS = [];

// Data Access Object
const DataManager = {
    getServices: function () {
        return DEFAULT_SERVICES; // In a real app, this might come from an API
    },

    getServiceById: function (id) {
        return DEFAULT_SERVICES.find(s => s.id === id);
    },

    getBlogs: function () {
        return DEFAULT_BLOGS;
    },

    getBlogById: function (id) {
        return DEFAULT_BLOGS.find(b => b.id === id);
    },

    getUsers: function () {
        return JSON.parse(localStorage.getItem('smile_users')) || [];
    },

    getDonations: function () {
        return JSON.parse(localStorage.getItem('smile_donations')) || [];
    },

    addDonation: function (donation) {
        const donations = this.getDonations();
        donations.unshift(donation); // Add to top
        localStorage.setItem('smile_donations', JSON.stringify(donations));

        // Log activity properly with type
        this.logActivity(donation.donorEmail, `Donated $${donation.amount} to ${donation.cause}`, 'donation');
    },

    getDonationsByUser: function (email) {
        const donations = this.getDonations();
        return donations.filter(d => d.donorEmail === email);
    },

    addUser: function (user) {
        const users = this.getUsers();
        // Check if email exists
        if (users.find(u => u.email === user.email)) {
            return false; // User exists
        }

        // Ensure proper object shape
        user.createdAt = new Date().toISOString();
        users.push(user);

        localStorage.setItem('smile_users', JSON.stringify(users));
        this.logActivity(user.email, 'New user signup', 'signup');
        return true;
    },

    // Activity Log
    getActivityLog: function () {
        return JSON.parse(localStorage.getItem('smile_activity')) || [];
    },

    logActivity: function (email, description, type = 'general') {
        const logs = this.getActivityLog();
        const newLog = {
            id: Date.now(),
            email: email,
            description: description,
            type: type,
            time: new Date().toISOString()
        };
        logs.unshift(newLog); // Add to beginning
        localStorage.setItem('smile_activity', JSON.stringify(logs));
    },

    // Session Management
    setCurrentUser: function (user) {
        localStorage.setItem('smile_logged_in_user', JSON.stringify(user));
    },

    getCurrentUser: function () {
        return JSON.parse(localStorage.getItem('smile_logged_in_user'));
    },

    logoutUser: function () {
        localStorage.removeItem('smile_logged_in_user');
    },

    // Bookings (Events)
    getBookings: function () {
        return JSON.parse(localStorage.getItem('smile_bookings')) || [];
    },

    getBookingsByUser: function (email) {
        return this.getBookings().filter(b => b.email === email);
    },

    addBooking: function (booking) {
        const bookings = this.getBookings();
        bookings.unshift(booking);
        localStorage.setItem('smile_bookings', JSON.stringify(bookings));
        this.logActivity(booking.email, `Booked event: ${booking.eventName}`, 'booking');
    },

    // Contacts & Newsletter
    getContacts: function () {
        return JSON.parse(localStorage.getItem('smile_contacts')) || [];
    },

    addContact: function (contact) {
        const contacts = this.getContacts();
        contacts.unshift(contact);
        localStorage.setItem('smile_contacts', JSON.stringify(contacts));
    },

    getNewsletterSubscribers: function () {
        return JSON.parse(localStorage.getItem('smile_newsletter')) || [];
    },

    addNewsletterSubscriber: function (email) {
        const subs = this.getNewsletterSubscribers();
        if (!subs.includes(email)) {
            subs.push(email);
            localStorage.setItem('smile_newsletter', JSON.stringify(subs));
        }
    }
};

// Expose to window
window.DataManager = DataManager;
