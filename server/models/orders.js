const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const OrdersSchema = new mongoose.Schema(
  {
    products: [
      {
        products: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: Number,
      },
    ],
    paymentIntent: {},
    orderStatus: {
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
    orderDate: String,
  },
  {timestamps: true}
)

exports.Orders = mongoose.model("Orders", OrdersSchema)
