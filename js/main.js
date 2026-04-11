// Common JS - Navbar, dark mode, sounds

(function() {
    // Get current page from body data attribute or URL
    var currentPage = document.body.getAttribute('data-page') || window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    // Set active nav link
    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        var target = link.getAttribute('data-target');
        if ((href && href.includes(currentPage)) || (target && target === currentPage)) {
            link.classList.add('active');
        }
    });

    // Dark mode toggle (system preference + manual)
    var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    var toggleDarkMode = function(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
    };
    toggleDarkMode(darkModeMediaQuery.matches);
    darkModeMediaQuery.addListener(toggleDarkMode);

    // Click sound effect (if sounds exist)
    var clickSound = new Audio('../assets/sounds/click.mp3');
    document.querySelectorAll('button, a').forEach(function(el) {
        el.addEventListener('click', function() {
            clickSound.currentTime = 0;
            clickSound.play().catch(function() {}); // Ignore if no sound
        });
    });
})();

// Section navigation
function showSection(target) {
    var sections = document.querySelectorAll('.page-section');
    sections.forEach(function(sec) {
        sec.classList.remove('active');
    });
    
    var targetSection = document.getElementById(target);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === target) {
            link.classList.add('active');
        }
    });
}

// Initialize section on page load if using SPA
document.addEventListener('DOMContentLoaded', function() {
    var firstSection = document.querySelector('.page-section.active');
    if (!firstSection) {
        var homeSection = document.getElementById('home');
        if (homeSection) homeSection.classList.add('active');
    }
});