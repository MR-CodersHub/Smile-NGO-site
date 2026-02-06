document.addEventListener('DOMContentLoaded', () => {
    // Ensure DataManager is loaded
    if (typeof DataManager === 'undefined') {
        console.error('DataManager not loaded! Include data.js before layout.js');
    }

    injectNavbar();
    injectFooter();
});


function injectNavbar() {
    const pathPrefix = getBasePath();

    const navHTML = `
    <nav class="w-full bg-white/95 backdrop-blur-sm fixed top-0 z-50 border-b border-gray-100 transition-all duration-300" id="mainNavbar">
        <div class="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
            <!-- Logo -->
            <a href="${pathPrefix}index.html" class="flex items-center gap-2 group">
                 <img src="${pathPrefix}assets/img/logo.png" onerror="this.src='https://via.placeholder.com/40x40/C92D39/FFFFFF?text=S'" alt="Logo" class="w-10 h-10 object-contain">
                <div class="flex flex-col">
                    <span class="text-xl font-serif font-bold text-smile-text leading-none">Smile</span>
                    <span class="text-[10px] tracking-widest text-smile-grey uppercase">Charity Organization</span>
                </div>
            </a>

            <!-- Mobile Menu Button -->
            <button id="mobileMenuBtn" class="lg:hidden text-smile-dark focus:outline-none">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>

            <!-- Desktop Menu -->
            <div class="hidden lg:flex items-center gap-8">
                <ul class="flex items-center gap-8 text-sm font-bold tracking-wide text-smile-text uppercase">
                    <li><a href="${pathPrefix}index.html" class="hover:text-smile-red transition relative group">
                        Home
                        <span class="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-smile-red transition-all duration-300 group-hover:w-full"></span>
                    </a></li>
                     <li><a href="${pathPrefix}public/pages/home-2.html" class="hover:text-smile-red transition relative group">
                        Mission
                        <span class="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-smile-red transition-all duration-300 group-hover:w-full"></span>
                    </a></li>
                    <li><a href="${pathPrefix}public/pages/about.html" class="hover:text-smile-red transition relative group">
                        About
                        <span class="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-smile-red transition-all duration-300 group-hover:w-full"></span>
                    </a></li>
                    <li><a href="${pathPrefix}public/pages/services.html" class="hover:text-smile-red transition relative group">
                        Causes
                        <span class="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-smile-red transition-all duration-300 group-hover:w-full"></span>
                    </a></li>
                    <li><a href="${pathPrefix}public/pages/blog.html" class="hover:text-smile-red transition relative group">
                        Stories
                        <span class="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-smile-red transition-all duration-300 group-hover:w-full"></span>
                    </a></li>
                    <li><a href="${pathPrefix}public/pages/contact.html" class="hover:text-smile-red transition relative group">
                        Contact
                        <span class="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-smile-red transition-all duration-300 group-hover:w-full"></span>
                    </a></li>
                </ul>

                <div class="flex items-center gap-6">

                     <!-- Profile Dropdown -->
                    <div id="authContainer" class="relative">
                        <!-- Content Injected Here -->
                    </div>

                    <a href="${pathPrefix}public/pages/pricing.html" class="bg-smile-red text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-red-700 transition shadow-lg transform hover:-translate-y-0.5">
                        DONATE NOW
                    </a>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobileMenu" class="hidden lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-20 shadow-lg py-4 px-4 flex-col gap-4">
             <a href="${pathPrefix}index.html" class="block py-2 text-smile-text hover:text-smile-red">Home</a>
             <a href="${pathPrefix}public/pages/home-2.html" class="block py-2 text-smile-text hover:text-smile-red">Mission</a>
             <a href="${pathPrefix}public/pages/about.html" class="block py-2 text-smile-text hover:text-smile-red">About</a>
             <a href="${pathPrefix}public/pages/services.html" class="block py-2 text-smile-text hover:text-smile-red">Causes</a>
             <a href="${pathPrefix}public/pages/blog.html" class="block py-2 text-smile-text hover:text-smile-red">Blog</a>
             <a href="${pathPrefix}public/pages/contact.html" class="block py-2 text-smile-text hover:text-smile-red">Contact</a>
             <div id="mobileAuthContainer" class="pt-4 border-t border-gray-100 flex flex-col gap-3">
             </div>
        </div>
    </nav>
    <div class="h-20"></div> <!-- Spacer -->
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Initialize Auth UI Logic
    updateAuthUI(pathPrefix);

    // Mobile Menu Toggle
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

function updateAuthUI(pathPrefix) {
    const authContainer = document.getElementById('authContainer');
    const mobileAuthContainer = document.getElementById('mobileAuthContainer');

    // Check logged in user via localStorage directly to avoid dependency issues
    const user = JSON.parse(localStorage.getItem('smile_logged_in_user'));

    if (user) {
        const initials = user.name.charAt(0).toUpperCase();
        const dashboardLink = user.role === 'admin'
            ? `${pathPrefix}auth/admin/admin-dashboard.html`
            : `${pathPrefix}auth/user/user-dashboard.html`;

        // Desktop Dropdown
        if (authContainer) {
            authContainer.innerHTML = `
                <div class="relative group">
                    <button class="w-10 h-10 rounded-full bg-smile-red text-white font-bold flex items-center justify-center hover:bg-red-700 transition shadow-md border-2 border-white">
                        ${initials}
                    </button>
                    
                    <div class="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right w-56 z-50">
                        <div class="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                            <div class="p-4 border-b border-gray-100 bg-gray-50">
                                <p class="text-sm font-bold text-gray-800 truncate">${user.name}</p>
                                <p class="text-xs text-gray-500 truncate">${user.email}</p>
                            </div>
                             <a href="${dashboardLink}" class="block px-4 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-smile-red transition">
                                <i class="fas fa-th-large mr-2 w-4"></i> Dashboard
                            </a>
                            <button onclick="window.logout()" class="w-full text-left block px-4 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-smile-red transition border-t border-gray-100">
                                <i class="fas fa-sign-out-alt mr-2 w-4"></i> Logout
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        // Mobile Menu
        if (mobileAuthContainer) {
            mobileAuthContainer.innerHTML = `
                <div class="flex items-center gap-3 px-2 mb-2">
                    <div class="w-8 h-8 rounded-full bg-smile-red text-white flex items-center justify-center font-bold text-xs">${initials}</div>
                    <span class="text-sm font-bold text-gray-700">${user.name}</span>
                </div>
                <a href="${dashboardLink}" class="block py-2 text-smile-text hover:text-smile-red pl-2 border-l-2 border-transparent hover:border-smile-red">Dashboard</a>
                <button onclick="window.logout()" class="text-left w-full block py-2 text-smile-text hover:text-smile-red pl-2 border-l-2 border-transparent hover:border-smile-red">Logout</button>
            `;
        }

    } else {
        // Guest State
        if (authContainer) {
            authContainer.innerHTML = `
                <div class="relative group">
                    <button class="w-10 h-10 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center hover:bg-smile-red hover:text-white transition shadow-sm">
                        <i class="fas fa-user-circle text-xl"></i>
                    </button>
                    
                    <div class="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right w-48 z-50">
                        <div class="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                            <a href="${pathPrefix}auth/login.html" class="block px-4 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-smile-red transition">
                                <i class="fas fa-sign-in-alt mr-2 w-4"></i> Login
                            </a>
                            <a href="${pathPrefix}auth/signup.html" class="block px-4 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-smile-red transition">
                                <i class="fas fa-user-plus mr-2 w-4"></i> Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }

        if (mobileAuthContainer) {
            mobileAuthContainer.innerHTML = `
                <a href="${pathPrefix}auth/login.html" class="block py-2 text-smile-text hover:text-smile-red font-bold">Login</a>
                <a href="${pathPrefix}auth/signup.html" class="block py-2 text-smile-text hover:text-smile-red font-bold">Sign Up</a>
            `;
        }
    }
}


function injectFooter() {
    const pathPrefix = getBasePath();

    const footerHTML = `
    <footer class="bg-smile-dark text-white pt-16 pb-8">
        <div class="container mx-auto px-4 md:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <!-- Brand -->
                <div>
                     <div class="flex items-center gap-2 mb-6">
                        <div class="w-8 h-8 bg-smile-red rounded-full flex items-center justify-center text-white font-serif font-bold">S</div>
                        <span class="text-xl font-serif font-bold">Smile</span>
                    </div>
                    <p class="text-gray-400 text-sm leading-relaxed mb-6">
                        Dedicated to child welfare, education support, and community upliftment. Join us in making the world a better place, one smile at a time.
                    </p>
                </div>

                <!-- Quick Links -->
                <div>
                    <h4 class="text-lg font-serif font-bold mb-6">Quick Links</h4>
                    <ul class="space-y-3 text-sm text-gray-400">
                        <li><a href="${pathPrefix}public/pages/about.html" class="hover:text-smile-red transition">About Us</a></li>
                        <li><a href="${pathPrefix}public/pages/services.html" class="hover:text-smile-red transition">Our Causes</a></li>
                        <li><a href="${pathPrefix}public/pages/blog.html" class="hover:text-smile-red transition">Latest News</a></li>
                        <li><a href="${pathPrefix}public/pages/contact.html" class="hover:text-smile-red transition">Contact</a></li>
                        <li><a href="${pathPrefix}public/pages/faq.html" class="hover:text-smile-red transition">FAQ</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 class="text-lg font-serif font-bold mb-6">Contact Us</h4>
                    <ul class="space-y-4 text-sm text-gray-400">
                        <li class="flex items-start gap-3">
                             <i class="fas fa-map-marker-alt text-smile-red mt-1"></i>
                            Smile NGO, Community Outreach Center
                        </li>
                        <li class="flex items-start gap-3">
                           <i class="fas fa-phone-alt text-smile-red mt-1"></i>
                            +91 90000 00000
                        </li>
                        <li class="flex items-start gap-3">
                           <i class="fas fa-envelope text-smile-red mt-1"></i>
                            support@smile.org
                        </li>
                    </ul>
                </div>

                <!-- Newsletter -->
                <div>
                     <h4 class="text-lg font-serif font-bold mb-6">Newsletter</h4>
                     <p class="text-sm text-gray-400 mb-4">Subscribe to our newsletter to get latest updates.</p>
                     <form id="footerNewsletterForm" class="space-y-2">
                        <input type="email" id="newsletterEmail" placeholder="Enter your email" required class="w-full bg-gray-800 border-none text-white text-sm px-4 py-3 rounded focus:ring-1 focus:ring-smile-red outline-none">
                        <button type="submit" class="w-full bg-smile-red text-white text-sm font-bold px-4 py-3 rounded hover:bg-red-700 transition">SUBSCRIBE</button>
                     </form>
                </div>
            </div>

            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>&copy; 2024 Smile NGO. All rights reserved.</p>
                <div class="flex gap-6 mt-4 md:mt-0">
                    <a href="${pathPrefix}public/pages/privacy-policy.html" class="hover:text-white transition">Privacy Policy</a>
                    <a href="${pathPrefix}public/pages/terms-of-service.html" class="hover:text-white transition">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Auth Listener for Newsletter
    const newsletterForm = document.getElementById('footerNewsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            if (window.DataManager) {
                DataManager.addNewsletterSubscriber(email);
                alert('Thank you for subscribing!');
                newsletterForm.reset();
            }
        });
    }
}
