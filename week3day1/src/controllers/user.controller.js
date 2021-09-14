
const express = require('express');

const router = express.Router();
const User = require('../models/user.model')
//CRUD operation for user
//1. create a user 

router.post("", async (req, res) => {
    const user = await User.create(req.body)
    return res.status(201).json({ user })
})







module.exports = router;