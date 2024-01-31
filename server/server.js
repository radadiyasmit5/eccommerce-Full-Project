const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require('mongodb');

require("dotenv").config();
const fs = require("fs");
const { log } = require("console");
const app = express();

app.use(cors({
  origin: '*'
}));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE);



// const authrout = require("./routes/auth")  --- there are lots of routes in real application so import all routes automatically we can use fs.readdirsync methoud and map it threw all the file and require it
// app.use("/api",authrout) -- before i made it automate i was importing it like this manually


fs.readdirSync("./routes").map((r) => {
  app.use("/api", require("./routes/" + r));
}); // ---  after automation it is importing routes and i also write app.use() function there and push path into it.
// mongodb+srv://<username>:<password>@eccomerce.cvysv1z.mongodb.net/?retryWrites=true&w=majority


let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("port is running", port);
});
