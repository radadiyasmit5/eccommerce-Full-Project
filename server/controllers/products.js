const express = require('express');
const { model } = require('mongoose');
const Catagory = require("../models/catagory")
const slugify = require('slugify');
const product = require("../models/products")

exports.create = async (req, res) => {


    try {
        console.log(req.body, "reqbody");
        req.body.slug = slugify(req.body.title)
        const createproduct = await new product(req.body).save();

        res.json(createproduct)

    } catch (error) {
        console.log(error.message, "error message")
        res.status(400).json({
            err: error.message
        })
    }
}


exports.listofproducts = async (req, res) => {

    try {

        let list = await product.find({}).limit(parseInt(req.params.count)).populate('category').populate("subs").sort([["createdAt", "desc"]]).exec()

        res.json(list)
    } catch (error) {
        console.log(error);
    }

}

exports.removeproduct = async (req, res) => {

    try {
        const deleted = await product.findOneAndRemove({ title: req.params.title }).exec()
        if (!deleted) {
            return res.status(400).json({ data: "err while deleting product" })
        }

        return res.json(deleted)
    } catch (error) {

        console.log(error, "error");
        return res.status(400).json("product delete failed")

    }

}

exports.listproductsbyslug = async (req, res) => {

    console.log(req.params.slug);
    const findone = product.findOne({ slug: req.params.slug }).populate("category").populate('subs').exec().then(response => {
        if (!response) {
            return res.status(400).json({ data: "product not found" })
        }
        return res.json(response)

    });


}

exports.update = (req, res) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title)
    }
    try {
        const updatedproduct = product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }, (err, response) => {
            console.log(response);

            res.json(response)
        }).exec()

    } catch (error) {
        res.status(400).json(error.message)
    }


}
//without pagination
// exports.list = async (req, res) => {

//     try {
//         const { sort, order, limit } = req.body
//         const products = await product.find({})
//             .populate("category")
//             .populate("subs")
//             .sort([[sort, order]])
//             .limit(limit)
//             .exec().then(response => {
//                 if (!response) {
//                     res.status(400).json("error while getting products")
//                 }
//                 else {
//                     console.log(response);
//                     res.json(response)
//                 }
//             })
//     } catch (error) {
//         res.status(400).json("error while getting a product")
//     }
// }

//with pagination
exports.list = async (req, res) => {

    try {
        const { sort, order, page } = req.body
        currentpage = page || 1
        perpage = 3
        const products = await product.find({})
            .skip((currentpage - 1) * 3)
            .populate("category")
            .populate("subs")
            .sort([[sort, order]])
            .limit(perpage)
            .exec().then(response => {
                if (!response) {
                    res.status(400).json("error while fetching products")
                }
                else {

                    res.json(response)
                }
            })
    } catch (error) {
        res.status(400).json("error while getting a product")
    }
}


exports.totalproduct = async (req, res) => {
    let totalproducts = await product.find({}).estimatedDocumentCount().exec()
    res.json(totalproducts)

}