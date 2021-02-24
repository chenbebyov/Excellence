import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import Form from 'antd/lib/form/Form';
import { useHistory } from 'react-router-dom';
import { getTeachers } from '../../services/user.service';
import { message } from 'antd';
import {useSelector} from 'react-redux';



const AffiliationToGroup = () => {


    const history = useHistory();
    const { group } = history.location.state;
    const [options, setOptions] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(group.teacherCode);
    // const [selectStudent, setSelectStudent] = useState(group.StudentsInTheGroup.studentCode);
    const [defaultValue, setDefaultValue] = useState();
    const { layers } = useSelector(state => state.layerReducer);

    useEffect(() => {
        getTeachers().then(resopnse => resopnse.data).then(response => {
            if (response.success) {
                let result = response.data.map(teacher => {
                    if(group.teacherCode && teacher._id === group.teacherCode) {
                        setDefaultValue(`${teacher.firstName} ${teacher.lastName}`);
                        setSelectedTeacher(teacher._id);
                    }
                    return ({ ...teacher, key:teacher._id, value:`${teacher.firstName} ${teacher.lastName}` })
                })
                setOptions(result);
            }
            else {
                message.error('Faild to load teacher list')
            }
            console.log(response);
        }).catch(error => message.error('Faild to load teacher list'));

    }, []);

    const handleSelectTeacher = (value, teacher) => {
        setSelectedTeacher(teacher._id);
    }


    return (
        <>
            <label>select teacher</label>
            <AutoComplete
                style={{
                    width: 200,
                }}
                options={options}
                defaultValue={defaultValue}
                placeholder="teacher name"
                onSelect={handleSelectTeacher}
                filterOption={(inputValue, option) => 
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />
        </>
    )
}
export default AffiliationToGroup;