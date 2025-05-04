const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
    id: String,
    content: String,
    author: String,
    likes: Number,
    isLiked: Boolean
})

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;