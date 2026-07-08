// Animación suave de aparición para las secciones de la webstory

const elementos = document.querySelectorAll(
  ".section, .remix-slide, .iframe-card, .card, .side-image-card"
);

elementos.forEach((elemento) => {
  elemento.classList.add("fade-in");
});

const observer = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12,
  }
);

elementos.forEach((elemento) => {
  observer.observe(elemento);
});


// Barra de progreso estilo Spotify
const progressBar = document.querySelector(".scroll-progress");

function updateProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

// Menú activo según sección visible
const navLinks = document.querySelectorAll(".nav a");
const sectionsForNav = document.querySelectorAll("header[id], main section[id]");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0,
  }
);

sectionsForNav.forEach((section) => navObserver.observe(section));



// Mini player: cambia texto según sección
const playerTitle = document.getElementById("playerTitle");
const playerSub = document.getElementById("playerSub");

const playerCopy = {
  inicio: ["Spotify Charts", "Latinoamérica · 2025–2026"],
  slide01: ["La banda sonora latinoamericana", "Pregunta inicial"],
  "remix-slide": ["Remix Latinoamérica", "Una playlist · cuatro países"],
  slide02: ["Radio Latino", "Muestra y metodología"],
  slide03: ["¿Quién pone la música?", "Artistas con presencia regional"],
  slide04: ["Éxitos Chile", "Zoom al caso chileno"],
  slide05: ["En Repeat", "Canciones que permanecen"],
  slide06: ["Mapa sonoro", "Origen de la música"],
  slide07: ["Playlists distintas", "Hallazgos por país"],
  slide08: ["This Is Latinoamérica", "Cierre del recorrido"],
};

const playerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (playerCopy[id]) {
          playerTitle.textContent = playerCopy[id][0];
          playerSub.textContent = playerCopy[id][1];
        }
      }
    });
  },
  { rootMargin: "-38% 0px -52% 0px", threshold: 0 }
);

document.querySelectorAll("header[id], main section[id]").forEach((section) => {
  playerObserver.observe(section);
});

// Parallax suave en imágenes destacadas
const parallaxItems = document.querySelectorAll(".remix-frame img, .chile-cover");

function updateParallax() {
  const viewportH = window.innerHeight;
  parallaxItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
    const offset = Math.max(-18, Math.min(18, progress * -24));
    item.style.transform = `translateY(${offset}px)`;
  });
}

window.addEventListener("scroll", updateParallax, { passive: true });
window.addEventListener("resize", updateParallax);
updateParallax();


// Experimental V2: barra de canción + dots + luz mouse
const songFill = document.querySelector(".song-fill");
const songKnob = document.querySelector(".song-knob");
const currentTimeEl = document.querySelector(".song-time.current");
const totalSeconds = 260; // 4:20

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function updateSongProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
  const percent = ratio * 100;
  if (songFill && songKnob) {
    songFill.style.width = `${percent}%`;
    songKnob.style.left = `${percent}%`;
  }
  if (currentTimeEl) currentTimeEl.textContent = formatTime(ratio * totalSeconds);
}

window.addEventListener("scroll", updateSongProgress, { passive: true });
window.addEventListener("resize", updateSongProgress);
updateSongProgress();

const chapterDots = document.querySelectorAll(".chapter-dots a");
const dotObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        chapterDots.forEach((dot) => {
          dot.classList.toggle("active", dot.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-42% 0px -48% 0px", threshold: 0 }
);

document.querySelectorAll("main section[id]").forEach((section) => dotObserver.observe(section));

window.addEventListener("pointermove", (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  document.body.style.setProperty("--mx", `${x}%`);
  document.body.style.setProperty("--my", `${y}%`);
}, { passive: true });
