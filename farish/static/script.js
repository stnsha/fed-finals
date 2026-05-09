    // {
    //     "title": "Windmill",
    //     "category": "DATA TOOL",
    //     "link": "https://anasbuildingwebsites.github.io/farish-fed-1511/",
    //     "img": "assets/project4.jpg"
    // }

// --- 1. Fetch & Render Projects ---
async function loadProjects() {
    const grid = document.getElementById('project-grid');
    
    try {
        const response = await fetch('static/projects.json'); // Ensure path is correct
        const projectData = await response.json();

        projectData.forEach(proj => {
            const card = document.createElement('a');
            card.href = proj.link;
            card.className = 'project-card';
            
            // Set background image with a dark overlay for text readability
            card.style.backgroundImage = `linear-gradient(to top, rgba(5, 1, 26, 0.9) 10%, rgba(5, 1, 26, 0) 80%), url('${proj.img}')`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';

            card.innerHTML = `
                <div>
                    <span style="font-size: 0.8rem; letter-spacing: 2px; opacity: 0.7; text-transform: uppercase;">${proj.category}</span>
                    <h3>${proj.title}</h3>
                </div>
            `;
            grid.appendChild(card);
        });

        // Re-run the observer to catch the newly created elements
        initScrollObserver();

    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

// --- 2. Scroll Reveal Logic ---
function initScrollObserver() {
    const observerOptions = { threshold: 0.1 };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Stop watching once revealed
            }
        });
    }, observerOptions);

    // Watch project cards, about cards, and scroll-zoom images
    document.querySelectorAll('.project-card, .about-card, .scroll-zoom').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
        observer.observe(el);
    });
}

// --- 3. Cursor Follower ---
const cursor = document.querySelector('.cursor-follower');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    });
}

// --- 4. Initialize ---
window.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});