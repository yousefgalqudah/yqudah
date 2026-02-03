// Year
document.querySelectorAll("#year").forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Theme toggle (stored)
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const saved = localStorage.getItem("theme");
if (saved) root.dataset.theme = saved;

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "" : "light";
    if (next) root.dataset.theme = next;
    else delete root.dataset.theme;
    localStorage.setItem("theme", next || "");
  });
}

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Close menu when a link is clicked (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("open"));
  });
}

// Copy buttons for code snippets
document.querySelectorAll(".copyBtn").forEach((b) => {
  b.addEventListener("click", async () => {
    const id = b.getAttribute("data-copy-target");
    const el = document.getElementById(id);
    if (!el) return;

    const text = el.textContent;
    try {
      await navigator.clipboard.writeText(text);
      const old = b.textContent;
      b.textContent = "Copied";
      setTimeout(() => (b.textContent = old), 900);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      const old = b.textContent;
      b.textContent = "Copied";
      setTimeout(() => (b.textContent = old), 900);
    }
  });
});

