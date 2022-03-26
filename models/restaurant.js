const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
    Name:{
        type: String,
        required : true
    },
    Location : {
        type: String,
        required: true
    },
    MostPopular:{
        type: String,
        required : true
    } ,
    EUID: {
        type: Number,
        required: true
    },
    Author: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model('Restaurant',RestaurantSchema)