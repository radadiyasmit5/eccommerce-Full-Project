const express = require("express")

const router = express.Router()

const {saveCartToDb, getProductsinCart, deleteProductsinCart} = require("../controllers/user")
//middleware
const {authcheck, admincheck} = require("../middleware/auth")

router.post("/user/cart", authcheck, saveCartToDb)
router.get("/user/getProductsincart", authcheck, getProductsinCart)
router.delete("/user/deleteProductsincart", authcheck, deleteProductsinCart)
module.exports = router
