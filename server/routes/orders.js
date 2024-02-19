const express = require("express")
const {saveOrder, getOrders} = require("../controllers/orders")
const {authcheck} = require("../middleware/auth")
const router = express.Router()

router.post("/order/saveOrder", authcheck, saveOrder)
router.get("/order/getOrders", authcheck, getOrders)


module.exports = router