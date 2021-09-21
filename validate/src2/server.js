const express = require('express')
const app = express();

const connect = require('./config/db')
const {signup,signin }=require("./controllers/auth.controller")
require("dotenv").config()
app.use(express.json())

app.post("/signup",signup);
app.post("/Login", signin);

app.listen(3001, async function (){
    await connect()
    console.log("ranjan i am listning  on port 3001 ");
})