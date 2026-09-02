const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Small reveal animation using IntersectionObserver.
const revealItems = document.querySelectorAll(
  ".service, .gallery-card, blockquote, .feature-copy, .intro-copy, .address-card, .map-card"
);

revealItems.forEach((item) => item.classList.add("reveal"));

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(item => observer.observe(item));

// Add the reveal CSS dynamically so the base stylesheet stays simple.
const revealStyle = document.createElement("style");
revealStyle.textContent = `
  .reveal{opacity:0;transform:translateY(18px);transition:opacity .65s ease,transform .65s ease}
  .reveal.visible{opacity:1;transform:none}
  @media(prefers-reduced-motion:reduce){
    .reveal{opacity:1;transform:none;transition:none}
    html{scroll-behavior:auto}
  }
`;
document.head.appendChild(revealStyle);
