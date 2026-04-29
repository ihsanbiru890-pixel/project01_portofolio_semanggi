# 📘 SEMANGGI API DOCUMENTATION

Dokumentasi lengkap REST API untuk backend Semanggi Forum.

---

## ⚙️ Base URL & Setup

```
Base URL: http://localhost:5000/api
Content-Type: application/json
```

### Autentikasi
Endpoint yang memerlukan autentikasi harus menyertakan header:
```
Authorization: Bearer <token>
```
Token diperoleh dari endpoint `/auth/login` atau `/auth/register`.

### Format Respons Umum
```json
// Sukses
{ "success": true, "data": { ... } }

// Error
{ "success": false, "message": "Pesan error" }
// atau
{ "error": "Pesan error" }
```

---

## 🔐 AUTH — `/api/auth`

### `POST /auth/register`
Mendaftarkan pengguna baru dan mengembalikan JWT token.

**Request Body:**
```json
{
  "email": "user@mail.com",
  "username": "nama_pengguna",
  "password": "password123",
  "roleId": 1
}
```
**Response `201`:**
```json
{
  "token": "eyJhbGci...",
  "user": { "id": 1, "username": "nama_pengguna", "email": "user@mail.com", "roleId": 1 }
}
```

---

### `POST /auth/login`
Login dan mendapatkan JWT token.

**Request Body:**
```json
{ "email": "user@mail.com", "password": "password123" }
```
**Response `200`:**
```json
{
  "token": "eyJhbGci...",
  "user": { "id": 1, "username": "...", "email": "...", "roleId": 1 }
}
```

---

## 👥 USERS — `/api/users`

### `GET /users` 🔒
Dapatkan semua pengguna (admin).

### `GET /users/:id` 🔒
Dapatkan detail pengguna berdasarkan ID.

```json
{
  "id": 1, "username": "ferta", "email": "ferta@mail.com",
  "bio": "...", "profilePicUrl": "https://...", "role": { "name": "Admin" }
}
```

### `PUT /users/:id` 🔒
Update profil pengguna (hanya pemilik atau admin).

**Request Body (opsional semua field):**
```json
{
  "username": "nama_baru",
  "bio": "Bio saya",
  "profilePicUrl": "https://url-foto.com/img.png"
}
```

---

## 🗂️ CATEGORIES — `/api/categories`

### `GET /categories`
Dapatkan semua kategori diskusi/portfolio.

**Response:**
```json
[
  { "id": 1, "name": "Teknologi", "slug": "teknologi", "description": "...", "icon": "💻" }
]
```

### `POST /categories` 🔒
Buat kategori baru (admin).

```json
{ "name": "Desain", "slug": "desain", "description": "...", "icon": "🎨" }
```

---

## 💬 DISCUSSIONS — `/api/discussions`

### `GET /discussions`
Dapatkan semua diskusi (mendukung filter & paginasi).

**Query Params (opsional):**
| Param | Deskripsi | Contoh |
|:---|:---|:---|
| `categoryId` | Filter by kategori | `?categoryId=2` |
| `status` | `open` / `closed` | `?status=open` |
| `page` | Nomor halaman | `?page=1` |
| `limit` | Jumlah per halaman | `?limit=10` |

**Response:**
```json
[
  {
    "id": 1, "title": "Judul diskusi", "content": "Isi...",
    "status": "open", "createdAt": "2026-04-28T10:00:00Z",
    "user": { "id": 1, "username": "ferta" },
    "category": { "id": 2, "name": "Teknologi" },
    "_count": { "posts": 5, "comments": 12 }
  }
]
```

### `GET /discussions/:id`
Detail diskusi berdasarkan ID.

### `POST /discussions` 🔒
Buat diskusi baru.

```json
{
  "title": "Judul diskusi baru",
  "content": "Isi diskusi lengkap...",
  "categoryId": 1
}
```

### `PUT /discussions/:id` 🔒
Update diskusi (hanya pemilik/admin).

### `DELETE /discussions/:id` 🔒
Hapus diskusi (hanya pemilik/admin).

---

## 📝 POSTS (Balasan Diskusi) — `/api/posts`

### `GET /posts?discussionId=:id`
Dapatkan semua post dalam sebuah diskusi.

### `POST /posts` 🔒
Tambah balasan ke diskusi.

```json
{
  "discussionId": 1,
  "content": "Isi balasan...",
  "parentId": null
}
```
> `parentId` diisi ID post lain jika ini adalah reply-dari-reply (nested comment).

### `DELETE /posts/:id` 🔒
Hapus post.

---

## 💭 COMMENTS — `/api/comments`

### `GET /comments?discussionId=:id`
Dapatkan semua komentar dalam diskusi.

### `POST /comments` 🔒
Tambah komentar.

```json
{
  "discussionId": 1,
  "content": "Komentar saya...",
  "parentId": null
}
```

### `DELETE /comments/:id` 🔒
Hapus komentar (pemilik/admin).

---

## 👍 REACTIONS — `/api/reactions`

