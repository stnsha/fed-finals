fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-list');

    data.forEach(project => {
      const item = document.createElement('a');
      item.href = project.url;
      item.target = "_blank";
      item.classList.add('project-item');

      item.innerHTML = `
        <strong>${project.title}</strong><br>
        <small>${project.date}</small>
      `;

      container.appendChild(item);
    });

    // Scroll animation
    const items = document.querySelectorAll('.project-item');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, {
      threshold: 0.2
    });

    items.forEach(item => observer.observe(item));
  });