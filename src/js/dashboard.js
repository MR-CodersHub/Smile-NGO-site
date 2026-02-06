document.addEventListener('DOMContentLoaded', () => {
    // Check auth first
    if (window.checkDashboardAccess) {
        window.checkDashboardAccess();
    }

    const adminContainer = document.getElementById('adminDashboardContainer');
    const userContainer = document.getElementById('userDashboardContainer');

    if (adminContainer) {
        renderAdminDashboard();
    }

    if (userContainer) {
        renderUserDashboard();
    }
});

function renderAdminDashboard() {
    // 1. Fetch Data via DataManager (which wraps the strict localStorage keys)
    const users = DataManager.getUsers();
    const logs = DataManager.getActivityLog();
    const donations = DataManager.getDonations();

    // Stats
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

    const statsConfig = [
        { id: 'totalDonations', value: '$' + (totalDonations ? totalDonations.toLocaleString() : '0'), label: 'Total Donations' },
        { id: 'totalUsers', value: users.length, label: 'Registered Users' },
        { id: 'totalActivities', value: logs.length, label: 'Total Activities' }
    ];

    // Assuming the HTML structure supports this, otherwise we inject
    // Based on previous code, we need to inject the stats HTML
    const statsHTML = `
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><h3 class="text-3xl font-bold text-smile-text">${statsConfig[0].value}</h3><p class="text-sm text-gray-500">${statsConfig[0].label}</p></div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><h3 class="text-3xl font-bold text-smile-text">${statsConfig[1].value}</h3><p class="text-sm text-gray-500">${statsConfig[1].label}</p></div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><h3 class="text-3xl font-bold text-smile-text">${statsConfig[2].value}</h3><p class="text-sm text-gray-500">${statsConfig[2].label}</p></div>
    `;
    const statsContainer = document.getElementById('adminStats');
    if (statsContainer) statsContainer.innerHTML = statsHTML;

    // 2. Users Table
    const tbody = document.getElementById('adminUsersTableBody') || document.querySelector('tbody'); // flexible selector
    if (tbody) {
        tbody.innerHTML = "";

        if (users.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-gray-500">No users yet</td></tr>`;
        } else {
            users.forEach(u => {
                const tr = document.createElement("tr");
                tr.className = "hover:bg-gray-50 transition";
                tr.innerHTML = `
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${u.name}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">${u.email}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">${new Date(u.createdAt).toLocaleDateString()}</td>
                    <td class="px-6 py-4 text-sm font-bold text-smile-red">${u.role}</td>
                    <td class="px-6 py-4 text-sm"><span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">Active</span></td>
                `;
                tbody.appendChild(tr);
            });
        }
    }

    // 3. Activity Feed
    const activityList = document.getElementById('adminRecentActivity');
    if (activityList) {
        activityList.innerHTML = "";
        if (logs.length === 0) {
            activityList.innerHTML = '<p class="text-sm text-gray-400">No recent activity</p>';
        } else {
            logs.slice(0, 10).forEach(log => {
                const div = document.createElement("div");
                div.className = "relative pl-6 pb-4 border-l border-gray-200 last:border-0";
                div.innerHTML = `
                    <span class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-smile-red"></span>
                    <p class="text-sm font-bold text-gray-800">${log.description}</p>
                    <span class="text-xs text-gray-400 mt-1 block">${new Date(log.time).toLocaleString()} • ${log.email || 'System'}</span>
                `;
                activityList.appendChild(div);
            });
        }
    }
}

