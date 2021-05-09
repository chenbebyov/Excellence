import React, {useEffect, useState} from 'react';
import { List, message, Steps, Divider, Popover } from 'antd';
import {getLessons} from '../../services/lesson.service';
import moment from 'moment';
import { useHistory } from 'react-router';

const { Step } = Steps;


const LessonsInGroup = (props) => {

    const {lessons} = props;
    const [groupLessons, setGroupLessons] = useState([]);
    const [currentLessonIndex, setCurrentLessonIndex] = useState();
    const history = useHistory();

    useEffect(() => {
        initLessons();
    }, [lessons]);
    
    
    useEffect(() => {
        let index = groupLessons.findIndex(lesson => new Date(lesson.fromDateTime) > new Date());
        setCurrentLessonIndex(index);
        // groupLessons.forEach((lesson, index) => {
        //     if(new Date(lesson.fromDateTime) > new Date()){
        //         setCurrentLessonIndex(index);
        //         return;
        //     }
        // });
    }, [groupLessons]);

    const initLessons = () => {
        getLessons().then(response => {

            if (response.success) {
                let lessonsMap = Object.assign({}, ...response.data.map(lesson => ({[lesson._id]: lesson})));
                let result = Object.values(lessons.map(lesson => ({...lesson, lessonObject: lessonsMap[lesson.lessonId]})));
                let filterdList = result.sort((a, b) => new Date(a.fromDateTime) - new Date(b.fromDateTime))
                setGroupLessons(filterdList);
            }
            else {
                message.error('Faild to load lessons list')
            }
            console.log(response);
        })
        .catch(error => message.error('Faild to load lessons list'));
    }

    const viewLesssonDetails = (lesson) => {
        history.push({
            pathname: `/lessons/lesson/${lesson._id}`,
            state: { lesson },
        });
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


    return (
        <>
            {groupLessons.length && 
                <Steps progressDot={customDot} current={currentLessonIndex} direction="vertical">
            
                    {groupLessons.map(lesson => 
                        <Step 
                            key={lesson._id} 
                            title={lesson.lessonObject.lessonSubject} 
                            description={
                                <>
                                    <div>{moment(lesson.fromDateTime).format('DD/MM/YYYY')}</div>
                                    <div>{lesson.comments}</div>
                                    <a>פרטי השיעור</a>
                                </>
                            }
                            onClick={()=>viewLesssonDetails(lesson.lessonObject)}
                            style={{cursor: 'pointer'}}
                        />
                    )}
                </Steps>
            }  
        </>
    )
}

export default LessonsInGroup;