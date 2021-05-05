import React, { useState } from 'react';
import {setNewBook} from '../../redux/actions/book.actions';
import {useDispatch} from 'react-redux';
import { Drawer, Form, Button, Input, Select ,message} from 'antd';


const { Option } = Select;

const CreateNewBook = (props) => {

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const save = (book) => {
      setLoading(true)
      dispatch(setNewBook(book)).then(response => {
        setLoading(false);
        message.success('הספר נוסף בהצלחה!');
      }).catch(error => {
        message.error('יצירת הספר נכשלה');
        setLoading(false);
      });    
    }
  
    return (
        <>
        {/* <Drawer
          title="Create a new book"
          onClose={onClose}
          visible={true}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button loading={loading}  type="primary" htmlType="submit" form="newBookForm" key="submit">
                Save
              </Button>
            </div>
          }
        > */}
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
                  label="שם"
                  rules={[{ required: true, message: 'Please enter book name' }]}
                >
                  <Input placeholder="Please enter book name" />
                </Form.Item>

                <Form.Item
                  name="writer"
                  label="סופר/ת"
                  rules={[{ required: true, message: 'Please enter writer name' }]}
                >
                  <Input placeholder="Please enter writer name" />
                </Form.Item>
         
                <Form.Item
                  name="status"
                  label="סטטוס"
                  rules={[{ required: true, message: 'Please select status' }]}
                >
                  <Select placeholder="Please select status book">
                    <Option value="not borrowed">לא מושאל</Option>
                    <Option value="borrowed">מושאל</Option>
                    <Option value="in binding">בתיקון</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button loading={loading} type="primary" htmlType="submit">
                    שמור
                  </Button>
                </Form.Item>
          </Form>
        {/* </Drawer> */}
        </>
    )
}

export default CreateNewBook;