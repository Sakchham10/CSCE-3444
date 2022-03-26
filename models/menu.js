const { string, number } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MenuSchema = new Schema({
    belongsTo:{
        type: Schema.Types.ObjectId,
        ref:'Restaurant'
    },

    items:[
        {
            id: number,
            name: string,
            wasteVal: number
        }
    ]
    
})

module.exports = mongoose.model('Menus',MenuSchema)