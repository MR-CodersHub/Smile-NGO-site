const missionTestimonials = [
    {
        backgroundImage: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
        text: "\"Before the well, my children were always sick. Now, they are healthy, clean, and happy. Water is not just a drink; it is a blessing.\"",
        author: "Amina K.",
        role: "Village Elder, Tanzania",
        avatarName: "Amina+K"
    },
    {
        backgroundImage: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        text: "\"The water pump changed everything. Our daughters can now attend school instead of walking hours for water. Education is finally within reach.\"",
        author: "Kofi Mensah",
        role: "Teacher, Ghana",
        avatarName: "Kofi+Mensah"
    },
    {
        backgroundImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        text: "\"Clean water means our children don't fall sick anymore. We can work, we can dream, we can live. Thank you for giving us hope.\"",
        author: "Fatima Zahra",
        role: "Mother of Four, Morocco",
        avatarName: "Fatima+Zahra"
    },
    {
        backgroundImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        text: "\"The well in our village center is more than infrastructure. It's a gathering place, a source of life, and a symbol of what we can achieve together.\"",
        author: "David Omondi",
        role: "Community Leader, Kenya",
        avatarName: "David+Omondi"
    }
];

let currentMissionIndex = 0;

const missionSection = document.getElementById('mission-testimonial-section');
const missionText = document.getElementById('mission-testimonial-text');
const missionImage = document.getElementById('mission-testimonial-image');
const missionAuthor = document.getElementById('mission-testimonial-author');
const missionRole = document.getElementById('mission-testimonial-role');
const missionAuthorBox = document.getElementById('mission-testimonial-author-box');

function updateMissionTestimonial(index) {
    const testimonial = missionTestimonials[index];

    // Fade out
    if (missionText) missionText.style.opacity = '0';
    if (missionAuthorBox) missionAuthorBox.style.opacity = '0';

    setTimeout(() => {
        // Update background image
        if (missionSection) {
            missionSection.style.backgroundImage = `url('${testimonial.backgroundImage}')`;
        }

        // Update content
        if (missionText) missionText.textContent = testimonial.text;
        if (missionImage) missionImage.src = `https://ui-avatars.com/api/?name=${testimonial.avatarName}&background=random`;
        if (missionAuthor) missionAuthor.textContent = testimonial.author;
        if (missionRole) missionRole.textContent = testimonial.role;

        // Fade in
        setTimeout(() => {
            if (missionText) missionText.style.opacity = '1';
            if (missionAuthorBox) missionAuthorBox.style.opacity = '1';
        }, 100);
    }, 500);
}

// Set up transitions
if (missionText) missionText.style.transition = 'opacity 0.5s ease-in-out';
if (missionAuthorBox) missionAuthorBox.style.transition = 'opacity 0.5s ease-in-out';

// Auto-rotate every 3 seconds
setInterval(() => {
    currentMissionIndex = (currentMissionIndex + 1) % missionTestimonials.length;
    updateMissionTestimonial(currentMissionIndex);
}, 3000);
