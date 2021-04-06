import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Form, Input, Radio, Button, Modal, message } from 'antd';
import {setUserRole} from '../../redux/actions/user.actions';


const SetUserRole = (props) => {

  const { id, handleOk, handleCancel } = props;

  const { user } = useSelector(state => state.userReducer);
    
  const [role, setRole] = useState();

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setRole(e.target.value);
  };

  const dispatch = useDispatch();
    
  const save = () => {
      dispatch(setUserRole(id, role)).then(response => {
        message.success('role was set successfully');
      }).catch(error => message.error('set user role failed'));    
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
        <Modal title="Set Role" visible={true} footer={null}>
          <Form onFinish={save} onFinishFailed={onFinishFailed} >

          <Form.Item>
            <Radio.Group onChange={onChange}>
            <Radio value={'student'}>student</Radio>
            <br />
            <Radio value={'teacher'}>teacher</Radio>
            <br />
            <Radio value={'secretary'}>secretary</Radio>
            <br />
            { user.role === 'admin' && 
              <Radio value={'admin'}>admin</Radio>
            }
            </Radio.Group>
          </Form.Item>

          <Form.Item>
              <Button type="primary" htmlType="submit">
                  Save
              </Button>
              <Button type="default" htmlType="submit" onClick={()=> cancel()}>
                  cancel
              </Button>

          </Form.Item>
          </Form>
        </Modal>

        </>
    )
}

export default SetUserRole;