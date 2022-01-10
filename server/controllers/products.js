const express = require('express');

const slugify = require('slugify');
const product = require("../models/products")

exports.create = async (req, res)=>{
   
    
    try {
        console.log(req.body, "reqbody");
        req.body.slug = slugify(req.body.title)
        const createproduct = await new product(req.body).save();
     
        res.json(createproduct)
        
    } catch (error) {
        console.log(error.message,"error message")
        res.status(400).json({
         err:error.message
     })
    }
}


exports.read = async (req, res) => {
    try {
        let list = await product.find({}).populate()
        console.log(list);
        res.json(list)
    } catch (error) {
        console.log(error);
    }
   
}