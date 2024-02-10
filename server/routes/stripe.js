const express = require("express")
const router = express.Router()
const {stripePaymentIntent} = require("../controllers/stripe")
const {authcheck} = require("../middleware/auth")

router.post("/create-payment-intent", authcheck, stripePaymentIntent)

module.exports = router
