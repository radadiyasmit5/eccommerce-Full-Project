const {Cart} = require("../models/cart")
const {Coupon} = require("../models/coupons")
const User = require("../models/user")

exports.createcoupon = async (req, res) => {
  let {name, expiryDate, discount} = req.body.coupon
  await new Coupon({name, expiryDate, discount})
    .save()
    .then((result) => {
      res.json({ok: true})
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send("Error creating coupon")
    })
}

exports.listcoupons = async (req, res) => {
  await Coupon.find().exec((err, doc) => {
    if (err) {
      res.status(500).send("Error fetching the coupons rom server")
      console.log(err)
    } // If error in DB operations
    res.json(doc)
  })
}

exports.deletecoupon = async (req, res) => {
  await Coupon.deleteOne({_id: req.params.couponID}).exec((err, doc) => {
    if (!err) {
      return res.send({ok: true})
    }
    res.status(500).send("Server Error")
  })
}
exports.validatCoupon = async (req, res) => {
  const couponName = req.body.couponName

  const coupon = await Coupon.findOne({name: couponName}).exec()
  if (coupon == null) {
    // no coupon found
    return res.status(400).send({msg: "No such coupon"})
  }
  // check expiry
  // if () {
  // }

  const user = await User.findOne({email: req.user.email}).exec()

  const cart = await Cart.findOne({user: user._id})
    .populate("products.product")
    .exec()

  let totalPrice = cart.totalPrice
  let totalPriceAfterDiscount =
    totalPrice - (totalPrice * coupon.discount) / 100

  const result = Cart.findOneAndUpdate(
    {user: user._id},
    {totalPriceAfterDiscount: totalPriceAfterDiscount},
    {new: true}
  )

  result
    .then((response) => {
      if (response) {
        return res.json(response)
      }
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).send({msg: "Server Error while updating the Cart"})
    })
}
