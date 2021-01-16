import React, { useState } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  }
];


// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const AttendanceJournal = () => {

  const [students,setStudents] = useState([]);

  // fetch().then(students =>{
  //   let arr = students.map(student => {
  //     return ({
  //       name: student.firstName +' ' + student.lastName,
  //       key: student._id
  //     });
  //   });
  //   setStudents(arr);
  // })

  return (
    <div>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={students}
      />
    </div>
  );
};

export default AttendanceJournal;