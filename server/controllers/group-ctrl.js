const Group = require('../models/group-model');
const Staff = require('../models/staff-model');
const Student = require('../models/student-model');
const ObjectId = require('mongoose/lib/types/objectid');


updateGroup = (req, res) => {
    const body = req.body;

    if (!body || !body.groupId) {
        return res.status(400).json({
            success: false,
            error: 'Failed to update group, details are empty.',
        })
    }

    let {groupId, name, teacherCode, StudentsInTheGroup, lesson} = body;

    Group.findById(groupId).then(group => {

        if (group) {
            group.name = name;
            group.teacherCode = teacherCode;
            group.StudentsInTheGroup = StudentsInTheGroup;
            group.save().then(() => {
                return res.status(200).json({
                    success: true,
                    group: group,
                    message: 'group updated!',
                })
            }).catch(error => {
                return res.status(400).json({
                    error,
                    message: 'group not updated!',
                })
            });
        }

    }).catch(err => res.status(400).json({ success: false, error: err }));
}

updateGroupLessons = (req, res) => {
    const body = req.body;

    if (!body || !body.groupId || !body.lessons) {
        return res.status(400).json({
            success: false,
            error: 'Failed to update lessons, details are empty.',
        })
    }

    let {groupId, lessons} = body;

    Group.findById(groupId).then(group => {

        if (group) {
            lessons.forEach(lesson=>{
                if(lesson._id === undefined){
                    if(group.lessons === undefined){
                        group.lessonss = [];
                    }
                    group.lessons.push(lesson);
                }
                else {
                    let lessonToUpdate = group.lessons.find(item => item._id === lesson._id);
                    lessonToUpdate.lessonId = lesson.lessonId;
                    lessonToUpdate.fromDateTime = lesson.fromDateTime;
                    lessonToUpdate.toDateTime = lesson.toDateTime;
                    lessonToUpdate.comments = lesson.comments;
                }
            })
            group.save().then(() => {
                return res.status(200).json({
                    success: true,
                    group: group,
                    message: 'group updated!',
                })
            }).catch(error => {
                return res.status(400).json({
                    error,
                    message: 'group not updated!',
                })
            });
        }

    }).catch(err => res.status(400).json({ success: false, error: err }));
}

async function getLessons(req, res){

    try {

        if (req.params.userId === 'undefined') {
            return res.status(400).json({
                success: false,
                error: 'missing paramas, can not retrieve lessons data.',
            })
        }

        let {groupId, userId, getAll} = req.params;
        getAll = getAll == 'true';
        let lessonsResult = [];
        let group;
        let adminRoles = ['admin','secretary'];


        let staff = await Staff.findById(userId);
        let student = await Student.findById(userId);

        if(!staff && !student) {
            return res.status(400).json({
                success: false,
                error: 'user id not found',
            })
        }

        //if group Id is not null get lessons by group id according to user permissions
        if(groupId != 'undefined') {

            group = await Group.findById(groupId).populate('lessons.lessonId').exec();
            
            if(student != null){
                let isStudentExistInGroup = group.StudentsInTheGroup.find(
                    item => item.studentCode === student._id
                );

                if(isStudentExistInGroup){
                    let result = group.lessons.map(less => ({...(less.toObject()), groupName: group.name}))
                    lessonsResult.push(result);
                }
            }
            else {
                if(group.teacherCode == staff._id || adminRoles.includes(staff.role)){
                    let result = group.lessons.map(less => ({...(less.toObject()), groupName: group.name}))
                    lessonsResult.push(result);
                }
            }
        }
        //when group id is null
        else {
            // for admin users if getAll is true - returns lessons of all groups
            let relevantGroups;
            if(getAll  && staff && adminRoles.includes(staff.role)) {
                relevantGroups = await Group.find({}).populate('lessons.lessonId').exec();
            }
            //else gets all lessons attached to user id
            else {
                relevantGroups = await Group.find({}).or([
                    { teacherCode: userId},
                    { 'StudentsInTheGroup.studentCode': { "$in" : [ ObjectId(userId)]}}
                ]).populate('lessons.lessonId').exec();
            }

            relevantGroups.forEach(group => {
                if(group.lessons.length){
                    // if(group.lessons.length) {
                        let result = group.lessons.map(less => ({...(less.toObject()), groupName: group.name}))
                        lessonsResult.push(...result);
                    // }
                }
            })
        } 

        return res.status(200).json({
            success: true,
            lessons: lessonsResult
        })
    }
    catch(ex) {
        console.log(ex);
        return res.status(500).json({
            success: false,
            message: 'internal server error, can not get lessons.'
        })
    }
}

async function getUserGroups(req, res) {

    try {
        let {userId} = req.params.userId;

        if (userId === 'undefined') {
            return res.status(400).json({
                success: false,
                error: 'missing paramas, can not retrieve lessons data.',
            })
        }
        let adminRoles = ['admin','secretary'];
        let groupsResult;

        let staff = await Staff.findById(userId);
        if(staff!=null && adminRoles.includes(staff.role)) {
            groupsResult = await Group.find({});
        }
        else {
            groupsResult = await Group.find({}).or([
                { teacherCode: userId},
                { 'StudentsInTheGroup.studentCode': { "$in" : [ ObjectId(userId)]}}
            ]).populate('lessons.lessonId').exec();
        }

        return res.status(200).json({
            success: true,
            groups: groupsResult
        })
    }
    catch(ex) {
        console.log(ex);
        return res.status(500).json({
            success: false,
            message: 'internal server error, can not get groups.'
        })
    }
}



module.exports = {
    updateGroup,
    updateGroupLessons,
    getLessons,
    getUserGroups
}