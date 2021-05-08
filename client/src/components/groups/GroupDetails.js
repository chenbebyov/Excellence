import React, {useState} from 'react';
import ViewUsers from '../../components/users/ViewUsers';
import {Tabs, Drawer ,Button, Card,Radio } from 'antd';
import LessonsInGroup from './LessonsInGroup';
import AddLessonsToGroup from './AddLessonToGroup';
import Attendance from '../users/Attendance';
import {updateAttendance} from '../../redux/actions/user.actions';


const { TabPane } = Tabs;



const GroupDetails = (props) => {

    const {group, teacherName, studentsInGroup} = props;
    const [viewDrawer, setViewDrawer] = useState(false);

    return (
        <>
            <Card title={`שם קבוצה: ${group.name}`} style={{ width: 300 }} bordered={false}>
                        <p>שם מורה: {teacherName}</p>
            </Card>

            <Tabs defaultActiveKey="1">
                <TabPane tab="תלמידים בקבוצה" key="1">
                    <ViewUsers 
                        title="תלמידים בקבוצה:" 
                        userList={studentsInGroup} 
                        showSetRole={false}
                        showRemove={false}
                    /> 
                </TabPane>
                <TabPane tab="שיעורים בקבוצה" key="2">
                    <>
                    <LessonsInGroup lessons={group.lessons}/>
                        <Button onClick={()=>{setViewDrawer(true)}}>הוספת שיעור לקבוצה</Button>
                        <Drawer
                            title="הוספת שיעור לקבוצה"
                            placement="right"
                            closable={()=>{setViewDrawer(true)}}
                            visible={viewDrawer}
                            key="right"
                            >
                            <AddLessonsToGroup setViewDrawer={setViewDrawer} groupId={group._id}/>
                        </Drawer>
                    </>
                </TabPane>
                <TabPane tab="נוכחות" key="3">
                       <Attendance studentsInGroup={studentsInGroup} groupId={group._id}/>
                </TabPane>
            </Tabs>
        </>
    )
}

export default GroupDetails;

