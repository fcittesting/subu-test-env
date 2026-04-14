// ================================================================
// СУБУ — Утиліти інтерфейсу (ui.js)
// ================================================================

// ── Toast notifications ──────────────────────────────────────
const Toast = {
  show(msg, type = "info", duration = 3500) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const icons = { success: "✓", error: "✕", info: "ℹ" };
    const el = document.createElement("div");
    el.className = `toast toast-${type}`;
    el.innerHTML = `<span>${icons[type] || "·"}</span><span>${msg}</span>`;
    container.appendChild(el);
    setTimeout(() => { el.style.animation = "slideIn .3s ease reverse"; setTimeout(() => el.remove(), 280); }, duration);
  },
  success(msg) { this.show(msg, "success"); },
  error(msg)   { this.show(msg, "error"); },
  info(msg)    { this.show(msg, "info"); },
};

// ── Modal ────────────────────────────────────────────────────
const Modal = {
  show({ title, body, confirmText = "Підтвердити", cancelText = "Скасувати", onConfirm, danger = false }) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" aria-label="Закрити">✕</button>
        </div>
        <div class="modal-body">${body}</div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="modal-cancel">${cancelText}</button>
          <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="modal-confirm">${confirmText}</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const close = () => { overlay.style.animation = "fadeIn .2s ease reverse"; setTimeout(() => overlay.remove(), 180); };
    overlay.querySelector(".modal-close").onclick = close;
    overlay.querySelector("#modal-cancel").onclick = close;
    overlay.querySelector("#modal-confirm").onclick = () => { close(); if (onConfirm) onConfirm(); };
    overlay.onclick = e => { if (e.target === overlay) close(); };
  },
  confirm(title, body, onConfirm) {
    this.show({ title, body, confirmText: "Підтвердити", onConfirm, danger: false });
  },
  danger(title, body, onConfirm) {
    this.show({ title, body, confirmText: "Так, видалити", onConfirm, danger: true });
  },
};

// ── JSON highlighter ─────────────────────────────────────────
function highlightJSON(obj) {
  const str = JSON.stringify(obj, null, 2);
  return str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, match => {
    let cls = "json-number";
    if (/^"/.test(match)) cls = /:$/.test(match) ? "json-key" : "json-string";
    else if (/true|false/.test(match)) cls = "json-bool";
    else if (/null/.test(match)) cls = "json-null";
    return `<span class="${cls}">${match}</span>`;
  });
}

// ── Navbar rendering ─────────────────────────────────────────
function renderNavbar() {
  const user = Session.currentUser;
  const roleLabels = { student: "Студент", teacher: "Викладач", librarian: "Бібліотекар" };
  const navLinks = {
    student: [
      { href: "/pages/catalog.html",   label: "📚 Каталог" },
      { href: "/pages/dashboard.html", label: "🏠 Кабінет" },
    ],
    teacher: [
      { href: "/pages/catalog.html",   label: "📚 Каталог" },
      { href: "/pages/dashboard.html", label: "🏠 Кабінет" },
    ],
    librarian: [
      { href: "/pages/catalog.html",     label: "📚 Каталог" },
      { href: "/pages/dashboard.html",   label: "🏠 Кабінет" },
      { href: "/pages/admin.html",       label: "⚙️ Адмінпанель" },
    ],
  };
  const currentPage = window.location.pathname.split("/").pop();
  const links = user ? (navLinks[user.role] || []) : [];
  const linksHtml = links.map(l => {
    const page = l.href.split("/").pop();
    const active = page === currentPage ? " active" : "";
    return `<a href="${l.href}" class="nav-link${active}" data-testid="nav-${page.replace('.html','')}">${l.label}</a>`;
  }).join("");

  const userHtml = user ? `
    <div class="navbar-user">
      <div class="user-badge" data-testid="user-badge">
        <span>${user.firstName} ${user.lastName}</span>
        <span class="role-pill">${roleLabels[user.role] || user.role}</span>
      </div>
      <button class="btn-logout" data-testid="logout-btn" onclick="logout()">Вийти</button>
    </div>` : `<a href="/index.html" class="btn btn-outline btn-sm" style="color:var(--teal-lt);border-color:rgba(20,184,166,.4)">Увійти</a>`;

  document.getElementById("navbar-placeholder").innerHTML = `
    <nav class="navbar" role="navigation" aria-label="Головна навігація">
      <div class="navbar-inner">
        <a href="${user ? '/pages/dashboard.html' : '/index.html'}" class="navbar-brand">
          <span class="brand-icon">📖</span>
          <span>СУБУ<span class="brand-sub">Система управління бібліотекою</span></span>
        </a>
        <div class="navbar-nav">${linksHtml}</div>
        ${userHtml}
      </div>
    </nav>`;
}

function renderFooter() {
  document.getElementById("footer-placeholder").innerHTML = `
    <footer class="footer">
      <div class="container">
        <span>© 2024 СУБУ — Навчальне тест-середовище</span>
        <span class="test-badge">🧪 QA-курс</span>
        <span> · Університет · Бібліотечна система v1.1 (з навмисними дефектами для навчального тестування)</span>
      </div>
    </footer>`;
}

function renderDebugBar() {
  const user = Session.currentUser;
  if (!user) return;
  const el = document.getElementById("debug-bar");
  if (!el) return;
  el.innerHTML = `
    <span>🔍 DEV MODE</span>
    <span>user_id: <code>${user.id}</code></span>
    <span>role: <code>${user.role}</code></span>
    <span>fines: <code>${user.fines} грн</code></span>
    <span>email: <code>${user.email}</code></span>
    <span style="margin-left:auto;opacity:.5">Дефекти: #001 #002 #003 #004 #005 активні</span>`;
}

// ── Auth guard ───────────────────────────────────────────────
function requireAuth(roles = []) {
  if (!Session.isLoggedIn()) {
    window.location.href = "/index.html";
    return false;
  }
  if (roles.length && !roles.includes(Session.currentUser.role)) {
    Toast.error("Доступ заборонено для вашої ролі");
    window.location.href = "/pages/dashboard.html";
    return false;
  }
  return true;
}

function logout() {
  Session.logout();
  window.location.href = "/index.html";
}

// ── Date helpers ─────────────────────────────────────────────
function formatDate(str) {
  if (!str) return "—";
  const d = new Date(str);
  return d.toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function daysDiff(from, to) {
  const a = new Date(from), b = new Date(to || new Date().toISOString().split("T")[0]);
  return Math.floor((b - a) / 86400000);
}
function isOverdue(dueDate) {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
}

// ── Status badge helper ──────────────────────────────────────
function statusBadge(status) {
  const map = {
    active:   { cls: "badge-info",    label: "Активне" },
    issued:   { cls: "badge-warning", label: "Видана" },
    overdue:  { cls: "badge-danger",  label: "Прострочено" },
    returned: { cls: "badge-success", label: "Повернута" },
    cancelled:{ cls: "badge-gray",    label: "Скасовано" },
  };
  const s = map[status] || { cls: "badge-gray", label: status };
  return `<span class="badge ${s.cls}">${s.label}</span>`;
}
