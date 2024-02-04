const User = require("../models/user")
const Product = require("../models/products")
const Cart = require("../models/cart")
const {count} = require("../models/user")

exports.saveCartToDb = async (req, res) => {
  let products = {}
  let cartFromUi = req.body.cart

  let user
  await User.findOne({email: req.user.email})
    .exec()
    .then((res) => {
      user = res
    })
    .catch((err) => {
      console.log(err)
    })
  const checkIfcartforUseExist = await Cart.findOne(
    {user: user._id},
    null
  ).exec((err, doc) => {
    if (err) {
      console.log(err)
    }
  })
  if (checkIfcartforUseExist != [] && checkIfcartforUseExist != null) {
    await checkIfcartforUseExist.remove()
  }

  let producttoadd = []
  for (p of cartFromUi) {
    let tempProduct = {}
    tempProduct.product = p._id
    tempProduct.count = p.count
    tempProduct.color = p.color
    const {price} = await Product.findById({_id: p._id}).exec()
    tempProduct.price = price

    producttoadd.push(tempProduct)
  }
  products.products = producttoadd
  let totalPrice = 0
  for (product of products.products) {
    totalPrice = totalPrice + product.count * product.price
  }
  products.totalPrice = totalPrice
  products.user = user._id
  const result = await new Cart(products).save().then((response) => {
    if (response) {
      res.json("ok")
    }
  })
}

exports.getProductsinCart = async (req, res) => {
  const email = req.email
  const products = await Cart.findOne({email: email})
    .populate("products.product")
    .exec((err, doc) => {
      if (!err) {
        if (doc) {
          res.json(doc)
        }
        if (!doc) {
          res.json([])
        }
      } else if (err) {
        res.status(500).send("Server error while fetching products from cart")
      }
    })
}

exports.deleteProductsinCart = async (req, res) => {
  const email = req.email
  const products = await Cart.remove({email: email}).exec()
  if (products) res.json({ok: true})
  else res.status(500).send("Server error while fetching products from cart")
}
