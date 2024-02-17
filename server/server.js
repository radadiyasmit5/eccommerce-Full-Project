const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const {MongoClient, ServerApiVersion} = require("mongodb")
const http = require("http")
require("dotenv").config()
const fs = require("fs")
const {log} = require("console")
const app = express()

app.use(
  cors({
    origin: "*",
  })
)
app.use(morgan("dev"))
app.use(bodyParser.json({limit: "2mb"}))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE)

// const authrout = require("./routes/auth")  --- there are lots of routes in real application so import all routes automatically we can use fs.readdirsync methoud and map it threw all the file and require it
// app.use("/api",authrout) -- before i made it automate i was importing it like this manually

fs.readdirSync("./routes").map((r) => {
  app.use("/api", require("./routes/" + r))
}) // ---  after automation it is importing routes and i also write app.use() function there and push path into it.
// mongodb+srv://<username>:<password>@eccomerce.cvysv1z.mongodb.net/?retryWrites=true&w=majority

// from here send a request to UI with some endpoint which will hit back to server
// import("node-fetch").then(({default: fetch}) => {
//   // fetch("https://ecommerce-ui-a9c0.onrender.com/")
//   fetch("http://localhost:3000/requestToServer")
//     .then((res) => {
//       return res
//     })
//     .then((data) => console.log(data))
//     .catch((error) => console.error("Error:", error))
// })

// Making a request to the server itself
// const options = {
//   // hostname: "ecommercebackend1-ymcxx2gg.b4a.run",
//   hostname: process.env.SELF_HIT_URL,
//   // port: 8000, // Assuming your server is running on port 3000
//   path: "/api/products", // Replace with the route you want to hit
//   method: "GET", // Specify the HTTP method you want to use
//   "User-Agent":
//     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
// }
// let counter = 0
// setInterval(() => {
//   const internalReq = http.request(options, (internalRes) => {
//     let data = ""
//     internalRes.on("data", (chunk) => {
//       data += chunk
//     })
//     internalRes.on("end", () => {
//       console.log("Response from internal request:", data)
//       // Handle the response from the internal request as needed
//     })
//   })

//   internalReq.on("error", (error) => {
//     console.error("Error making internal request:", error)
//   })

//   console.log(counter++)
//   internalReq.end()
// }, 20000)
// You can continue handling the original request here

let port = process.env.PORT || 8000
app.listen(port, () => {
  console.log("port is running", port)
})
