import React, { useState, useEffect }  from 'react';
import { Form, Input, Button, Alert, message } from 'antd';
import {useDispatch} from 'react-redux';
import {addLayer, addGrade, addLevel, addGroup, useGetLayerId , useGetGradeId} from '../../redux/actions/layer.actions';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const CreateHierarchy = (props) => {

    const {hideCreateHierarchy , type, layerId, gradeId , levelId} = props;
    const gradeByLevel = useGetGradeId(levelId);
    const layerByGrade = useGetLayerId(gradeByLevel._id);

    // const  { message } = useSelector(state => state.messageReducer);
    const [messageText, setMessageText] = useState();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();


    const dispatch = useDispatch();


    const save = (values) => {
        setLoading(true);
        let {name} = values;
        let func;
        let params;
        switch (type) {
            case 'layer':
                func = addLayer;
                params = name;
                break;
            case 'grade':
                func = addGrade;
                params = {layerId : layerId , gradeName: name };
                break;
            case 'level':
                func = addLevel;
                params = {gradeId: gradeId, levelName: name, layerId: layerByGrade._id };
                break;
            case 'group':
                func = addGroup;
                params = {
                    gradeId: gradeByLevel._id, 
                    groupName: name, 
                    layerId: layerByGrade._id, 
                    levelId: levelId
                };
                break;
        
            default:
                break;
        }
        dispatch(func(params)).then((response) => {
            setLoading(false);
            if(response.success){
                form.resetFields()
                message.success(`${type} created sucessfuly`);
                hideCreateHierarchy();
            }
            else {
                setMessageText(response.error.response.data.error);
            }
        }).catch(error => {
            setMessageText(`Filed to create ${type}`);
        });  
    }

    return (
    <>
        {messageText && <Alert
            message="Error"
            description={messageText}
            type="error"
            showIcon
        />}
        <Form {...layout} form={form} name={`Add ${type}`} initialValues={{ remember: true }} onFinish={save} >
            <Form.Item
                label={`${type} Name`}
                name="name"
                rules={[
                    {
                        required: true,
                        message: `Please input ${type} name !`
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit"  loading={loading}>
                    add
                </Button>
            </Form.Item>
        </Form>
    </>
)
   
}

export default CreateHierarchy;








