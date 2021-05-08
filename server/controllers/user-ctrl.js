const User = require('../models/user-model');
const Staff = require('../models/staff-model');
const Student = require('../models/student-model');
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const Layer = require('../models/layer-model');
const sendEmail = require('../general/emails-ctrl');
const {getRegisteredMessage} = require('../general/email-templates');
const { ObjectId } = require('mongodb');



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
            console.log(user._id);
            let template = getRegisteredMessage(user.firstName);
            console.log(template);
            sendEmail(user.email, 'רישום ל Excellence', template, false);
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


getAccessToken = (userId) => {

    return jwt.sign({ id: userId }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
}

login = async (req, res) => {

    await Student.findOne({ email: req.params.email, password : req.params.password }).populate('messages.publisher').lean().exec((err, student) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        
        if(student){
            let token = getAccessToken(student._id);
            return res.status(200).json({ 
                success: true, 
                data: {user: {...student, role: 'student'}, accessToken : token }
            });
        }

        Staff.findOne({"email": req.params.email, "password" : req.params.password }).populate('messages.publisher').lean().exec((err, staff) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            
            if(staff){
                let token = getAccessToken(staff._id);
                return res.status(200).json({ 
                    success: true, 
                    data: {user: staff, accessToken : token }
                });
            }
            else {
                return res.status(404).json({ success: false, error: `User not found` });
            }
        });
    });
    
}

getUsers = async (req, res) => {
    console.log(req.headers);
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

getUserById = ( id ) => {
    return User.findOne({_id : id })
}

getUser = async (req, res) => {
    getUserById(req.params.id).then(user => {
        console.log(user);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
        
    }).catch(err => res.status(400).json({ success: false, error: err }));
}

getTeachers = (req, res) => {
    Staff.find({role: 'teacher'}, (err, teachers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!teachers.length) {
            return res
                .status(404)
                .json({ success: false, error: `There are no teachers` })
        }
        return res.status(200).json({ success: true, data: teachers })
    })
    .catch(err => console.log(err));
}

getStudents = async (req, res) => {

    try{
        const students = await Student.find({}).populate('attendance.groupId').exec();

        if (!students.length) {
            return res.status(404).json({ success: false, error: `There are no students` })
        }

        return res.status(200).json({ success: true, data: students })
    }
    catch(err) {
        return res.status(404).json({ success: false, error: err });
    }
}

async function createMessages(req, res){

    try {
        
        const {body} = req;

        if (!body || !body.message) {
            return res.status(400).json({
                success: false,
                error: 'Failed to create message, details are empty.',
            })
        }

        const {message, usersIds} = body;

        let usersIdsArray = usersIds.map(id => new ObjectId(id));

        let query = {'_id': { "$in": usersIdsArray }};
        await Student.updateMany(query, { $push: { messages: message } }, {"multi": true});
        await Staff.updateMany(query, { $push: { messages: message } }, {"multi": true});

        return res.status(200).json({ success: true, message: 'messages created successfuly!' });
    }
    catch(e) {
        return res
            .status(500)
            .json({ success: false, error: `failed to create message`, errorMessage: e });
    }
}

module.exports = {
    createUser,
    getUsers,
    login,
    getUser,
    getUserById,
    getTeachers,
    getStudents,
    createMessages
}