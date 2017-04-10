var app = angular.module('app', ['ui.router']);

/*********************************************************************** Debug
 *
 * 		on 		-	Boolean 	-	true OR false
 *
 * 		level 	-	Integer		-	Options below
 *
 ************************************************************************ Main
 *		0	: 	ALL
 * 		1	: 	Config
 * 		2	: 	Run
 ***************************************************************** Controllers
 * 		3	: 	Main Controller
 * 		4	: 	Home Controler
 * 		5	: 	About Controller
 * 		6	: 	Contact Controller
 ******************************************************************** Services
 */
var debug = {
	on: false,
	levels: [3]
};
/****************************************************************************/

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	if (debug.on && (debug.levels.indexOf(0) != -1 || debug.levels.indexOf(1) != -1)) {
		console.log("----- App Configuration -----");
	}

	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state ('home', {
			url: '/home',
			data: {
				title: 'Home',
				main:true
			},
			templateUrl: 'templates/home.html',
			authenticate: false
		})
		.state ('about', {
			url: '/about',
			data: {
				title: 'About',
				main:true
			},
			templateUrl: 'templates/about.html',
			authenticate: false
		})
		.state ('contact', {
			url: '/contact',
			data: {
				title: 'Contact',
				main:true
			},
			templateUrl: 'templates/contact.html',
			authenticate: false
		})
		.state ('elements', {
			url: '/elements',
			data: {
				title: "Elements",
				main: true
			},
			templateUrl: 'templates/elements.html',
			authenticate: false
		})
		.state ('tests', {
			url: '/tests',
			data: {
				title: "Tests",
				main: true
			},
			template: "<div ui-view></div>",
			authenticate: false
		})
		.state ('tests.firebase', {
			url: '/firebase',
			data: {
				title: "Firebase",
				main: false
			},
			templateUrl: 'templates/tests/firebase.html',
			authenticate: false
		});
}]);

app.run(['$rootScope', '$state', function($rootScope, $state) {
	if (debug.on && (debug.levels.indexOf(0) != -1 || debug.levels.indexOf(2) != -1)) {
		console.log("----- App Run -----");
	}

	$rootScope.state = $state;

	$rootScope.$on('$stateChangeSuccess', function(event, toState) {
		if (debug.on && (debug.levels.indexOf(0) != -1 || debug.levels.indexOf(2) != -1)) {
			console.log("---- Changing State ----");
			console.log(toState);
		}
	});
}]);