const express = require('express')

const router = express.Router()

//middlewares
const { authcheck, admincheck } = require('../middleware/auth')
//controllers
const { create, listofproducts, removeproduct } = require("../controllers/products")

router.post("/createproduct", authcheck, admincheck, create)
router.delete("/removeproduct/:title", authcheck, admincheck, removeproduct)
router.get("/products/:count", listofproducts)




module.exports = router;