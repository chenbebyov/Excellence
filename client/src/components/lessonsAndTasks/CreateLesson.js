import React, {useState} from 'react';
import { Steps, Divider, Form, Input, Button, Upload, message, Row, Col, TreeSelect } from 'antd';
import { SnippetsOutlined, DiffOutlined, FormOutlined} from '@ant-design/icons';
import HierarchySelectTree from '../layers/HierarchySelectTree';
import {addLesson} from '../../services/lesson.service';



import { useDispatch,useSelector } from 'react-redux';
import { createLesson } from '../../redux/actions/lesson.actions';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import '../../css/Lessons.css';
import UploadImageToS3WithReactS3 from './UploadImageToS3WithReactS3';
import UploadFiles from './UploadFiles';
import ViewFile from './ViewFile';
import ViewFileCopy from './ViewFileCopy';
import ViewFileCopy2 from './ViewFileCopy2';

const { SHOW_PARENT } = TreeSelect;


const { Step } = Steps;

const steps = [
    {
      title: 'פרטי השיעור',
      content: 'First-content',
    },
    {
      title: 'קבצי השיעור',
      content: 'Second-content',
    },
    {
      title: 'קבצי שיעורי בית',
      content: 'Last-content',
    },
];

const CreateLesson = () => {

    const dispatch = useDispatch();
    const {layers} = useSelector(store => store.layerReducer);
    const [currentStep, setCurrentStep] = useState(0);
    const [lesson, setLesson] = useState({
        lessonSubject: '',
        filesToLesson: [],
        taskToLesson: []
    });
    const [levelIds, setLevelIds] = useState([]);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const next = () => {
        setCurrentStep(currentStep + 1);
    };
    
    const prev = () => {
        setCurrentStep(currentStep - 1);
    };


    const updateSelectedLevels = (hirarchyIds) => {
        let result = [];
        if(layers != null) {
            layers.forEach(layer => {
                layer.grades.forEach(grade => {
                    grade.levels.forEach(level => {
                        if(hirarchyIds.includes(level._id) || hirarchyIds.includes(grade._id) || hirarchyIds.includes(layer._id)){
                            result.push(level._id);
                        }
                    })
                })
            })
            setLevelIds(result);
        }
    }

    const updateLessonSubject = (e) => {
        setLesson({...lesson, lessonSubject: e.target.value})
    }

    const addFileToLesson = (linkToFile, fileName) => {
        setLesson({...lesson, filesToLesson: [...lesson.filesToLesson, {linkToFile,fileName}]})
    }

    const addFileToTask = (linkToTask, taskName) => {
        setLesson({...lesson, taskToLesson: [...lesson.taskToLesson, {linkToTask,taskName}]})
    }

    const save = () => {
        addLesson(lesson, levelIds)
            .then(response => {
                console.log(response.data);
                message.success('השיעור נוסף בהצלחה');
            })
        .catch(error => {
            message.error('שיעור');
        });
    }


    const LessonDeltailsForm = (
        <Form
            onFinish={save} 
            onFinishFailed={onFinishFailed}
        >
            <label>נושא השיעור:</label>
            <Form.Item
                name="lessonSubject"
                rules={[
                    {
                        required: true,
                        pattern: "(^[a-zA-Z \u0590-\u05fe]+$)",
                        min: 2,
                        message: 'שדה חובה',
                    },
                ]}
            >
                <Input onChange={updateLessonSubject}/>
            </Form.Item>
            <label>בחר לאילו רמות יתווסף השיעור:</label>
            <Form.Item
                name="lessonSubject"
                rules={[
                    {
                        required: true
                    },
                ]}
            >
                <HierarchySelectTree updateHierarchySelection={updateSelectedLevels}/>
            </Form.Item>
            
        </Form>
    );
    

    const uploadLessonFiles = (
        <UploadFiles actionOnUploadCompleted={addFileToLesson}/>
    );

    const uploadTaskFiles = (
        <UploadFiles actionOnUploadCompleted={addFileToTask}/>
    )

    return (
        <>
        <br/>
        <br/>
            <Row>
                <Col span={12} offset={6}>
                    <Steps current={currentStep}>
                        <Step title="פרטי השיעור" icon={<FormOutlined />}/>
                        <Step title="קבצי השיעור" icon={<DiffOutlined />}/>
                        <Step title="קבצי שיעורי בית" icon={<SnippetsOutlined />}/>
                    </Steps>

                    {currentStep === 0 && LessonDeltailsForm}
                    {currentStep === 1 && uploadLessonFiles}
                    {currentStep === 2 && uploadTaskFiles}
                    
                    <div className="steps-action">
                        {currentStep > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                הקודם
                            </Button>
                        )}
                        {currentStep === 2 && (
                            <Button type="primary" onClick={save}>
                                שמירה
                            </Button>
                        )}
                        {currentStep < 2 && (
                            <Button type="primary" onClick={() => next()}>
                                הבא
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
        </>
    )

}

export default CreateLesson;
