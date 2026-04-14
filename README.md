# СУБУ — Навчальне тест-середовище
## Система управління бібліотекою університету

Повноцінний статичний сайт для лабораторних робіт з курсу  
**"Тестування та забезпечення якості програмних систем"**

---

## 🚀 Розгортання на GitHub Pages (безкоштовно, 5 хвилин)

### Крок 1: Створити репозиторій
1. Зайдіть на [github.com](https://github.com) і увійдіть
2. Натисніть **+ New repository**
3. Назва: `subu-test-env` (або будь-яка)
4. Public — обов'язково
5. Натисніть **Create repository**

### Крок 2: Завантажити файли
```bash
# Клонувати репозиторій
git clone https://github.com/YOUR_USERNAME/subu-test-env.git
cd subu-test-env

# Скопіювати всі файли сайту сюди
# (index.html, css/, js/, pages/)

git add .
git commit -m "Initial СУБУ site"
git push origin main
```

### Крок 3: Активувати GitHub Pages
1. Settings → Pages → Source: **Deploy from branch**
2. Branch: `main` → folder: `/ (root)` → Save
3. Сайт буде доступний за адресою:  
   `https://YOUR_USERNAME.github.io/subu-test-env/`

---

## 🔐 Тестові облікові дані

| Роль | Email | Пароль | Особливості |
|------|-------|--------|-------------|
| Студент | `student@univ.edu` | `Test123!` | Штраф 0, чистий акаунт |
| Студент (штраф) | `student2@univ.edu` | `Test123!` | Штраф 25.5 грн |
| Студент (заблокований) | `fined@univ.edu` | `Test123!` | Штраф 55 грн → заблоковано |
| Студент (великий борг) | `blocked@univ.edu` | `Test123!` | Штраф 120 грн |
| Викладач | `teacher@univ.edu` | `Test123!` | Інші ліміти |
| Бібліотекар | `library@univ.edu` | `Admin123!` | Повні права |

---

## 🐛 Навмисні дефекти для навчального тестування

### ДЕФЕКТ-001: Дублікати бронювань
- **Тип:** Функціональний (Logic Error)
- **Де:** POST /api/bookings/
- **Опис:** Не перевіряється, чи вже забронована ця книга цим користувачем
- **Відтворення:** Забронювати одну книгу двічі — обидва рази спрацьовує
- **Очікувана поведінка:** 409 Conflict при спробі дублювання

### ДЕФЕКТ-002: Off-by-one у перевірці штрафу
- **Тип:** Функціональний (Boundary Value)
- **Де:** Логіка бронювання (db.js → createBooking)
- **Опис:** Блокування бронювання при штрафі `> 50 грн` замість `>= 50 грн`
- **Відтворення:** Акаунт `fined@univ.edu` (штраф рівно 50 грн) — може бронювати
- **Очікувана поведінка:** Блокування при штрафі >= 50 грн

### ДЕФЕКТ-003: Пошук чутливий до регістру
- **Тип:** Функціональний (Search Logic)
- **Де:** Каталог → поле пошуку
- **Опис:** "чистий код" не знайде "Чистий код"
- **Відтворення:** Ввести "python" замість "Python"
- **Очікувана поведінка:** Case-insensitive пошук

### ДЕФЕКТ-004: IDOR у перегляді бронювань
- **Тип:** Безпека (Broken Access Control / IDOR)
- **Де:** GET /api/bookings/{id}/ (API вкладка адмінпанелі)
- **Опис:** Будь-який авторизований користувач може переглянути чужі бронювання
- **Відтворення:** Авторизуватися як student, запросити /api/bookings/2/ (чуже)
- **Очікувана поведінка:** 403 Forbidden

### ДЕФЕКТ-005: Відсутнє підтвердження бронювання (UX)
- **Тип:** Юзабіліті (E1: Visibility of system status)
- **Де:** Каталог → після бронювання
- **Опис:** Лише toast-сповіщення, жодних змін у стані сторінки
- **Відтворення:** Забронювати книгу, спостерігати за відсутністю persistent feedback
- **Очікувана поведінка:** Видиме підтвердження / зміна статусу кнопки

### ДЕФЕКТ-006: Information Disclosure — паролі в API
- **Тип:** Безпека (Sensitive Data Exposure)
- **Де:** GET /api/admin/users/ (адмінпанель → API тест)
- **Опис:** API повертає паролі користувачів у відкритому вигляді
- **Відтворення:** Виконати GET /api/admin/users/ в API тест вкладці
- **Очікувана поведінка:** Паролі не повинні повертатися в API відповіді

---

## 📋 Покриття лабораторних робіт

| Лабораторна | Тема | Підтримка |
|-------------|------|-----------|
| №7 | Exploratory Testing | ✅ Чеклист, чартери |
| №8 | Bug Reporting | ✅ Дефекти 1–6 для звітів |
| №9 | Quality Metrics | ✅ Аналіз покриття |
| №10 | Selenium WebDriver | ✅ Стабільні locators (data-testid) |
| №11 | Page Object Model | ✅ Сторінки: login, catalog, dashboard |
| №12 | API Testing (Postman) | ✅ REST API через db.js |
| №13 | API Automation (Python) | ✅ Всі ендпоінти задокументовані |
| №14 | Security Testing | ✅ SQLi, XSS, IDOR, Info Disclosure |
| №15–16 | Test Strategy | ✅ Документ стратегії |
| №17 | Performance Testing | ✅ Locust сценарії |
| №17 | Usability Testing | ✅ Усі 10 евристик Нільсена |

---

## 🔌 API Reference (симульований)

Всі "API" виклики реалізовані через JavaScript в `js/db.js`.

### Ендпоінти

```
GET  /api/books/              → список книг (пагінація, пошук, фільтр)
GET  /api/books/{id}/         → деталі книги (404 для id=999999)
POST /api/auth/token/         → авторизація → { access, refresh }
GET  /api/bookings/           → мої бронювання (потребує авторизації)
GET  /api/bookings/{id}/      → деталі бронювання (IDOR вразливість!)
POST /api/bookings/           → створити бронювання
DELETE /api/bookings/{id}/    → скасувати бронювання
GET  /api/users/me/           → профіль поточного користувача
PATCH /api/users/me/          → оновити профіль
GET  /api/admin/users/        → всі користувачі (тільки librarian)
GET  /api/admin/bookings/     → всі бронювання (тільки librarian)
```

### data-testid атрибути (для автоматизації)

```
email-input, password-input, login-submit, login-error
user-badge, logout-btn, nav-catalog, nav-dashboard
welcome-heading, bookings-count, fines-amount, fine-warning
search-input, search-btn, genre-filter, avail-filter
book-card, book-btn, booking-item, cancel-booking-btn
edit-profile-btn, edit-first-name, edit-last-name, save-profile-btn
```

---

## 🏗 Структура файлів

```
subu-site/
├── index.html          ← Сторінка входу
├── css/
│   └── style.css       ← Всі стилі
├── js/
│   ├── db.js           ← Дані і API-логіка (State Management)
│   └── ui.js           ← UI-утиліти (Toast, Modal, Navbar)
└── pages/
    ├── dashboard.html  ← Особистий кабінет
    ├── catalog.html    ← Каталог книг
    └── admin.html      ← Панель бібліотекаря
```

---

## ⚠️ Важливо

- Всі дані зберігаються в пам'яті браузера (JavaScript)
- Після перезавантаження сторінки бронювання, внесені в сесії, скидаються
- Автентифікація зберігається в `localStorage` (до явного виходу)
- Система навмисно містить дефекти ВИКЛЮЧНО для навчального тестування

---

*Курс "Тестування та забезпечення якості програмних систем" · 3 курс*
