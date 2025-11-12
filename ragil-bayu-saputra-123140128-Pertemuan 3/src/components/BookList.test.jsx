// src/components/BookList.test.jsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookList from './BookList.jsx';

// Kita buat data palsu (mock) untuk 'props'
const mockBooks = [
  { id: 1, judul: 'Buku Tes Pertama', penulis: 'Penulis A', status: 'dibaca' },
  { id: 2, judul: 'Buku Tes Kedua', penulis: 'Penulis B', status: 'beli' },
];

// Kita buat fungsi palsu (mock) untuk 'props'
// vi.fn() adalah "spy" atau "mata-mata" dari Vitest
const mockDelete = vi.fn();
const mockUpdate = vi.fn();

// 'describe' adalah cara mengelompokkan tes
describe('Komponen BookList', () => {
  
  // TEST 1: Memastikan pesan "Tidak ada buku" muncul
  it('Menampilkan pesan "Tidak ada buku" saat props kosong', () => {
    // Render komponen dengan props array kosong
    render(
      <BookList
        books={[]}
        deleteBook={mockDelete}
        updateBook={mockUpdate}
      />
    );

    // 'screen.getByText' mencari elemen berdasarkan teksnya
    // 'expect(...).toBeInTheDocument()' adalah 'matcher'
    expect(screen.getByText(/Tidak ada buku/i)).toBeInTheDocument();
  });

  // TEST 2: Memastikan daftar buku di-render dengan benar
  it('Menampilkan daftar buku saat diberi props', () => {
    // Render komponen dengan data palsu
    render(
      <BookList
        books={mockBooks}
        deleteBook={mockDelete}
        updateBook={mockUpdate}
      />
    );

    // Cek apakah judul buku pertama ada di layar
    expect(screen.getByText('Buku Tes Pertama')).toBeInTheDocument();
    // Cek apakah judul buku kedua ada di layar
    expect(screen.getByText('Buku Tes Kedua')).toBeInTheDocument();

    // 'screen.getAllByRole' mencari SEMUA elemen dengan role 'listitem' (tag <li>)
    const listItems = screen.getAllByRole('listitem');
    // 'expect(...).toHaveLength(2)' cek apakah jumlahnya ada 2
    expect(listItems).toHaveLength(2);
  });
});