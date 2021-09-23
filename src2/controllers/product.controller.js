const product = require("../models/product.model")
const express=require("express")
const route = express.Router()
const auth = require("../middleware/authmiddleware")
const authorize=require("../middleware/authorizationmiddleware")


route.post("", auth,authorize(["Seller","Admin"]), async (req, res) => {
    res.send("sucess")
})
module.exports=route