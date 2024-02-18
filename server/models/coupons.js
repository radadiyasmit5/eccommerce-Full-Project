const mongoose = require("mongoose")

const CouponSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    trim: true,
    minlength: [6, "too short"],
    maxlength: [12, "too long"],
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
})

exports.Coupon = mongoose.model("Coupon", CouponSchema)
