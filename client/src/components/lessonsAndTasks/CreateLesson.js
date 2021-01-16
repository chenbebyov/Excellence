import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { createLesson } from '../../redux/actions/lesson.actions';



const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};

const CreateLesson = () => {

    const dispatch = useDispatch();


    const save = (values) => {
        console.log('Success:', values); 
        dispatch(createLesson(values));       
    }
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form {...layout} name="Add New Lesson" initialValues={{ remember: true }} onFinish={save} onFinishFailed={onFinishFailed} >
        <Form.Item
            label="lesson subject"
            name="lessonSubject"
            rules={[
                {
                    required: true,
                    pattern:"(^[a-zA-Z0-9]+$)",
                    min:2,
                    message: 'lesson subject is required and must be at least 2 chars',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">
                Add Lesson
            </Button>
        </Form.Item>
    </Form>
    )

}

export default CreateLesson;