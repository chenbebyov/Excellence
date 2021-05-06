import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Upload, Modal } from 'antd';
import {
    LoadingOutlined,
    PaperClipOutlined,
    PictureTwoTone,
    FilePdfTwoTone,
    FileWordTwoTone,
    FileExcelTwoTone,
    PlusOutlined,
} from '@ant-design/icons';


const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const fileSufIconList = [
    { type: <FilePdfTwoTone />, suf: ['.pdf'] },
    { type: <FileExcelTwoTone />, suf: ['.xlsx', '.xls', '.csv'] },
    { type: <FileWordTwoTone />, suf: ['.doc', '.docx'] },
    { type: <PictureTwoTone />, suf: ['.webp', '.svg', '.png', '.gif', '.jpg', '.jpeg', '.jfif', '.bmp', '.dpg']},
];

const LessonView = () => {

    const history = useHistory();
    const lesson = history.location.state.lesson;
    const [taskFiles, setTaskFiles] = useState([]);
    const [lessonFiles, setLessonFiles] = useState([]);

    useEffect(() => {
        let filesOftasks = lesson.taskToLesson.map(file => ({...file, showPreviewIcon: true, showRemoveIcon: false}));
        setTaskFiles(filesOftasks);
        let filesOfLesson = lesson.filesToLesson.map(file => ({...file, showPreviewIcon: true,  showRemoveIcon: false}));
        setLessonFiles(filesOfLesson);
    },[lesson])

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

        debugger
        // console.log(1, file, listType);
        let icon = file.status === 'uploading' ? <LoadingOutlined /> : <PaperClipOutlined />;
        if (listType === 'picture' || listType === 'picture-card') {
          if (listType === 'picture-card' && file.status === 'uploading') {
            icon = <LoadingOutlined />; // or icon = 'uploading...';
          } else {
            fileSufIconList.forEach(item => {
              if (item.suf.includes(file.fileName.substr(file.fileName.lastIndexOf('.')))) {
                icon = item.type;
              }
            });
          }
        }
        return icon;
    };

    return (
        <>
            <h1>{lesson.lessonSubject}</h1>
            <Upload
                listType="picture-card"
                fileList={lessonFiles}
                onPreview={handlePreview}
                iconRender={handleIconRender}
            >
            </Upload>

            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
      </>
    )
}
export default LessonView;


// createdAt: "2021-05-05T21:14:03.186Z"
// filesToLesson: [{…}]
// lessonSubject: "צבעים"
// taskToLesson: [{…}]
// updatedAt: "2021-05-05T21:14:03.186Z"
// __v: 0
// _id: "60930a969a85944504e11572"