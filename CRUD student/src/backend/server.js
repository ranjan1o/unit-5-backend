const express = require('express')
const connect = require('./config/db')
const Student = require("./models/student.model")

const app = express();
const cors = require("cors")
app.use(cors())

app.use(express.json())

const studentController = require('./controllers/student.controller')


app.use('/students', studentController)


app.listen(8000, async function () {
    await connect()
    console.log("listening on port 8000")
});