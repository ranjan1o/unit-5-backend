
const express = require('express');
const path = require('path');
const router = express.Router();
const Student = require('../models/student.model')
//CRUD operation for user
//1. create a user 
router.post("", async (req, res) => {
    console.log(req.body)

    const student = await Student.create(req.body)
    return res.status(201).json({ student })
})


// 2.get all users
router.get("", async (req, res) => {
    const page = + req.query.page || 1;
    const size = +req.query.size || 10;
    console.log(req.query)
    const age = +req.query.age || false
    const gender = req.query.gender || false
    const city = req.query.city || false

    const offset = (page - 1) * size;
    console.log(age, gender)
    if (age || gender || city) {
        const students2 = await Student.find({ $and: [{ "age": age ? age : { $ne: -1 } }, { "gender": gender ? gender : { $ne: gender } }, { "city": city ? city : { $ne: city } }] }).skip(offset).limit(size).lean().exec()
        const totalPages = Math.ceil(await Student.find({ $and: [{ "age": { $gt: age } }, { "gender": gender }, { "city": city }] }).countDocuments().lean().exec() / size)

        return res.status(200).json({ data: students2, pages: totalPages })
    } else {
        const students = await Student.find().skip(offset).limit(size).lean().exec()
        const totalPages = Math.ceil(await Student.find().countDocuments().lean().exec() / size)
        return res.status(200).json({ data: students, pages: totalPages })
    }




})

// 3. get a single user
router.get("/:id", async (req, res) => {
    console.log(req.params.id)
    const student = await Student.find({ "_id": req.params.id }).lean().exec()
    return res.status(200).json({ student })
})

// 4. update a user
router.patch("/:id", async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.status(201).json({ student })
})

// 5 . delete a user 
router.delete("/:id", async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id)
    return res.status(200).json({ student })
})


module.exports = router;