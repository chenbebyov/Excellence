import React, { useEffect, useState } from 'react';
import api from '../../services/books.service';
import { Table, Button } from 'antd';
import CreateNewBook from './CreateNewBook';

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

    const setViewAddBook = (value) => {
        setViewDrawer(value)
    }

    useEffect(() => {
        api.getAllBooks().then(response => response.data.data).then(books => {
            let data = books.map(book => ({...book, key: book._id}));
            setTableData(data);
        }, [])
    }, []);

    return (

        <>
            <Button type="primary" onClick={()=>{setViewAddBook(true)}}>New Book</Button>
            {viewDrawer && <CreateNewBook setVisible={setViewAddBook} />}
            <Table columns={columns} dataSource={tableData} bordered />
        </>
    )
}
export default Library;