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
    const [form] = Form.useForm();

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
        form.submit();
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
        lesson.filesToLesson.push({linkToFile,fileName});
        setLesson({...lesson})
    }

    const addFileToTask = (linkToTask, taskName) => {
        lesson.taskToLesson.push({linkToTask,taskName});
        setLesson({...lesson})
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
            id='lessonDatailsForm'
            onFinishFailed={onFinishFailed}
            form={form}
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
        <UploadFiles actionOnUploadCompleted={addFileToLesson} uploadType='dragger'/>
    );

    const uploadTaskFiles = (
        <UploadFiles actionOnUploadCompleted={addFileToTask}  uploadType='dragger'/>
    )

    return (
        <>

            <Row>
                <Col span={18} offset={3}>
                    <br/>
                    <br/>
                    <Steps current={currentStep}>
                        <Step title="פרטי השיעור" icon={<FormOutlined />}/>
                        <Step title="קבצי השיעור" icon={<DiffOutlined />}/>
                        <Step title="קבצי שיעורי בית" icon={<SnippetsOutlined />}/>
                    </Steps>

                    <br/>


                    <div style={{minHeight:'50%'}}>
                        {currentStep === 0 && LessonDeltailsForm}
                        {currentStep === 1 && uploadLessonFiles}
                        {currentStep === 2 && uploadTaskFiles}
                    </div>

                    <br/>
                    
                    <div className="steps-action" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        {currentStep > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                הקודם
                            </Button>
                        )}
                        {currentStep === 2 && (
                            <Button onClick={save} type='primary'>
                                שמירה
                            </Button>
                        )}
                        {currentStep < 2 && (
                            <Button onClick={() => next()}>
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
