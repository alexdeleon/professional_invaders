$.getScript("http://cdn-files.deezer.com/js/min/dz.js", function(data, textStatus, jqxhr) {
	DZ.init({
		appId  : '116545',
		channelUrl : 'http://localhost/channel.php',
		player : {
			container : 'player',
			cover : true,
			playlist : false,
			width : 650,
			height : 80,
			onload : function(){
 					playRadio(203);
			}
		}
	});
   
});

function playRadio(radio){
	DZ.player.playRadio(radio, 20, function(response){
		console.log("track list", response.tracks);
	});
}


function playTrack(track){
	DZ.player.playTracks([track], 0, function(response){
		console.log("track list", response.tracks);
	});
}