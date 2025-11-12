// src/components/BookForm/BookForm.test.jsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BookForm from './BookForm.jsx';
// JANGAN import BookProvider, kita akan mock hook-nya

// 1. Buat mock function di luar
const mockAddBook = vi.fn();

// 2. "Cegat" impor ke BookContext.jsx
//    Ini adalah cara Vitest untuk me-mock modul
vi.mock('../../context/BookContext.jsx', () => ({
  // Beritahu tes, "setiap ada yang memanggil useBooks()..."
  useBooks: () => ({
    // "...kembalikan objek ini, yang berisi mock kita"
    addBook: mockAddBook,
  }),
}));

describe('Komponen BookForm', () => {

  // 3. (Best practice) Bersihkan mock sebelum setiap tes
  beforeEach(() => {
    mockAddBook.mockClear();
    // Jika ada spy 'alert', bersihkan juga
    vi.restoreAllMocks();
  });

  // TEST 3: Memanggil addBook... (YANG GAGAL TADI)
  it('Memanggil addBook saat form di-submit dengan data valid', () => {
    
    // 4. Render BookForm SENDIRIAN.
    //    Provider tidak perlu, karena hook 'useBooks' sudah di-mock.
    render(<BookForm />);

    // 5. Simulasikan pengguna mengetik "Buku Baru"
    fireEvent.change(screen.getByPlaceholderText(/Judul Buku/i), {
      target: { value: 'Buku Baru' },
    });

    // 6. Simulasikan pengguna mengetik "Penulis Baru"
    fireEvent.change(screen.getByPlaceholderText(/Penulis/i), {
      target: { value: 'Penulis Baru' },
    });

    // 7. Simulasikan pengguna mengklik tombol "Tambah Buku"
    fireEvent.click(screen.getByRole('button', { name: /Tambah Buku/i }));

    // 8. Cek: Apakah mockAddBook dipanggil?
    expect(mockAddBook).toHaveBeenCalled();

    // 9. Cek: Apakah dipanggil dengan data yang benar?
    expect(mockAddBook).toHaveBeenCalledWith(
      expect.objectContaining({
        judul: 'Buku Baru',
        penulis: 'Penulis Baru',
      })
    );
  });

  // TEST 4: Menampilkan alert... (SUDAH BENAR, tapi kita sesuaikan)
  it('Menampilkan alert jika judul atau penulis kosong', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Render tanpa provider
    render(<BookForm />);

    fireEvent.click(screen.getByRole('button', { name: /Tambah Buku/i }));

    expect(alertSpy).toHaveBeenCalledWith('Judul dan Penulis tidak boleh kosong!!');
    
    // Kita juga bisa cek bahwa addBook TIDAK dipanggil
    expect(mockAddBook).not.toHaveBeenCalled();
  });
});