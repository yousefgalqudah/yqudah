// year
document.querySelectorAll("#year").forEach(el => {
  el.textContent = new Date().getFullYear();
});

// back to top
const back = document.getElementById("backToTop");
if (back) back.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// theme toggle (stored)
const root = document.documentElement;
const btn = document.getElementById("themeBtn");
const saved = localStorage.getItem("theme");
if (saved) root.dataset.theme = saved;

if (btn) {
  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "" : "light";
    if (next) root.dataset.theme = next;
    else delete root.dataset.theme;
    localStorage.setItem("theme", next || "");
  });
}

// copy buttons for code snippets
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
      // fallback
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

