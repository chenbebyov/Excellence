import React, { useEffect, useState } from 'react';
import { Tabs, message, Table, Tag, Button, Tooltip } from 'antd';
import { getAllBorrows, returnBorrow } from '../../services/book.service';
import { MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import Moment from 'moment';
import { useHistory } from 'react-router-dom';


const { TabPane } = Tabs;

const tomorrow = new Date((new Date()).getTime() + (24 * 60 * 60 * 1000));


const BorrowBookList = () => {

    const [currentBorrows, setCurrentBorrows] = useState([]);
    const [historyBorrows, setHistoryBorrows] = useState([]);
    const history = useHistory();


    const columns = [
        {
            title: 'ברקוד',
            dataIndex: 'barcode',
            key: 'barcode',
        },
        {
            title: 'שם ספר',
            dataIndex: 'bookName',
            key: 'bookName'
        },
        {
            title: 'מחבר',
            dataIndex: 'writer',
            key: 'writer'
        },
        {
            title: 'שם תלמיד',
            dataIndex: 'studentName',
            key: 'studentName'
        },
        {
            title: 'תאריך השאלה',
            dataIndex: 'dateBorrowe',
            key: 'dateBorrowe',
            render: date => Moment(date).format('DD/MM/YYYY'),
            sorter: (a, b) => new Date(a.dateBorrowe) <= new Date(b.dateBorrowe),
            ortDirections: ['descend', 'ascend'],
        },
        {
            title: 'תאריך סיום השאלה',
            dataIndex: 'endDateBorrowing',
            key: 'endDateBorrowing',
            render: date => Moment(date).format('DD/MM/YYYY'),
            sorter: (a, b) => new Date(a.endDateBorrowing) <= new Date(b.endDateBorrowing),
            ortDirections: ['descend', 'ascend'],
        },
        {
            title: 'הערות',
            dataIndex: 'endDateBorrowing',
            key: 'remarks',
            render: (endDate, record) => (
                <>
                    {!record.isReturned && new Date(endDate) < new Date() &&
                        <Tag color={'red'}>תוקף השאלה פג</Tag>
                    }
                    {!record.isReturned && (new Date(endDate)).getDate() === (new Date(tomorrow)).getDate() &&
                        <Tag color={'blue'}>תוקף עומד לפוג</Tag>
                    }
                </>
            )
        },
        {
            title: '',
            dataIndex: 'isReturned',
            key: 'actions',
            render: (text, record) => (
                <>
                    {
                        !record.isReturned && 
                        <>
                            <Tooltip title={'החזרת ספר'}>
                                <Button type="primary" icon={<RetweetOutlined />} onClick={() => returnBorrowedBook(record)}>החזרת ספר</Button>
                            </Tooltip>
                            <Tooltip title={'שליחת הודעה לתלמיד'}>
                                <Button icon={<MessageOutlined />} onClick={() => sendMessageToUser(record)}></Button>
                            </Tooltip>
                        </>
                    }
                </>
            )
        },
    ];


    useEffect(() => {
        getAllBorrows()
            .then(response => response.data)
            .then(response => response.data)
            .then(borrows => {
                let history = borrows.filter(borrow => borrow.isReturned);
                setHistoryBorrows(history);
                let current = borrows.filter(borrow => !borrow.isReturned);
                setCurrentBorrows(current);

            }).catch(error => message.error('שגיאה'));
    }, [])

    const borrowsTable = (borrows) => {
        return (
            <Table columns={columns} dataSource={borrows} rowKey='_id' />
        )
    }

    const returnBorrowedBook = (borrow) => {
        console.log(borrow);
        returnBorrow({ ...borrow, borrowId: borrow._id })
            .then(response => {
                if(response.data.success) {
                    borrow.isReturned = true;
                    let currentResult = currentBorrows.filter(item => item._id !== borrow._id);
                    setCurrentBorrows(currentResult);
                    setHistoryBorrows([...historyBorrows, borrow]);
                }
            })
            .catch(error => message.error('החזרת הספר נכשלה'))
    }

    const sendMessageToUser = (record) => {
        history.push({
            pathname: `/message/add`,
            state: { toUsers: [record.studentId], sentToAlias: record.studentName },
        });
    }

    return (
        <>
            <h1>רשימת השאלות</h1>

            <Tabs defaultActiveKey="1">
                <TabPane tab="השאלות נוכחיות" key="currntBorrows">
                    {borrowsTable(currentBorrows)}
                </TabPane>
                <TabPane tab="היסטורית השאלות" key="historyBorrows">
                    {borrowsTable(historyBorrows)}
                </TabPane>
            </Tabs>
        </>
    )
}
export default BorrowBookList;