const mongoose = require("mongoose")
const sema = new mongoose.Schema({
  token: String,
  starred: [{ plugin_id: String }]
})
module.exports = mongoose.model("User Stars", sema)