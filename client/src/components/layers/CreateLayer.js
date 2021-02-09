import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {CreateGrade} from 'layers';

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

const CreateLayer = (props) => {

    return (
    <>
        {message && <Alert
            message="Error"
            description={message}
            type="error"
            showIcon
        />}
        <Form {...layout} name="Add Layer" initialValues={{ remember: true }} onFinish={save} onFinishFailed={onFinishFailed} >
            <Form.Item
                label="NameLayer"
                name="nameLayer"
                rules={[
                    {
                        required: true,
                        message: 'Please input name Layer!',
                        type: 'text'
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    add
                </Button>
            </Form.Item>
            <Button type="text" htmlType="submit" onClick={<CreateGrade/>}>Add New Grade</Button>
        </Form>
    </>
)
   
}

export default CreateLayer;








