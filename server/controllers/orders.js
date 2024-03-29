const {Orders} = require("../models/orders")
const User = require("../models/user")
const {Cart} = require("../models/cart")
const {adjustProductCount} = require("./products")

exports.saveOrder = async (req, res) => {
  const {email} = req.user
  const {paymentIntent} = req.body
  let user = {}
  try {
    user = await User.findOne({email: email}).exec()
  } catch (error) {
    res.status(500).send("Some issue while finding user in DB")
    return
  }

  let cart = {}
  try {
    cart = await Cart.findOne({user: user._id}).exec()
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send(`Some issue while finding Cart for user ${user.name} in DB`)
    return
  }
  const products = []
  cart.products.map((p) => {
    let currProduct = {}
    currProduct.product = p.product
    currProduct.count = p.count
    currProduct.color = p.color.toString()

    products.push(currProduct)
  })
  const order = {
    products: [...products],
    paymentIntent,
    orderdBy: user,
  }

  try {
    const result = await new Orders(order).save()
    adjustProductCount(result.products)
    if (result) {
      res.json({status: "ok"})
    }
  } catch (error) {
    res
      .status(500)
      .send("There is some server side error while saving the order to the DB")
  }
}

exports.getOrders = async (req, res) => {
  const {email} = req.user
  let orders = []
  try {
    const user = await User.find({email: email}).exec()
    if (user && user[0]) {
      orders = await Orders.find({orderdBy: user[0]._id})
        .populate("products.product")
        .exec()
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("There is some issue while getting Orders Information")
    return
  }

  res.json(orders)
}

exports.getallOrders = async (req, res) => {
  try {
    const orders = await Orders.find({})
      .sort("-orderDate")
      .populate("products.product")
      .exec()
    if (orders) {
      res.json(orders)
    } else res.status(500).send("There is some issue while fetching a")
  } catch (error) {
    res.status(500).send("There is some issue while fetching the Orders")
  }
}

exports.updateOrderStatus = async (req, res) => {
  const {orderId, orderStatus} = req.body.orderDetails
  const response = await Orders.findOneAndUpdate(
    {_id: orderId},
    {orderStatus: orderStatus},
    {new: true}
  )
  if (response) {
    res.json(response)
    return
  } else {
    res.status(500).send("There is some issue updating the order Status")
    return
  }
}
