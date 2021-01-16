import React from 'react';
import { useHistory } from 'react-router-dom';

const UserDetails = (props) => {

    const history = useHistory();
    const {user} = history.location.state;


    return (
        <>
            <h3>{user._id}</h3>
            <h3>{user.firstName}</h3>
            <h3>{user.lastName}</h3>
        </>
    )
}

export default UserDetails; 

