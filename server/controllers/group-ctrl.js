const Layer = require('../models/layer-model');


updateGroup = (req, res) => {
    const body = req.body;

    if (!body || !body.groupId) {
        return res.status(400).json({
            success: false,
            error: 'Failed to update group, details are empty.',
        })
    }

    Layer.findById({"grades.levels.groups._id":body.groupId},{"groups.$._id": 1}).then(group => {
        if (group) {
            return res.status(200).json({
                success: true,
                data:group
            })
        }
        
    }).catch(err => res.status(400).json({ success: false, error: err }));
    

    //TODO:...
}


module.exports = {
    updateGroup
}