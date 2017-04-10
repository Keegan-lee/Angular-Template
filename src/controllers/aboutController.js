app.controller('aboutController', ['$scope', function($scope) {
	if (debug.on && (debug.levels.indexOf(0) != -1 || debug.levels.indexOf(5) != -1)) {
		console.log("----- About Controller -----");
	}

	$scope.header = "About";
	$scope.pageID = 'about';
}]);