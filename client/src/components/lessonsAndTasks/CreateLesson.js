import React from 'react';
import { Form, Input, Button,Upload, message  } from 'antd';
import { useDispatch } from 'react-redux';
import { createLesson } from '../../redux/actions/lesson.actions';
import { InboxOutlined ,UploadOutlined} from '@ant-design/icons';
import '../css/Lessons.css';


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

    const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: '                                                ',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

    const save = (values) => {
        console.log('Success:', values); 
        dispatch(createLesson(values));       
    }
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
      <>
     <div className="parent">
        <Form {...layout} name="Add New Lesson" initialValues={{ remember: true }} onFinish={save} onFinishFailed={onFinishFailed} >
        <div className="div1">
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
      </div>
      <div className="div2">
        <Form.Item
            label="file name"
            name="fileName"
            rules={[
                {
                    required: true,
                    pattern:"(^[a-zA-Z0-9]+$)",
                    min:2,
                    message: 'file name is required and must be at least 2 chars',
                },
            ]}
        >
            <Input />

        </Form.Item>
        </div>
        <div className="div3">
        <Form.Item>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
         </p>
         <p className="ant-upload-text">Click or drag file to this area to upload</p>
         <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
         </p>
       </Dragger>
       <Upload action="                                                " directory>
           <Button icon={<UploadOutlined />}>Upload Directory</Button>
       </Upload>
     </Form.Item>
      </div>
      <div className="div4">
       <Form.Item
            label="task name"
            name="taskName"
            rules={[
                {
                    required: true,
                    pattern:"(^[a-zA-Z0-9]+$)",
                    min:2,
                    message: 'file name is required and must be at least 2 chars',
                },
            ]}
        >
            <Input />
        </Form.Item>
      </div>
      <div className="div5">
<Form.Item>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
         <InboxOutlined />
       </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
         Support for a single or bulk upload. Strictly prohibit from uploading company data or other
         band files
      </p>
     </Dragger>
     <Upload action="                                                " directory>
           <Button icon={<UploadOutlined />}>Upload Directory</Button>
       </Upload>
</Form.Item>
</div>
<div className="div6">
        <Form.Item>
            <Button type="primary" htmlType="submit">
                Add Lesson
            </Button>
        </Form.Item>
</div>
       
    </Form>
    </div>
    </>
    )

}

export default CreateLesson;