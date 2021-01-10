import React, { useState } from 'react';
import { enterUser } from '../redux/actions/user.actions';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Input, Button, Checkbox, Alert } from 'antd';

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

    const { message } = useSelector(state => state.messageReducer);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const save = (values) => {
        setLoading(true);

        dispatch(enterUser(values.email, values.password))
        .then(()=>{
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {message && <Alert
                message="Error"
                description={message}
                type="error"
                showIcon
            />}
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

export default Login;