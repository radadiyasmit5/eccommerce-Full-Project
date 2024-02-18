const express = require("express")
const {saveOrder} = require("../controllers/orders")
const {authcheck} = require("../middleware/auth")
const router = express.Router()

router.post("/order/saveOrder", authcheck, saveOrder)


module.exports = router