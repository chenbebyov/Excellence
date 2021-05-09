import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Form, Input, Radio, Button, Modal, message } from 'antd';
import {setUserRole} from '../../redux/actions/user.actions';


const SetUserRole = (props) => {

  const { id, handleOk, handleCancel } = props;

  const { user } = useSelector(state => state.userReducer);
    
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setRole(e.target.value);
  };

  const dispatch = useDispatch();
    
  const save = () => {
      setLoading(true);
      dispatch(setUserRole(id, role)).then(response => {
        message.success('role was set successfully');
        setLoading(false);
      }).catch(error => {
        setLoading(false);
        message.error('set user role failed');
      });    
      handleOk();   
  }
  const cancel = () => {
    handleCancel();
  }

  const onFinishFailed = () => {
    alert('Failed to set user role');
  }

    return (
      <>
        <Modal title="הגדרת תפקיד משתמש" visible={true} footer={
          <>
              <Button onClick={cancel} style={{ marginRight: 8 }}>
                ביטול
              </Button>
              <Button loading={loading}  type="primary" htmlType="submit" form="newBookForm" key="submit">
                שמור
              </Button>
            </>
          }>
          <Form id="newBookForm" onFinish={save} onFinishFailed={onFinishFailed} >

          <Form.Item id="roleForm">
            <Radio.Group onChange={onChange}>
            <Radio value={'student'}>תלמיד/ה</Radio>
            <br />
            <Radio value={'teacher'}>מורה</Radio>
            <br />
            { user.role === 'admin' && 
              <Radio value={'admin'}>מנהל</Radio>
            }
            </Radio.Group>
          </Form.Item>
          </Form>
        </Modal>

        </>
    )
}

export default SetUserRole;