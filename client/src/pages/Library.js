import React, { useEffect, useState } from 'react';
import api from '../services/books.service';

const Library = () => {

    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        api.getAllBooks().then(books => {
            setBookList(books.data.data);
        },[])
    },[]);

    return (
        <div>
            <ul>
            {bookList.map((book, index) => 
               <li key={index}>{book.bookName}</li>
            )}
            </ul>
        </div>
    )
}
export default Library;