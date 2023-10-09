const mongoose = require("mongoose")
const sema = new mongoose.Schema({
  token: String,
  github_access_token: String
})
module.exports = mongoose.model("Tokens", sema)