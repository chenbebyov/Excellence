import React, { useEffect, useState } from 'react';
import { useBarcode } from 'react-barcodes';
import api from '../services/books.service';
import { Table } from 'antd';

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

    // const { inputRef } = useBarcode({
    //     value: '',
    // })

    //  [
    //     {
    //         key: <svg ref={inputRef} />,
    //         name: <ul>{bookList.map((book, index) => <li key={index}>{book.bookName}</li>)}</ul>,
    //         writer: '',
    //         status: ''
    //     }
    // ];

    useEffect(() => {
        api.getAllBooks().then(response => response.data.data).then(books => {
            let data = books.map(book => ({...book, key: book._id}));
            setTableData(data);
        }, [])
    }, []);

    return (

        <>
            <Table columns={columns} dataSource={tableData} bordered />
        </>
    )
}
export default Library;