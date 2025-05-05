const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
    id: String,
    content: String,
    firstname: String,
    author: String,
    likes: Number,
    likedBy : [String]
})

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;