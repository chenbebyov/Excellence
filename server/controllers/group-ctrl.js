const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


updateGroup = (req, res) => {
    const body = req.body;

    if (!body || !body.groupId) {
        return res.status(400).json({
            success: false,
            error: 'Failed to update group, details are empty.',
        })
    }

    //TODO:...
}


module.exports = {
    updateGroup
}