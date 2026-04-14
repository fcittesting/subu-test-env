# СУБУ — Навчальне тест-середовище
## Система управління бібліотекою університету

Повноцінний статичний сайт для лабораторних робіт з курсу  
**"Тестування та забезпечення якості програмних систем"**

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
