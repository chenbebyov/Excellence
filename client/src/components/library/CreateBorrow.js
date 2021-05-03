import React, { useState } from 'react';
import {setNewBook} from '../../redux/actions/book.actions';
import {useDispatch} from 'react-redux';
import { Drawer, Form, Button, Input, Select ,message, DatePicker, Space} from 'antd';


const { Option } = Select;

const CreateBorrow = () => {

    const {setVisible} = props;
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const { RangePicker } = DatePicker;

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
    };
  
    const onClose = () => {
        setVisible(false);
    };
  


    return (
        <>
             <Form id="newBorrowForm" layout="vertical" hideRequiredMark onFinish={save}>

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
                  <Select>
                     <Select.Option value=""></Select.Option>
                  </Select>

                  <Input placeholder="Please choose pupil name" />
                </Form.Item>

                <Form.Item
                  name="date"
                  label="זמן סיום השאלה"
                  rules={[{ required: true, message: 'Please enter date borrow finished' }]}
                >
                <Space direction="vertical" size={12}>
                   <DatePicker renderExtraFooter={() => 'extra footer'} />
                </Space>
                </Form.Item>
                
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


