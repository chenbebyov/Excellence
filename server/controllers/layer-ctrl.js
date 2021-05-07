const Layer = require('../models/layer-model');
const Group = require('../models/group-model');
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { updateOne } = require('../models/layer-model');


createLayer = async (req, res) => {

    try {

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

        let exsistLayer = await Layer.findOne({name : body.name });
        if(exsistLayer) {
            return res.status(400).json({
                    success: false,
                    error: 'Layer name already exist.',
            });
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
    catch(err) {
        res.status(400).json({ success: false, error: err })
    }
}

createGrade = (req, res) => {
    const {layerId, gradeName} = req.body;

    if (!layerId || !gradeName) {
        return res.status(400).json({
            success: false,
            error: 'Missing params, failed to create new grade.',
        })
    }

    Layer.findOne({_id : layerId }).then(layer => {
        if(!layer){
            return res.status(400).json({
                error: 'layer does not exist',
            })
        }

        let newGrade = {name: gradeName };
        layer.grades.push(newGrade);
        layer.save().then(() => {
            return res.status(200).json({
                success: true,
                layer: layer,
                message: 'grade created!',
            })
        }).catch(error => {
            return res.status(400).json({
                error,
                message: 'grade not created!',
            })
        });
    })
}

createLevel = (req, res) => {
    const {layerId, gradeId, levelName} = req.body;

    if (!layerId ||!gradeId || !levelName) {
        return res.status(400).json({
            success: false,
            error: 'Missing params, failed to create new level.',
        })
    }

    Layer.findOne( { _id: layerId }, { grades: { $elemMatch: { _id: gradeId } }} ).then((layer) => {

        let newLevel = {name: levelName};
        layer.grades[0].levels.push(newLevel);
        layer.save().then(() => {
            return res.status(200).json({
                success: true,
                layer: layer,
                message: 'level created!',
            })
        }).catch(error => {
            return res.status(400).json({
                error,
                message: 'level not created!',
            })
        });
    })
}

createGroup = (req, res) => {
    const {layerId, gradeId, levelId, groupName} = req.body;

    if (!layerId ||!gradeId || !levelId || !groupName) {
        return res.status(400).json({
            success: false,
            error: 'Missing params, failed to create new group.',
        })
    }
    let newGroup = new Group({name: groupName});
    newGroup.save(function (err) {
        if (err){
            return res.status(400).json({
                error,
                message: 'failed to create group!',
            })
        }

        Layer.findOne( { _id: layerId }, { grades: { $elemMatch: { _id: gradeId, levels: { $elemMatch: { _id:  levelId} }}}})
        .populate('grades.levels.groups')
        .exec((err, layer) => {
            layer.grades[0].levels[0].groups.push(newGroup);
            layer.save().then(() => {
                return res.status(200).json({
                    success: true,
                    layer: layer,
                    message: 'group created!',
                })
            }).catch(error => {
                return res.status(400).json({
                    error,
                    message: 'group not created!',
                })
            });
        })
    })
}

getAllLayers = async (req, res) => {
    await Layer.find({}).populate('grades.levels.groups').exec((err, layers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!layers.length) {
            return res
                .status(404)
                .json({ success: false, error: `There are no existing layers in the system` })
        }
        return res.status(200).json({ success: true, data: layers })
    })
}


getLayer = async (req, res) => {

    await Layer.findOne({_id : req.params.id }).populate('grades.levels.groups').exec((err, layer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!layer) {
            return res
                .status(404)
                .json({ success: false, error: `This layer does not exist in the database` })
        }
        return res.status(200).json({ success: true, data: layer })
    })

    // return Layer.findOne({_id : req.params.id }).then(layer => {
    //     console.log(layer);
    //     if (!layer) {
    //         return res
    //             .status(404)
    //             .json({ success: false, error: `This layer does not exist in the system` })
    //     }
    //     return res.status(200).json({ success: true, data: layer })
        
    // }).catch(err => res.status(400).json({ success: false, error: err }));
}



module.exports = {
    createLayer,
    getAllLayers,
    getLayer,
    createGrade,
    createLevel,
    createGroup
}