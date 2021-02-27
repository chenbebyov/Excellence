import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import Form from 'antd/lib/form/Form';
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
    const initStudentList = () => {
        getStudents().then(resopnse => resopnse.data).then(response => {
            if (response.success) {
                let result = response.data.map(student => ({...student,key:student._id, value:`${student.firstName} ${student.lastName}`}))
                setStudentList(result);
                //TODO: selectedStudents = group.student
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
        let students = selectedStudents;
        students.push(currentStudent);
        setSelectedStudents(students);
    }

    // {groupId: '', teacherCode: '', studentsIds:[]}


    return (
        <>
            <label>select teacher</label>
            <AutoComplete
                style={{
                    width: 200,
                }}
                options={teacherList}
                defaultValue={teacherDefaultValue}
                placeholder="teacher name"
                onSelect={handleSelectTeacher}
                filterOption={(inputValue, option) => 
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />

            <div>
                <AutoComplete
                    style={{
                        width: 200,
                    }}
                    options={studentList}
                    placeholder="add student"
                    onSelect={handleSelectStudent}
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
                <Button onClick={addNewStudentToList}>Add Student</Button>
            </div>

            <ViewUsers userList={selectedStudents} showSetRole={false} />
        </>
    )
}
export default AffiliationToGroup;