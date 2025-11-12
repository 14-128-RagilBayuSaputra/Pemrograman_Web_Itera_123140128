import {children, createContext, useContext, useState} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const BookContext = createContext();
export function BookProvider({children}) {
    const [books, setBooks] = useLocalStorage('books', [
        {
            id: 1,
            judul: 'Belajar React',
            penulis: 'Ragil Bayu Saputra',
            status: 'dibaca'
        },

        {
            id: 2,
            judul: 'atomic habits',
            penulis: 'James Clear',
            status: 'beli'
        },
    ]);
    
    const addBook = (newBook) => {
        setBooks((currentBooks) => {
        return [...currentBooks, newBook];
        });
    };

    const updateBook = (idToUpdate, updates) => {
        setBooks((currentBooks) => {
            return currentBooks.map((book) => {
                if (book.id !== idToUpdate) {
                    return book;
                }
                return {
                    ...book,
                    ...updates,
                };
            });
        });
    };

    const deleteBook = (idToDelete) => {
        setBooks ((currentBooks) => {
        return currentBooks.filter(book => book.id !== idToDelete);
        });
    };

    const value = {
        books, 
        addBook,
        updateBook,
        deleteBook,
    };

    return (
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    );
}

export function useBooks() {
    return useContext(BookContext);
}