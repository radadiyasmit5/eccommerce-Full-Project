const express = require("express")
const router = express.Router()

const {
  listcoupons,
  createcoupon,
  deletecoupon,
  validatCoupon,
} = require("../controllers/coupon")
const {admincheck, authcheck} = require("../middleware/auth")
router.get("/coupons", listcoupons)
router.post("/coupon", admincheck, authcheck, createcoupon)
router.delete("/coupons/:couponID", admincheck, authcheck, deletecoupon)
router.post("/validate/coupon", authcheck, validatCoupon)

module.exports = router
