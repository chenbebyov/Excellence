import React, { useState } from 'react';
import {setUserName} from '../redux/action';
import {connect} from 'react-redux';
// import Form from 'antd/lib/form/Form';
// import { Button } from 'antd';
import { Button, Form, Segment } from 'semantic-ui-react';


const Login = (props) => {

    const {updateUserName} = props;
    const [name,setName] = useState('');

    const handleNameChange = (e) =>{
        setName(e.target.value);
    }

    const save = () => {
        console.log(name);
        updateUserName(name);
    }

    return (
        <div>
            <input type="text" onChange={handleNameChange}></input>
            <button onClick={save}>save</button>
            <Form>
                <Button type='submit' onClick={save}>save</Button>
                {/* <Form.Input></Form.Input>
                <Form.CheckBox></Form.CheckBox> */}
            </Form>
        </div>
    )
}

export default connect(
    null,
    (dispatch) => {
        return {
            updateUserName : function(newName){
                dispatch(setUserName(newName))
            }
        }
    }
)(Login);