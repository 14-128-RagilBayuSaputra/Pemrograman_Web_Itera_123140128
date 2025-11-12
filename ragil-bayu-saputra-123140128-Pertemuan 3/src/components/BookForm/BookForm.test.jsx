import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BookForm from './BookForm.jsx';
const mockAddBook = vi.fn();

vi.mock('../../context/BookContext.jsx', () => ({
  useBooks: () => ({
    addBook: mockAddBook,
  }),
}));

describe('Komponen BookForm', () => {

  beforeEach(() => {
    mockAddBook.mockClear();
    vi.restoreAllMocks();
  });

  it('Memanggil addBook saat form di-submit dengan data valid', () => {
    
    render(<BookForm />);

    fireEvent.change(screen.getByPlaceholderText(/Judul Buku/i), {
      target: { value: 'Buku Baru' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Penulis/i), {
      target: { value: 'Penulis Baru' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Tambah Buku/i }));

    expect(mockAddBook).toHaveBeenCalled();

    expect(mockAddBook).toHaveBeenCalledWith(
      expect.objectContaining({
        judul: 'Buku Baru',
        penulis: 'Penulis Baru',
      })
    );
  });

  it('Menampilkan alert jika judul atau penulis kosong', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<BookForm />);

    fireEvent.click(screen.getByRole('button', { name: /Tambah Buku/i }));

    expect(alertSpy).toHaveBeenCalledWith('Judul dan Penulis tidak boleh kosong!!');

    expect(mockAddBook).not.toHaveBeenCalled();
  });
}); 