import { message ,Card,List} from 'antd';
import React, { useEffect, useState } from 'react';
import {getAllLessns} from '../../redux/actions/lesson.actions';
import { useHistory} from 'react-router-dom';
import {getLessons} from '../../services/lesson.service';


const EditorialBoard = (props) => {

    const { title } = props;
    const [lessons,setLessons]=useState();
    const history = useHistory();

    useEffect(() => {
        getLessons()
            .then(resopnse => {
                setLessons(resopnse.data);
            })
            .catch(error=> message.error('שגיאה בהצגת השיעורים'));
    }, []);

    const navigate = (lessons) => {
        history.push({
            pathname: `/lessons/${lessons._id}`,
            state: { lessons },
        });
    }

    return (
        <>
         <Card type="inner" title={title}>
                <List
                    dataSource={lessons}
                    renderItem={item => (
                        <List.Item key={item._id} onClick={()=> navigate(item)}>
                            <List.Item.Meta 
                                title={`${item.lessonSubject}`}
                                />
                        </List.Item>
                    )}
                >
                </List>
            </Card>
        </>
    )
}
export default EditorialBoard;