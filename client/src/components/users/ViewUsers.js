import React, { useState } from 'react';
import { List, Avatar, Card, Button} from 'antd';
import { useHistory } from 'react-router-dom';
import SetUserRole from './SetUserRole';
import stringToColor from '../../hooks/stringToColor';

const ViewUsers = (props) => {

    const {userList, showSetRole, title, showRemove, removeStudent} = props;
    const [selectUser, setSelectdUser] = useState(null);
    
    const history = useHistory();

    const getRandomColor = (userName) => {
        return stringToColor(userName);
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (e, userId) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setSelectdUser(userId);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Card type="inner" title={title}>
                <List
                    dataSource={userList}
                    renderItem={item => (
                        // <List.Item key={item._id} >
                        <List.Item key={item._id} >
                            <List.Item.Meta 
                                avatar={
                                    <Avatar style={{ backgroundColor: getRandomColor(item.firstName),textTransform: 'uppercase', verticalAlign: 'middle' }} size="large">
                                        {item.firstName.charAt(0)}
                                    </Avatar>
                                }
                                title={`${item.firstName} ${item.lastName}`}
                                description={item.email}

                                />
                                {showSetRole && 
                                    <Button type="primary" onClick={(e) =>showModal(e,item._id)}>הגדרת פרופיל משתמש</Button>
                                }
                                {showRemove && 
                                    <Button type="primary" onClick={()=>removeStudent(item._id)}>הסרה</Button>
                                }
                        </List.Item>
                    )}
                >
                </List>
            </Card>
            
            {isModalVisible && <SetUserRole id={selectUser} handleOk={handleOk} handleCancel={handleCancel}></SetUserRole>}
        </>
    )
}
export default ViewUsers;