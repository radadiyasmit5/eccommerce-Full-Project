const User= require("../models/user")

exports.authfunction = async function (req, res) {
    const { email, name, picture } = req.user;

    const finduser = await User.findOneAndUpdate({ email }, { name:email.split("@")[0], picture }, { new: true })
  
    if (finduser) {
            res.json({finduser})
    } else {
        const user = await new User({ email, name, picture }).save()
        res.json({ user })
    }
}
exports.currentuser = async(req,res) => {
    
    const { name, email, picture } = req.user
    
    const user = User.findOne({ email }).exec((err, result) => {
        if(err) throw new err(err)
        res.json(result)
    })

}