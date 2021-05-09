import React, { useState, useEffect } from 'react';
import { Menu,Avatar, Badge } from 'antd';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/user.actions';
import SignIn from '../../pages/SignIn';
import MenuItem from './MenuItem';
import '../../css/Home.css';
import { 
    MailOutlined, 
    AppstoreOutlined, 
    SettingOutlined, 
    ApartmentOutlined,
    HomeOutlined,
    UserOutlined,
    CalendarOutlined,
    UsergroupAddOutlined,
    ReadOutlined,
    MessageOutlined,
    WechatOutlined,
    IdcardOutlined,
    LogoutOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const pathPermissions = new Map([
    ['/', new Array('guest','admin','teacher', 'student')],
    ['/library', new Array('admin','teacher')],
    ['/users', new Array('admin')],
    ['/users/:id', new Array('admin','teacher', 'student')],
    ['/lessons/add', new Array('admin')],
    ['/lessons', new Array('admin','teacher')],
    ['/layers', new Array('admin','teacher')],
    ['/calendar', new Array('admin','teacher', 'student')],
    ['/grade', new Array('admin','teacher')],
    ['/level', new Array('admin','teacher')],
    ['/group', new Array('admin','teacher')],
    ['/viewGroupDetails', new Array('admin','teacher', 'student')],
    ['/viewGroupDetails', new Array('admin','teacher', 'student')]
]);

const navBarItems = new Map([
    ['/','בית'],
    ['/library','ספריה'],
    ['/users','משתמשים'],
    ['/users/:id','פרטי משתמש'],
    ['/lessons','שיעורים ומשימות'],
    ['/layers','שכבות'],
    ['/calendar','לוח שנה']
]);


const NavBar = (props) => {

    const [current, setCurrent] = useState('/');
    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [showSignIn, setShowSignIn] = useState(false);
    const [userRole, setUserRole] = useState(user && user.role ? user.role : 'guest');

    useEffect(() => {
        if(user != null ){
            hideSignIn();
        }
    }, [user]);

    const handleClick = e => {
        setCurrent(e.key);
    };

    const handleLogout = () => {
        localStorage.removeItem('access-token');
        dispatch(logout());
    };

    const handleShowSignIn = () => {
        setShowSignIn(true);
    }
    const hideSignIn = () => {
        setShowSignIn(false);
    }
    const getMessagesCount = () => {
        debugger
        return user && user.messages ? user.messages.filter(message => !message.isRead).length : 0 ;
    }


    return (
        <>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <MenuItem route="/" key='/' icon={<HomeOutlined />}>בית</MenuItem>
            <MenuItem route="/layers" key='/layers' roles={['admin','teacher']} icon={<ApartmentOutlined />}>קבוצות</MenuItem>
            <MenuItem route="/lessons" key='/lessons and tasks' roles={['admin','teacher']} icon={<ReadOutlined />}>שיעורים ומשימות</MenuItem>
            <MenuItem route="/calendar" key='/calendar' roles={['admin','teacher', 'student']} icon={<CalendarOutlined />}>לוח שנה</MenuItem>
            <MenuItem route="/library" key='/library' roles={['admin','teacher']} icon={<CalendarOutlined />}>ספריה</MenuItem>
            <MenuItem route="/users" key='/users' roles={['admin']} icon={<UsergroupAddOutlined />}>ניהול משתמשים</MenuItem>
            <MenuItem route="/group" key='/group' roles={['student']} icon={<ApartmentOutlined />}>הקבוצות שלי</MenuItem>

        {user && 
            <SubMenu 
                style={{float: 'left'}} 
                key="user" 
                icon={
                    <Badge style={{float: 'right'}} count={getMessagesCount()}>
                        <Avatar icon={<UserOutlined />} />
                    </Badge> 
                }>
                <Menu.ItemGroup>
                    <Menu.Item key="messeges" icon={<WechatOutlined />}><Link to="/messages">הודעות</Link></Menu.Item>
                    {/* <Menu.Item key="profile" icon={<IdcardOutlined />}>פרופיל</Menu.Item> */}
                    <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>יציאה</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
        }

        {user == null &&
            <Menu.Item
                    style={{float: 'left'}} 
                    key="signIn" 
                    onClick={handleShowSignIn}
            >
                <span style={{padding:"8px"}}>כניסה/הרשמה</span> 
                <LogoutOutlined />
            </Menu.Item>
        }
      </Menu>
      {showSignIn && <SignIn hideSignIn={hideSignIn}/>}

      </>
    )
}

export default NavBar;