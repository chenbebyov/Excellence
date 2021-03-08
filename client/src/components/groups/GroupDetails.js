import React, {useState} from 'react';
import ViewUsers from '../../components/users/ViewUsers';
import { AutoComplete, Input, Form, Tabs, Drawer ,message,Button, Card } from 'antd';
import LessonsInGroup from './LessonsInGroup';
import AddLessonsToGroup from './AddLessonToGroup';

const { TabPane } = Tabs;



const GroupDetails = (props) => {

    const {group, teacherName, studentsInGroup} = props;
    const [viewDrawer, setViewDrawer] = useState(false);


    return (
        <>
            <Card title={`Group name: ${group.name}`} style={{ width: 300 }} bordered={false}>
                        <p>Teacher name: {teacherName}</p>
            </Card>

            <Tabs defaultActiveKey="1">
                <TabPane tab="Student In Group" key="1">
                    <ViewUsers 
                        title="Student In Group:" 
                        userList={studentsInGroup} 
                        showSetRole={false}
                        showRemove={false}
                    /> 
                </TabPane>
                <TabPane tab="Group Lessons" key="2">
                    <>
                    <LessonsInGroup group={group}/>
                        <Button onClick={()=>{setViewDrawer(true)}}>Add new lesson to group</Button>
                        <Drawer
                            title="Add new lesson"
                            placement="right"
                            closable={()=>{setViewDrawer(true)}}
                            visible={viewDrawer}
                            key="right"
                            >
                            <AddLessonsToGroup setViewDrawer={setViewDrawer} groupId={group._id}/>
                        </Drawer>
                    </>
                </TabPane>
            </Tabs>
        </>
    )
}

export default GroupDetails;

