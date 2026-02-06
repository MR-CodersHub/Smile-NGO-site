tailwind.config = {
    theme: {
        extend: {
            colors: {
                smile: {
                    red: '#D93025', // Deeper, more urgent red
                    'red-dark': '#B01F15',
                    beige: '#FAF9F6', // Off-white / Paper
                    'beige-dark': '#EFECE6', // Darker beige for contrast
                    text: '#222222', // Soft black for high readability
                    'text-light': '#555555',
                    dark: '#111111', // Almost black
                    accent: '#E8FOF9', // Very subtle cool tint for balance
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            backgroundImage: {
                'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
                'noise': "url('https://www.transparenttextures.com/patterns/noise-lines.png')"
            },
            boxShadow: {
                'soft': '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
                'card': '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
                'heavy': '0 25px 50px -12px rgba(217, 48, 37, 0.25)', // Red colored shadow
            }
        }
    }
}
