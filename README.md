# 📋 Task Manager API

Backend REST API untuk aplikasi Task Manager menggunakan **Node.js**, **Express**, dan **PostgreSQL**.

> UTS Pemrograman Web 2 — Universitas Teknologi Bandung  
> Dosen: Muhammad Reksa Ariansyah S.Kom M.Kom

---

## 🛠️ Teknologi yang Digunakan

- **Node.js** — Runtime JavaScript
- **Express.js** — Framework web
- **PostgreSQL** — Database (hosted di [Neon](https://neon.tech))
- **pg** — PostgreSQL client untuk Node.js
- **dotenv** — Manajemen environment variable
- **nodemon** — Auto-restart server saat development

---

## 📁 Struktur Project

```
task-manager/
├── src/
│   ├── config/
│   │   └── db.js               # Koneksi ke PostgreSQL
│   ├── controllers/
│   │   └── taskController.js   # Logic CRUD semua endpoint
│   ├── middleware/
│   │   └── logger.js           # Custom middleware logging
│   └── routes/
│       └── taskRoutes.js       # Definisi route /tasks
├── app.js                      # Entry point server
├── database.sql                # Query SQL setup tabel
├── .env                        # Konfigurasi environment (tidak di-push)
├── .gitignore
└── package.json
```

---

## ⚙️ Cara Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/username/task-manager.git
cd task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup database

Buat tabel di PostgreSQL (bisa pakai SQL Editor di Neon/Supabase):

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id           SERIAL PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  description  TEXT,
  is_completed BOOLEAN DEFAULT false,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Konfigurasi `.env`

Buat file `.env` di root project:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@host/dbname
```

> Ambil `DATABASE_URL` dari dashboard Neon/Supabase → Connection Details → Connection String.

### 5. Jalankan server

```bash
npm run dev
```

Server berjalan di `http://localhost:3000`

---

## 🔌 Daftar Endpoint

| Method   | Endpoint       | Deskripsi              |
|----------|----------------|------------------------|
| `GET`    | `/tasks`       | Ambil semua task       |
| `GET`    | `/tasks/:id`   | Ambil task berdasarkan ID |
| `POST`   | `/tasks`       | Tambah task baru       |
| `PUT`    | `/tasks/:id`   | Update task            |
| `DELETE` | `/tasks/:id`   | Hapus task             |

---

## 📬 Contoh Request & Response

### `GET /tasks`

**Response 200:**
```json
{
  "message": "Berhasil mengambil semua task",
  "data": [
    {
      "id": 1,
      "title": "Belajar Express.js",
      "description": "Pelajari routing dan middleware",
      "is_completed": false,
      "created_at": "2026-01-01T10:00:00.000Z"
    }
  ]
}
```

---

### `GET /tasks/:id`

**Response 200:**
```json
{
  "message": "Berhasil mengambil task",
  "data": {
    "id": 1,
    "title": "Belajar Express.js",
    "description": "Pelajari routing dan middleware",
    "is_completed": false,
    "created_at": "2026-01-01T10:00:00.000Z"
  }
}
```

**Response 404:**
```json
{
  "message": "Task dengan ID 99 tidak ditemukan"
}
```

---

### `POST /tasks`

**Request Body:**
```json
{
  "title": "Kerjakan UTS",
  "description": "Deadline minggu ini"
}
```

**Response 201:**
```json
{
  "message": "Task berhasil ditambahkan",
  "data": {
    "id": 2,
    "title": "Kerjakan UTS",
    "description": "Deadline minggu ini",
    "is_completed": false,
    "created_at": "2026-01-01T11:00:00.000Z"
  }
}
```

**Response 400 (title kosong):**
```json
{
  "message": "Field title tidak boleh kosong atau hanya spasi"
}
```

---

### `PUT /tasks/:id`

**Request Body:**
```json
{
  "is_completed": true
}
```

**Response 200:**
```json
{
  "message": "Task berhasil diupdate",
  "data": {
    "id": 2,
    "title": "Kerjakan UTS",
    "description": "Deadline minggu ini",
    "is_completed": true,
    "created_at": "2026-01-01T11:00:00.000Z"
  }
}
```

---

### `DELETE /tasks/:id`

**Response 200:**
```json
{
  "message": "Task dengan ID 2 berhasil dihapus",
  "data": {
    "id": 2,
    "title": "Kerjakan UTS",
    "description": "Deadline minggu ini",
    "is_completed": true,
    "created_at": "2026-01-01T11:00:00.000Z"
  }
}
```

**Response 404:**
```json
{
  "message": "Task dengan ID 99 tidak ditemukan"
}
```

---

## ✅ Fitur yang Diimplementasikan

- **Middleware Logging** — Setiap request dicatat: method, URL, dan waktu
- **Validasi Input** — Field `title` tidak boleh kosong atau hanya spasi (status 400)
- **Error Handling** — ID tidak ditemukan mengembalikan status 404
- **Koneksi PostgreSQL** — Menggunakan package `pg` dengan connection pooling
- **nodemon** — Server auto-restart saat file berubah