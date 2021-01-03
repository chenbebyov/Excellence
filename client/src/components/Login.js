import React, { useState } from 'react';
import {setUser} from '../redux/actions/user.actions';
import {connect} from 'react-redux';

import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = (props) => {

    const {updateUserName} = props;
    const [name,setName] = useState('');

    const save = (values) => {
        console.log('Success:', values);
        console.log(name);
        updateUserName(name);
    }
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <h1>Login</h1>
            <Form {...layout} name="login" initialValues={{ remember: true }} onFinish={save} onFinishFailed={onFinishFailed} >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                            type: 'email'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default connect(
    null,
    (dispatch) => {
        return {
            updateUserName : function(newName){
                dispatch(setUser(newName))
            }
        }
    }
)(Login);