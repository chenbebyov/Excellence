import React, {useEffect} from 'react';
import api from '../services/books.service';

export const library = () => {

    const [bookList, setBookList] = useState([]);

    useEffect(() => {

        await api.getAllBooks().then(books => {
            this.setBookList(books);
        })
    });
    return (
        <div>
            <ul>
            {  bookList.map((book, index) => 
               <li key={index}>{book.bookName}</li>
            )}
            </ul>
        </div>
    )
}
