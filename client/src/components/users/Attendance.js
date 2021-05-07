import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { message, Checkbox, Form, Input, Button } from 'antd';
import {setAttendance} from '../../services/user.service'
import moment from 'moment';
import '../../css/Attendance.css';

 
const Attendance = (props) => {

    const {studentsInGroup} = props;
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(true);

    const save=(values)=>{
        debugger
        setLoading(true);
        setEditable(false);
        let attendence =  Object.entries(values).map(item => ({studentId: item[0], present: !!item[1]}));

        setAttendance(attendence).then(response => {
            message.success('עודכן בהצלחה!')
        })
        .catch(error => {
            setEditable(true);
            message.error('שגיאה, נסה שנית');
        })
    }
     return (

         <>
         <h3>{`סימון נוכחות לתאריך ${moment(new Date()).format('DD/MM/YYYY')}`}</h3>
         <br/>
         <Form
            onFinish={save}
        >
            {studentsInGroup.map(student => 
                <Form.Item key={student._id} name={student._id} valuePropName="checked">
                  <Checkbox disabled={!editable}>{`${student.firstName} ${student.lastName}`}</Checkbox>
                </Form.Item>
            )}
            {editable && 
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                    שמירה
                    </Button>
                </Form.Item>
            }
        </Form>
             
         </>
     )
 }
export default Attendance;