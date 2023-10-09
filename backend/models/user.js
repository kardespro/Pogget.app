const mongoose = require("mongoose")
const sema = new mongoose.Schema({
  token: String,
})
module.exports = mongoose.model("User", sema)