import React, {useEffect, useState} from 'react';
import { List, message } from 'antd';
import {getLessons} from '../../services/lesson.service';


const LessonInGroup = (props) => {

    const {group} = props;
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        initLessons();
    }, []);

    const initLessons = () => {
        getLessons().then(response => {
            debugger
            if (response.success) {
                debugger
                var lessonsMap = new Map(group.lessons.map(lesson => [lesson.Code, lesson]));
                let result = response.data.map(lesson => {
                        if(lessonsMap.get(lesson._id) !== undefined) {
                            lessonsMap.set(lesson._id, {...lesson, name: lesson.lessonSubject});
                        }
                    }
                );
                setLessons(result);
            }
            else {
                message.error('Faild to load teacher list')
            }
            console.log(response);
        }).catch(error => message.error('Faild to load teacher list'));
    }

    return (
        <List
                dataSource={lessons}
                renderItem={item => (
                    // <List.Item key={item._id} onClick={()=> navigate(item)}>
                    <List.Item key={item._id}>
                        <List.Item.Meta 
                            title={`${item.lessonSubject}`}
                            description={item.fromDateTime}

                            />
                    </List.Item>
                )}
            >
        </List>
    )
}

export default LessonInGroup;