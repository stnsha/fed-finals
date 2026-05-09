async function loadData() {
  try {
    const response = await fetch('./static/db.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // ✅ return data
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

/* ============================= */
/* INIT */
/* ============================= */
async function init() {
  const candidates = await loadData();
  if (!candidates.length) return;

  buildGallery(candidates);
  initFirstCard(candidates);
}

init();

/* ============================= */
/* DOM */
/* ============================= */
const track = document.getElementById("track");
const mockImg = document.getElementById("mockupImage");
const nameEl = document.getElementById("name");
const descEl = document.getElementById("desc");
const portfolioBtn = document.getElementById("profile");
const section3 = document.getElementById("about");

/* ============================= */
/* BUILD GALLERY */
/* ============================= */
function buildGallery(candidates) {
  candidates.forEach((c, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<img src="${c.image}" alt="${c.name}">`;

    div.addEventListener("click", () => selectCard(i, div, candidates));
    track.appendChild(div);
  });
}

/* ============================= */
/* CARD SELECT */
/* ============================= */
function selectCard(index, element, candidates) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
  element.classList.add("active");

  element.scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'nearest'
  });

  animateDrop(element, candidates[index]);
}

/* ============================= */
/* ANIMATION */
/* ============================= */
function animateDrop(card, data) {
  const rect = card.getBoundingClientRect();
  const imgClone = card.querySelector('img').cloneNode(true);

  const clone = document.createElement('div');
  clone.classList.add('drop');
  clone.appendChild(imgClone);
  document.body.appendChild(clone);

  Object.assign(clone.style, {
    position: 'fixed',
    left: rect.left + "px",
    top: rect.top + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    borderRadius: window.getComputedStyle(card).borderRadius
  });

  imgClone.style.width = '100%';
  imgClone.style.height = '100%';
  imgClone.style.objectFit = 'cover';

  setTimeout(() => {
    const phone = document.getElementById("phoneMockup").getBoundingClientRect();

    Object.assign(clone.style, {
      left: phone.left + "px",
      top: phone.top + "px",
      width: phone.width + "px",
      height: phone.height + "px",
      borderRadius: window.getComputedStyle(
        document.getElementById("phoneMockup")
      ).borderRadius
    });
  }, 50);

  section3.scrollIntoView({ behavior: 'smooth' });

  setTimeout(() => {
    clone.remove();
    updateMockup(data);
  }, 800);
}

/* ============================= */
/* UPDATE MOCKUP */
/* ============================= */
function updateMockup(data) {
  mockImg.style.opacity = '0';
  nameEl.style.opacity = '0';
  descEl.style.opacity = '0';

  setTimeout(() => {
    mockImg.src = data.image;
    nameEl.textContent = data.name;
    descEl.textContent = data.description;
    portfolioBtn.href = data.profile;

    mockImg.style.transition = 'opacity 0.4s';
    nameEl.style.transition = 'opacity 0.4s';
    descEl.style.transition = 'opacity 0.4s';

    mockImg.style.opacity = '1';
    nameEl.style.opacity = '1';
    descEl.style.opacity = '1';
  }, 100);
}

/* ============================= */
/* INIT FIRST CARD */
/* ============================= */
function initFirstCard(candidates) {
  setTimeout(() => {
    const first = document.querySelector(".card");
    if (first) {
      first.classList.add("active");
      updateMockup(candidates[0]);
    }
  }, 300);
}

/* ============================= */
/* HEADER SCROLL EFFECT */
/* ============================= */
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.style.padding =
    window.scrollY > 50 ? '0.8rem 8%' : '1.25rem 8%';
  header.style.background =
    window.scrollY > 50
      ? 'rgba(0, 0, 0, 0.8)'
      : 'rgba(10, 10, 10, 0.4)';
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});