const express = require('express');
const mongoose = require('mongoose');
const app = express();

const connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/logical', {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
//first step create schema
const userSchema = new mongoose.Schema({
    movie_name: { type: String, required: true },
    movie_genere: { type: String, required: true },
    production_year: { type: Number, required: false, default: "Male" },
   budget: { type: Number, required: true }
  
})
//second step is to create a model
const User = mongoose.model('movies', userSchema)
app.use(express.json())

app.get('/users', async (req, res) => {

    try {
     
        const users = await User.find().lean().exec();
        res.send(users)
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message })
    }

})
app.get('/users/:id', async (req, res) => {
    try {
     
        const users = await User.find({ "_id": req.params.id }).lean().exec();
        res.send(users)
    } catch (err) {
        console.log(err)
    }
})
app.post('/users', async (req, res) => {
 
    try {

        const user = await User.create(req.body)
        console.log(user)
        res.status(201).json({ user })
        // res.send({ user })
        console.log("ranjan is posted")
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message })
    }

})
app.patch('/users/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true})

        res.status(201).json({ user })
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message })
    }

})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id, req.body)

        res.status(201).json({ user })
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message })
    }

})
app.listen(3001, async () => {
    await connect();
    console.log("listening port 3001")
})

