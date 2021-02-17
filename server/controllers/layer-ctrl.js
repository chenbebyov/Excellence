const Layer = require('../models/layer-model');
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { updateOne } = require('../models/layer-model');


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

    Layer.findOne({name : body.name }).then(layer => {
        if (layer) {
            return res.status(400).json({
                success: false,
                error: 'Layer name already exist.',
            })
        }
        
    }).catch(err => res.status(400).json({ success: false, error: err }));

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

getAllLayers = async (req, res) => {
    await Layer.find({}, (err, layers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!layers.length) {
            return res
                .status(404)
                .json({ success: false, error: `There are no existing layers in the system` })
        }
        return res.status(200).json({ success: true, data: layers })
    }).catch(err => console.log(err))
}


getLayer = async (req, res) => {
    return Layer.findOne({_id : req.params.id }).then(layer => {
        console.log(layer);
        if (!layer) {
            return res
                .status(404)
                .json({ success: false, error: `This layer does not exist in the system` })
        }
        return res.status(200).json({ success: true, data: layer })
        
    }).catch(err => res.status(400).json({ success: false, error: err }));
}



module.exports = {
    createLayer,
    getAllLayers,
    getLayer,
    createGrade,
    createLevel
}