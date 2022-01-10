const express = require('express')

const router = express.Router()

//middlewares
const { authcheck, admincheck } = require('../middleware/auth')
//controllers
const { create, read } = require("../controllers/products")

router.post("/createproduct", authcheck, admincheck, create)
router.get("/products",  read)




module.exports = router;