import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookList from './BookList.jsx';

const mockBooks = [
  { id: 1, judul: 'Buku Tes Pertama', penulis: 'Penulis A', status: 'dibaca' },
  { id: 2, judul: 'Buku Tes Kedua', penulis: 'Penulis B', status: 'beli' },
];

const mockDelete = vi.fn();
const mockUpdate = vi.fn();

describe('Komponen BookList', () => {
  
  it('Menampilkan pesan "Tidak ada buku" saat props kosong', () => {
    render(
      <BookList
        books={[]}
        deleteBook={mockDelete}
        updateBook={mockUpdate}
      />
    );

    expect(screen.getByText(/Tidak ada buku/i)).toBeInTheDocument();
  });

  it('Menampilkan daftar buku saat diberi props', () => {
    render(
      <BookList
        books={mockBooks}
        deleteBook={mockDelete}
        updateBook={mockUpdate}
      />
    );

    expect(screen.getByText('Buku Tes Pertama')).toBeInTheDocument();
    expect(screen.getByText('Buku Tes Kedua')).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });
});