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

function getCompanyLogo(companyId) {

  IN.API.Raw('/companies/'+companyId+':(logo-url)').method('get').result(
    function(result){
      return result.logoUrl;
    }
  )
        
}

function extractCompanyLogos(positions) {
    var position = positions[0];
    if(position.company){
      var companyId = position.company.id;
      if(companyId){
        var logo = getCompanyLogo(companyId);
        if (logo) {
          companies_pics.push(logo);
        }
      }
    }

}

function processConnections(result) {
    
  for (var index in result.values) {
    profile = result.values[index];
    if (profile.pictureUrl) {
      connections_pics.push(profile.pictureUrl);
      if(profile.positions._total) {
        extractCompanyLogos(profile.positions.values);
      }
    }    
  }
}

function getConnectionData(callback) {
  IN.API.Connections("me")
    .fields(["pictureUrl", "positions"])
    .result(function(result) {
      processConnections(result);
      callback();
    });
}

function loadStuff(callback) {
  getMyPicture();
  
  //Load my connections pictures and company logos
  getConnectionData(callback);
}