import React, { useEffect, useState } from 'react';
import ViewUsers from './ViewUsers';
import {getAllUsers, getTeachers, getStudents} from '../../services/user.service';
import { message, Tabs } from 'antd';
import _ from 'lodash';

const { TabPane } = Tabs;


const ManageUsers = () => {

    const [teacherList, setTeacherList] = useState();
    const [studentList, setStudentList] = useState();
    const [userList, setUserList] = useState();
    const [newUsers, setNewUsers] = useState();

    useEffect(() => {
        getAllUsers().then(users => {
            debugger;
            setUserList(users.data.data);
        })
        .catch(error => message.error('טעינת המשתמשים נכשלה'));

        getAllStudents();
        getAllTeacher();
    }, []);


    useEffect(() => {
        if(studentList && teacherList && userList) {
            debugger;
            let studentsByUser = new Map(studentList.map(student => [student.userId, student]));
            let teachersByUser = new Map(teacherList.map(teacher => [teacher.userId, teacher]));
            let filteredUsers = userList.filter(user => 
                !studentsByUser.has(user._id) && !teachersByUser.has(user._id)
            )
            setNewUsers(filteredUsers);
        }

    }, [studentList, teacherList, userList])

    const getAllStudents = () => {
        getStudents().then(resopnse => resopnse.data).then(response => {
            if (response.success) {
                let result = response.data;
                setStudentList(result)

            } 
            else {
                message.error('טעינת רשימת התלמידים נכשלה')
            }}).catch(error => message.error('טעינת רשימת התלמידים נכשלה'));
    }

    const getAllTeacher = () => {
        getTeachers().then(resopnse => resopnse.data).then(response => {
            if (response.success) {
                let result = response.data;
                setTeacherList(result);
            }
            else {
                message.error('טעינת רשימת המורים נכשלה')
            }}).catch(error => message.error('טעינת רשימת המורים נכשלה'));
    }

    return (
        <>
        <Tabs defaultActiveKey="1">
            <TabPane tab="תלמידים" key="students">
                <ViewUsers title="תלמידים" userList={studentList ? studentList : []}/>
            </TabPane>
            <TabPane tab="מורים" key="staff">
                <ViewUsers title="מורים" userList={teacherList ? teacherList : []}/>
            </TabPane>
            <TabPane tab="מצטרפים חדשים" key="newUsers">
                <ViewUsers title="מצטרפים חדשים" userList={newUsers ? newUsers : []} showSetRole={true} />
            </TabPane>
        </Tabs>
        </>
    )
}
export default ManageUsers;