const mongoose = require('mongoose')
const ObjectId = require('mongoose/lib/types/objectid')
const Schema = mongoose.Schema

const Layer = new Schema(
    {
        name: { type: String, required: true },
        grades: {
            type: [{
                name: { type: String, required: false },
                levels: {
                    type: [{
                        name: { type: String, required: false },
                        groups: [{ type:ObjectId, ref:"groups"}]
                    }],
                    required: true
                },
                lessonOfLevel: {
                    type: [{
                        lessonId: { type: ObjectId, required: true }
                    }], required: false
                }
            }],
            required: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('layers', Layer)



