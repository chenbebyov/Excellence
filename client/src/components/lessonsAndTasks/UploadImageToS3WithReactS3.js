import React , {useState} from 'react';
import { uploadFile } from 'react-s3';


// const S3_BUCKET ='lessons-files';
// const REGION ='eu-west-1';
// const ACCESS_KEY ='AKIAJ3ZWMEZMT4LBEGFQ';
// const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_S3_REGION,
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
}

const UploadImageToS3WithReactS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data.location))
            .catch(err => console.error(err))
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithReactS3;