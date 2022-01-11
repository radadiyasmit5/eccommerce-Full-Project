const { Schema } = require("mongoose")
const { default: slugify } = require("slugify")

const { Sub } = require("../models/sub")
const ObjectId = Schema.ObjectId


exports.create = async (req, res) => {
    try {
        const name = req.body.subcatagory
        
        const id=req.body.id
        console.log(req.body)
        const subcatagorycreate = await new Sub({ name, slug: slugify(name),parent:id }).save()

        res.json({ subcatagorycreate, message: "subcatagory created successfully" })
    }
    catch (err) {
        console.log(err.message, "error");
        res.json({ message:err.message })
        
    }
}

exports.list = async (req, res) => {
    const subcatagorylist = await Sub.find({}).sort({ name: 1 }).exec()
    res.json(subcatagorylist)    
}

exports.update = async (req, res) => {

    const name = req.body.name
    const parent = req.body.parent
    console.log(name, parent);
    await Sub.findOneAndUpdate({ slug: req.params.slug }, { name, slug: slugify(name),parent }, { new: true }, (err, result) => {
        if (err) {
            throw err;
        } else {

            return res.json({ result, message: "subcatagory updated successfully" })

        }
    }).clone().catch(err => {
        return res.json(err.message)
    }
    )
}

exports.remove = async (req, res) => {

    try {
        const slug = req.params.slug
        const subcatagoryremove = await Sub.findOneAndDelete({ slug })
        res.json(subcatagoryremove)
    } catch (error) {
        res.json("cannot delete catagory")
    }
}

exports.read = async (req, res) => {
    const slug = req.params.slug
    const subcatagoryread = await Sub.findOne({ slug }).exec()
    res.json(subcatagoryread)
}

exports.findbyid = async (req, res) => {
    const id = req.params.id
  
    await Sub.find({ parent: id }, function (err, response) {
        if (err) {
            console.log(err);
        } else {
         
         
            res.json(response)
        console.log(response);
        }
        }).clone().catch((err)=>{console.log(err);})

}

