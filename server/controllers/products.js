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