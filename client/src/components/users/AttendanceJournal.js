import React, { useState } from 'react';
import { Table,Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const onSearch = value => console.log(value);
<Space direction="vertical">
    <Search placeholder="enter a group name" onSearch={onSearch} enterButton />
    <Select>
        <Option value="group1">group1</Option>
        <Option value="group2">group2</Option>
        <Option value="group3">group3</Option>
     </Select>
</Space>

const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  }
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', 
    name: record.name,
  }),
};

const AttendanceJournal = () => {

  const [students,setStudents] = useState([]);

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