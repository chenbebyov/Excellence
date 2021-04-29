import React, { useState } from 'react';
import {setNewBook} from '../../redux/actions/book.actions';
import {useDispatch} from 'react-redux';
import { Drawer, Form, Button, Input, Select ,message} from 'antd';


const { Option } = Select;

const BorrowingBook = () => {

    const {setVisible} = props;
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const save = (book) => {
      setLoading(true)
      dispatch(setNewBook(book)).then(response => {
        setLoading(false);
        message.success('the book was added successfully');
        onClose();
      }).catch(error => {
        message.error('add new book failed');
        setLoading(false);
      });    
    }
  
    const onClose = () => {
        setVisible(false);
    };
  


    return (
        <>
             <Form id="newBookForm" layout="vertical" hideRequiredMark onFinish={save}>

                <Form.Item
                  name="barcode"
                  label="ברקוד"
                  rules={[{ required: true, message: 'Please enter a barcode' }]}
                >
                  <Input placeholder="Please enter a barcode" />
                </Form.Item>

                <Form.Item
                  name="name"
                  label="שם תלמיד"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter book name" />
                </Form.Item>

                <Form.Item
                  name="date"
                  label="זמן השאלה"
                  rules={[{ required: true, message: 'Please enter date borrow' }]}
                >
                <RangePicker
                   ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    showTime
                    format="YYYY/MM/DD HH:mm"
                />  
                </Form.Item>
         
                {/* <Form.Item
                  name="status"
                  label="סטטוס"
                  rules={[{ required: true, message: 'Please select status' }]}
                >
                  <Select placeholder="Please select status book">
                    <Option value="not borrowed">לא מושאל</Option>
                    <Option value="borrowed">מושאל</Option>
                    <Option value="in binding">בתיקון</Option>
                  </Select>
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
export default BorrowingBook;


