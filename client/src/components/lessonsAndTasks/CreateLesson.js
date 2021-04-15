import React, {useState} from 'react';
import { Divider, Form, Input, Button, Upload, message, Row, Col } from 'antd';

import { useDispatch } from 'react-redux';
import { createLesson } from '../../redux/actions/lesson.actions';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import '../../css/Lessons.css';
import UploadImageToS3WithReactS3 from './UploadImageToS3WithReactS3';
import UploadFiles from './UploadFiles';
import ViewFile from './ViewFile';
import ViewFileCopy from './ViewFileCopy';
import ViewFileCopy2 from './ViewFileCopy2';


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
    const [lessonFiles, setLessonFiles] = useState([]);

    const { Dragger } = Upload;

    const props = {
        name: 'file',
        multiple: true,
        action: '',
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

    const addFile = (linkToFile, fileName) => {
        debugger
        setLessonFiles([...lessonFiles, {linkToFile,fileName}]);
    }

    const save = (values) => {
        console.log('Success:', values);
        dispatch(createLesson(values)).then(response => {
            if(response.success){
                message.success(response.message)
            }
            else {
                message.error('lesson creation failed')
            }
        }).catch(error => message.error('lesson creation failed'));
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
        <ViewFileCopy2/>
        <h1>docx</h1>
        <ViewFileCopy file="https://lessons-files.s3.amazonaws.com/workFileExample.docx" type="docx"/>
        <h1>jpg</h1>
        <ViewFileCopy file="https://lessons-files.s3.eu-west-3.amazonaws.com/bg1a.jpg" type="jpg"/>
        <h1>pdf</h1>
        <ViewFileCopy file="https://lessons-files.s3.amazonaws.com/testPDF.pdf" type="pdf"/>
        <h1>mp3</h1>
        <ViewFileCopy file="https://lessons-files.s3.eu-west-3.amazonaws.com/%D7%97%D7%99%D7%99%D7%9D+%D7%90%D7%9C%D7%98%D7%9E%D7%9F+-+%D7%99%D7%A8%D7%90%D7%AA+%D7%94%D7%A9%D7%9D+(1).mp3" type="mp3"/>
        <h1>mp4</h1>
        <ViewFileCopy file="https://lessons-files.s3.amazonaws.com/VID-20201207-WA0004.mp4" type="mp4"/>
        <Row>
        {/* <ViewFile/> */}
        <UploadFiles actionOnUploadCompleted={addFile}/>
        {/* <UploadImageToS3WithReactS3/> */}
            <Col span={12} offset={6}>
                <Form className="parent" 
                        {...layout} 
                        name="Add New Lesson" 
                        initialValues={{ remember: true }} 
                        onFinish={save} 
                        onFinishFailed={onFinishFailed}>

                        <Form.Item className="div1"
                            label="lesson subject"
                            name="lessonSubject"
                            rules={[
                                {
                                    required: true,
                                    pattern: "(^[a-zA-Z0-9 ]+$)",
                                    min: 2,
                                    message: 'lesson subject is required and must be at least 2 chars',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item className="div2"
                            label="file name"
                            name="fileName"
                            rules={[
                                {
                                    required: true,
                                    pattern: "(^[a-zA-Z0-9]+$)",
                                    min: 2,
                                    message: 'file name is required and must be at least 2 chars',
                                },
                            ]}
                        >
                            <Input />

                        </Form.Item>
                        <Divider orientation="left">
                            Lesson Files
                        </Divider>
                        {/* <Form.Item className="div3">
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
                            <br/>
                            <Upload action="                                                " directory>
                                <Button icon={<UploadOutlined />}>Upload Directory</Button>
                            </Upload>
                        </Form.Item> */}
                        <Form.Item
                            className="div4"
                            label="task name"
                            name="taskName"
                            rules={[
                                {
                                    required: true,
                                    pattern: "(^[a-zA-Z0-9]+$)",
                                    min: 2,
                                    message: 'file name is required and must be at least 2 chars',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        {/* <Form.Item className="div5">
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
                            <br/>
                            <Upload action="                                                " directory>
                                <Button icon={<UploadOutlined />}>Upload Directory</Button>
                            </Upload>
                        </Form.Item> */}
                        <Form.Item className="div6">
                            <Button type="primary" htmlType="submit">
                                Add Lesson
                            </Button>
                        </Form.Item>
                </Form>
            </Col>
        </Row> 
        </>
    )

}

export default CreateLesson;