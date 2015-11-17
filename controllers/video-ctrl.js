/**
 * Created by owner on 15.11.15.
 */

var express = require('express');
var http = require('http').Server(express);
var io = require('socket.io')(http);
var router = express.Router();

http.listen(3001, "http://fsto-videoext.rhcloud.com");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('video', { url: req.query.url });
});

// play video player
router.get('/play', function(req, res, next){
    io.emit("video", {action: "play"});
    res.json({"status": "play"});
});

// pause video player
router.get('/pause', function(req, res, next){
    io.emit("video", {action: "pause"});
    res.json({"status": "pause"});
});

// change volume in the video player
router.get('/set-volume', function(req, res, next){
    io.emit("video", {action: "setVolume", value: req.query.value});
    res.json({"status": "setVolume"});
});


module.exports = router;
