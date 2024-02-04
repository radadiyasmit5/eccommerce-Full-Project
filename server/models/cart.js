const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    user: {type: ObjectId, ref: "User"},
  },

  {timestamps: true}
)

module.exports = mongoose.model("Cart", CartSchema)
