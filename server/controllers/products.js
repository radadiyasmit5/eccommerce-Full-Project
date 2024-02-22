const express = require("express")
const {model} = require("mongoose")
const Catagory = require("../models/catagory")
const slugify = require("slugify")
const product = require("../models/products")
const User = require("../models/user")

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title)
    const createproduct = await new product(req.body).save()

    res.json(createproduct)
  } catch (error) {
    console.log(error.message, "error message")
    res.status(400).json({
      err: error.message,
    })
  }
}

exports.listofproducts = async (req, res) => {
  try {
    let list = await product
      .find({})
      .limit(parseInt(req.params.count))
      .populate("category")
      .populate("subs")
      .sort([["createdAt", "desc"]])
      .exec()

    res.json(list)
  } catch (error) {
    console.log(error)
  }
}

exports.removeproduct = async (req, res) => {
  try {
    const deleted = await product
      .findOneAndRemove({title: req.params.title})
      .exec()
    if (!deleted) {
      return res.status(400).json({data: "err while deleting product"})
    }

    return res.json(deleted)
  } catch (error) {
    console.log(error, "error")
    return res.status(400).json("product delete failed")
  }
}

exports.listproductsbyslug = async (req, res) => {
  const findone = product
    .findOne({slug: req.params.slug})
    .populate("category")
    .populate("subs")
    .exec()
    .then((response) => {
      if (!response) {
        return res.status(400).json({data: "product not found"})
      }
      return res.json(response)
    })
}

