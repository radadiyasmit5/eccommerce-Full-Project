const stripe = require("stripe")(process.env.STRIPE_API_TOKE)
const User = require("../models/user")
const {Cart} = require("../models/cart")

exports.stripePaymentIntent = async (req, res) => {
  const isCouponApplied = req.body.coupon.isCouponApplied

  const user = await User.findOne({email: req.user.email}).exec()

  if (!user) {
    res.status(500).send("Server Error, User does not found")
    return
  }

  const cart = await Cart.findOne({user: user._id}).exec()
  if (!cart) {
    res.status(500).send("Server error, Cart does not exists")
    return
  }

  let finalTotal = 0
  if (isCouponApplied) {
    finalTotal = cart.totalPriceAfterDiscount * 100
  } else {
    finalTotal = cart.totalPrice * 100
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalTotal,
      currency: "cad",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    })
  } catch {
    return res.status(500).send('Server Encountered some issue while generating the PaymentIntent')
  }
  res.json({
    clientSecret: paymentIntent.client_secret,
    finalTotal,
    originalTotal: cart?.totalPrice,
    totalPriceAfterDiscount: cart?.totalPriceAfterDiscount,
  })
}
