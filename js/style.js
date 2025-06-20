document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const nextBtn = document.querySelector(".carousel-arrow-img.right");
  const prevBtn = document.querySelector(".carousel-arrow-img.left");

  if (!track || !nextBtn || !prevBtn) {
    console.error("Uno de los elementos del carrusel no fue encontrado");
    return;
  }

  const getItemWidth = () => {
    const item = track.querySelector(".product");
    if (!item) return 0;
    const style = window.getComputedStyle(item);
    const margin = parseFloat(style.marginRight) || 0;
    return item.offsetWidth + margin;
  };

  const scrollSmooth = (distance) => {
    track.scrollTo({
      left: track.scrollLeft + distance,
      behavior: "smooth",
    });
  };

  nextBtn.addEventListener("click", () => {
    scrollSmooth(getItemWidth());
  });

  prevBtn.addEventListener("click", () => {
    scrollSmooth(-getItemWidth());
  });
});

// === Botón de volver al inicio ===
const scrollBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight / 2) {
    scrollBtn.classList.add("visible");
  } else {
    scrollBtn.classList.remove("visible");
  }
});

scrollBtn.addEventListener("click", () => {
  document.getElementById("home").scrollIntoView({
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".header__nav");
  const navLinks = document.querySelectorAll(".header__nav a"); // ✅ esta línea faltaba

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    nav.classList.toggle("open");
  });

  // ✅ cerrar el menú al hacer clic en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("open");
      nav.classList.remove("open");
    });
  });
});
