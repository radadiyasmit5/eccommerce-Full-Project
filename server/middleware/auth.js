const admin = require("../firebase/firebase")
const model = require("../models/user")
exports.authcheck = async (req, res, next) => {
  try {
    let firebaseadmin
    await admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then((response) => {
        firebaseadmin = response
      })
      .catch((err) => {
        console.log(err)
      })
    req.user = firebaseadmin
    next()
  } catch (err) {
    console.log(err.message)
    res.status(401).json("invalid user name or password / user not found")
  }
}

exports.admincheck = async (req, res, next) => {
  const {email} = req.user

  const adminuser = await model.findOne({email}).exec()

  if (adminuser.role !== "admin") {
    res.status(403).json({err: "user is not admin"})
  } else {
    next()
  }
}
