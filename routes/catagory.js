const express = require('express')

const router = express.Router()

//middlewares
const {authcheck, admincheck} = require('../middleware/auth')
//controllers
const { create, read, list, update, remove } = require("../controllers/catagory")

router.post("/catagory",authcheck,admincheck,create)
router.get("/catagories",list)
router.get("/catagory/:slug",read)
router.put("/catagory/:slug",authcheck,admincheck,update)
router.delete("/catagory/:slug",authcheck,admincheck,remove)



module.exports = router;