const mongoose = require('mongoose');
// user model
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: false },

})

module.exports = mongoose.model("student", studentSchema)
