const express = require('express')

const router = express.Router()

//middlewares
const { authcheck, admincheck } = require('../middleware/auth')
//controllers
const { create, read, list, update, remove,findbyid } = require("../controllers/sub")

router.post("/sub", authcheck, admincheck, create)
router.get("/subs", list)
router.get("/subs/:id", findbyid)
router.get("/sub/:slug", read)
router.put("/sub/:slug", authcheck, admincheck, update)
router.delete("/sub/:slug", authcheck, admincheck, remove)



module.exports = router;