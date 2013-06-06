var radio_electronic = 267;
var radio_pop = 203;
var follow_the_leader_song = 60702970;

$.getScript("http://cdn-files.deezer.com/js/min/dz.js", function(data, textStatus, jqxhr) {
	DZ.init({
		appId  : '116545',
		channelUrl : 'http://localhost/channel.html',
		player : {
			container : 'musicPlayer',
			cover : false,
			playlist : false,
			width : 200,
			height : 520,
			format: 'vertical',
			onload : function(){
 				// playRadio(radio_electronic);
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