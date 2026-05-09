fetch('./projects.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-list');

    data.forEach(project => {
      const card = document.createElement('div');
      card.className = 'card';

    card.innerHTML = `
    <img src="${project.img}" alt="">
    <div class="card-content">
        <h3>${project.title}</h3>
        <p class="date">${project.date}</p>
        <p>${project.description}</p>
        <a href="${project.url}" target="_blank">View Project</a>
    </div>
    `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error(err));