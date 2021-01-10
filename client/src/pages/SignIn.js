import React, { useState } from 'react';
import { connect } from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';
import { Modal, Button, Layout, Tabs } from 'antd';

const TabPane = Tabs.TabPane;

function SignIn(props) {

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // setLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setLoading(false);
    // }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>Sign in</Button>
      <Modal
        visible={visible}
        title="Login/Register"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          // <Button key="back" onClick={handleCancel}> Return </Button>,
          // <Button key="submit" type="primary" loading={loading} onClick={handleOk}> Submit</Button>
        ]}
      >
        {/* <Layout theme="light"> */}
          <Tabs defaultActiveKey="1" size="large">
            <TabPane tab="Login" key="1"><Login/></TabPane>
            <TabPane tab="Register" key="2"><Register/></TabPane>
            
          </Tabs>
        {/* </Layout> */}
      </Modal>
    </>
  );
}

export default SignIn;