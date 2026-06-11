const pageViews = {
  "/": {
    page: "home",
    title: "Cartertek LLC | Software Engineering Consulting",
    description: "Cartertek LLC builds websites, apps, tools, integrations, and practical AI capabilities. Turn your idea, prototype, or struggling project into working software.",
    canonical: "https://cartertek.ai/",
    secondaryNav: [
      ["Services", "/home/services"],
      ["Project Recovery", "/home/recovery"],
      ["AI Consulting", "/home/ai"],
      ["Process", "/home/process"],
    ],
    main: null,
  },
  "/about/team": {
    page: "about",
    title: "About | Cartertek LLC",
    description: "Meet Joshua Carter, owner of Cartertek LLC and a Software Engineering Consultant helping clients clarify, build, rescue, connect, and modernize software.",
    canonical: "https://cartertek.ai/about/team",
    secondaryNav: [["Team", "/about/team"]],
    main: `
    <section class="page-hero">
      <div class="shell page-hero-grid">
        <div><p class="eyebrow light">About Cartertek</p><h1>Clear thinking.<br><em>Useful software.</em></h1></div>
        <p>Cartertek helps people and teams turn unclear technical problems into practical, maintainable software.</p>
      </div>
    </section>
    <section id="team" class="team section">
      <div class="shell profile-grid reveal">
        <div class="profile-mark"><img src="/7_3_1_20241110_105124-cropped-filter.jpg" alt="Joshua Carter" width="1024" height="1024"></div>
        <article>
          <p class="eyebrow">Team</p>
          <h2>Joshua Carter</h2>
          <p class="role">Owner, Cartertek LLC<br>Software Engineering Consultant</p>
          <p>Joshua Carter is the owner of Cartertek LLC and a Software Engineering Consultant with 14+ years in software engineering across solo consulting, product engineering, and technical leadership. He has built web apps, APIs, internal tools, and cloud-backed systems for startups, consultancies, media technology, operations platforms, and early-stage products.</p>
          <p>His work spans React apps, NestJS APIs, AWS services, data workflows, AI/video inferencing support, project rescue, integrations, and practical AI adoption. At Cartertek, he brings that experience to clients who need clear technical judgment and maintainable software.</p>
          <div class="profile-socials" aria-label="Joshua Carter social links">
            <a href="https://github.com/joshuacwebdeveloper">GitHub</a>
            <a href="https://linkedin.com/in/joshuacwebdeveloper">LinkedIn</a>
          </div>
        </article>
      </div>
    </section>`,
  },
  "/case-studies/experimental-tech": {
    page: "case-studies",
    title: "Case Studies | Cartertek LLC",
    description: "Cartertek LLC case studies and experimental technology work. This section is under construction.",
    canonical: "https://cartertek.ai/case-studies/experimental-tech",
    secondaryNav: [["Experimental Tech", "/case-studies/experimental-tech"]],
    main: `
    <section class="page-hero"><div class="shell page-hero-grid"><div><p class="eyebrow light">Case Studies</p><h1>Work that makes<br><em>the path clearer.</em></h1></div><p>Under construction, check back soon.</p></div></section>
    <section id="experimental-tech" class="experimental section">
      <div class="shell construction-card reveal">
        <p class="eyebrow">Experimental Tech</p>
        <span class="construction-index">01 / Coming soon</span>
        <h2>Under construction,<br>check back soon</h2>
      </div>
    </section>`,
  },
  "/quote": {
    page: "quote",
    title: "Get a Quote | Cartertek LLC",
    description: "Contact Joshua Carter at Cartertek LLC for a software engineering consultation or schedule a 30-minute quote conversation.",
    canonical: "https://cartertek.ai/quote",
    secondaryNav: [],
    mainClass: "quote-main",
    main: `
    <section class="quote-section section">
      <div class="shell quote-grid">
        <div class="quote-copy">
          <p class="eyebrow light">Show me your idea</p>
          <h1>Have a project that needs help?</h1>
          <p>I can help you figure out whether it needs a small fix, a deeper rebuild, an AI capability, an integration, or a clearer plan.</p>
          <div class="contact-actions">
            <a class="contact-link" href="mailto:carter.joshua.603@gmail.com?subject=Cartertek%20project%20inquiry"><span>Email</span><strong>carter.joshua.603@gmail.com</strong><i aria-hidden="true">↗</i></a>
            <a class="contact-link" href="tel:+13235748481"><span>Call</span><strong>(323) 574-8481</strong><i aria-hidden="true">↗</i></a>
            <p class="consultant"><strong>Joshua Carter</strong><br>Software Engineering Consultant</p>
          </div>
        </div>
        <div class="booking-card">
          <div class="booking-card-heading">
            <p class="eyebrow">Schedule a conversation</p>
          </div>
          <div class="booking-embed">
            <div id="inline-widget-30-minute-quote"></div>
          </div>
          <noscript><p>JavaScript is required for the inline scheduler. <a href="https://koalendar.com/e/30-minute-quote">Schedule directly on Koalendar</a>.</p></noscript>
        </div>
      </div>
    </section>`,
  },
};

