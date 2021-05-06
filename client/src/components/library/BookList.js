import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {getBooks} from '../../redux/actions/book.actions'

const columns = [
    {
        title: 'ברקוד',
        dataIndex: 'barcode'
    },
    {
        title: 'שם',
        dataIndex: 'name'
    },
    {
        title: 'סופר/ת',
        dataIndex: 'writer'
    },
    {
        title: 'סטטוס',
        dataIndex: 'status'
    }
];



const BookList = () => {

    const [tableData, setTableData] = useState([]);
    const [viewDrawer, setViewDrawer] = useState(false);
    const { books } = useSelector(state => state.bookReducer);
    const dispatch = useDispatch();

    const setViewAddBook = (value) => {
        setViewDrawer(value)
    }

    useEffect(() => {
        if(books == null) {
            dispatch(getBooks())
            .catch(error => {
                console.log(error);
                message.error('טעינת הספרים נכשלה')
            });
        }
        else {
             let data = books.map(book => ({...book, key: book._id}));
            setTableData(data);
        }
    }, [books, dispatch]);

    return (

        <>
            <Table columns={columns} dataSource={tableData} bordered />
        </>
    )
}
export default BookList;