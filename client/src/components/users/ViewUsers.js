import React, { useEffect, useState } from 'react';
import { List, message, Avatar, Spin, Card, Button , Modal} from 'antd';
import { useHistory,Link } from 'react-router-dom';
import SetUserRole from './SetUserRole';
import stringToColor from '../../hooks/stringToColor';

const ViewUsers = (props) => {

    const {userList, showSetRole, title, showRemove, removeStudent} = props;
    const [selectUser, setSelectdUser] = useState(null);
    
    const history = useHistory();

    function getRandomColor(userName) {
        return stringToColor(userName);
    }

    function navigate(user) {
        history.push({
            pathname: `/users/${user._id}`,
            state: { user },
        });
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
                        // <List.Item key={item._id} onClick={()=> navigate(item)}>
                        <List.Item key={item._id}>
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
                                    <Button type="primary" onClick={(e) =>showModal(e,item._id)}>Set User Role</Button>
                                }
                                {showRemove && 
                                    <Button type="primary" onClick={()=>removeStudent(item._id)}>Remove Student</Button>
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