import React, { useEffect, useState } from 'react';
import api from '../services/user.service';

const ViewUser = (props) => {

    const {userList} = props;

    return (
        <div>
            <ul>
            {userList.map((user, index) => 
               <li key={index}>{user.userName}</li>
            )}
            </ul>
        </div>
    )
}
export default ViewUser;