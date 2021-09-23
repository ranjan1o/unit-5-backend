const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

 const userSchema=new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
     password: { type: String, required: true, unique: true },
    roles: [{ type: String, required: false, default: "user" }],

 },
    {
    timestamp: true
})
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    const hash = bcrypt.hashSync(this.password, 8)
    this.password = hash;
    next();
})

userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;
    return bcrypt.compareSync(password, passwordHash)
}
module.exports=mongoose.model("users",userSchema)