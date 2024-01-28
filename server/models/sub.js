const mongoose = require("mongoose")
const slugify = require("slugify")
const {ObjectId} = mongoose.Schema

const subschema = new mongoose.Schema({


    name: {
        type: "String",
        trim: true,
        required: true,
        minlength: [2, "name is to short"],
        maxlength: [32, "name is to long"]
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    parent: { type: ObjectId, ref: "Category", required: true },

},
    { timestamps: true })

exports.Sub = mongoose.model("Sub", subschema)