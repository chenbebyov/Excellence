import React, { useEffect, useState } from 'react';
import { setNewBorrow } from '../../redux/actions/book.actions';
import { useDispatch } from 'react-redux';
import { getStudents } from '../../services/user.service';
import { getAllBooks } from '../../services/book.service';
import { Popover, Form, Button, Input, message, DatePicker, AutoComplete } from 'antd';
import {
    PhoneOutlined,
    MailOutlined,
    HomeOutlined, 
  } from '@ant-design/icons';
import moment from 'moment';
import { useHistory } from 'react-router-dom';





const CreateBorrow = (props) => {

    const [loading, setLoading] = useState(false)
    const [studentList, setStudentList] = useState([]);
    const [bookList, setBookList] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);

    const history = useHistory();



    useEffect(() => {
        getStudents()
            .then(resopnse => resopnse.data)
            .then(resopnse => resopnse.data)
            .then(resopnse => {
                setStudentList(resopnse);
            });
    }, [])

    useEffect(() => {
        getAllBooks()
            .then(resopnse => resopnse.data)
            .then(resopnse => resopnse.data)
            .then(resopnse => {
                setBookList(resopnse);
            });
    }, [])

    useEffect(() => {
        let options = studentList.map(student => ({
            value: student._id,
            label: (
                <Popover placement="left" content={getStudentDetails(student)} title={`${student.firstName} ${student.lastName}`} trigger="hover">
                    <div style={{ float: 'left', textAlign:'right', width:"100%"}}>
                        <label>{student.firstName} {student.lastName}</label>
                    </div>
                </Popover>
            ),
        }));
        setStudentOptions(options);

    }, [studentList])

    const getStudentDetails = (student) => {
        return (
            <>
                <div><PhoneOutlined /> {student.cellPhone}</div>
                <div><MailOutlined /> {student.email}</div>
                <div><HomeOutlined /> {student.address}</div>
            </>
        );
    }


    const dispatch = useDispatch();

    const save = (borrow) => {
        debugger
        let newBorrow = {...borrow, endDate: moment(borrow.endDate).format('YYYY/MM/DD')};
        setLoading(true)
        dispatch(setNewBorrow(newBorrow)).then(response => {
            debugger
            setLoading(false);
            message.success('ההשאלה נשמרה בהצלחה');
            history.push({
                pathname: `/library/borrows`,
            });
        }).catch(error => {
            message.error('שגיאה ביצירת השאלה, אנא נסה שנית');
            setLoading(false);
        });
    };

    const getBarcode= () =>{
        return bookList.filter(book => book.status === 'not borrowed').map(book => ({value: book.barcode  }))
    } 


    return (
        <>
            <h1>הוספת השאלה חדשה</h1>
            <Form id="newBorrowForm" layout="vertical" hideRequiredMark onFinish={save}>

                <Form.Item
                    name="barcode"
                    label="ברקוד"
                    rules={[{ required: true, message: 'Please enter a barcode' }]}
                >
                     <AutoComplete
                        style={{
                            width: 200,
                        }}
                        options={getBarcode()}
                        showSearch={ true }
                        placeholder="ברקוד"
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                </Form.Item>

                <Form.Item
                    name="studentId"
                    label="שם תלמיד"
                    rules={[{ required: true, message: 'Please enter user name' }]}
                >
                    <AutoComplete
                        style={{
                            width: 200,
                        }}
                        options={studentOptions}
                        showSearch={ true }
                        optionFilterProp="label"
                        placeholder="שם תלמיד"
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                </Form.Item>

                <Form.Item 
                    name="endDate"
                    label="זמן סיום השאלה"
                    rules={[{ required: true, message: 'Please enter date borrow finished' }]}
                >
                    <DatePicker renderExtraFooter={() => 'extra footer'}
                        format="YYYY/MM/DD"
                    />
                </Form.Item>

                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit">
                        שמור
                  </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default CreateBorrow;


