import React, {useState} from 'react';
import ViewUsers from '../../components/users/ViewUsers';
import {Tabs, Drawer ,Button, Card,Radio } from 'antd';
import LessonsInGroup from './LessonsInGroup';
import AddLessonsToGroup from './AddLessonToGroup';
// import Attendance from '../users/Attendance';
import {updateAttendance} from '../../redux/actions/user.actions';


const { TabPane } = Tabs;



const GroupDetails = (props) => {

    const {group, teacherName, studentsInGroup} = props;
    const [viewDrawer, setViewDrawer] = useState(false);
    // const [attendance, setAttendance] = useState();
    // const [loading, setLoading] = useState(false);
    // const dispatch = useDispatch();

    // const onChange = e => {
    //     console.log('radio checked', e.target.value);
    //     setAttendance(e.target.value);
    // };

    // const save=()=>{
    //     setLoading(true);
    //     dispatch(updateAttendance(studentId,attendance)).then(response => {
    //       message.success('attendance was set successfully');
    //       setLoading(false);
    //     }).catch(error => {
    //       setLoading(false);
    //       message.error('set attendance failed');
    //     });  
    // }

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
                    {/* <Radio.Group onChange={onChange}>
                       <Radio> */}
                       <ViewUsers 
                        title="נוכחות:" 
                        userList={studentsInGroup} 
                        showSetRole={false}
                        showRemove={false}
                       /> 
                       {/* </Radio>
                    </Radio.Group> */}
                </TabPane>
            </Tabs>
        </>
    )
}

export default GroupDetails;

