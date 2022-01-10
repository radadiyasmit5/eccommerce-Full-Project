const mongoose = require("mongoose")
const slugify = require("slugify")


const catagoryschema = new mongoose.Schema({
    

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

},
    { timestamps: true })

    exports.Catagory= mongoose.model("Catagory",catagoryschema)