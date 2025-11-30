# Tugas Praktikum: Sistem Manajemen Perpustakaan Sederhana

**Nama:** [Ragil Bayu Saputra]
**NIM:** [123140128]
**Mata Kuliah:** Pemrograman Web (Python OOP)

---

## 📝 Deskripsi Program
Program ini adalah sistem manajemen perpustakaan sederhana yang dibangun menggunakan bahasa pemrograman **Python**. Program ini mendemonstrasikan penerapan paradigma **Object-Oriented Programming (OOP)** secara lengkap untuk mengelola item perpustakaan seperti Buku dan Majalah.

Fitur utama program:
1. Menambahkan item baru (Buku/Majalah) ke dalam koleksi.
2. Menampilkan daftar seluruh item yang tersedia.
3. Mencari item berdasarkan **Judul** atau **ID**.

---

## 🛠️ Konsep OOP yang Diterapkan
Sesuai dengan persyaratan tugas, kode ini menerapkan konsep berikut:

| Konsep | Implementasi dalam Kode |
| :--- | :--- |
| **Abstract Class** | Class `LibraryItem` (menggunakan module `abc`) sebagai kerangka dasar. |
| **Inheritance** | Class `Book` dan `Magazine` mewarisi atribut dan method dari `LibraryItem`. |
| **Encapsulation** | Penggunaan **Private Attribute** (`__item_id`) dan **Protected Attribute** (`_title`). Akses data dilindungi menggunakan **Property Decorator** (`@property` dan `@setter`). |
| **Polymorphism** | Method `get_details()` memiliki implementasi yang berbeda pada class `Book` (menampilkan penulis) dan `Magazine` (menampilkan edisi). |

---

## 📊 Class Diagram
Berikut adalah gambaran struktur class yang digunakan dalam program ini:

```mermaid
classDiagram
    class LibraryItem {
        <<Abstract>>
        # _title : str
        - __item_id : int
        + year : int
        + item_id() get
        + item_id(new_id) set
        + get_details()*
    }

    class Book {
        + author : str
        + isbn : str
        + get_details()
    }

    class Magazine {
        + issue_number : int
        + get_details()
    }

    class Library {
        - __items : list
        + add_item(item)
        + show_items()
        + search_item(keyword)
    }

    LibraryItem <|-- Book : Inherits
    LibraryItem <|-- Magazine : Inherits
    Library o-- LibraryItem : Aggregation