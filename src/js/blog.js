window.blogPosts = [
    {
        id: 1,
        title: "Providing Clean Water to Rural Villages",
        category: "Field Stories",
        image: "https://images.unsplash.com/photo-1541976844346-f18aeac57b06?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "October 12, 2024",
        excerpt: "Access to clean water changes everything. See how our latest project in Kenya is transforming lives.",
        content: "Full content..."
    },
    {
        id: 2,
        title: "The Power of Education: A Girl's Dream",
        category: "Impact Reports",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "September 28, 2024",
        excerpt: "Meet Amina, a bright student whose life changed after receiving a Smile scholarship.",
        content: "Full content..."
    },
    {
        id: 3,
        title: "Volunteering in South Africa: My Diary",
        category: "Volunteer Experiences",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "August 15, 2024",
        excerpt: "Sarah shares her emotional and rewarding journey spending 3 weeks with our team.",
        content: "Full content..."
    },
    {
        id: 4,
        title: "Emergency Relief for Flood Victims",
        category: "Awareness Campaigns",
        image: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "July 04, 2024",
        excerpt: "Urgent update on our relief efforts in the flood-affected regions of Southeast Asia.",
        content: "Full content..."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.getElementById('blogContainer');
    const blogDetailContainer = document.getElementById('blogDetailContainer');
    const searchInput = document.getElementById('blogSearch');
    const categoryFilter = document.getElementById('categoryFilter');

    if (blogContainer) {
        renderPosts(window.blogPosts);

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                filterPosts(e.target.value, categoryFilter ? categoryFilter.value : 'All');
            });
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                filterPosts(searchInput ? searchInput.value : '', e.target.value);
            });
        }
    }

    if (blogDetailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlParams.get('id'));
        const post = window.blogPosts.find(p => p.id === id);

        if (post) {
            renderPostDetail(post);
        } else {
            blogDetailContainer.innerHTML = '<div class="text-center py-20">Post not found. <a href="blog.html" class="text-smile-red underline">Return to Blog</a></div>';
        }
    }
});

function renderPostDetail(post) {
    const container = document.getElementById('blogDetailContainer');
    document.title = `${post.title} - Smile NGO`;

    container.innerHTML = `
        <article>
            <div class="mb-8">
                <span class="text-smile-red font-bold tracking-widest text-xs uppercase mb-2 block">${post.category}</span>
                <h1 class="text-4xl md:text-5xl font-serif font-bold text-smile-text mb-6 leading-tight">${post.title}</h1>
                <div class="flex items-center gap-4 text-gray-500 text-sm">
                    <span><i class="far fa-calendar mr-2"></i> ${post.date}</span>
                    <span><i class="far fa-user mr-2"></i> By Admin</span>
                </div>
            </div>
            
            <img src="${post.image}" class="w-full h-[400px] object-cover rounded-xl shadow-lg mb-10">
            
            <div class="prose prose-lg text-gray-600 max-w-none">
                <p class="text-xl leading-relaxed text-gray-700 font-medium mb-8">${post.excerpt}</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <blockquote class="border-l-4 border-smile-red pl-4 italic text-gray-700 my-8">
                    "The smile on a child's face is the greatest reward we could ask for. It signifies hope, a future, and a promise kept."
                </blockquote>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
            </div>
            
            <div class="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                <a href="blog.html" class="text-gray-500 hover:text-smile-red transition font-bold"><i class="fas fa-arrow-left mr-2"></i> Back to Blog</a>
                <div class="flex gap-4">
                     <span class="text-gray-400">Share:</span>
                     <a href="#" class="text-gray-400 hover:text-smile-red"><i class="fab fa-facebook-f"></i></a>
                     <a href="#" class="text-gray-400 hover:text-smile-red"><i class="fab fa-twitter"></i></a>
                     <a href="#" class="text-gray-400 hover:text-smile-red"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </article>
    `;
}

function renderPosts(posts) {
    const container = document.getElementById('blogContainer');
    container.innerHTML = '';

    if (posts.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-10 w-full col-span-full">No articles found matching your criteria.</p>';
        return;
    }

    posts.forEach(post => {
        const html = `
            <article class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group flex flex-col h-full border border-gray-100">
                <div class="h-56 overflow-hidden relative">
                    <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                    <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase rounded text-smile-red shadow-sm">
                        ${post.category}
                    </div>
                </div>
                <div class="p-6 flex-grow flex flex-col">
                    <div class="text-xs text-gray-400 mb-3 flex items-center gap-2">
                        <i class="far fa-calendar"></i> ${post.date}
                    </div>
                    <h3 class="font-serif font-bold text-xl mb-3 group-hover:text-smile-red transition line-clamp-2">
                        <a href="blog-details.html?id=${post.id}">${post.title}</a>
                    </h3>
                    <p class="text-gray-500 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">
                        ${post.excerpt}
                    </p>
                    <a href="blog-details.html?id=${post.id}" class="inline-flex items-center text-sm font-bold text-smile-text hover:text-smile-red transition mt-auto">
                        READ MORE <i class="fas fa-arrow-right ml-2 text-xs"></i>
                    </a>
                </div>
            </article>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
}

function filterPosts(searchTerm, category) {
    const term = searchTerm.toLowerCase();

    const filtered = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(term) || post.excerpt.toLowerCase().includes(term);
        const matchesCategory = category === 'All' || post.category === category;
        return matchesSearch && matchesCategory;
    });

    renderPosts(filtered);
}
