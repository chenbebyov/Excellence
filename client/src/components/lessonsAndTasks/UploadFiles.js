import React, {useState} from  'react';
import { Upload, Button, message } from "antd";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { uploadFile } from 'react-s3';


const { Dragger } = Upload;

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_S3_REGION,
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
}

const UploadFiles  = (props) => {

    const { actionOnUploadCompleted } = props;
    const [selectedFileList, setSelectedFileList] = useState([]);

    const uploadFileToS3 = ({ file, onSuccess, onError }) => {
        debugger
        uploadFile(file, config).then(data => {
            console.log(data.location);
            actionOnUploadCompleted(data.location);
            onSuccess("ok")
        }).catch(error => {
            console.error(error);
            onError({error});
        })
    }
    
    //TODO : delete files: https://www.npmjs.com/package/react-s3

    const upload = info => {

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
        }
    }

    const daraggerProps = {
        name: 'file',
        multiple: true,
        customRequest: uploadFileToS3,
        onChange : upload
    };


    return (
      <>
        <Dragger {...daraggerProps}>
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
            </p>
        </Dragger>
      </>
    );
}

export default UploadFiles;