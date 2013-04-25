 
//close popup
$("#close").click(function(){
	$("#overlay_form").fadeOut(500);
});
 
//position the popup at the center of the page
function positionPopup(){
if(!$("#overlay_form").is(':visible')){
return;
}

$("#overlay_form").css({
	left: ($(window).width() - $('#overlay_form').width()) / 2,
	top: ($(window).width() - $('#overlay_form').width()) / 7,
	position:'absolute'
});
}
 
//maintain the popup at center of the page when browser resized
$(window).bind('resize',positionPopup);

function openPopup(){
	$("#overlay_form").fadeIn(1000);
	positionPopup();
}

function closePopup(){
	$("#overlay_form").fadeOut(500);
}

