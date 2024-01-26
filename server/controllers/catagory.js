const { json } = require("body-parser")
const { default: slugify } = require("slugify")
const { Category } = require("../models/catagory")



exports.create = async (req, res) => {
    try {
        const name = req.body.catagory
        console.log(req.body)
        const catagorycreate = await new Category({ name, slug: slugify(name) }).save()

        res.json({ catagorycreate, message: "catagory created successfully" })
    }
    catch (err) {
        console.log(err.message,"error");
        res.json({ message: "duplicate catagory" })
    }

}
exports.list = async (req, res) => {
    const catagorylist = await Category.find({}).sort({ name: 1 }).exec()
    res.json(catagorylist)
}
exports.update = async (req, res) => {
  
        
  
        const name = req.body.name
    await Category.findOneAndUpdate({ slug: req.params.slug }, { name, slug: slugify(name) }, { new: true }, (err, result) => {
            if (err) {
              throw err;
            } else {

               return res.json({ result, message: "catagory updated successfully" })

            }
        }).clone().catch(err => {
            return res.json(err)
        }
        )  
      
     

    

}
exports.remove = async (req, res) => {

    try {
        const slug = req.params.slug
        const catagoryremove = await Category.findOneAndDelete({ slug })
        res.json(catagoryremove)
    } catch (error) {
        res.json("cannot delete catagory")
    }
}
exports.read = async (req, res) => {
    const slug = req.params.slug
    const catagoryread = await Category.findOne({ slug }).exec()
    res.json(catagoryread)
}