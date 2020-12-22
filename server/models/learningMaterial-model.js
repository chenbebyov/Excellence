const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LearningMaterial = new Schema(
    {
        productName: { type: String, minLength:2, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('learningMaterials', LearningMaterial)
