import React, { useState }  from 'react';
import { Form, Input, Button, Alert, message } from 'antd';
import CreateGrade from './CreateGrade';
import {useDispatch} from 'react-redux';
import {addLayer} from '../../redux/actions/layer.actions';


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

const CreateLayer = (props) => {

    const {hideCreateLayer} = props;

    // const  { message } = useSelector(state => state.messageReducer);
    const [messageText, setMessageText] = useState();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const dispatch = useDispatch();


    const save = (values) => {
        setLoading(true);
        let {layerName} = values;
        dispatch(addLayer(layerName)).then((response) => {
            setLoading(false);
            if(response.success){
                form.resetFields()
                message.success('layer created sucessfuly');
                hideCreateLayer();
            }
            else {
                setMessageText(response.error.response.data.error);
            }
        }).catch(error => {
            setMessageText('Filed to create layer');
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
        <Form {...layout} form={form} name="Add Layer" initialValues={{ remember: true }} onFinish={save} >
            <Form.Item
                label="Layer Name"
                name="layerName"
                rules={[
                    {
                        required: true,
                        message: 'Please input Layer name !'
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
            <Button type="text" htmlType="submit" onClick={<CreateGrade/>}>Add New Grade</Button>
        </Form>
    </>
)
   
}

export default CreateLayer;








