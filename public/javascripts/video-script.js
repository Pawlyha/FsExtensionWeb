/**
 * Created by owner on 15.11.15.
 */

    // TEST SERVICE
var videoService = (function($){
    var module = {};

    module.play = function(){
        return invokeAction("play");
    };

    module.pause = function(){
        return invokeAction("pause");
    };

    module.setVolume = function(value){
        return invokeAction("set-volume?value="+value);
    };


    function invokeAction(action){
        if(typeof action !== "string")
            return;

        return $.ajax({
            url: "/video/" + action,
            method: "GET"
        });
    }

    return module;
})(jQuery);

(function($, vs){
    var socket = io("http://localhost:8080");
    var videoPlayer = $("#fs-video-player").get(0);
    /*
    $('#play-btn').click(function(){
        vs.play();
    });

    $('#pause-btn').click(function(){
        vs.pause();
    });

    $('#volume-up').click(function(){
        vs.setVolume(0.8);
    });

    $('#volume-down').click(function(){
        vs.setVolume(0.2);
    });
    */
    socket.on('video', function(data){
       if(data.action === "play" && videoPlayer.paused){
           videoPlayer.play();
       }else if(data.action === "pause" && videoPlayer.played){
           videoPlayer.pause();
       }else if(data.action === "setVolume"){
            if(0 <= data.value <= 1){
                videoPlayer.volume = data.value;
            }
       }
    });



})(jQuery, videoService);


