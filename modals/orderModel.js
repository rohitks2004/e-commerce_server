const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required for order"]
    },
    address:{
        type:String,
        required:[true,"address is required for order"]
    },
    products:[
        {   
            productId:{type:String,required:[true,"product id is required for order"]},
            quantity:{type:Number,required:[true,"quantity is required"]}
        }
    ],
    orderDate:{
        type:Date,
        default :Date.now,
        required:[true,"date is required"]
    },
    deliveryDate:{
        type:Date,
        default:function(){
            const date = new Date;
            date.setDate(date.getDate() + 10);
            return date
        }
        ,
        required:[true,"expected delivery date is required"]
    },
    email:{
        type:String,
        required:[true,"email is required for order"]
    }
})

module.exports = mongoose.model('order',orderSchema);

// orders
// 	name
// 	address
// 	products aray of objects 
// 	order date
// 	estimated delivery
// 	user email