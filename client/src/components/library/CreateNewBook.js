import React, { useState } from 'react';
import {setNewBook} from '../../redux/actions/book.actions';
import {useDispatch} from 'react-redux';
import { Drawer, Form, Button, Input, Select ,message} from 'antd';


const { Option } = Select;

// const statusName = new Map([
//   ["not borrowed", "לא מושאל"],
//   ["borrowed", "מושאל"],
//   ["in binding", "בתיקון"],
// ])

const CreateNewBook = (props) => {

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const save = (book) => {
      // book.status=statusName.get(book.status);
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
          <Form id="newBookForm" layout="vertical" hideRequiredMark onFinish={save}>

                <Form.Item
                  name="barcode"
                  label="ברקוד"
                  rules={[{ required: true, message: 'הכנס ברקוד' }]}
                >
                  <Input placeholder="הכנס ברקוד" />
                </Form.Item>

                <Form.Item
                  name="name"
                  label="שם"
                  rules={[{ required: true, message: 'הכנס שם ספר' }]}
                >
                  <Input placeholder="הכנס שם ספר" />
                </Form.Item>

                <Form.Item
                  name="writer"
                  label="סופר/ת"
                  rules={[{ required: true, message: 'הכנס שם מחבר' }]}
                >
                  <Input placeholder="הכנס שם מחבר" />
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