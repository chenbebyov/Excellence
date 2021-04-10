import React, { useEffect, useState } from 'react';
import api from '../../services/book.service';
import { Table, Button, message } from 'antd';
import CreateNewBook from './CreateNewBook';
import { useDispatch, useSelector } from 'react-redux';
import {getBooks} from '../../redux/actions/book.actions'

const columns = [
    {
        title: 'Barcode',
        dataIndex: 'barcode'
    },
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Writer',
        dataIndex: 'writer'
    },
    {
        title: 'Status',
        dataIndex: 'status'
    }
];



const Library = () => {

    const [tableData, setTableData] = useState([]);
    const [viewDrawer, setViewDrawer] = useState(false);
    const { books } = useSelector(state => state.bookReducer);
    const dispatch = useDispatch();

    const setViewAddBook = (value) => {
        setViewDrawer(value)
    }

    useEffect(() => {
        debugger
        if(books == null) {
            dispatch(getBooks())
            .catch(error => {
                console.log(error);
                message.error('Failed to get books from server')
            });
        }
        else {
             let data = books.map(book => ({...book, key: book._id}));
            setTableData(data);
        }
    }, [books, dispatch]);

    return (

        <>
            <Button type="primary" onClick={()=>{setViewAddBook(true)}}>New Book</Button>
            {viewDrawer && <CreateNewBook setVisible={setViewAddBook} />}
            <Table columns={columns} dataSource={tableData} bordered />
        </>
    )
}
export default Library;