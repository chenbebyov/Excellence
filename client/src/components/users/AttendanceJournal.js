import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Table,Input, AutoComplete } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { $CombinedState } from 'redux';




const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  }
];
 

const AttendanceJournal = (props) => {

  const {id}=props;

const { user } = useSelector(state => state.userReducer);

  const data = [
  {
    key:user._id ,
    name: user.name
  }
 ];


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
          dataSource={data}

        />
    </>
  );
};

export default AttendanceJournal;

