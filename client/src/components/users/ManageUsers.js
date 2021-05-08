import React, { useEffect, useState } from 'react';
import ViewUsers from './ViewUsers';
import {getAllUsers, getTeachers, getStudents} from '../../services/user.service';
import { Tabs } from 'antd';
import _ from 'lodash';

const { TabPane } = Tabs;


const ManageUsers = () => {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getAllUsers().then(users => {
            setUserList(users.data.data);
        }, [])
    }, []);

    const getStudents = (students) => {
        
    }

    const getStaff = (teachers) => {
      
    }

    const getNewUsers = (users) => {

    }

    return (
        <>
        <Tabs defaultActiveKey="1">
            <TabPane tab="תלמידים" key="students">
                <ViewUsers title="תלמידים" userList={userList}/>
            </TabPane>
            <TabPane tab="מורים" key="staff">
                <ViewUsers title="מורים" userList={userList}/>
            </TabPane>
            <TabPane tab="מצטרפים חדשים" key="newUsers">
                <ViewUsers title="מצטרפים חדשים" userList={userList} showSetRole={true} />
            </TabPane>
        </Tabs>
        </>
    )
}

export default ManageUsers;