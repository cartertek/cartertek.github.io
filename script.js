const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const dropdownItems = document.querySelectorAll(".has-dropdown");

const closeDropdowns = (except) => {
  dropdownItems.forEach((item) => {
    if (item !== except) {
      item.classList.remove("dropdown-open");
      item.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
    }
  });
};

dropdownItems.forEach((item) => {
  const firstDropdownLink = item.querySelector(".dropdown a[href]");
  const topLevelLink = item.querySelector(":scope > a.dropdown-link");
  const toggle = item.querySelector(".dropdown-toggle");

  if (firstDropdownLink && topLevelLink) {
    topLevelLink.href = firstDropdownLink.href;
  }

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const willOpen = !item.classList.contains("dropdown-open");
    closeDropdowns(item);
    item.classList.toggle("dropdown-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
  });

  item.addEventListener("focusout", (event) => {
    if (!item.contains(event.relatedTarget)) {
      item.classList.remove("dropdown-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

if (navToggle && siteNav) {
  const closeNav = () => {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("open");
    closeDropdowns();
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.innerWidth <= 900) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const hadOpenNav = siteNav.classList.contains("open");
      closeNav();
      closeDropdowns();
      if (hadOpenNav) navToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeNav();
  });
}

if (siteHeader) {
  const updateHeader = () => siteHeader.classList.toggle("is-scrolled", window.scrollY > 64);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".section > .shell, .service-card, .capability-list article");

if (!reduceMotion && revealItems.length && "IntersectionObserver" in window) {
  document.body.classList.add("reveal-ready");
  revealItems.forEach((item) => item.classList.add("reveal"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -35px" });
  revealItems.forEach((item) => observer.observe(item));
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
