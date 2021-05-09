import React, { useEffect, useState } from "react";
import { PageHeader, Form, Button, Input, message} from 'antd';
import { useSelector } from "react-redux";
import {createMessage} from '../../services/user.service';
import { MessageOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';




const { TextArea } = Input;


const AddMessage = (props) => {

    const {fromRoute, navigateAfterSave} = props;
    const history = useHistory();
    const {toUsers, sentToAlias = 'משתמש'} = fromRoute ? history.location.state : props;
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
            close()
        }).catch(e=> {
            setLoading(false);
            message.error('ההודעה לא נשלחה, נסה שנית')
        });

    }
    
    const close = () => {
        if(fromRoute) {
            history.goBack();
        }
        else {
            navigateAfterSave();
        }
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
                <Button onClick={close} style={{ marginRight: 8 }}>
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