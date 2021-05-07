import React, {useRef, useEffect} from 'react';
// import logger from 'logging-library';
import FileViewer from 'react-file-viewer';
// import { CustomErrorComponent } from 'custom-error';

// https://lessons-files.s3.eu-west-3.amazonaws.com/bg1a.jpg
// const file = 'https://lessons-files.s3.amazonaws.com/testPDF.pdf'
// const type = 'pdf'

const ViewFileCopy  = (props) => {

    const {file, type} = props;
    const componentRef = useRef(null);

    useEffect(() => {
        debugger
        if(componentRef.current.state.loading === false){
            const elFromLibraryComponent = componentRef.current.querySelector('audio');

            if (elFromLibraryComponent) {
                elFromLibraryComponent.setAttribute('controlsList','nodownload');
            }
        }
    }, [componentRef])

    // const [numPages, setNumPages] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);

    // const onDocumentLoadSuccess = ({ numPages }) => {
    //     setNumPages(numPages);
    // }

    const onError = (e) => {
        console.log(e);
        alert(e);
        // logger.logError(e, 'error in file-viewer');
    }
    const preventDownloading = (e) => {
        debugger
        e.preventDefault()
    }

    return (
        <div onContextMenu={preventDownloading} >
            <FileViewer
                ref={componentRef}
                fileType={type}
                filePath={file}
                onError={onError} 
                style={{ width:'1000px' }}/>
        </div>
    );
}

export default ViewFileCopy;