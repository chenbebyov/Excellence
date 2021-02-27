import React, { useState } from 'react';
import {Form,Input,Select,Button,} from 'antd';

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  
  const RegistrationForm = () => {
    const [form] = Form.useForm();
  
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };

const NewPassword = () => {
    return (
        <>
               <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
  

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit">
          save
        </Button>
      </Form.Item>
    </Form>
    <RegistrationForm />
        </>
    )
    }
}
export default NewPassword;
