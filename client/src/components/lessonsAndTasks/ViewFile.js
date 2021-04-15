import React, { useState } from  'react';
import { Button } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import { Document, Page, pdfjs   } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const ViewFile  = (props) => {


    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    return (
        <div>
        {/* <img src="https://lessons-files.s3.eu-west-3.amazonaws.com/bg1a.jpg"/> */}
        <Document
            file='https://lessons-files.s3.amazonaws.com/testPDF.pdf'
            onLoadSuccess={onDocumentLoadSuccess}
            page = {pageNumber}
        >
            <Page pageNumber={pageNumber} />
        </Document>
        <Button type="primary" onClick={(()=>setPageNumber(pageNumber+1))}>next</Button>
        <Button type="primary" onClick={(()=>setPageNumber(pageNumber-1))}>previuse</Button>
        <p>Page {pageNumber} of {numPages}</p>
        </div>
    );
}

export default ViewFile;