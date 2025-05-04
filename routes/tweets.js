var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');

router.post('/', (req, res) => {
    const newTweet = new Tweet ({
        id: Date.now().toString(),
        content: req.body.content,
        author: req.body.author,
        likes: 0,
        isLiked: false
      });
    newTweet.save().then(data =>{
        res.json({result: true, tweet: data})
    })
})

router.get('/', (req, res) => {
    Tweet.find().then(data=> {
        res.json({data: data})
    })
})

router.delete('/:tweetId', (req, res) => {
    Tweet.deleteOne({id: req.params.tweetId}).then(data=>{
        res.json({data: data})
    })
})

module.exports = router