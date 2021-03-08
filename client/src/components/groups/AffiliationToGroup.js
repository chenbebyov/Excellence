import React, { useEffect, useState } from 'react';
import { AutoComplete, Input, Form, Tabs, Drawer ,message,Button, Card } from 'antd';
import { useHistory } from 'react-router-dom';
import { getTeachers, getStudents } from '../../services/user.service';
import {useSelector, useDispatch} from 'react-redux';
import {updateGroup} from '../../redux/actions/layer.actions';
import ViewUsers from '../../components/users/ViewUsers';
import GroupDetails from './GroupDetails';



const AffiliationToGroup = (props) => {

    const {mode} = props;
    const history = useHistory();
    const [group, setGroup] = useState(history.location.state.hierarchyItem);
    const [teacherList, setTeacherList] = useState([]);
    const [studentList, setStudentList] = useState();
    const [groupName, setGroupName] = useState(group.name);
    const [selectedTeacher, setSelectedTeacher] = useState(group.teacherCode);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [currentStudent, setCurrentStudent] = useState(null);
    // const [selectStudent, setSelectStudent] = useState(group.StudentsInTheGroup.studentCode);
    const [teacherDefaultValue, setTeacherDefaultValue] = useState();
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState(mode);
    // const { layers } = useSelector(state => state.layerReducer);

    const dispatch = useDispatch();



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
                debugger
                let result = response.data.map(student => 
                    ({...student,
                        key:student._id, 
                        value: `${student.firstName} ${student.lastName}`,
                        label : getPicklistItem(student)
                    }
                ));
                let studentsIds = group.StudentsInTheGroup.map(studentInGroup => studentInGroup.studentCode);
                let existStudents = result.filter(student => studentsIds.includes(student._id));
                let notExistStudents = result.filter(student => !studentsIds.includes(student._id));
                setStudentList(notExistStudents);
                setSelectedStudents(existStudents); 
            }
            
            else {
                message.error('Faild to load student list')
            }
            console.log(response);
        }).catch(error => message.error('Faild to load student list'));
    }

    const handleSelectTeacher = (value, teacher) => {
        setSelectedTeacher(teacher._id);
        setTeacherDefaultValue(`${teacher.firstName} ${teacher.lastName}`)
    }
    const handleSelectStudent = (value, student) => {
        setCurrentStudent(student);
    }

    const addNewStudentToList = (event) => {
        setSelectedStudents([...selectedStudents, currentStudent]);
        let students = studentList.filter(student => student._id !== currentStudent._id);
        setStudentList(students);
        setCurrentStudent(null)
    }

    const filterAutoComplete  = (inputValue, option) => {
        return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }

    const save = () => {
        setLoading(true);
        let data = {
            groupId: group._id,
            name:groupName,
            teacherCode: selectedTeacher,
            StudentsInTheGroup: selectedStudents.map(student => 
                ({studentCode: student._id})
            )
        }

        dispatch(updateGroup(data)).then((response) => {
            setLoading(false);
            if(response.success){
                debugger
                setGroup(response.group);
                message.success(`group updated sucessfuly`);
            }
            setViewMode('read');
        }).catch(error => {
            message.error(`Filed to update group`);
        });  
    }
    const removeStudent = (studentId) => {
        let student = selectedStudents.find(student => student._id === studentId);
        let selectedList = selectedStudents.filter(student => student._id !== studentId)
        setSelectedStudents(selectedList);
        setStudentList([...studentList, student]);
    }

    const editGroup = () => {
        setViewMode('edit');
    }

    const style = {
        display : "flex",
        justifyContent: "space-between"
    }
    const style2 = {
        width: "-webkit-fill-available"
    }

    const openLessonTimes = () => {

    }

    return (
        <div style={style}>
            <div style={style2}>
                {viewMode === 'edit' && 
                    <>
                        <Form
                            layout="vertical"
                        >
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
                            <Form.Item label="teacher name" name="teacher name">     
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
                            </Form.Item>

                            <Form.Item label="add a new student" name="add a new student"> 
                            <AutoComplete
                                style={{width: 200}}
                                options={studentList}
                                placeholder="add student"
                                onSelect={handleSelectStudent}
                                filterOption={filterAutoComplete}
                                notFoundContent="No student found"
                                value={currentStudent !== null? `${currentStudent.firstName} ${currentStudent.lastName}` : ""}
                            />
                            <Button onClick={addNewStudentToList}>Add Student</Button>
                            </Form.Item>
                        <div>
                        </div>

                        </Form>
                        <ViewUsers 
                            title="Student In Group:" 
                            userList={selectedStudents} 
                            showSetRole={false}
                            showRemove={true}
                            removeStudent={removeStudent}
                        /> 
                    </>
                }
                    
                {viewMode === 'read' &&
                    <GroupDetails 
                        group={group} 
                        teacherName={teacherDefaultValue} 
                        studentsInGroup={selectedStudents}
                    />
                }
          
            </div>
            <div>
                {viewMode === 'edit' && <Button loading={loading} onClick={save}>Save Changes</Button>}
                {viewMode === 'read' && 
                    <>
                        <Button loading={loading} onClick={openLessonTimes}>Set Lessons Times</Button>
                        <Button loading={loading} onClick={editGroup}>Edit</Button>
                    </>
                }
                
            </div>

        </div>
    )
}
export default AffiliationToGroup;