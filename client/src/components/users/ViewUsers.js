import React, { useEffect, useState } from 'react';
import { List, message, Avatar, Spin, Card } from 'antd';
import { useHistory,Link } from 'react-router-dom';


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

    return (
        <Card type="inner" title="User List">
            <List
                dataSource={userList}
                renderItem={item => (
                    <List.Item key={item._id} onClick={()=> navigate(item)}>
                        <List.Item.Meta 
                            avatar={
                                <Avatar style={{ backgroundColor: getRandomColor(),textTransform: 'uppercase', verticalAlign: 'middle' }} size="large">
                                    {item.firstName.charAt(0)}
                                </Avatar>
                            }
                            title={`${item.firstName} ${item.lastName}`}
                            description={item.email}
                            />
                    </List.Item>
                )}
            >
            </List>
        </Card>
    )
}
export default ViewUsers;