const initialDocumentPage = document.body.dataset.page;
const shouldInterceptLinks = initialDocumentPage === "home";
const homeMainHtml = document.getElementById("main")?.innerHTML || "";
pageViews["/"].main = homeMainHtml;

const homeSectionRoutes = {
  "/home/services": "services",
  "/home/recovery": "recovery",
  "/home/ai": "ai",
  "/home/process": "process",
};

const legacySectionHashRoutes = {
  "#services": "/home/services",
  "#recovery": "/home/recovery",
  "#ai": "/home/ai",
  "#process": "/home/process",
};

Object.entries(homeSectionRoutes).forEach(([path, sectionId]) => {
  pageViews[path] = {
    ...pageViews["/"],
    canonical: `https://cartertek.ai${path}`,
    sectionId,
  };
});

const getNormalizedPath = (pathname, hash = "") => {
  const path = pathname.replace(/\/+$/, "") || "/";
  if ((path === "/" || path === "/index.html") && legacySectionHashRoutes[hash]) return legacySectionHashRoutes[hash];
  if (path === "/index.html") return "/";
  if (path === "/about.html") return "/about/team";
  if (path === "/case-studies.html") return "/case-studies/experimental-tech";
  if (path === "/quote.html") return "/quote";
  return pageViews[path] ? path : "/";
};

const getRedirectRoute = () => {
  const route = new URLSearchParams(window.location.search).get("route");
  if (!route || !route.startsWith("/")) return null;

  try {
    const url = new URL(route, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    return getNormalizedPath(url.pathname, url.hash);
  } catch {
    return null;
  }
};

const getRoute = () => {
  const redirectRoute = getRedirectRoute();
  if (redirectRoute) return redirectRoute;
  return getNormalizedPath(window.location.pathname, window.location.hash);
};

const setMeta = (selector, attr, value) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attr, value);
};

const updateMeta = (view) => {
  document.title = view.title;
  setMeta('meta[name="description"]', "content", view.description);
  setMeta('meta[property="og:title"]', "content", view.title);
  setMeta('meta[property="og:description"]', "content", view.description);
  setMeta('meta[property="og:url"]', "content", view.canonical);
  setMeta('link[rel="canonical"]', "href", view.canonical);
};

const closeDropdowns = (except) => {
  document.querySelectorAll(".has-dropdown").forEach((item) => {
    if (item !== except) {
      item.classList.remove("dropdown-open");
      item.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
    }
  });
};

const closeDropdown = (item) => {
  item.classList.remove("dropdown-open");
  item.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
};

let suppressDropdownAutoOpenUntil = 0;

const suppressDropdownAutoOpen = () => {
  suppressDropdownAutoOpenUntil = Date.now() + 400;
};

const canAutoOpenDropdown = () => Date.now() > suppressDropdownAutoOpenUntil;

const openDropdown = (item) => {
  const toggle = item.querySelector(".dropdown-toggle");
  closeDropdowns(item);
  item.classList.add("dropdown-open");
  toggle?.setAttribute("aria-expanded", "true");
};

const closeNav = ({ suppressAutoOpen = false } = {}) => {
  if (suppressAutoOpen) suppressDropdownAutoOpen();
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  navToggle?.setAttribute("aria-expanded", "false");
  siteNav?.classList.remove("open");
  closeDropdowns();
};

const updateSecondaryNav = (view) => {
  const secondaryNav = document.querySelector(".secondary-nav");
  if (!secondaryNav) return;

  if (!view.secondaryNav.length) {
    secondaryNav.hidden = true;
    secondaryNav.innerHTML = "";
    return;
  }

  secondaryNav.hidden = false;
  secondaryNav.innerHTML = `<div class="shell">${view.secondaryNav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</div>`;
};

const updateCurrentNav = (route) => {
  document.querySelectorAll("[aria-current]").forEach((element) => element.removeAttribute("aria-current"));

  const currentSelectors = {
    "/": ['.site-nav a[href="/"]'],
    "/home/services": ['.site-nav a[href="/"]', 'a[href="/home/services"]'],
    "/home/recovery": ['.site-nav a[href="/"]', 'a[href="/home/recovery"]'],
    "/home/ai": ['.site-nav a[href="/"]', 'a[href="/home/ai"]'],
    "/home/process": ['.site-nav a[href="/"]', 'a[href="/home/process"]'],
    "/about/team": ['a[href="/about/team"]'],
    "/case-studies/experimental-tech": ['a[href="/case-studies/experimental-tech"]'],
    "/quote": ['a[href="/quote"]'],
  };

  (currentSelectors[route] || []).forEach((selector) => {
    document.querySelectorAll(selector).forEach((link) => link.setAttribute("aria-current", "page"));
  });
};