function renderUserDashboard() {
    // 1. Get Current User & Private Data
    // 1. Get Current User & Private Data
    const user = JSON.parse(localStorage.getItem('smile_logged_in_user'));
    if (!user) {
        window.location.href = '../../auth/login.html';
        return;
    }

    document.getElementById('userProfileName').innerText = user.name;
    document.getElementById('userProfileEmail').innerText = user.email;

    // Member Since
    const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : 'N/A';
    const memberSinceEl = document.getElementById('userMemberSince');
    if (memberSinceEl) memberSinceEl.innerText = memberSince;

    const avatar = document.getElementById('userAvatar');
    if (avatar) avatar.src = `https://ui-avatars.com/api/?name=${user.name}&background=C92D39&color=fff`;

    // 2. Filter Activity & Donations for THIS user only
    const allActivities = DataManager.getActivityLog();
    const myActivities = allActivities.filter(a => a.email === user.email);

    const donations = DataManager.getDonationsByUser(user.email);

    // Update Stats Card
    const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
    const uniqueCauses = [...new Set(donations.map(d => d.cause))].length;

    const totalDonatedEl = document.getElementById('userTotalDonated');
    const causesSupportedEl = document.getElementById('userCausesSupported');

    if (totalDonatedEl) totalDonatedEl.innerText = '$' + totalDonated.toLocaleString();
    if (causesSupportedEl) causesSupportedEl.innerText = uniqueCauses;

    // Render Donations
    const donationList = document.getElementById('userDonationHistory');
    if (donationList) {
        donationList.innerHTML = "";

        if (donations.length === 0) {
            donationList.innerHTML = '<p class="text-gray-500 py-4">No donations yet.</p>';
        } else {
            donations.forEach(h => {
                const div = document.createElement("div");
                div.className = "flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition bg-white mb-3";
                div.innerHTML = `
                     <div class="flex items-center gap-4">
                         <div class="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><i class="fas fa-check"></i></div>
                         <div>
                             <h4 class="font-bold text-sm text-smile-text">${h.cause}</h4>
                             <p class="text-xs text-gray-400">${h.date} • ${h.id}</p>
                         </div>
                     </div>
                     <div class="text-right">
                         <span class="block font-bold text-smile-text">$${h.amount}</span>
                         <span class="text-xs text-green-600 font-bold">${h.status}</span>
                     </div>
                `;
                donationList.appendChild(div);
            });
        }
    }

    // 3. Render Activity
    const activityList = document.getElementById('userActivityLog');
    if (activityList) {
        activityList.innerHTML = "";
        if (myActivities.length === 0) {
            activityList.innerHTML = '<p class="text-sm text-gray-400">No recent activity</p>';
        } else {
            myActivities.slice(0, 10).forEach(log => {
                const div = document.createElement("div");
                div.className = "relative pl-6 pb-4 border-l border-gray-200 last:border-0";
                div.innerHTML = `
                    <span class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-smile-red"></span>
                    <p class="text-sm font-bold text-gray-800">${log.description}</p>
                    <span class="text-xs text-gray-400 mt-1 block">${new Date(log.time).toLocaleString()}</span>
                `;
                activityList.appendChild(div);
            });
        }
    }

    // 4. Render Bookings
    const bookingsList = document.getElementById('userBookings');
    if (bookingsList) {
        const bookings = DataManager.getBookingsByUser(user.email);
        bookingsList.innerHTML = "";
        if (bookings.length === 0) {
            bookingsList.innerHTML = '<p class="text-sm text-gray-400 col-span-full text-center py-4">No upcoming events booked.</p>';
        } else {
            bookings.forEach(b => {
                const div = document.createElement("div");
                div.className = "p-4 border border-gray-100 rounded-xl bg-gray-50 flex flex-col gap-2";
                div.innerHTML = `
                        <div class="flex justify-between items-start">
                            <h4 class="font-bold text-smile-text">${b.eventName}</h4>
                            <span class="text-[10px] px-2 py-0.5 bg-smile-red text-white rounded-full font-bold uppercase">${b.status || 'Confirmed'}</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-gray-500">
                            <i class="fas fa-calendar-alt w-4"></i> ${b.date}
                        </div>
                        <div class="flex items-center gap-2 text-xs text-gray-500">
                            <i class="fas fa-map-marker-alt w-4"></i> ${b.location || 'Main Center'}
                        </div>
                    `;
                bookingsList.appendChild(div);
            });
        }
    }
}
