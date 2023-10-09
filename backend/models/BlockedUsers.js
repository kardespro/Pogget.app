const mongoose = require("mongoose")
const sema = new mongoose.Schema({
  token: String,
  blocked: Boolean,
  verify_code: String
})
module.exports = mongoose.model("BlockedUser", sema)