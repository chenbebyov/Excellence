import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Radio } from 'antd';



const SetUserRole = (props) => {

  const { id } = props;

  const { user } = useSelector(state => state.userReducer);
    
  const [role, setRole] = useState();

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setRole(e.target.value);
  };

  const dispatch = useDispatch();
    
  const save = (values) => {
      console.log('Success:', values); 
      dispatch(setUserRole(values));       
  }

    return (
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
    )
}

export default SetUserRole;