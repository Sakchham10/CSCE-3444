const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = require('./reviews')

const RestaurantSchema = new Schema({
    Name:{
        type: String,
        required : true
    },
    Location : {
        type: String,
        required: true
    },
    Images:[
        {
          url: String,
          filename: String  
        }
    ],
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
    },
    geometry:{
        type:{
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates:{
            type:[Number],
            required: true
        }
    },

    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]

});

RestaurantSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Restaurant',RestaurantSchema)