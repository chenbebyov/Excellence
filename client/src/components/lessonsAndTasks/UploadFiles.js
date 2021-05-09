import React, {useState} from  'react';
import { Upload, Button, message } from "antd";
import { InboxOutlined, UploadOutlined,PlusOutlined  } from '@ant-design/icons';
import { uploadFile } from 'react-s3';


const { Dragger } = Upload;

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_S3_REGION,
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
}

const UploadFiles  = (props) => {

    const { actionOnUploadCompleted, uploadType,handleIconRender, fileList, handlePreview } = props;
    const [selectedFileList, setSelectedFileList] = useState([]);

    const uploadFileToS3 = ({ file, onSuccess, onError }) => {
        uploadFile(file, config).then(data => {
            console.log(data.location);
            debugger
            actionOnUploadCompleted(data.location, data.key);
            onSuccess("ok")
        }).catch(error => {
            console.error(error);
            onError({error});
        })
    }
    
    //TODO : delete files: https://www.npmjs.com/package/react-s3

    const upload = info => {
        debugger;

        switch (info.file.status) {
            // case "uploading":
            //     nextState.selectedFileList = [info.file];
            //     break;
            case "done":
                message.success(`${info.file.name} file uploaded successfully.`);
                break;

            case "error":
                message.error(`${info.file.name} file upload failed.`);
                break;

            default: return;
        }
    }

    const daraggerProps = {
        name: 'file',
        multiple: true,
        customRequest: uploadFileToS3,
        onChange : upload
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
      <>
      {
        uploadType === 'picture-card' ? 
        <Upload
            customRequest={uploadFileToS3}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            iconRender={handleIconRender}
            onChange={upload}
        >
        {uploadButton}
        </Upload>
        :
        <Dragger {...daraggerProps}>
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">לחץ / גרור קובץ לאיזור זה כדי להעלות אותו</p>
            <p className="ant-upload-hint">
            ניתן לעלות קובץ בודד או קבצים מרובים
            </p>
        </Dragger>
                  
      }

        {/* <Upload
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={selectedFileList}
            customRequest={uploadFileToS3}
            onChange={upload}
        >
          {selectedFileList.length >= 8 ? null : uploadButton}
        </Upload> */}
      </>
    );
}

export default UploadFiles;