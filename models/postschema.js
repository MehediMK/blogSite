const mongoose = require('mongoose')

const portsSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        require:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = portsSchema

