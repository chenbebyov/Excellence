const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        teacherCode: { type: int, required: true },
        address: { type: String, required: true },
        orderDate: { type: date, required: true },
        orderDetails: {
             type:[{
                productCode: { type: int, required: true },
                quantityOfProduct: { type: int, required: true }
             }],
             required: true
        },  
    },    
    { timestamps: true },
)

module.exports = mongoose.model('orders', Order)



    
        
