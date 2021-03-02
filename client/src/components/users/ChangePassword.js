
import React, { useState } from 'react';
import { Modal, Button, Layout, Tabs } from 'antd';
import NewPassword from './NewPassword';


function ChangePassword(props) {

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  
  const handleOk = () => {
  };


  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>Change Password</Button>
      <Modal
        visible={visible}
        title="Change Password"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
        ]}
      >
          <Tabs defaultActiveKey="1" size="large">
            <NewPassword/>
          </Tabs>
      </Modal>
    </>
  );
}

export default ChangePassword;