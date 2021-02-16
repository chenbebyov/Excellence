import React, { useState } from 'react';
import { Table,Input, AutoComplete } from 'antd';
import { AudioOutlined } from '@ant-design/icons';



const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  }
];

const AttendanceJournal = (props) => {

 const {id}=props;

  const [students,setStudents] = useState();

    const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', 
        name: record.name,
    }),
    };

  return (
    <>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={students}
        />
    </>
  );
};

export default AttendanceJournal;