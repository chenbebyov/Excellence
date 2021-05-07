import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Upload, Modal,Divider, Layout } from 'antd';
import ViewFileCopy2 from './ViewFileCopy2';
import {
    LoadingOutlined,
    PaperClipOutlined,
    PictureTwoTone,
    FilePdfTwoTone,
    FileWordTwoTone,
    FileExcelTwoTone,
    PlusOutlined,
} from '@ant-design/icons';

import '../../css/Lessons.css';

const { Header, Content, Footer } = Layout;

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const fileSufIconList = [
    { icon: <FilePdfTwoTone />, type: ['.pdf'] },
    { icon: <FileExcelTwoTone />, type: ['.xlsx', '.xls', '.csv'] },
    { icon: <FileWordTwoTone />, type: ['.doc', '.docx'] },
    { icon: <PictureTwoTone />, type: ['.webp', '.svg', '.png', '.gif', '.jpg', '.jpeg', '.jfif', '.bmp', '.dpg'] },
];

const LessonView = () => {

    const history = useHistory();
    const lesson = history.location.state.lesson;
    const [taskFiles, setTaskFiles] = useState([]);
    const [lessonFiles, setLessonFiles] = useState([]);

    useEffect(() => {
        let filesOftasks = lesson.taskToLesson.map(file => ({
            ...file,
            name: file.taskName,
            url: file.linkToTask,
            status: 'done'
        }));
        setTaskFiles(filesOftasks);

        let filesOfLesson = lesson.filesToLesson.map(file => ({
            ...file,
            name: file.fileName,
            status: 'done',
            url: file.linkToFile
        }));
        setLessonFiles(filesOfLesson);
    }, [lesson])

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handleCancel = () => setPreviewVisible(false);

    //TODO:...
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const handleIconRender = (file, listType) => {

        let icon = file.status === 'uploading' ? <LoadingOutlined /> : <PaperClipOutlined />;

        if (listType === 'picture-card' && file.status === 'uploading') {
            icon = <LoadingOutlined />;
        } 

        else {
            fileSufIconList.forEach(item => {
                if (item.type.includes(file.name.substr(file.name.lastIndexOf('.')))) {
                    icon = item.icon;
                }
            });
        }
        return icon;
    };

    //TODO: student upload files

    return (
        <>

        <Content style={{ padding: '50px 50px', textAlign:'right' }}>
            <Divider orientation="right">פרטי השיעור</Divider>
            <label>:שם השיעור</label>
            <h2>{lesson.lessonSubject}</h2>
            <br/>


            <Divider orientation="right">קבצי השיעור</Divider>
            <label>קבצים להצגה בשיעור</label>
            <br/>
            <br/>
            <Upload
                listType="picture-card"
                fileList={lessonFiles}
                onPreview={handlePreview}
                iconRender={handleIconRender}
            >
            </Upload>
            <br/>
            <br/>
            <br/>
            <br/>


            <Divider orientation="right">קבצי שיעורי בית</Divider>
            <label>יש למלא את המשימות המצורפות ולהעלות את התשובות לבדיקה ע"י המורה</label>
            <br/>

            <Upload
                listType="picture-card"
                fileList={taskFiles}
                onPreview={handlePreview}
                iconRender={handleIconRender}
            >
            </Upload>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <Divider orientation="right">תשובות לשיעורי בית</Divider>
            <label>צרף את התשובות לשיעורי הבית</label>
            <br/>

            <Upload
                listType="picture-card"
                fileList={taskFiles}
                onPreview={handlePreview}
                iconRender={handleIconRender}
            >
            </Upload>

            <br/>
            <br/>

        </Content>

            <Modal 
                visible={previewVisible} 
                footer={null} 
                onCancel={handleCancel} 
                width='80vw'
                bodyStyle={{minHeight: '250px'}} 
                style={{minHeight: '500px'}}
            >
                <ViewFileCopy2 key={Math.random()} url={previewImage}/>
            </Modal>
        </>
    )
}
export default LessonView;