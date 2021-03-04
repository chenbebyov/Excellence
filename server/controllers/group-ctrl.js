const Layer = require('../models/layer-model');
const Group = require('../models/group-model');
const ObjectId = require('mongoose/lib/types/objectid');


updateGroup = (req, res) => {
    const body = req.body;

    if (!body || !body.groupId) {
        return res.status(400).json({
            success: false,
            error: 'Failed to update group, details are empty.',
        })
    }
    // Layer.aggregate([
    //     { $unwind: "$grades"},
    //     { $unwind: "$grades.levels"},
    //     { $unwind: "$grades.levels.groups"},
    //     {
    //         $match: {
    //             "grades.levels.groups._id": body.groupId
    //         }
    //     }
    // ]).then(group => {
    //     if (group) {
    //         return res.status(200).json({
    //             success: true,
    //             data:group
    //         })
    //     }
        
    // }).catch(err => res.status(400).json({ success: false, error: err }));


    // Group.find({}).then(group => {
    //     if (group) {
    //         return res.status(200).json({
    //             success: true,
    //             data:group
    //         })
    //     }
        
    // }).catch(err => res.status(400).json({ success: false, error: err }));

    // .findOne({
    //     ...    "blog_id" : ObjectId("56587befdb7224110f007233")
    //     ... },{
    //     ...    "comments": { $elemMatch: { _id: ObjectId("565f1034fd07cbfc1129db0b") } }
    //     ... })
    
    // Layer.findOne({"grades.levels.groups._id" : body.groupId},"grades.levels.groups.$").then(group => {
    //     if (group) {
    //         return res.status(200).json({
    //             success: true,
    //             data:group
    //         })
    //     }

    // }).catch(err => res.status(400).json({ success: false, error: err }));
    // Layer.findOne({"grades.levels.groups._id" : body.groupId},"grades.levels.groups.$").then(group => {
    //     if (group) {
    //         return res.status(200).json({
    //             success: true,
    //             data:group
    //         })
    //     }

    // }).catch(err => res.status(400).json({ success: false, error: err }));

    // Layer.findOne({'grades.levels.groups.0._id': body.groupId}).then(group => {
    //     if (group) {
    //         return res.status(200).json({
    //             success: true,
    //             data:group
    //         })
    //     }

    // }).catch(err => res.status(400).json({ success: false, error: err }));

    Layer.aggregate()
    .match({'grades.levels.groups._id': body.groupId})
    .project({
        'groups': {
            '$filter': {
                'input': '$groups',
                'cond': {
                    '$eq': ['$$groups._id', body.groupId]
                }
            }
        }
    })
    .exec(function (err, res) {
        if (err) return handleError(err);
        console.log(res); // [ { orders: [...] } ]
    });

    //TODO:...
}


module.exports = {
    updateGroup
}