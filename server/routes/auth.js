const express = require('express')

const router = express.Router()

//middlewares
const {authcheck, admincheck} = require('../middleware/auth')
//controllers
const { authfunction,currentuser } = require("../controllers/auth")

router.post("/auth",authcheck,authfunction)
router.post("/current-user",authcheck,currentuser)
router.post("/current-admin",authcheck,admincheck,currentuser)


module.exports = router;