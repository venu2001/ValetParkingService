module.exports = function(router) {

	router.get('/sample', function(req, res) {
		res.send('success');
	});

	router.get('/someother', function(req, res) {
		res.send('someother');
	})

}