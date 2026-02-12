const testimonials = [
    {
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "A New Beginning for Maya",
        text: "\"I never thought I would go to school again. Smile gave me my books, my uniform, and my dignity back. Now I want to be a teacher.\"",
        author: "Maya, Age 12",
        role: "Student, India"
    },
    {
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "Clean Water for the Village",
        text: "\"Before Smile came, we had to walk 5km daily for water. Now, our children are healthy and we have a well right in our village center.\"",
        author: "Kofi Mensah",
        role: "Community Elder, Ghana"
    },
    {
        image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "Medical Care within Reach",
        text: "\"When my son fell ill, I was terrified. The mobile clinic from Smile reached us just in time. Their doctors are true angels on earth.\"",
        author: "Fatima Zahra",
        role: "Mother of three, Morocco"
    },
    {
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        title: "Empowering Rural Women",
        text: "\"The vocational training provided by Smile helped me start my own tailoring business. I can now support my family independently.\"",
        author: "Elena Petrova",
        role: "Entrepreneur, Romania"
    }
];

let currentTestimonialIndex = 0;

const testimonialImage = document.getElementById('testimonial-image');
const testimonialTitle = document.getElementById('testimonial-title');
const testimonialText = document.getElementById('testimonial-text');
const testimonialAuthor = document.getElementById('testimonial-author');
const testimonialRole = document.getElementById('testimonial-role');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');

function updateTestimonial(index) {
    const testimonial = testimonials[index];

    // Add fade-out effect if desired, but for now simple update
    testimonialImage.style.opacity = '0';
    testimonialTitle.style.opacity = '0';
    testimonialText.style.opacity = '0';
    testimonialAuthor.style.opacity = '0';
    testimonialRole.style.opacity = '0';

    setTimeout(() => {
        testimonialImage.src = testimonial.image;
        testimonialTitle.textContent = testimonial.title;
        testimonialText.textContent = testimonial.text;
        testimonialAuthor.textContent = testimonial.author;
        testimonialRole.textContent = testimonial.role;

        testimonialImage.style.opacity = '1';
        testimonialTitle.style.opacity = '1';
        testimonialText.style.opacity = '1';
        testimonialAuthor.style.opacity = '1';
        testimonialRole.style.opacity = '1';
    }, 300);
}

// Initial state for transition
[testimonialImage, testimonialTitle, testimonialText, testimonialAuthor, testimonialRole].forEach(el => {
    if (el) el.style.transition = 'opacity 0.3s ease-in-out';
});

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentTestimonialIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        updateTestimonial(currentTestimonialIndex);
    });
}
