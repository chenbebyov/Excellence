const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        teacherCode: { type: int, required: true },
        branchCode: { type: int, required: true },
        orderDetails: {
             type:[{
                productCode: { type: int, required: true },
                quantityOfProduct: { type: int, required: true }
             }],
             required: true
        }, 
        remarks: { type: String, required: false } 
    },    
    { timestamps: true },
)

module.exports = mongoose.model('orders', Order)



    
        
