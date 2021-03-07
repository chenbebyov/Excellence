import React, { useState, useEffect } from "react";
import { Form, Input, Button,Space, DatePicker,TimePicker, message,Checkbox,AutoComplete } from 'antd';
import {getLessons} from '../../services/lesson.service';
import {updateLessonsInGroup} from '../../redux/actions/layer.actions';
import {useDispatch} from 'react-redux';
import moment from 'moment';


const { RangePicker } = DatePicker;

const AddLessonsToGroup = (props) => {
    const {groupId, setViewDrawer} = props;
    const [startDate, setStartDate] = useState();
    // const [startDate, setStartDate] = useState();
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState();
    const format = 'HH:mm';

    const dispatch = useDispatch();

    useEffect(() => {
        initLessons();
    }, []);

    const initLessons = () => {
        getLessons().then(response => {
            debugger
            if (response.success) {
                debugger
                let result = response.data.map(lesson => 
                    ({...lesson,
                        key:lesson._id, 
                        value: lesson.lessonSubject,
                        label : lesson.lessonSubject
                    }
                ));
                setLessons(result);
            }
            else {
                message.error('Faild to load teacher list')
            }
            console.log(response);
        }).catch(error => message.error('Faild to load teacher list'));
    }


    const handleSatartDateChanged = (date, dateString) => {
        setStartDate(date);
    }

    // Code: { type: ObjectId, required: true },
    // remarks: { type: String, required: false },
    // // date: { type: Date, required: true },
    // comments: { type: Date, required: true },
    // toAnHour: { type: Date, required: true },
    // comments: { type: String, required: false },

    const filterAutoComplete = (inputValue, option) => {
        return option.lessonSubject.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1  
    }

    const save = (values) => {
        console.log('Success:', values); 
        let lesson = {
            Code: selectedLesson._id,
            fromDateTime:values["lesson time"][0],
            toDateTime:values["lesson time"][1],
            comments: values["comments"]
        }
        let data = {groupId: groupId, lessons: [lesson]};
        dispatch(updateLessonsInGroup(data)).then(res => {
            debugger;
            if(res.success){
                message.success("lesson created successfuly")
                setViewDrawer(false);
            }
        });
    }

    const handleCancel = () => {
        console.log("cancel");
    }

    const handleSelectLesson = (value, lesson) => {
        setSelectedLesson(lesson);
    }

    const style = { 
        display: "grid"
    }
    return (
        <>
        <Space>
        <Form layout="vertical" style={style} initialValues={{ remember: true }} onFinish={save}>
            {/* <Form.Item 
                label="lesson date" 
                name="lesson date"
                rules={[
                    {
                        required: true,
                        message: 'please select lesson date!'                    },
                ]}
            >
                <DatePicker placeholder="select date" onChange={handleSatartDateChanged} />
            </Form.Item> */}
            <Form.Item 
                label="lesson time" 
                name="lesson time"
                rules={[
                    {
                        required: true,
                        message: 'please set lesson hours!'                    },
                ]}
            >
                <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    showTime
                    format="YYYY/MM/DD HH:mm"
                />

            </Form.Item>
            <Form.Item 
                label="select lesson" 
                name="select lesson" 
                rules={[
                    {
                        required: true,
                        message: 'please select lesson!'                    },
                ]}
            
            >     
                <AutoComplete
                    style={{
                        width: 200,
                    }}
                    options={lessons}
                    placeholder="select lesson"
                    onSelect={handleSelectLesson}
                    filterOption={filterAutoComplete}
                />
            </Form.Item>
            <Form.Item
                    label="comments"
                    name="comments"
                >
                    <Input />
            </Form.Item>
            <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <Button type="default" htmlType="button" onClick={handleCancel}>
                        Cancel
                    </Button>
            </Form.Item>
        </Form>
        </Space>
            
        </>
    );
}

export default AddLessonsToGroup;