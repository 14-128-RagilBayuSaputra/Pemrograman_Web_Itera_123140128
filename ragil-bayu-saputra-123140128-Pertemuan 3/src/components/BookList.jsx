import React from 'react'

function BookList({books, deleteBook, updateBook}) {
    const handleToggleStatus = (book) => {
        const newStatus = book.status === 'dibaca' ? 'beli' : 'dibaca';
        updateBook (book.id, { status: newStatus});
        };

    return (
        <div className="book-list">
            <h2>Daftar Buku</h2>
            {books.length === 0 && <p>Tidak ada buku yang tersedia.</p>}
            <ul>
                {books.map((book) => (
                <li key={book.id}>
                    <h3>{book.judul}</h3>
                    <p>penulis: {book.penulis}</p>
                    <p>status: {book.status}</p>
                    <div className="book-actions">
                    <button
                    className="btn-toggle" 
                    onClick={() => handleToggleStatus(book)}>
                        {book.status === 'dibaca' ? 'Tandai "beli"' : 'Tandai "dibaca"'}
                    </button>
                    <button className="btn-delete" onClick={() => deleteBook(book.id)}>
                        hapus
                    </button>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;