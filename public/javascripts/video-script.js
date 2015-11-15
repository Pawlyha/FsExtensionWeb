/**
 * Created by owner on 15.11.15.
 */

var videoService = (function($){
    var module = {};

    module.play = function(){
        return invokeAction("play");
    };

    module.pause = function(){
        return invokeAction("pause");
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

    $('#play-btn').click(function(){
        vs.play();
    });

    $('#pause-btn').click(function(){
        vs.pause();
    });

    socket.on('video', function(action){
       console.log(action);
    });



})(jQuery, videoService);


