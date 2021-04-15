import React, {useRef, useEffect} from 'react';
import DocViewer,  { DocViewerRenderers }  from "react-doc-viewer";


const ViewFileCopy2  = (props) => {

    const docs = [
        { uri: "https://lessons-files.s3.amazonaws.com/workFileExample.docx" },
        { uri: "https://lessons-files.s3.eu-west-3.amazonaws.com/bg1a.jpg" },
        { uri: "https://lessons-files.s3.amazonaws.com/testPDF.pdf" },
        { uri: "https://lessons-files.s3.eu-west-3.amazonaws.com/%D7%97%D7%99%D7%99%D7%9D+%D7%90%D7%9C%D7%98%D7%9E%D7%9F+-+%D7%99%D7%A8%D7%90%D7%AA+%D7%94%D7%A9%D7%9D+(1).mp3" },
        { uri: "https://lessons-files.s3.amazonaws.com/VID-20201207-WA0004.mp4" },
    ];
    return <DocViewer 
                pluginRenderers={DocViewerRenderers} 
                documents={docs} 
            />
}

export default ViewFileCopy2;