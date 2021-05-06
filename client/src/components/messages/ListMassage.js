import React from 'react';
import {Card,List} from 'antd';
import {useSelector} from 'react-redux';
import { MailOutlined } from '@ant-design/icons';

const ListMassage = () => {

    const { user } = useSelector(state => state.userReducer);
    
    return (
        <>
            <Card type="inner">
                <List
                    dataSource={user.messages}
                    renderItem={item => (
                        <List.Item key={item._id} >
                           <MailOutlined /><List.Item.Meta 
                                header={`${item.subject}  ${item.dateMessage}`}
                                footer={item.publisher}
                                dataSource={item.messageContent}
                                style={ item.isRead ? {background:'gray'} : {background:'white'}}
                                />
                        </List.Item>
                    )}
                >
                </List>
            </Card>
            
        </>
    )
}
export default ListMassage;