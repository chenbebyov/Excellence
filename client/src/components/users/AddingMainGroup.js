import React, { useState } from 'react';
import { Input, Space } from 'antd';
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
  <Search
    placeholder="input search text"
    allowClear
    enterButton="Search"
    size="large"
    onSearch={onSearch}
  />
  <Search
    placeholder="input search text"
    enterButton="Search"
    size="large"
    suffix={suffix}
    onSearch={onSearch}
  />
</Space>
export default AddingMainGroup;