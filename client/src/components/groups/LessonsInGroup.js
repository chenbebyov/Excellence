import React, {useEffect, useState} from 'react';
import { List, message, Steps, Divider, Popover } from 'antd';
import {getLessons} from '../../services/lesson.service';

const { Step } = Steps;


const LessonsInGroup = (props) => {

    const {group} = props;
    const [groupLessons, setGroupLessons] = useState([]);

    useEffect(() => {
        initLessons();
    }, []);

    const initLessons = () => {
        getLessons().then(response => {
            debugger
            if (response.success) {
                debugger
                // var lessonsMap = Object.assign({}, ...group.lessons.map(lesson => ({[lesson.Code]: lesson})));
                let lessonsMap = Object.assign({}, ...response.data.map(lesson => ({[lesson._id]: lesson})));
                let result = group.lessons.map(lesson => ({...lesson, lessonObject: lessonsMap[lesson.Code]}));;
                
                // let result = response.data.map(lesson => {
                //         if(lessonsMap[lesson._id] !== undefined) {
                //             lessonsMap[lesson._id] = Object.assign({}, lessonsMap[lesson._id], { lessonObject: lesson })
                //         }
                //     }
                // );
                setGroupLessons(Object.values(result));
            }
            else {
                message.error('Faild to load teacher list')
            }
            console.log(response);
        }).catch(error => message.error('Faild to load teacher list'));
    }

    const customDot = (dot, { status, index }) => (
        <Popover
          content={
            <span>
              step {index} status: {status}
            </span>
          }
        >
          {dot}
        </Popover>
      );

    const getFilteredLessons = () => {
        return groupLessons.sort((a, b) => new Date(a.fromDateTime) - new Date(b.fromDateTime))
    }

    return (
        <>
        {/* <List
                dataSource={groupLessons}
                renderItem={item => (
                    // <List.Item key={item._id} onClick={()=> navigate(item)}>
                    <List.Item key={item._id}>
                        <List.Item.Meta 
                            title={`${item.lessonObject.lessonSubject}`}
                            description={item.fromDateTime}

                            />
                    </List.Item>
                )}
            >
        </List> */}

                {groupLessons.length && 
                    <Steps progressDot={customDot} current={1} direction="vertical">
                
                        {getFilteredLessons().map(lesson => 
                            <Step key={lesson._id} title={lesson.lessonObject.lessonSubject} 
                                  description={lesson.fromDateTime}
                            />
                        )}
                    </Steps>
                }  
        </>
    )
}

export default LessonsInGroup;