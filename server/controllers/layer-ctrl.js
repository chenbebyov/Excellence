const Layer = require('../models/layer-model');
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


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
    const {layerId, gradeName} = req.body

    if (!layerId || !gradeName) {
        return res.status(400).json({
            success: false,
            error: 'Missing params, failed to create new grade.',
        })
    }

    this.getLayer()

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

getLayerById = (id) => {
    Layer.findOne({_id : id }).then(layer => {
        console.log(layer);
        if (!layer) {
            return res
                .status(404)
                .json({ success: false, error: `This layer does not exist in the system` })
        }
        return res.status(200).json({ success: true, data: layer })
        
    }).catch(err => res.status(400).json({ success: false, error: err }));
}

getLayer = async (req, res) => {
    return getLayerById(req.params.id);
}



module.exports = {
    createLayer,
    getAllLayers,
    getLayer
}