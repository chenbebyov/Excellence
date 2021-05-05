import React, { useState } from 'react';
import { enterUser } from '../../redux/actions/user.actions';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Input, Button, Checkbox, Alert, message } from 'antd';

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

    const {hideModal} = props;

    // const { message } = useSelector(state => state.messageReducer);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const save = (values) => {
        setLoading(true);

        dispatch(enterUser(values.email, values.password))
            .then((response)=>{
                setLoading(false);
                if(response.data){
                    hideModal();
                    return;
                }
                switch (response.request.status) {
                    case 404:
                        message.error('שגיאה: שם משתמש או סיסמה לא קיימים');
                        break;
                    default:
                        message.error('שגיאה');
                        break;
                }
            })
            .catch(error => {
                setLoading(false);
                message.error('שגיאה')
            });
    }

    const handleCancel = () => {
        hideModal();
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {/* {message && <Alert
                message="Error"
                description={message}
                type="error"
                showIcon
            />} */}
            <Form {...layout} name="login" onFinish={save} onFinishFailed={onFinishFailed} >
                <Form.Item
                    label="מייל"
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
                    label="סיסמא"
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

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        שלח
                    </Button>
                    <Button type="default" htmlType="button" onClick={handleCancel}>
                        ביטול
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Login;