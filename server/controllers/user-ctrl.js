const User = require('../models/user-model');
const Staff = require('../models/staff-model');
const Student = require('../models/student-model');

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Failed to create user, details are empty.',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user.save().then(() => {
            return res.status(200).json({
                success: true,
                user: user,
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

login = async (req, res) => {

    console.log('email' + req.params.email);
    console.log('password' + req.params.password);

    await Student.findOne({ email: req.params.email, password : req.params.password }, (err, student) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        
        if(student)
            return res.status(200).json({ success: true, data: student });

            Staff.findOne({ "email": req.params.email, "password" : req.params.password }, (err, staff) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }

                console.log(staff);
                
                if(staff)
                    return res.status(200).json({ success: true, data: staff });

                else {
                    return res
                        .status(404)
                        .json({ success: false, error: `User not found` })
                }
    
        }).catch(err => console.log(err))

    }).catch(err => console.log(err))
    
}

getStaff = async (req, res) => {
    // console.log(req);
    await Staff.find({}, (err, books) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!books.length) {
            return res
                .status(404)
                .json({ success: false, error: `mmmm` })
        }
        return res.status(200).json({ success: true, data: books })
    }).catch(err => console.log(err))
}

getUsers = async (req, res) => {
    await User.find({}, (err, books) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!books.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: books })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    getUsers,
    login,
    getStaff,
    createStaff
}