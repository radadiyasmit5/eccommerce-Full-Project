const express = require("express")
const {saveOrder, getOrders, getallOrders,updateOrderStatus} = require("../controllers/orders")
const {authcheck, admincheck} = require("../middleware/auth")
const router = express.Router()

router.post("/order/saveOrder", authcheck, saveOrder)
router.get("/order/getOrders", authcheck, getOrders)
router.get("/order/getallorders", authcheck, admincheck, getallOrders)
router.post("/order/updateOrderStatus", authcheck, admincheck, updateOrderStatus)

module.exports = router
