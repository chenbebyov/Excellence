import React, {useState} from 'react';
import ViewUsers from '../../components/users/ViewUsers';
import {Tabs, Drawer ,Button, Card,Radio } from 'antd';
import LessonsInGroup from './LessonsInGroup';
import AddLessonsToGroup from './AddLessonToGroup';
import Attendance from '../users/Attendance';
import {updateAttendance} from '../../redux/actions/user.actions';
import { useSelector } from 'react-redux';
import AddMessage from '../messages/AddMessage';


const { TabPane } = Tabs;



const GroupDetails = (props) => {

    const {group, teacherName, studentsInGroup} = props;
    const [viewDrawer, setViewDrawer] = useState(false);
    const [defaultTab, setDefaultTab] = useState('1');
    const {user} = useSelector(state => state.userReducer);

    return (
        <>
            <Card title={`שם קבוצה: ${group.name}`} style={{ width: 300 }} bordered={false}>
                        <p>שם מורה: {teacherName}</p>
            </Card>

            <Tabs defaultActiveKey={defaultTab}>
                <TabPane tab="שיעורים בקבוצה" key="1">
                    <>
                        <LessonsInGroup lessons={group.lessons}/>
                        {user.role !== 'student' && 
                            <>
                                <Button onClick={()=>{setViewDrawer(true)}}>הוספת שיעור לקבוצה</Button>
                                <Drawer
                                    title="הוספת שיעור לקבוצה"
                                    placement="right"
                                    closable={()=>{setViewDrawer(true)}}
                                    visible={viewDrawer}
                                    key="right"
                                    onClose={()=>{setViewDrawer(false)}}
                                    >
                                    <AddLessonsToGroup setViewDrawer={setViewDrawer} groupId={group._id}/>
                                </Drawer>
                            </>
                        }
                        
                    </>
                </TabPane>
                <TabPane tab="תלמידים בקבוצה" key="2">
                    <ViewUsers 
                        title="תלמידים בקבוצה:" 
                        userList={studentsInGroup} 
                        showSetRole={false}
                        showRemove={false}
                    /> 
                </TabPane>
                <TabPane tab={user.role === 'student' ? 'השארת הודעה למורה' : 'שליחת הודעה לתלמידי הקבוצה'} key="3">
                    <AddMessage 
                        key={Math.random()}
                        fromRoute={false}
                        sentToAlias={user.role === 'student' ? 'מורה ':'תלמידי הקבוצה'}
                        toUsers={user.role === 'student'? [group.teacherCode] : studentsInGroup.map(student => student._id)}
                        navigateAfterSave={()=>setDefaultTab('1')}
                    />
                </TabPane>
                {user.role !== 'student' &&
                    <TabPane tab="נוכחות" key="4">
                        <Attendance studentsInGroup={studentsInGroup} groupId={group._id}/>
                    </TabPane>
                }
            </Tabs>
        </>
    )
}

export default GroupDetails;

