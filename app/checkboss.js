function checkIfBossRequested() {
$.get('http://pro-invaders.appspot.com/', function(data) {
  if (data == 'true') {
  	console.log('spawning boss!');
    spawnBoss = true;
  }
});
}