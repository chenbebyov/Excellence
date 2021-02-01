import React, { useEffect, useState } from 'react';
import { List, message, Avatar, Spin, Card, Button , Modal} from 'antd';
import { useHistory,Link } from 'react-router-dom';
import SetUserRole from './SetUserRole';

const ViewUsers = (props) => {

    const {userList} = props;
    const history = useHistory();
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

    const navigate = (user) => {
        history.push({
            pathname: `/users/${user._id}`,
            state: { user },
        });
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Card type="inner" title="User List">
            <List
                dataSource={userList}
                renderItem={item => (
                    // <List.Item key={item._id} onClick={()=> navigate(item)}>
                    <List.Item key={item._id}>
                        <List.Item.Meta 
                            avatar={
                                <Avatar style={{ backgroundColor: getRandomColor(),textTransform: 'uppercase', verticalAlign: 'middle' }} size="large">
                                    {item.firstName.charAt(0)}
                                </Avatar>
                            }
                            title={`${item.firstName} ${item.lastName}`}
                            description={item.email}

                            />
                            <Button type="primary" onClick={showModal}>Set User Role</Button>
                            <Modal title="Set Role" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <SetUserRole id={item._id}></SetUserRole>
                            </Modal>
                    </List.Item>
                )}
            >
            </List>
        </Card>
    )
}
export default ViewUsers;