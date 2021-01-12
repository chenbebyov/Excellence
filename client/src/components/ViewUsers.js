import React, { useEffect, useState } from 'react';
import { List, message, Avatar, Spin, Card } from 'antd';


const ViewUsers = (props) => {

    const {userList} = props;

    return (
        // <div>
        //     <ul>
        //     {userList.map((user, index) => 
        //        <li key={index}>{user.firstName} {user.lastName}</li>
        //     )}
        //     </ul>
        // </div>
        <Card type="inner" title="User List">
            <List
                dataSource={userList}
                renderItem={item => (
                    <List.Item key={item._id}>
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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