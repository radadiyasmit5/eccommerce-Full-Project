const express = require('express')
const cors = require("cors")
const morgan = require('morgan')
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
require('dotenv').config()
const fs = require("fs")
const { log } = require('console')
const app = express();

app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json({ limit: "2mb" }))
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// const authrout = require("./routes/auth")  --- there are lots of routes in real application so import all routes automatically we can use fs.readdirsync methoud and map it threw all the file and require it
// app.use("/api",authrout) -- before i made it automate i was importin it like this manually

fs.readdirSync("./routes").map((r) => { app.use("/api", require("./routes/" + r)) }) // ---  after automation it is importing routes and i also write app.use() function there and push path into it.






mongoose.connect(process.env.DATABASE)




//now i am using routes middleware so i dont have to use this
// app.get("/api", (req, res) => {
//     res.json({
//         "name":"smit"
//     })
// })



let port=process.env.PORT||8000
app.listen(port, () => {
    console.log("port is running",port);
})