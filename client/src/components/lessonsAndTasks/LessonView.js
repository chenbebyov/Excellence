import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Upload, Modal,Divider, Layout } from 'antd';
import ViewFileCopy2 from './ViewFileCopy2';
import UploadFiles from './UploadFiles';
import {uploadStudentTaskResults} from '../../services/user.service';
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
import { useSelector } from 'react-redux';

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
    const { user } = useSelector(state => state.userReducer);

    
    const [taskFiles, setTaskFiles] = useState([]);
    const [lessonFiles, setLessonFiles] = useState([]);
    const [studentFiles, setStudentFiles] = useState([]);

    useEffect(() => {
        debugger
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
    const [fileUrl, setFileUrl] = useState('');

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setFileUrl(file.url || file.preview);
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

    const studentUploadFiles = (linkToFile, fileName) => {
        debugger
        console.log(linkToFile, fileName);
        setStudentFiles([...studentFiles, {url:linkToFile, name:fileName, status:'done'}]);
        let taskSubmission = {
            lessonId: lesson._id, 
            linkToFile,
            fileName
        }

        uploadStudentTaskResults(taskSubmission, user._id).then(response => {
            debugger;
        })
        .catch(error => {
            debugger
        })
    }

    const preventDownloading = (e) => {
        debugger
        e.preventDefault()
    }
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    //TODO: student upload files

    return (
        <>

        <Content style={{ padding: '50px 50px', textAlign:'right', background:'white' }}>
            <Divider orientation="right">פרטי השיעור</Divider>
            <label>שם השיעור:</label>
            <h2>{lesson.lessonSubject}</h2>
            <br/>


            <Divider orientation="right">קבצי השיעור</Divider>
            { lessonFiles.length > 0 ? 
                <label>קבצים להצגה במהלך השיעור:</label> :
                <label>אין שיעורי בית בשיעור זה.</label>
            }
            <br/>
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
            { taskFiles.length > 0 ? 
                <label>יש למלא את המשימות המצורפות ולהעלות את התשובות לבדיקה ע"י המורה</label> :
                <label>אין שיעורי בית  עבור שיעור זה.</label>
            }
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
            <label>צרף תשובות לשיעורי הבית</label>
            <br/>

            {/* <Upload
                listType="picture-card"
                fileList={taskFiles}
                onPreview={handlePreview}
                iconRender={handleIconRender}
            >
                {uploadButton}
            </Upload> */}

            <UploadFiles 
                uploadType='picture-card'
                fileList={studentFiles}
                onPreview={handlePreview}
                iconRender={handleIconRender}
                actionOnUploadCompleted={studentUploadFiles}
            >
            </UploadFiles>

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
                <a href={fileUrl} target='blank' download>הורדת הקובץ</a>
                <ViewFileCopy2 key={Math.random()} url={fileUrl} onContextMenu={(e)=> e.preventDefault()}/>
            </Modal>
        </>
    )
}
export default LessonView;