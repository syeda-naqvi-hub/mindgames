// Common JS - Navbar, dark mode, sounds
document.addEventListener('DOMContentLoaded', function() {
    // Navbar active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Dark mode toggle (system preference + manual)
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const toggleDarkMode = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
    };
    toggleDarkMode(darkModeMediaQuery.matches);
    darkModeMediaQuery.addListener(toggleDarkMode);

    // Click sound effect (if sounds exist)
    const clickSound = new Audio('../assets/sounds/click.mp3');
    document.querySelectorAll('button, a').forEach(el => {
        el.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {}); // Ignore if no sound
        });
    });
});
