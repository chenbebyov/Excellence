import React from 'react';
import { Radio } from 'antd';
import Home from '../pages/Home';


const ChooseUser = (id) => {
    
const [value, setValue] = React.useState(1);

const onChange = e => {
  console.log('radio checked', e.target.value);
  setValue(e.target.value);
};

//if(Home.user.role==admin)

    return (
        <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>student</Radio>
        <br />
        <Radio value={2}>teacher</Radio>
        <br />
        <Radio value={3}>secretary</Radio>
        <br />
        <Radio value={4}>admin</Radio>
        </Radio.Group>
    )
}

export default ChooseUser;