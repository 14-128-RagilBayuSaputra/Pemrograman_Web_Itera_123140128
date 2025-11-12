import { useState } from 'react';
import { useBooks } from '../../context/BookContext.jsx';

function BookForm() {
    const [judul, setJudul] = useState('');
    const [penulis, setPenulis] = useState('');
    const [status, setStatus] = useState('beli');

    const {addBook} = useBooks();

    const handleSubmit = (Event) => {
        Event.preventDefault();

        if (!judul || !penulis) {
            alert('Judul dan Penulis tidak boleh kosong!!');
            return;
        }

        const newBook = {
            id: Date.now(),
            judul: judul,
            penulis: penulis,
            status: status,
        };

        addBook(newBook);

        setJudul('');
        setPenulis('');
        setStatus('beli');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Tambah Buku Baru</h3>
            <input
                type="text"
                placeholder="Judul Buku"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
            />

            <input 
            type="text"
            placeholder="penulis"
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            />

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="beli">Akan Dibeli</option>
                <option value="dibaca">Akan Dibaca</option>
            </select>
            <button type="submit">Tambah Buku</button>
        </form>
    );
}

export default BookForm;
