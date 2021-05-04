import React, { useEffect, useState } from 'react';
import { setNewBorrow } from '../../redux/actions/book.actions';
import { useDispatch } from 'react-redux';
import { getStudents } from '../../services/user.service';
import { Popover, Form, Button, Input, message, DatePicker, Space, AutoComplete } from 'antd';
import {
    PhoneOutlined,
    MailOutlined,
    HomeOutlined, 
  } from '@ant-design/icons';
import moment from 'moment';




const CreateBorrow = (props) => {

    const { setVisible } = props;
    const [loading, setLoading] = useState(false)
    const [studentList, setStudentList] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);

    useEffect(() => {
        getStudents()
            .then(resopnse => resopnse.data)
            .then(resopnse => resopnse.data)
            .then(resopnse => {
                setStudentList(resopnse);
            });
    }, [])

    useEffect(() => {
        let options = studentList.map(student => ({
            value: student._id,
            displayValue: `${student.firstName} ${student.lastName}`,
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
            message.success('the book was added successfully');
            onClose();
        }).catch(error => {
            message.error('add new book failed');
            setLoading(false);
        });
    };

    const onClose = () => {
        setVisible(false);
    };



    return (
        <>
            <h1>הוספת השאלה חדשה</h1>
            <Form id="newBorrowForm" layout="vertical" hideRequiredMark onFinish={save}>

                <Form.Item
                    name="barcode"
                    label="ברקוד"
                    rules={[{ required: true, message: 'Please enter a barcode' }]}
                >
                    <Input placeholder="Please enter a barcode" />
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

                {/* <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    showTime
                    format="YYYY/MM/DD HH:mm"
                /> */}
                {/* <Form.Item
                    name="endDate"
                    label="זמן סיום השאלה"
                    // rules={[{ required: true, message: 'Please enter date borrow finished' }]}
                >
                    <Space direction="vertical" size={12}>
                        <DatePicker renderExtraFooter={() => 'extra footer'} />
                    </Space>
                </Form.Item> */}

                <Form.Item>
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        ביטול
                  </Button>
                    <Button loading={loading} type="primary" htmlType="submit">
                        שמור
                  </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default CreateBorrow;


