const mongoose = require("mongoose")

const galarySchema = new mongoose.Schema({
    pictures:[{type:String, required:true}],
    user_id:{type:mongoose.Schema.Types.ObjectId},
},{
    versionKey:false,
    timestamps: true
})
module.exports = mongoose.model("gallery", galarySchema)