const initHeader = () => {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const siteHeader = document.querySelector(".site-header");
  let isKeyboardNavigation = false;

  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") isKeyboardNavigation = true;
  });

  document.addEventListener("pointerdown", () => {
    isKeyboardNavigation = false;
  });

  document.querySelectorAll(".has-dropdown").forEach((item) => {
    const toggle = item.querySelector(".dropdown-toggle");

    toggle?.addEventListener("click", () => {
      const willOpen = !item.classList.contains("dropdown-open");
      if (willOpen) {
        openDropdown(item);
      } else {
        closeDropdown(item);
      }
    });

    item.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse" && canAutoOpenDropdown()) openDropdown(item);
    });

    item.addEventListener("mouseleave", () => closeDropdown(item));

    item.addEventListener("focusin", () => {
      if (isKeyboardNavigation && canAutoOpenDropdown()) openDropdown(item);
    });

    item.addEventListener("focusout", (event) => {
      if (!item.contains(event.relatedTarget)) {
        closeDropdown(item);
      }
    });
  });

  document.querySelectorAll(".site-nav a[href], .secondary-nav a[href]").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".has-dropdown")) {
      closeDropdowns();
    }
  });

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav?.classList.toggle("open", !isOpen);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const hadOpenNav = siteNav?.classList.contains("open");
      closeNav();
      if (hadOpenNav) navToggle?.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeNav();
  });

  if (siteHeader) {
    const updateHeader = () => siteHeader.classList.toggle("is-scrolled", window.scrollY > 64);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }
};

const initReveal = () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".section > .shell, .service-card, .capability-list article");

  document.body.classList.remove("reveal-ready");
  revealItems.forEach((item) => item.classList.remove("reveal", "is-visible"));

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
};

const initKoalendar = () => {
  const target = document.getElementById("inline-widget-30-minute-quote");
  if (!target) return;
  if (target.querySelector("iframe")) return;

  window.Koalendar = window.Koalendar || function koalendarQueue() {
    (window.Koalendar.props = window.Koalendar.props || []).push(arguments);
  };

  const renderWidget = () => window.Koalendar("inline", {
    url: "https://koalendar.com/e/30-minute-quote",
    selector: "#inline-widget-30-minute-quote",
  });

  if (document.querySelector('script[src="https://koalendar.com/assets/widget.js"]')) {
    renderWidget();
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://koalendar.com/assets/widget.js";
  script.addEventListener("load", renderWidget);
  document.head.append(script);
};

const scrollToRouteTarget = (sectionId, hash, shouldResetScroll) => {
  const targetSelector = sectionId ? `#${sectionId}` : hash;
  if (targetSelector) {
    requestAnimationFrame(() => {
      const target = document.querySelector(targetSelector);
      if (!target) return;
      target.scrollIntoView();
      if (sectionId) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  } else if (shouldResetScroll) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
};

const renderRoute = ({ shouldResetScroll = true } = {}) => {
  const route = getRoute();
  const view = pageViews[route];
  const main = document.getElementById("main");

  if (!main) return;

  closeNav({ suppressAutoOpen: true });

  const normalizedUrl = route;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (normalizedUrl !== currentUrl) {
    history.replaceState({}, "", normalizedUrl);
  }

  document.body.dataset.page = view.page;
  main.className = view.mainClass || "";
  main.innerHTML = view.main;
  updateMeta(view);
  updateSecondaryNav(view);
  updateCurrentNav(route);
  initReveal();
  initKoalendar();
  scrollToRouteTarget(view.sectionId, window.location.hash, shouldResetScroll);
};

if (shouldInterceptLinks) {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    if (link.classList.contains("skip-link")) return;

    const url = new URL(link.href, window.location.href);
    const isSameOrigin = url.origin === window.location.origin;
    const nextPath = getNormalizedPath(url.pathname, url.hash);
    const isRoutable = isSameOrigin && pageViews[nextPath];

    if (!isRoutable || link.target || link.hasAttribute("download") || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    closeNav({ suppressAutoOpen: true });

    const nextUrl = nextPath;
    const currentUrl = `${window.location.pathname}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      history.pushState({}, "", nextUrl);
    }

    renderRoute({ shouldResetScroll: !pageViews[nextPath]?.sectionId && !url.hash });
  });

  window.addEventListener("popstate", () => renderRoute({ shouldResetScroll: !pageViews[getRoute()]?.sectionId && !window.location.hash }));
}

initHeader();
renderRoute({ shouldResetScroll: false });

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
