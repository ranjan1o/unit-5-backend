const { model, models } = require("mongoose");
const nodemailer = require("nodemailer");
module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "a3592016210013", // generated ethereal user
      pass: "2bac8df2d98ff1", // generated ethereal password
    },
  });