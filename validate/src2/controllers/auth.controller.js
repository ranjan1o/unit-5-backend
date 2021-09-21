const User= require("../models/user.model")
require('dotenv').config()
const jwt = require('jsonwebtoken')
const newToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)
}



const signup = async (req, res) => {
    try {
        const user = await User.create(req.body)
        const token = newToken(user);
        return res.status(201).json({ token: token,"message":"u have registered sucessflly"});
    }
    catch (err) {
        return res.status(500).json({ status: "failed", message: "wow you have to try again practice makes man perfect" })
    }

};
const signin= async(req, res) => {
   try {
        let user = await User.findOne({ email: req.body.email }).exec();

        if (!user) return res.status(400).json({ status: "failed", message: "Please try with a different email" })

        const match = user.checkPassword(req.body.password);

        if (!match) return res.status(400).json({ status: "failed", message: "getting error please try again" })

        const token = newToken(user)
        return res.status(201).json({ token: token })
    } catch (err) {
        return res.status(500).json({ status: "failed", message: "something went wrong" })
    }

}


module.exports = {signup,signin};