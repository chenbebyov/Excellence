import React from 'react';
import {setNewBook} from '../../redux/actions/book.actions';
import { Drawer, Form, Button, Input, Select ,message} from 'antd';


const { Option } = Select;

const CreateNewBook = (props) => {

    const {setVisible} = props;

    const save = () => {
      dispatch(setNewBook(book)).then(response => {
        message.success('the book was successfully added');
      }).catch(error => message.error('add new book failed'));    
      onClose();   
    }

    const showDrawer = () => {
        setVisible(true);
    };
  
    const onClose = () => {
        setVisible(false);
    };
  
    return (
        <>
        <Drawer
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
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>

                <Form.Item
                  name="barcode"
                  label="Barcode"
                  rules={[{ required: true, message: 'Please enter a barcode' }]}
                >
                  <Input placeholder="Please enter a barcode" />
                </Form.Item>

                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter book name' }]}
                >
                  <Input placeholder="Please enter book name" />
                </Form.Item>

                <Form.Item
                  name="writer"
                  label="Writer"
                  rules={[{ required: true, message: 'Please enter writer name' }]}
                >
                  <Input placeholder="Please enter writer name" />
                </Form.Item>
         
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true, message: 'Please select status' }]}
                >
                  <Select placeholder="Please select status book">
                    <Option value="1">not borrowed</Option>
                    <Option value="2">borrowed</Option>
                    <Option value="3">in binding</Option>
                  </Select>
                </Form.Item>
          </Form>
        </Drawer>
        </>
    )
}

export default CreateNewBook;