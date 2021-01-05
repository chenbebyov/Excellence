import React, { useState } from 'react';
import { enterUser } from '../redux/actions/user.actions';
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

    const {enterUser,user} = props;
    const [loading, setLoading] = useState(false);

    const save = (values) => {
        console.log('Success:', values);
        setLoading(true);
        enterUser(values.email, values.password);
    }
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
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
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default connect(
    (state) => {
        return {
          user: state.userReducer.user
        }
    },
    {enterUser}
)(Login);