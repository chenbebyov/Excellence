import React, { useEffect, useState } from "react";
import { PageHeader, Form, Button, Input, message} from 'antd';
import { useSelector } from "react-redux";
import {createMessage} from '../../services/user.service';
import { MessageOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';




const { TextArea } = Input;


const AddMessage = (props) => {

    const history = useHistory();
    const {toUsers, sentToAlias = 'משתמש'} = history.location.state;
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(state => state.userReducer);


    const save = ({subject,messageContent}) => {
        setLoading(true);
        debugger
        let newMessage = {
            subject,
            messageContent,
            publisher: user.userId
        }

        createMessage(newMessage, toUsers).then(response => {
            message.success('ההודעה נשלחה');
            debugger
            setLoading(false);
            history.goBack();
        }).catch(e=> {
            setLoading(false);
            message.error('ההודעה לא נשלחה, נסה שנית')
        });

    }
    
    const onClose = () => {

    }

    return (
        <>
        <PageHeader
            className="site-page-header"
            title={`שליחת הודעה ל${sentToAlias}`}
            backIcon={<MessageOutlined />}
            onBack={()=>null}
        />
        <br/>
            <Form id="newBorrowForm" layout="vertical" onFinish={save}>

            <Form.Item
                name="subject"
                label="נושא"
                rules={[{ required: true, message: 'יש לציין את נושא ההודעה' }]}
            >
                <Input placeholder="נושא ההודעה" />
            </Form.Item>

            <Form.Item 
                name="messageContent"
                label="תוכן ההודעה"
                rules={[{ required: true, message: 'יש לציין את תוכן ההודעה' }]}
            > 
                <TextArea rows={5} placeholder="תוכן ההודעה"/>
            </Form.Item>

            <Form.Item>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                    ביטול
            </Button>
                <Button loading={loading} type="primary" htmlType="submit">
                    שליחה
            </Button>
            </Form.Item>
            </Form>
        </>
    )
}

export default AddMessage;