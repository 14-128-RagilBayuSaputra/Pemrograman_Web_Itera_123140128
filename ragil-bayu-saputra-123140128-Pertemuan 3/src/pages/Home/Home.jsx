import React, { useState } from 'react';
import BookList from '../../components/BookList.jsx';
import BookForm from '../../components/BookForm/BookForm.jsx';
import { useBooks } from '../../context/BookContext.jsx';

function HomePage() {
    const { books: allBook, deleteBook, updateBook } = useBooks();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('semua');
    const filteredBooks = allBook
    .filter((book) => {
      if (filterStatus === 'semua'){
        return true;
      }
      return book.status === filterStatus;
    })
    .filter((book) => {
        return book.judul.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="home-page">
      <BookForm />
      <hr />
        <h3>Cari Buku</h3>
        <div className="filter-search">
        <input 
        type="text"
        placeholder='cari berdasarkan judul.'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width:'50%' }}
        />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ marginBottom: '20px', marginLeft: '10px' }}
        >
        <option value="semua">Semua Status</option>
        <option value="dibaca">Sudah Dibaca</option>
        <option value="beli">Akan Dibeli</option>
      </select>
      </div>

      <BookList 
        books={filteredBooks}
        deleteBook={deleteBook}
        updateBook={updateBook}
        />
    </div>
  );
}

export default HomePage;