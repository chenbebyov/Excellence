const User = require('../models/user-model');
const Staff = require('../models/staff-model');
const Student = require('../models/student-model');
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const Layer = require('../models/layer-model');


createLayer = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Failed to create user, details are empty.',
        })
    }

    const layer = new Layer(body);

    if (!layer) {
        return res.status(400).json({ success: false, error: err })
    }

    layer.save().then(() => {
            return res.status(200).json({
                success: true,
                layer: layer,
                message: 'layer created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'layer not created!',
            })
    })
}

//TODO: getAllLayers function

module.exports = {
    createLayer
}