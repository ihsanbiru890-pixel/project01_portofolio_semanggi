# Semanggi Portfolio — Fix & Git Push

## Previous Tasks (Completed)

### 1. Fix Image Paths ✅
- [x] `Projects.jsx`: `/src/assets/gambar1.jpeg` → `/assets/gambar1.jpeg`
- [x] `System.jsx`: `/src/assets/gambar1.jpeg` → `/assets/gambar1.jpeg`

### 2. Add Hero Image Section (Missing) ✅
- [x] `About.jsx`: Tambah hero section dengan background image (`gambar2.jpeg`) di awal page
- [x] `FormPendaftaran.jsx`: Tambah hero section dengan background image (`gambar1.jpeg`) di awal page

### 3. Git Setup & Push ✅
- [x] `git init`
- [x] `git remote add origin https://github.com/ihsanbiru890-pixel/project01_portofolio_semanggi.git`
- [x] `git add .`
- [x] `git commit -m "Initial commit: Semanggi Forum portfolio"`
- [x] `git branch -M main`
- [x] `git push -u origin main --force`

### 4. Build Verification ✅
- [x] `npm run build` — BERHASIL tanpa error

---

## New Tasks (Current Fix)

### 5. Fix Navbar Mobile Menu Icons
- [x] `Navbar.jsx`: Add `icon` SVG components to `navLinks` array so mobile menu renders properly instead of `undefined`

### 6. Connect Form to Real Backend
- [x] `FormPendaftaran.jsx`: Replace fake `setSubmitted(true)` with actual `fetch()` POST to Google Apps Script
- [x] Add `loading` state during submission
- [x] Add `error` state with user-friendly error message and retry button
- [x] Update success UI to show actual confirmation from server

### 7. Commit & Push New Changes
- [ ] `git add .`
- [ ] `git commit -m "fix: navbar icons + real form submission via Google Apps Script"`
- [ ] `git push origin main`

