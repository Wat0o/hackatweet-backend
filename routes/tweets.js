var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');

router.post('/', (req, res) => {
    const newTweet = new Tweet ({
        id: Date.now().toString(),
        content: req.body.content,
        author: req.body.author,
        firstname : req.body.firstname,
        likes: 0,
        likedBy: []
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

router.put('/', (req, res) => {
    const author = req.body.author
    const tweetId = req.body.tweetId
    Tweet.findOne({id: tweetId}).then(data=> {
        if(data.likedBy.includes(author)){
            Tweet.updateOne({id: tweetId}, { $pull: { likedBy: author }, $inc: { likes: -1 } })
                .then(() => {
                    Tweet.findOne({id: tweetId}).then(data => {
                        res.json(data)
                    })
                })
        }else{
            Tweet.updateOne({id: tweetId}, { $addToSet: { likedBy: author }, $inc: { likes: 1 } })
            .then(() => {
                Tweet.findOne({id: tweetId}).then(data => {
                    res.json(data)
                })
            })
        }
    })
})

router.get('/hashtag/:hashtag', (req, res) => {
    const hashtag = req.params.hashtag.toLowerCase();
    Tweet.find({content: { $regex: `#${hashtag}`, $options: 'i'}})
        .then(data=> res.json(data))
})

module.exports = router