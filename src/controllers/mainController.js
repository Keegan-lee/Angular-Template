app.controller('mainController', ['$scope', '$state', '$location', '$rootScope', function($scope, $state, $location, $rootScope) {
	if (debug.on && (debug.levels.indexOf(0) != -1 || debug.levels.indexOf(3) != -1)) {
		console.log("----- Main Controller -----");
	}

	var iconPath = './img/icons/';

	$scope.routes;

	$scope.init = function() {
		if (debug.on && (debug.levels.indexOf(0) != -1 || debug.levels.indexOf(3) != -1)) {
			console.log("----- init() ----");
		}
		buildMenu();
	};

	var buildMenu = function() {
		var s = $state.get();
		$scope.routes = [];
		for (i = 1; i < s.length; i++) {
			if (s[i].data.main) {

				if (s[i].name == 'home') {
					$scope.title = s[i].data.title;
				} else {
					$scope.routes.push({
						name: s[i].data.title,
						route: s[i].name,
						url: s[i].url
					});
				}
			}
		}
	};

	$scope.test = function() {
		console.log("Something");
		return 1;
	}
}]);