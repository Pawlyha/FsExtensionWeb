/**
 * Created by owner on 15.11.15.
 */

var express = require('express');
var http = require('http').Server(express);
var io = require('socket.io')(http);
var router = express.Router();

http.listen(8080, "127.0.0.1");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('video', { url: req.query.url });
});

// play video player
router.get('/play', function(req, res, next){
    io.emit("video", "play");
    res.json({"status": "play"});
});

// pause video player
router.get('/pause', function(req, res, next){
    io.emit("video", "pause");
    res.json({"status": "pause"});
});


io.on('connection', function(socket){
    console.log("connection is settled");
    socket.on('disconnect', function(){
       console.log("user is disconnected");
    });
});

module.exports = router;
