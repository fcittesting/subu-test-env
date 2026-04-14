// ================================================================
// СУБУ — Дані та управління станом (db.js)
// Навчальне тест-середовище
// ================================================================

const SUBU_DB = {

  // ── КОРИСТУВАЧІ ─────────────────────────────────────────────
  users: [
    { id: 1, email: "student@univ.edu",  password: "Test123!", role: "student",   firstName: "Іван",   lastName: "Студентський", fines: 0,    active: true },
    { id: 2, email: "student2@univ.edu", password: "Test123!", role: "student",   firstName: "Оксана", lastName: "Коваленко",    fines: 25.5, active: true },
    { id: 3, email: "fined@univ.edu",    password: "Test123!", role: "student",   firstName: "Микола", lastName: "Борговий",     fines: 55,   active: true },
    { id: 4, email: "teacher@univ.edu",  password: "Test123!", role: "teacher",   firstName: "Марія",  lastName: "Викладачева",  fines: 0,    active: true },
    { id: 5, email: "library@univ.edu",  password: "Admin123!", role: "librarian", firstName: "Ганна",  lastName: "Бібліотечна",  fines: 0,    active: true },
    { id: 6, email: "blocked@univ.edu",  password: "Test123!", role: "student",   firstName: "Петро",  lastName: "Блокований",   fines: 120,  active: true },
  ],

  // ── КНИГИ ───────────────────────────────────────────────────
  books: [
    { id: 1,  title: "Чистий код",                     author: "Роберт Мартін",      isbn: "978-0-13-468599-1", year: 2008, genre: "Програмування", totalCopies: 3, availableCopies: 2, description: "Практичний посібник з написання якісного програмного коду, що легко читається і підтримується." },
    { id: 2,  title: "Рефакторинг",                    author: "Мартін Фаулер",      isbn: "978-0-13-468599-2", year: 2018, genre: "Програмування", totalCopies: 2, availableCopies: 1, description: "Класика з покращення дизайну існуючого коду без зміни зовнішньої поведінки." },
    { id: 3,  title: "Алгоритми: побудова і аналіз",   author: "Томас Кормен",       isbn: "978-0-26-203384-8", year: 2009, genre: "Алгоритми",     totalCopies: 4, availableCopies: 3, description: "Найповніший підручник з алгоритмів і структур даних для студентів і практиків." },
    { id: 4,  title: "Шаблони проектування",           author: "GoF",                isbn: "978-0-20-163361-5", year: 1994, genre: "Архітектура",  totalCopies: 2, availableCopies: 0, description: "Класична книга про патерни проектування від Gang of Four." },
    { id: 5,  title: "Python. Вивчаємо Python",        author: "Марк Лутц",          isbn: "978-1-44-939355-9", year: 2013, genre: "Програмування", totalCopies: 5, availableCopies: 4, description: "Повне керівництво з мови Python для початківців і досвідчених програмістів." },
    { id: 6,  title: "JavaScript: Хороші частини",     author: "Дуглас Крокфорд",    isbn: "978-0-59-651774-8", year: 2008, genre: "Програмування", totalCopies: 3, availableCopies: 2, description: "Огляд кращих практик JavaScript та уникнення поширених пасток мови." },
    { id: 7,  title: "Тестування програмного забезпечення", author: "Рон Патон",    isbn: "978-0-67-232798-9", year: 2006, genre: "Тестування",   totalCopies: 3, availableCopies: 3, description: "Основи тестування ПЗ, методи і техніки для початківців і практиків QA." },
    { id: 8,  title: "Мистецтво тестування програм",  author: "Гленфорд Маєрс",    isbn: "978-0-47-146912-4", year: 2011, genre: "Тестування",   totalCopies: 2, availableCopies: 1, description: "Класична праця з методології тестування програмного забезпечення." },
    { id: 9,  title: "Програмування на C++",           author: "Бьярн Страуструп",   isbn: "978-0-32-156384-2", year: 2013, genre: "Програмування", totalCopies: 2, availableCopies: 2, description: "Авторитетне керівництво з C++ від творця мови." },
    { id: 10, title: "Теорія ймовірностей",            author: "Колмогоров А.М.",    isbn: "978-5-38-200018-1", year: 2012, genre: "Математика",  totalCopies: 4, availableCopies: 2, description: "Класичний підручник з теорії ймовірностей для студентів технічних спеціальностей." },
    { id: 11, title: "Бази даних: проектування",      author: "Кріс Дейт",          isbn: "978-0-20-170092-1", year: 2011, genre: "Бази даних",   totalCopies: 3, availableCopies: 1, description: "Фундаментальний підручник з реляційних баз даних і SQL." },
    { id: 12, title: "Комп'ютерні мережі",            author: "Таненбаум Е.",       isbn: "978-0-13-212695-3", year: 2011, genre: "Мережі",      totalCopies: 2, availableCopies: 2, description: "Повний огляд комп'ютерних мереж від фізичного рівня до прикладного." },
    { id: 13, title: "Scrum: мистецтво робити вдвічі більше",  author: "Джефф Сазерленд", isbn: "978-0-38-534645-0", year: 2014, genre: "Менеджмент", totalCopies: 2, availableCopies: 2, description: "Практичний посібник з впровадження Scrum методології в командах розробки." },
    { id: 14, title: "Архітектура корпоративних застосунків", author: "Мартін Фаулер", isbn: "978-0-32-112521-7", year: 2002, genre: "Архітектура", totalCopies: 1, availableCopies: 1, description: "Каталог шаблонів для побудови корпоративних застосунків." },
    { id: 15, title: "Математичний аналіз",           author: "Фіхтенгольц Г.М.",  isbn: "978-5-80-741010-3", year: 2006, genre: "Математика",  totalCopies: 6, availableCopies: 5, description: "Класичний курс математичного аналізу для студентів університетів." },
  ],

  // ── БРОНЮВАННЯ ──────────────────────────────────────────────
  bookings: [
    { id: 1, userId: 1, bookId: 4, status: "active",   createdAt: "2024-11-15", expiresAt: "2024-11-18", issuedAt: null, returnedAt: null },
    { id: 2, userId: 2, bookId: 11, status: "issued",  createdAt: "2024-11-01", expiresAt: null,          issuedAt: "2024-11-02", returnedAt: null, dueDate: "2024-11-16" },
    { id: 3, userId: 3, bookId: 1, status: "overdue",  createdAt: "2024-10-15", expiresAt: null,          issuedAt: "2024-10-16", returnedAt: null, dueDate: "2024-10-30" },
    { id: 4, userId: 6, bookId: 7, status: "overdue",  createdAt: "2024-09-01", expiresAt: null,          issuedAt: "2024-09-02", returnedAt: null, dueDate: "2024-09-16" },
  ],

  // ── КОНФІГУРАЦІЯ БІЗНЕС-ПРАВИЛ ──────────────────────────────
  config: {
    studentMaxBookings: 5,
    studentMaxDays: 14,
    teacherMaxBookings: 10,
    teacherMaxDays: 30,
    finePerDay: 1,        // грн/день для студентів
    fineBlockThreshold: 50, // штраф що блокує бронювання
    bookingExpiryDays: 3,   // днів до скасування незабраного бронювання
  },

  // ── НАВМИСНІ ДЕФЕКТИ (для навчального тестування) ──────────
  // ДЕФЕКТ-001: бронювання не перевіряє дублікати по book_id
  // ДЕФЕКТ-002: штраф > 50 блокує, але == 50 НЕ блокує (off-by-one)
  // ДЕФЕКТ-003: пошук чутливий до регістру
  // ДЕФЕКТ-004: API /api/bookings/{id} не перевіряє власника (IDOR)
  // ДЕФЕКТ-005: відсутнє підтвердження після бронювання (UX)
};

