# 📄 Panduan Pengelolaan Konten (JSON CMS)

Website Anda dikelola sepenuhnya melalui file JSON di folder `src/data/`. Berikut adalah cara mengubah isi website Anda:

## 1. Profil & Biodata (`profile.json`)
File ini berisi informasi dasar Anda.
- **`name`**: Nama Anda (akan muncul di Logo & Footer).
- **`role`**: Jabatan Anda (contoh: Senior Frontend Engineer).
- **`bio`**: Cerita singkat tentang Anda (muncul di halaman About).
- **`skills`**: Daftar keahlian Anda (akan muncul di halaman About & Tech Ticker).
- **`socials`**: Link media sosial Anda.

## 2. Proyek / Portofolio (`projects.json`)
Gunakan file ini untuk menambah atau mengubah daftar proyek.
- **`title`**: Nama Proyek.
- **`slug`**: URL proyek (pastikan unik, misal: `ecommerce-platform`).
- **`category`**: Kategori (UI UX Design, Web Development, dll).
- **`thumbnail`**: Link gambar (bisa menggunakan link eksternal atau file di folder `public`).
- **`shortDescription`**: Penjelasan singkat di kartu proyek.
- **`tech`**: Daftar teknologi yang digunakan (muncul sebagai tag).

## 3. Layanan (`services.json`)
Daftar layanan yang Anda tawarkan.
- **`title`**: Nama Layanan.
- **`description`**: Penjelasan layanan.
- **`icon`**: Nama icon dari library Lucide (pilih: `Layout`, `Code`, atau `Figma`).
- **`features`**: Poin-poin detail layanan.

---

### 💡 Tips Mengganti Gambar
Anda bisa menyimpan gambar di folder `public/projects/` lalu mengetikkan path-nya di JSON:
Contoh: `"thumbnail": "/projects/my-image.jpg"`

### ⚠️ Peringatan
Jangan menghapus koma (`,`) atau tanda kutip (`"`) kecuali Anda tahu apa yang Anda lakukan, karena format JSON sangat ketat terhadap kesalahan penulisan.