### `POST /reactions` 🔒
Tambah/toggle reaksi pada sebuah post.

```json
{ "postId": 5, "type": "like" }
```

---

## 🗂️ PORTFOLIOS — `/api/portfolios`

### `GET /portfolios`
Dapatkan semua portfolio. Filter opsional:
- `?userId=1` — portfolio milik user tertentu
- `?categoryId=2` — filter by kategori

**Response:**
```json
[
  {
    "id": 1, "title": "Website SMGGI", "slug": "website-smggi",
    "description": "...", "projectUrl": "https://...", "coverUrl": "https://...",
    "user": { "id": 1, "username": "ferta" },
    "category": { "name": "Web Dev" },
    "images": [ { "id": 1, "imageUrl": "https://..." } ]
  }
]
```

### `GET /portfolios/slug/:slug`
Dapatkan portfolio berdasarkan slug (untuk halaman detail).

### `POST /portfolios` 🔒
Buat portfolio baru.

```json
{
  "title": "Nama Proyek",
  "slug": "nama-proyek",
  "description": "Deskripsi singkat...",
  "categoryId": 1,
  "projectUrl": "https://github.com/...",
  "coverUrl": "https://...",
  "releaseDate": "2026-04-01T00:00:00Z"
}
```

### `PUT /portfolios/:id` 🔒
Update portfolio.

### `DELETE /portfolios/:id` 🔒
Hapus portfolio.

### `POST /portfolios/:id/images` 🔒
Tambah gambar ke portfolio.

```json
{ "imageUrl": "https://...", "description": "Keterangan gambar" }
```

### `DELETE /portfolios/images/:imageId` 🔒
Hapus gambar dari portfolio.

---

## 📷 GALLERY — `/api/gallery`

### `GET /gallery`
Dapatkan semua foto dokumentasi.

**Query Params:**
- `?tag=Diskusi` — filter by tag (`Diskusi`, `Workshop`, `Project`, `Event`, `Umum`)

**Response:**
```json
[
  {
    "id": 1, "title": "Sesi Diskusi Perdana", "imageUrl": "https://...",
    "tag": "Diskusi", "description": "...", "takenAt": "2026-03-15T00:00:00Z",
    "createdAt": "2026-04-01T00:00:00Z"
  }
]
```

### `GET /gallery/:id`
Detail satu foto.

### `POST /gallery` 🔒
Tambah foto dokumentasi baru (admin).

```json
{
  "title": "Nama Foto",
  "imageUrl": "https://url-gambar.com/foto.jpg",
  "tag": "Workshop",
  "description": "Keterangan opsional",
  "takenAt": "2026-04-20T00:00:00Z"
}
```

### `PUT /gallery/:id` 🔒
Update data foto (admin).

### `DELETE /gallery/:id` 🔒
Hapus foto (admin).

---

## 👋 TEAM — `/api/team`

### `GET /team`
Dapatkan semua anggota tim aktif (diurutkan berdasarkan `order`).

**Response:**
```json
[
  {
    "id": 1, "name": "Ferta", "role": "Founder",
    "bio": "...", "photoUrl": "https://...", "order": 1, "isActive": true
  }
]
```

### `POST /team` 🔒
Tambah anggota tim baru (admin).

```json
{
  "name": "Nama Anggota",
  "role": "Developer",
  "bio": "Bio singkat...",
  "photoUrl": "https://...",
  "order": 2
}
```

### `PUT /team/:id` 🔒
Update data anggota.

### `DELETE /team/:id` 🔒
Nonaktifkan anggota (soft delete, `isActive = false`).

---

## 🛡️ ROLES — `/api/roles`

### `GET /roles` 🔒
Dapatkan semua role yang tersedia (admin).

**Response:**
```json
[{ "id": 1, "name": "Admin" }, { "id": 2, "name": "Member" }]
```

### `POST /roles` 🔒
Buat role baru (admin).

```json
{ "name": "Moderator", "description": "Moderator forum" }
```

---

## ❌ Status Code Referensi

| Code | Keterangan |
|:---|:---|
| `200` | OK — Berhasil |
| `201` | Created — Data berhasil dibuat |
| `400` | Bad Request — Input tidak valid |
| `401` | Unauthorized — Token tidak ada/expired |
| `403` | Forbidden — Tidak punya izin |
| `404` | Not Found — Data tidak ditemukan |
| `500` | Internal Server Error |

---

## 💡 Contoh Penggunaan di Frontend (Fetch)

```javascript
// Login
const login = async (email, password) => {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  localStorage.setItem('token', data.token);
  return data;
};

// Ambil diskusi (authenticated)
const getDiscussions = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:5000/api/discussions', {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

// Buat portfolio baru
const createPortfolio = async (payload) => {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:5000/api/portfolios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};
```

---

> **Catatan:** Integrasikan API ini setelah database sudah dimigrasikan dengan `npx prisma migrate dev`. Pastikan file `.env` berisi `DATABASE_URL` dan `JWT_SECRET` yang benar.
