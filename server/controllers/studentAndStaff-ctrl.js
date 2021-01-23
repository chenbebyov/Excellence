const Staff = require('../models/staff-model');
const Student = require('../models/student-model');
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


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

createStudent = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Failed to create user, details are empty.',
        })
    }

    const student = new Student(body)

    if (!student) {
        return res.status(400).json({ success: false, error: student })
    }

    student.save().then(() => {
            return res.status(200).json({
                success: true,
                student: student,
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
    createStudent,
    getStudent,
    getStaff,
    createStaff
}