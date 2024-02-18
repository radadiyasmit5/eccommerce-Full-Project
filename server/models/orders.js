const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const ordersSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Cash On Delivery",
        "processing",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
    orderdBy: {type: ObjectId, ref: "User"},
    orderDate: {type: Date, default: () => new Date().toUTCString()},
  },
  {timestamps: true}
)

exports.Orders = mongoose.model("Orders", ordersSchema)
