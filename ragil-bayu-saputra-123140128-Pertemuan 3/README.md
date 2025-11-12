# Aplikasi Manajemen Buku Pribadi - Praktikum 3

Proyek ini adalah aplikasi "Personal Book Management" yang dibuat untuk memenuhi tugas Praktikum 3 mata kuliah Pemrograman Web (IFXXXX).

- **Nama:** Ragil Bayu Saputra
- **NIM:** 123140128
- **Mata Kuliah:** Pemrograman Web

Aplikasi ini dibangun menggunakan **React + Vite** dan mengimplementasikan fungsionalitas CRUD penuh, manajemen *state* global, *routing*, dan persistensi data.

---

## 1. Deskripsi Aplikasi

Aplikasi ini memungkinkan pengguna untuk mengelola daftar bacaan buku pribadi mereka. Pengguna dapat menambah, melihat, memperbarui (status dibaca/beli), menghapus, mencari, dan memfilter buku.

### Fitur Utama
* **Create (Tambah):** Menambahkan buku baru (judul, penulis, status) melalui formulir.
* **Read (Baca):** Menampilkan semua buku dalam daftar yang rapi.
* **Update (Perbarui):** Mengubah status buku dari "Akan Dibeli" menjadi "Sudah Dibaca" atau sebaliknya.
* **Delete (Hapus):** Menghapus buku dari daftar.
* **Pencarian:** Mencari buku secara dinamis berdasarkan judul.
* **Filter:** Memfilter buku berdasarkan status ("Semua", "Sudah Dibaca", "Akan Dibeli").
* **Persistensi Data:** Data buku disimpan di `localStorage` peramban, sehingga tidak akan hilang saat halaman di-*refresh*.
* **Routing:** Aplikasi memiliki dua halaman (`/` untuk Home dan `/stats` untuk Statistik) yang diatur oleh React Router.

### Teknologi yang Digunakan
* **React (v18+)**
* **Vite** (sebagai *build tool*)
* **React Router DOM** (untuk *client-side routing*)
* **Context API** (untuk manajemen *state* global)
* **Vitest** & **React Testing Library** (untuk *unit testing*)

---

## 2. Instruksi Instalasi dan Menjalankan

Berikut adalah cara untuk menginstal dan menjalankan proyek ini di lingkungan lokal.

1.  **Clone repositori:**
    ```bash
    git clone [URL_REPOSITORI_ANDA_DI_SINI]
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd Pemrograman_Web_Itera_123140128/ragil-bayu-saputra-123140128-Pertemuan 3
    ```

3.  **Install *dependencies*:**
    ```bash
    npm install
    ```

4.  **Jalankan *development server*:**
    ```bash
    npm run dev
    ```
    Aplikasi akan tersedia di `http://localhost:5173`.

5.  **Menjalankan *Unit Test*:**
    ```bash
    npm test
    ```

---

## 3. Screenshot Antarmuka

**[WAJIB: Ambil screenshot aplikasimu dan letakkan di sini]**

*Contoh:*
**Tampilan Utama (Form, Filter, dan Daftar)**
![Tampilan Utama Aplikasi](URL_SCREENSHOT_UTAMA_ANDA)

**Tampilan Hasil Pencarian/Filter**
![Tampilan Hasil Filter](URL_SCREENSHOT_FILTER_ANDA)

---

## 4. Penjelasan Fitur React yang Digunakan

Berikut adalah beberapa fitur inti React yang diimplementasikan dalam proyek ini:

* **Functional Components:** Seluruh aplikasi dibangun menggunakan *functional components* modern.
* **`useState`:** Digunakan untuk mengelola *state* lokal di dalam komponen, seperti data formulir (`BookForm`), *search term*, dan status filter (`HomePage`).
* **`Context API` (`useContext`)**: Digunakan untuk manajemen *state* global. `BookContext` dibuat untuk menyimpan *array* `books` dan fungsi-fungsi *logic* (CRUD) di satu tempat. Ini menghindari *prop drilling* dan memungkinkan komponen seperti `BookForm` dan `BookList` untuk mengakses atau memodifikasi *state* global dari mana saja.
* **Custom Hooks:** Kami membuat *hook* kustom `useLocalStorage`. *Hook* ini mengabstraksi logika untuk menyimpan dan mengambil data dari `localStorage`. Ini menggantikan `useState` di `BookContext` dan secara otomatis menyinkronkan *state* `books` dengan `localStorage` setiap kali ada perubahan.
* **`useEffect`:** Digunakan di dalam *custom hook* `useLocalStorage` untuk memantau perubahan pada *state* buku dan menulis perubahan tersebut ke `localStorage` (sebagai "efek samping").
* **React Router DOM:** Digunakan untuk *client-side routing*. `BrowserRouter`, `Routes`, dan `Route` digunakan di `App.jsx` untuk mengatur navigasi antara `HomePage` dan `StatsPage`.
* **Controlled Components:** Semua formulir (termasuk *input* pencarian dan *dropdown* filter) diimplementasikan sebagai *controlled components*, di mana nilainya terikat ke *state* React dan diperbarui melalui *event handler* `onChange`.

---

## 5. Laporan Testing

Proyek ini dilengkapi dengan **5 *unit test*** yang ditulis menggunakan Vitest dan React Testing Library, sesuai dengan persyaratan tugas. Tes-tes ini memvalidasi fungsionalitas komponen `BookList`, `BookForm`, dan `HomePage`.

**[WAJIB: Jalankan `npm test` dan screenshot hasil terminal yang menunjukkan 5 tes PASS]**

![Hasil Laporan Test](URL_SCREENSHOT_TEST_ANDA)