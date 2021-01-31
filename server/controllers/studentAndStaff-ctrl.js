const Staff = require('../models/staff-model');
const Student = require('../models/student-model');
const { getUserById } = require('../controllers/user-ctrl');
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var generator = require('generate-password');


setUserRole = (req, res) => {
    const { body } = req;
    
    if(!body){
        return res.status(400).json({
            success: false,
            error: 'Failed to set user role, details are empty.',
        })
    }

    const { role , userId } = body;

    getUserById(userId).then(user => {

        if(!user){
            return res
            .status(404)
            .json({ success: false, error: `User not found` })
        }

        if(role == 'student') {
            createStudent(user).then(student => {
                return res.status(200).json({
                    success: true,
                    student: student,
                    message: 'student created!',
                })
            })
        }
        else {
            createStaff(user).then(staff => {
                return res.status(200).json({
                    success: true,
                    staff: staff,
                    message: 'staff created!',
                })
            })
        }


    }).catch(err => res.status(400).json({ success: false, error: 'user id not found' }));
}

createStaff = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Failed to create user, details are empty.',
        })
    }

    const staff = new Staff(body)

    if (!staff) {
        return res.status(400).json({ success: false, error: staff })
    }

    staff.save().then(() => {
            return res.status(200).json({
                success: true,
                staff: staff,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
        })
    })
}

getRandomPassword = () => {
    return generator.generate({
        length: 10,
        numbers: true
    });
}

createStudent = (user) => {

    const student = new Student();
    student.email = user.email;
    student.firstName = user.firstName;
    student.lastName = user.lastName;
    student.password = getRandomPassword();
    student.userId = user._id;
    return student.save();
};


getStudent = async (req, res) => {
    await Student.find({}, (err, student) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!student.length) {
            return res
                .status(404)
                .json({ success: false, error: `mmmm` })
        }
        return res.status(200).json({ success: true, data: student })
    }).catch(err => console.log(err))
}

getStaff = async (req, res) => {
    await Staff.find({}, (err, staff) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!staff.length) {
            return res
                .status(404)
                .json({ success: false, error: `mmmm` })
        }
        return res.status(200).json({ success: true, data: staff })
    }).catch(err => console.log(err))
}



module.exports = {
    getStudent,
    getStaff,
    setUserRole
}