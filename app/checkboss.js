function checkIfBossRequested() {
$.get('http://pro-invaders.appspot.com/', function(data) {
	console.log(data);
  if (data != 'false') {
  	console.log('spawning boss!');
    spawnBoss = true;
    if (data.indexOf('<') > 0) {
    	bossRequestor = data.substring(0, data.indexOf(' <'));
    }
  }
});
}