/* ==========================================================================
   hanxa.xyz — main.js
   1) PROJECTS: edit this array to add/remove project tiles.
   2) Hash router: #about / #projects / #contact open article panels in place.
   ========================================================================== */

/* ---------- 1. Projects ----------
   Add a tile by appending one object. Fields:
     name   : tile title
     blurb  : one-line description
     tags   : small tag row (array of short strings)
     url    : link target; use null for "coming soon" (renders as a non-link tile)
*/
const PROJECTS = [
  {
    name: "Monaco",
    blurb: "A standalone data-science toolkit plus a set of Claude skills for repeatable EDA, modelling, and reporting.",
    tags: ["python", "duckdb", "claude skills"],
    url: "https://github.com/",
  },
  {
    name: "Moonape",
    blurb: "Placeholder description — what Moonape does, in one line.",
    tags: ["wip"],
    url: null,
  },
  {
    name: "Crossrate",
    blurb: "Placeholder description — what Crossrate does, in one line.",
    tags: ["wip"],
    url: null,
  },
];

function renderProjects(container) {
  if (!container) return;
  container.innerHTML = "";
  PROJECTS.forEach((p) => {
    const isLink = Boolean(p.url);
    const el = document.createElement(isLink ? "a" : "div");
    el.className = "tile" + (isLink ? "" : " is-soon");
    if (isLink) {
      el.href = p.url;
      if (/^https?:\/\//.test(p.url)) {
        el.target = "_blank";
        el.rel = "noopener";
      }
    }

    const h3 = document.createElement("h3");
    h3.textContent = p.name;
    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = isLink ? "↗" : "";
    h3.appendChild(arrow);

    const desc = document.createElement("p");
    desc.textContent = p.blurb;

    const tags = document.createElement("ul");
    tags.className = "tags";
    (p.tags || []).forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      tags.appendChild(li);
    });

    el.appendChild(h3);
    el.appendChild(desc);
    el.appendChild(tags);
    if (!isLink) {
      const status = document.createElement("span");
      status.className = "status";
      status.textContent = "coming soon";
      el.appendChild(status);
    }
    container.appendChild(el);
  });
}

/* ---------- 2. Hash router ---------- */
(function () {
  const body = document.body;
  const main = document.getElementById("main");
  const articles = Array.from(main.querySelectorAll("article"));
  const ids = articles.map((a) => a.id);
  const DURATION = 325; // keep in sync with --t in main.css
  let current = null;
  let locked = false;

  // Add a close button to every article.
  articles.forEach((article) => {
    const btn = document.createElement("button");
    btn.className = "close";
    btn.type = "button";
    btn.setAttribute("aria-label", "Close");
    btn.textContent = "Close";
    btn.addEventListener("click", () => {
      location.hash = "";
    });
    article.appendChild(btn);
  });

  function show(id) {
    const article = document.getElementById(id);
    if (!article) return;
    locked = true;
    body.classList.add("is-article-visible");
    articles.forEach((a) => a.classList.remove("active", "is-shown"));
    article.classList.add("active");
    // next frame so the transition runs
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        article.classList.add("is-shown");
        article.setAttribute("tabindex", "-1");
        article.focus({ preventScroll: true });
        window.scrollTo(0, 0);
        current = id;
        locked = false;
      });
    });
  }

  function hide() {
    const article = current ? document.getElementById(current) : null;
    locked = true;
    if (article) article.classList.remove("is-shown");
    setTimeout(() => {
      articles.forEach((a) => a.classList.remove("active", "is-shown"));
      body.classList.remove("is-article-visible");
      current = null;
      locked = false;
    }, DURATION);
  }

  function route() {
    const id = location.hash.replace(/^#\/?/, "");
    if (id && ids.includes(id)) {
      if (id !== current) show(id);
    } else if (current) {
      hide();
    } else {
      body.classList.remove("is-article-visible");
    }
  }

  // Escape closes the open panel.
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && current && !locked) location.hash = "";
  });

  // Clicking the dimmed background (outside the panel) closes it.
  main.addEventListener("click", (e) => {
    if (e.target === main && current) location.hash = "";
  });

  window.addEventListener("hashchange", route);

  // Boot
  renderProjects(document.getElementById("project-tiles"));
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  window.addEventListener("load", () => {
    // Fade in, then route to any deep link.
    setTimeout(() => body.classList.remove("is-preload"), 100);
    route();
  });
})();
