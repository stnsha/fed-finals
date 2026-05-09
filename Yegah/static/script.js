async function loadProjects() {
    const grid = document.getElementById('project-grid');

    try {
        const response = await fetch('static/projects.json');
        const projectData = await response.json();

        projectData.forEach(proj => {
            const card = document.createElement('a');
            card.href = proj.link;
            card.target = '_blank';
            card.className = 'project-card';

            card.innerHTML = `
                <div class="card-meta">
                    <span class="card-category">${proj.category}</span>
                    ${proj.date ? `<span class="card-date">${proj.date}</span>` : ''}
                </div>
                <h3 class="card-title">${proj.title}</h3>
                <p class="card-desc">${proj.description}</p>
                <span class="card-arrow">&#8599;</span>
            `;

            grid.appendChild(card);
        });

        initScrollObserver();
    } catch (err) {
        console.error('Error loading projects:', err);
    }
}

function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.project-card, .about-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1), transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(el);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});
