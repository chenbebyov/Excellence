import React from 'react';
import {Card,List, Avatar} from 'antd';
import {useSelector} from 'react-redux';
import { MailOutlined } from '@ant-design/icons';
import Moment from 'moment';


const ListMassage = () => {

    const { user } = useSelector(state => state.userReducer);
    
    return (
        <>
            {/* <Card type="inner"> */}
                <List
                    style={{margin: '25px'}}
                    dataSource={user.messages}
                    itemLayout="horizontal"
                    renderItem={item => (
                        <List.Item key={item._id} style={{padding: '25px' , background:item.isRead? 'white': '#f6f6f6'}}>
                                <List.Item.Meta
                                    avatar={<Avatar icon={<MailOutlined />} />}
                                    title={
                                        <>
                                            <label>הודעה מאת: {`${item.publisher.firstName} ${item.publisher.lastName}`}</label>
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <h3>{item.subject}</h3> 
                                                <label>{Moment(item.dateMessage).format('HH:MM DD/MM/YYYY')}</label>
                                            </div>
                                        </>
                                    }
                                    description={item.messageContent}
                                    style={{width:'100%'}}
                                    />
                                
                                    {/* <label>הודעה מאת: {`${item.publisher.firstName} ${item.publisher.lastName}`}</label>
                                    <h3>{item.subject} {item.dateMessage}</h3>
                                    <div>{item.messageContent}</div>
                                    <div style={{fontSize:'small'}}>{item.publisher}</div> */}
{/*                            
                           <List.Item.Meta 
                                title={<div>{item.subject} {item.dateMessage}</div>}
                                footer={item.publisher}
                                dataSource={item.messageContent}
                                style={ item.isRead ? {background:'gray'} : {background:'white'}}
                                /> */}
                        </List.Item>
                    )}
                >
                </List>
            {/* </Card> */}
        </>
    )
}
export default ListMassage;