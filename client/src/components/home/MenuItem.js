import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Menu,Avatar, Badge } from 'antd';
import {Link} from "react-router-dom";
import Icon from '@ant-design/icons';


const MenuItem = ({key, route, icon, children, roles, ...props}) => {
    const { user } = useSelector(state => state.userReducer);
    const [userRole, setUserRole] = useState(user && user.role ? user.role : 'guest');
    
    useEffect(() => {
        setUserRole(user && user.role ? user.role : 'guest');
    },[user])
    
    
    return (
        <>
            {(!roles || roles.includes(userRole)) &&
                <Menu.Item key={key} {...props}> 
                    {icon}
                    {route && <Link to={route}></Link>}
                    {children}
                </Menu.Item>
            }
        </>
    );

}

export default MenuItem;

