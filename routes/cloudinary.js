const express = require('express')

const router = express.Router()

//middlewares
const { authcheck, admincheck } = require('../middleware/auth')
//controllers
const { upload ,remove  } = require("../controllers/cloudinary")


router.post("/uploadimages", authcheck, admincheck, upload)
router.post("/deleteimages", authcheck, admincheck, remove)





module.exports = router;