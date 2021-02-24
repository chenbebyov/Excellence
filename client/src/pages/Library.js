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



const Library = (props) => { 
    
    const { inputRef } = useBarcode({
        value: '',
    })

const data = [
   {
       key:<svg ref={inputRef} /> ,
      name:  <ul>{bookList.map((book, index) => <li key={index}>{book.bookName}</li>)}</ul>,
      writer:'' ,
      status:''
    }
  ];

    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        api.getAllBooks().then(books => {
            setBookList(books.data.data);
        },[])
    },[]);

    return (
        
        <>
            <Table columns={columns} dataSource={data} bordered />
        </>
        // <div>
        //     <ul>
        //     {bookList.map((book, index) => 
        //        <li key={index}>{book.bookName}</li>
        //     )}
        //     </ul>
        // </div>
    )
}
export default Library;