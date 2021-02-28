import React, { useEffect, useState } from 'react';
import { AutoComplete, Input, Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { getTeachers, getStudents } from '../../services/user.service';
import { message,Button } from 'antd';
import {useSelector} from 'react-redux';
import ViewUsers from '../../components/users/ViewUsers';



const AffiliationToGroup = () => {


    const history = useHistory();
    const { group } = history.location.state;
    const [teacherList, setTeacherList] = useState([]);
    const [studentList, setStudentList] = useState();
    const [groupName, setGroupName] = useState(group.name);
    const [selectedTeacher, setSelectedTeacher] = useState(group.teacherCode);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [currentStudent, setCurrentStudent] = useState(group.teacherCode);
    // const [selectStudent, setSelectStudent] = useState(group.StudentsInTheGroup.studentCode);
    const [teacherDefaultValue, setTeacherDefaultValue] = useState();
    const { layers } = useSelector(state => state.layerReducer);

    useEffect(() => {
        initTeacherList();
        initStudentList();
    }, []);

    const initTeacherList = () => {
        getTeachers().then(resopnse => resopnse.data).then(response => {
            if (response.success) {
                let result = response.data.map(teacher => {
                    if(group.teacherCode && teacher._id === group.teacherCode) {
                        setTeacherDefaultValue(`${teacher.firstName} ${teacher.lastName}`);
                        setSelectedTeacher(teacher._id);
                    }
                    return ({ ...teacher, key:teacher._id, value:`${teacher.firstName} ${teacher.lastName}` })
                })
                setTeacherList(result);
            }
            else {
                message.error('Faild to load teacher list')
            }
            console.log(response);
        }).catch(error => message.error('Faild to load teacher list'));
    }
    const getPicklistItem = (student) => {
        let value = `${student.firstName} ${student.lastName}`;
        return (
            <div value={value}>
                <h3>{value}</h3>
                <label>{student.email}</label>
            </div>
        )
    }
    const initStudentList = () => {
        getStudents().then(resopnse => resopnse.data).then(response => {
            if (response.success) {
                let result = response.data.map(student => 
                    ({...student,
                        key:student._id, 
                        value: `${student.firstName} ${student.lastName}`,
                        label : getPicklistItem(student)
                    }
                ));
                setStudentList(result);
                let studentsIds = group.StudentsInTheGroup.map(studentInGroup => studentInGroup.studentCode);
                let existStudents = result.filter(student => studentsIds.includes(student._id));
                setSelectedStudents(existStudents); 
            }
            
            else {
                message.error('Faild to load teacher list')
            }
            console.log(response);
        }).catch(error => message.error('Faild to load teacher list'));
    }

    const handleSelectTeacher = (value, teacher) => {
        setSelectedTeacher(teacher._id);
    }
    const handleSelectStudent = (value, student) => {
        setCurrentStudent(student);
    }

    const addNewStudentToList = () => {
        setSelectedStudents([...selectedStudents, currentStudent]);
    }

    const filterAutoComplete  = (inputValue, option) => {
        return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }

    const save = () => {
        let data = {
            groupId: group._id,
            name:groupName,
            teacherCode: selectedTeacher,
            StudentsInTheGroup: selectedStudents.map(student => 
                ({studentCode: student._id})
            )
        }
    }

    return (
        <>
            <Form.Item
                label="group name"
                name="group name"
                onChange={(e) => {setGroupName(e.target.value)}}
                rules={[
                    {
                        required: true,
                        message: `Please input group name!`
                    },
                ]}
            >
                <Input defaultValue={groupName}/>
            </Form.Item>
            <label>select teacher</label>
            <AutoComplete
                style={{
                    width: 200,
                }}
                options={teacherList}
                defaultValue={teacherDefaultValue}
                placeholder="teacher name"
                onSelect={handleSelectTeacher}
                filterOption={filterAutoComplete}
            />

            <div>
                <AutoComplete
                    style={{width: 200}}
                    options={studentList}
                    placeholder="add student"
                    onSelect={handleSelectStudent}
                    filterOption={filterAutoComplete}
                />
                <Button onClick={addNewStudentToList}>Add Student</Button>
            </div>

            <ViewUsers userList={selectedStudents} showSetRole={false} />

            <Button onClick={save}>Save Changes</Button>
        </>
    )
}
export default AffiliationToGroup;