exports.update = (req, res) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title)
  }
  try {
    const updatedproduct = product.findOneAndUpdate(
      {slug: req.params.slug},
      req.body,
      {new: true},
      (err, response) => {
        res.json(response)
      }
    )
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
    const {sort, order, page} = req.body
    currentpage = page || 1
    perpage = 3
    const products = await product
      .find({})
      .skip((currentpage - 1) * 3)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perpage)
      .exec()
      .then((response) => {
        if (!response) {
          res.status(400).json("error while fetching products")
        } else {
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

exports.relatedProducts = async (req, res) => {
  let currentProduct = await product.findById({_id: req.params.id}).exec()

  let relatedProducts = await product
    .find({
      _id: {$ne: currentProduct._id},
      category: currentProduct.category,
    })
    .populate("category")
    .populate("subs")
    .limit(3)
  res.json(relatedProducts)
}

exports.startrating = async (req, res) => {
  const productIdfromReq = req.params.id
  const {stars} = req.body
  const useremail = req.user.email
  let user
  let productToUpdate
  try {
    user = await User.findOne({email: useremail}).exec()
  } catch {
    return res
      .status(500)
      .send(
        "Server encountered some issue fetching the userinfo , please investigate"
      )
  }
  try {
    productToUpdate = await product.findById({_id: productIdfromReq})
  } catch {
    return res
      .status(500)
      .send(
        "Server encountered some issue fetching the product , please investigate"
      )
  }

  const existingRatingsArray = productToUpdate.ratings.find((ele) => {
    return ele.postedBy.toString() == user._id.toString()
  })

  let updateProductwithRating

  // if user haven't rated this product yet

  if (!existingRatingsArray) {
    updateProductwithRating = await product
      .findOneAndUpdate(
        {_id: productIdfromReq},
        {
          $push: {ratings: {star: stars, postedBy: user._id}},
        },
        {new: true}
      )
      .exec()
  }
  // if user already have a start rating on this product then update that rating
  if (existingRatingsArray) {
    try {
      updateProductwithRating = await product
        .updateOne(
          {ratings: {$elemMatch: existingRatingsArray}},
          {
            $set: {"ratings.$.star": stars},
          },
          {new: true}
        )
        .exec()
    } catch {
      return res
        .status(500)
        .send("Server encountered some issue updating the star rating")
    }
  }
  updatedproduct = await product.findById({_id: productIdfromReq}).exec()
  const sortUserRating = updatedproduct.ratings.find((ele) => {
    return ele.postedBy.toString() == user._id.toString()
  })
  updateProductwithRating = sortUserRating
  res.json(updateProductwithRating)
}

exports.getproductsByCategory = async (req, res) => {
  const CategoryName = req.params.categoryName
  const category = await Catagory.Category.findOne({name: CategoryName}).exec()

  const Products = await product.find({category}).exec()
  res.json(Products)
}
exports.getproductsBySubCategory = async (req, res) => {
  const SubCategoryName = req.params.subcategoryName
  const subcategory = await Catagory.Category.findOne({
    name: SubCategoryName,
  }).exec()

  const Products = await product.find({subcategory}).exec()
  res.json(Products)
}

const handleSearchQuery = async (req, res, searchQuery) => {
  const products = await product
    .find({$text: {$search: searchQuery.toString()}})
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec()
  res.json(products)
}
const handlePriceRangeQuery = async (req, res, priceRange) => {
  const [min, max] = priceRange
  const products = await product
    .find({price: {$gte: min, $lte: max}})
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec()
  res.json(products)
}
const handleCategories = async (req, res, categories) => {
  const products = await product
    .find({category: categories})
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec()
  res.json(products)
}
const handleRating = async (req, res, stars) => {
  await product
    .aggregate([
      {
        $project: { 
          document: "$$ROOT",
          floorAverage: {
            $floor: {$avg: "$ratings.star"},
          },
        },
      },
      {$match: {floorAverage: stars}},
    ])
    .limit(12)
    .exec(async (err, aggregates) => {
      if (err) console.log("Aggregate Error: ", err)
      await product
        .find({_id: aggregates})
        .then((response) => {
          res.json(response)
        })
        .catch((err) => {
          console.log(err)
          res.status(500).send("server error")
        })
    })
}

const handleSubCategory = async (req, res, subs) => {
  const products = await product
    .find({subs: subs._id})
    .populate("category")
    .populate("subs")
    .limit(12)
  if (products) {
    res.json(products)
  } else {
    res.status(500).send("server error")
  }
}
const handleBrand = async (req, res, brand) => {
  const products = await product
    .find({brand: brand})
    .populate("category")
    .populate("subs")
    .limit(12)

  if (products) {
    res.json(products)
  } else {
    res.status(500).send("server error")
  }
}
const handlecolor = async (req, res, color) => {
  const products = await product
    .find({color: color})
    .populate("category")
    .populate("subs")
    .limit(12)

  if (products) {
    res.json(products)
  } else {
    res.status(500).send("server error")
  }
}
exports.searchFilters = async (req, res) => {
  const {query} = req.body
  if (query && query.searchQuery) {
    await handleSearchQuery(req, res, query.searchQuery)
  }
  if (query && query.priceRange) {
    handlePriceRangeQuery(req, res, query.priceRange)
  }

  if (query && query.categories) {
    handleCategories(req, res, query.categories)
  }
  if (query && query.stars) {
    handleRating(req, res, query.stars)
  }
  if (query && query.subs) {
    handleSubCategory(req, res, query.subs)
  }
  if (query && query.brand) {
    handleBrand(req, res, query.brand)
  }
  if (query && query.color) {
    handlecolor(req, res, query.color)
  }
}

// trigger this unction from Orders Controller when order is placed, we should update the quantity and order property in the DB for the record
exports.adjustProductCount = async (products) => {
  const bulkQuery = []
  products.map((p) => {
    bulkQuery.push({
      updateOne: {
        filter: {_id: p.product},
        update: {$inc: {quantity: -p.count, sold: +p.count}},
      },
    })
  })
  const result = await product.bulkWrite(bulkQuery)
}

exports.getProductsById = async (req, res) => {
  const id = req.params.id
  try {
    const Product = await product.findOne({_id: id}).exec()
    if (Product) {
      res.json(Product)
    }
  } catch (error) {
    console.log(error);
    res.json(error)
  }
}
