$(document).ready(function() {

	var cycleTimeout = 15000;
	var img1 = $("#image-1");
	var	sourceText = $('#attrib-copy');

	function formatDate(d) {
		return ((d.getMonth()+1) + "/" + d.getFullYear());
	}
	/*
		every N seconds i ask for a new image
		i add the image to the queue
		
	*/
	function getCover() {
		sourceText.append(" <i>Loading...</i>");
		$.get('/cover', function(res,code) {
			console.log(res.url);
			if(res.error) {
				alert("Sorry, but an error was thrown.");
				console.log(res.error);
			} else {
				img1.attr("src", res.url);
				var d = new Date(res.date);
				var source = res.title + " / Published " + formatDate(d);
				sourceText.text(source);
				setTimeout(getCover, cycleTimeout);
			}
		});

	}
	
	getCover();
	
});