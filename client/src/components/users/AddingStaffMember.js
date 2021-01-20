import { Input,Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';

export default AddingStaffMember = () => {

    state = {
        size: 'large',
      };
    
      handleSizeChange = e => {
        this.setState({ size: e.target.value });
      };
    
      const { size } = this.state;

    return (
        <Input size="large" placeholder="ensert name" prefix={<UserOutlined />} />,
        <br />,
        <br />,
        <Input size="large" placeholder="ensert name" prefix={<UserOutlined />} />,
        <br />,
        <br />,
        <Button type="sub" size={size}>
        Save
      </Button>
    )
}
