var connections_pics = [];
var companies_pics = [];
var self_pic = null;

var getMyPicture = function() {
  //Load my profile picture
  IN.API.Profile("me").fields(["pictureUrl"])
    .result(function(result) {
     self_pic = result.values[0].pictureUrl;
  });
}

function processConnections(result, callback) {
  for (var index in result.values) {
    profile = result.values[index];
    if (profile.pictureUrl) {
      connections_pics.push(profile.pictureUrl);
    }    
  }
  callback();
}

function getConnectionData(callback) {
  IN.API.Connections("me")
    .fields(["pictureUrl", "positions"])
    .result(function(result) {
      processConnections(result, callback);
    });
}

function loadStuff(callback) {
  getMyPicture();
  
  //Load my connections pictures and company logos
  getConnectionData(callback);
}