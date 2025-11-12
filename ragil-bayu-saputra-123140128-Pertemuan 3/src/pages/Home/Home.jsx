// src/pages/Home/Home.jsx

import React, { useState } from 'react';
// 1. Kita import komponen yang akan ditampilkan di halaman ini
import BookList from '../../components/BookList.jsx';
import BookForm from '../../components/BookForm/BookForm.jsx';
import { useBooks } from '../../context/BookContext.jsx';

// 2. Ini adalah "Page Component"
function HomePage() {
    const { books: allBook, deleteBook, updateBook } = useBooks();
    const [searchTerm, setSearchTerm] = useState('');
    const filteredBooks = allBook.filter((book) => {
        return book.judul.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="home-page">
      {/* 3. Kita "pindahkan" layout dari App.jsx ke sini */}
      <BookForm />
      <hr />
        <h3>Cari Buku</h3>
        <input 
        type="text"
        placeholder='cari berdasarkan judul.'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width:'50%' }}
        />

      <BookList 
        books={filteredBooks}
        deleteBook={deleteBook}
        updateBook={updateBook}
        />
    </div>
  );
}

export default HomePage;