// src/pages/Home/Home.test.jsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from './Home.jsx'; 

vi.mock('../../components/BookForm/BookForm.jsx', () => ({
  default: () => <form data-testid="book-form">Mocked BookForm</form>
}));

vi.mock('../../components/BookList.jsx', () => ({
  default: vi.fn(() => <div data-testid="book-list">Mocked BookList</div>)
}));

vi.mock('../../context/BookContext.jsx', () => ({
  useBooks: () => ({
    books: [
      { id: 1, judul: 'React Dasar', penulis: 'Penulis A', status: 'dibaca' },
      { id: 2, judul: 'Buku Vue', penulis: 'Penulis B', status: 'beli' },
      { id: 3, judul: 'React Lanjutan', penulis: 'Penulis C', status: 'dibaca' },
    ],
    deleteBook: vi.fn(),
    updateBook: vi.fn(),
  }),
}));

import BookList from '../../components/BookList.jsx';

describe('Komponen HomePage', () => {

  it('Memfilter buku berdasarkan search dan status dengan benar', () => {
    
    render(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/cari berdasarkan judul/i);
    const statusSelect = screen.getByRole('combobox');

    // --- Langkah 1: Tes Search (Pencarian) ---
    fireEvent.change(searchInput, { target: { value: 'React' } });

    expect(BookList).toHaveBeenLastCalledWith({
      books: [
        { id: 1, judul: 'React Dasar', penulis: 'Penulis A', status: 'dibaca' },
        { id: 3, judul: 'React Lanjutan', penulis: 'Penulis C', status: 'dibaca' },
      ],
      deleteBook: expect.any(Function),
      updateBook: expect.any(Function),
    }, undefined); // <-- PERBAIKAN 1: Ganti expect.anything() jadi undefined

    // --- Langkah 2: Tes Filter Status (Dropdown) ---
    fireEvent.change(statusSelect, { target: { value: 'dibaca' } });

    expect(BookList).toHaveBeenLastCalledWith({
      books: [ 
        { id: 1, judul: 'React Dasar', penulis: 'Penulis A', status: 'dibaca' },
        { id: 3, judul: 'React Lanjutan', penulis: 'Penulis C', status: 'dibaca' },
      ],
      deleteBook: expect.any(Function),
      updateBook: expect.any(Function),
    }, undefined); // <-- PERBAIKAN 2: Ganti expect.anything() jadi undefined

    // --- Langkah 3: Ubah filter status jadi "Akan Dibeli" ---
    fireEvent.change(statusSelect, { target: { value: 'beli' } });

    expect(BookList).toHaveBeenLastCalledWith({
      books: [], 
      deleteBook: expect.any(Function),
      updateBook: expect.any(Function),
    }, undefined); // <-- PERBAIKAN 3: Ganti expect.anything() jadi undefined
  });
});