const mongoose = require("mongoose")
/*const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  iconURL: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  repoURL: {
    type: String,
    required: true
  },
  downloadURL: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});
const sema = new mongoose.Schema({
  token: String,
  plugins: [commentSchema],
  wait_plugins: [commentSchema]
})*/
const sema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  repoURL: String,
  iconURL: String,
  downloadURL: String,
  description: String,
  status: String,
  starCount: Number,
  authorIcon: String,
  readmeURL: String,
  downloadCount: String,
  Date: Number,
  comments: [
    {
      authorName: String,
      authorIcon: String,
      location: String,
      comment: String
    }
  ]
})
module.exports = mongoose.model("Global", sema)