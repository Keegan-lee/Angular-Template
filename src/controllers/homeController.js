app.controller('homeController', ['$scope', function($scope) {
	if (debug.on && (debug.levels.indexOf(0) != -1 || debug.levels.indexOf(4) != -1)) {
		console.log("----- Home Controller -----");
	}
	$scope.header = "Home";
	$scope.pageID = 'home';
}]);