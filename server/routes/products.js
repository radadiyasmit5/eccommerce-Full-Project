const express = require('express')

const router = express.Router()

//middlewares
const { authcheck, admincheck } = require('../middleware/auth')
//controllers
const { create, listofproducts, removeproduct, listproductsbyslug, update } = require("../controllers/products")

router.post("/createproduct", authcheck, admincheck, create)
router.delete("/removeproduct/:title", authcheck, admincheck, removeproduct)
router.get("/products/:count", listofproducts)
router.get("/products/getproductbyslug/:slug", listproductsbyslug)
router.put("/products/updateproduct/:slug", update)



module.exports = router;