// ── Управління сесією ────────────────────────────────────────
const Session = {
  currentUser: null,

  login(email, password) {
    // ДЕФЕКТ-003-AUTH: немає rate limiting — можна брутфорсити
    const user = SUBU_DB.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = { ...user };
      localStorage.setItem("subu_session", JSON.stringify(this.currentUser));
      return { success: true, user: this.currentUser };
    }
    return { success: false, error: "Невірний email або пароль" };
  },

  logout() {
    this.currentUser = null;
    localStorage.removeItem("subu_session");
  },

  restore() {
    try {
      const saved = localStorage.getItem("subu_session");
      if (saved) this.currentUser = JSON.parse(saved);
    } catch(e) {}
    return this.currentUser;
  },

  isLoggedIn() { return !!this.currentUser; },
  isStudent()  { return this.currentUser?.role === "student"; },
  isTeacher()  { return this.currentUser?.role === "teacher"; },
  isLibrarian(){ return this.currentUser?.role === "librarian"; },
};

// ── API-подібні методи ───────────────────────────────────────
const API = {

  // GET /api/books/
  getBooks(params = {}) {
    let books = [...SUBU_DB.books];
    if (params.search) {
      // ДЕФЕКТ-003: пошук чутливий до регістру (навмисно)
      books = books.filter(b =>
        b.title.includes(params.search) ||
        b.author.includes(params.search)
      );
    }
    if (params.available === "true") {
      books = books.filter(b => b.availableCopies > 0);
    }
    if (params.genre) {
      books = books.filter(b => b.genre === params.genre);
    }
    const page = parseInt(params.page) || 1;
    const pageSize = 8;
    const start = (page - 1) * pageSize;
    return {
      count: books.length,
      next: books.length > start + pageSize ? `?page=${page+1}` : null,
      previous: page > 1 ? `?page=${page-1}` : null,
      results: books.slice(start, start + pageSize),
    };
  },

  // GET /api/books/{id}/
  getBook(id) {
    const book = SUBU_DB.books.find(b => b.id === parseInt(id));
    if (!book) return { error: "Книгу не знайдено", status: 404 };
    return book;
  },

  // GET /api/bookings/
  getMyBookings() {
    if (!Session.currentUser) return { error: "Unauthorized", status: 401 };
    const myBookings = SUBU_DB.bookings
      .filter(b => b.userId === Session.currentUser.id)
      .map(b => ({ ...b, book: SUBU_DB.books.find(bk => bk.id === b.bookId) }));
    return { count: myBookings.length, results: myBookings };
  },

  // GET /api/bookings/{id}/
  getBooking(id) {
    // ДЕФЕКТ-004 (IDOR): не перевіряємо userId === currentUser.id
    const booking = SUBU_DB.bookings.find(b => b.id === parseInt(id));
    if (!booking) return { error: "Бронювання не знайдено", status: 404 };
    const book = SUBU_DB.books.find(b => b.id === booking.bookId);
    return { ...booking, book };
  },

  // POST /api/bookings/
  createBooking(bookId) {
    if (!Session.currentUser) return { error: "Unauthorized", status: 401 };
    const user = Session.currentUser;

    // Перевірка штрафу (ДЕФЕКТ-002: > замість >= для рівно 50)
    if (user.fines > SUBU_DB.config.fineBlockThreshold) {
      return { error: `Ваш штраф (${user.fines} грн) перевищує допустимий ліміт. Погасіть борг у бібліотеці.`, status: 403 };
    }

    const book = SUBU_DB.books.find(b => b.id === parseInt(bookId));
    if (!book) return { error: "Книгу не знайдено", status: 404 };
    if (book.availableCopies <= 0) return { error: "Книга недоступна — всі екземпляри видані", status: 409 };

    // ДЕФЕКТ-001: не перевіряємо дублікати бронювань того самого bookId
    const maxBookings = user.role === "teacher" ? SUBU_DB.config.teacherMaxBookings : SUBU_DB.config.studentMaxBookings;
    const activeBookings = SUBU_DB.bookings.filter(b => b.userId === user.id && ["active","issued"].includes(b.status));
    if (activeBookings.length >= maxBookings) {
      return { error: `Ліміт бронювань вичерпано (${maxBookings} одночасно)`, status: 403 };
    }

    const today = new Date().toISOString().split("T")[0];
    const expiry = new Date(Date.now() + SUBU_DB.config.bookingExpiryDays * 86400000).toISOString().split("T")[0];
    const newBooking = {
      id: Date.now(),
      userId: user.id,
      bookId: parseInt(bookId),
      status: "active",
      createdAt: today,
      expiresAt: expiry,
      issuedAt: null,
      returnedAt: null,
    };
    SUBU_DB.bookings.push(newBooking);
    book.availableCopies--;
    return { ...newBooking, book };
  },

  // DELETE /api/bookings/{id}/
  cancelBooking(id) {
    if (!Session.currentUser) return { error: "Unauthorized", status: 401 };
    const idx = SUBU_DB.bookings.findIndex(b => b.id === parseInt(id) && b.userId === Session.currentUser.id);
    if (idx === -1) return { error: "Бронювання не знайдено", status: 404 };
    const booking = SUBU_DB.bookings[idx];
    if (!["active"].includes(booking.status)) return { error: "Можна скасувати лише активне бронювання", status: 400 };
    const book = SUBU_DB.books.find(b => b.id === booking.bookId);
    if (book) book.availableCopies++;
    SUBU_DB.bookings.splice(idx, 1);
    return { success: true };
  },

  // GET /api/users/me/
  getProfile() {
    if (!Session.currentUser) return { error: "Unauthorized", status: 401 };
    const user = SUBU_DB.users.find(u => u.id === Session.currentUser.id);
    return { ...user, password: undefined };
  },

  // PATCH /api/users/me/
  updateProfile(data) {
    if (!Session.currentUser) return { error: "Unauthorized", status: 401 };
    const user = SUBU_DB.users.find(u => u.id === Session.currentUser.id);
    if (data.firstName) user.firstName = data.firstName;
    if (data.lastName)  user.lastName  = data.lastName;
    Session.currentUser = { ...user };
    localStorage.setItem("subu_session", JSON.stringify(Session.currentUser));
    return { ...user, password: undefined };
  },

  // GET /api/admin/users/ (тільки бібліотекар)
  getAllUsers() {
    // ДЕФЕКТ-004-ADMIN: перевіряємо роль, але повертаємо паролі (Info Disclosure)
    if (!Session.isLibrarian()) return { error: "Forbidden", status: 403 };
    return SUBU_DB.users; // навмисно з паролями!
  },

  // GET /api/admin/bookings/
  getAllBookings() {
    if (!Session.isLibrarian()) return { error: "Forbidden", status: 403 };
    return SUBU_DB.bookings.map(b => ({
      ...b,
      book: SUBU_DB.books.find(bk => bk.id === b.bookId),
      user: SUBU_DB.users.find(u => u.id === b.userId),
    }));
  },
};

// Ініціалізація при завантаженні
Session.restore();
