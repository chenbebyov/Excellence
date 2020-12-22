import React, { useState } from 'react';
import {setUserName} from '../redux/action';
import {connect} from 'react-redux';

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