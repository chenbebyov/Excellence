import React, { useState } from 'react';
import { connect } from 'react-redux';
import Login from '../components/sign-in/Login';
import Register from '../components/sign-in/Register';
import { Modal, Button, Layout, Tabs } from 'antd';

const TabPane = Tabs.TabPane;

function SignIn(props) {

    const {hideSignIn} = props;

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(true);

    //   const showModal = () => {
    //     setVisible(true);
    //   };

    const hideModal = () => {
        hideSignIn();
    }

    const handleOk = () => {
        // setLoading(true);
        // setTimeout(() => {
        //   setVisible(false);
        //   setLoading(false);
        // }, 3000);
    };

    const handleCancel = () => {
        // hideSignIn();
    };

    return (
        <>
            {/* <Button type="primary" onClick={showModal}>Sign in</Button> */}
            <Modal
                title="Login/Register"
                onOk={handleOk}
                onCancel={handleCancel}
                visible={visible}
                closable={false}
                footer={[
                    // <Button key="back" onClick={handleCancel}> Return </Button>,
                    // <Button key="submit" type="primary" loading={loading} onClick={handleOk}> Submit</Button>
                ]}
            >
                {/* <Layout theme="light"> */}
                <Tabs defaultActiveKey="1" size="large">
                    <TabPane tab="Login" key="1"><Login hideModal={hideModal} /></TabPane>
                    <TabPane tab="Register" key="2"><Register hideModal={hideModal} /></TabPane>

                </Tabs>
                {/* </Layout> */}
            </Modal>
        </>
    );
}

export default SignIn;