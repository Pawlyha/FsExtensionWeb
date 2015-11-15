

(function($){

	var videoResponse = undefined;

	// append button to fs.to
	var button = $("<input type='button' id='fs-ext-button' class='btn btn-large right' value='Send URL'/>");
	$('body').prepend(button);


	// get currently played video data
	$('#fs-ext-button').on('click', function(){
		chrome.runtime.sendMessage({request: "get_video_response"}, function(response){
			if(response !== undefined){
				videoResponse = response;
				openPlayerWindow("http://localhost:3000/video?url=" + response.url);
			}

		});
	});


	function openPlayerWindow(url){
		var win = window.open(url, '_blank');
  		win.focus();
	}

})(jQuery);

