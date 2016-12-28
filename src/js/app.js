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
	on: true,
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
}]);

app.controller('homeController', ['$scope', function($scope) {
	if (debug.on && (debug.levels.indexOf(0) != -1 || debug.levels.indexOf(4) != -1)) {
		console.log("----- Home Controller -----");
	}
	$scope.header = "Home";
	$scope.pageID = 'home';
}]);

app.controller('aboutController', ['$scope', function($scope) {
	if (debug.on && (debug.levels.indexOf(0) != -1 || debug.levels.indexOf(5) != -1)) {
		console.log("----- About Controller -----");
	}

	$scope.header = "About";
	$scope.pageID = 'about';
}]);

app.controller('contactController', ['$scope', '$http',  function($scope, $http) {

	if (debug.on && (debug.levels.indexOf(0) != -1 || debug.levels.indexOf(6) != -1)) {
		console.log("----- Contact Controller -----");
	}

	$scope.header = "Contact";
	$scope.pageID = 'contact';

	$scope.formData = {};

	$scope.phoneNumber = "<YOUR NUBER HERE>";
	$scope.emailAddress = "<YOUR EMAIL HERE>";

	$scope.result = '';
    $scope.resultMessage;
    $scope.submitClicked = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitt

	$scope.submit = function(e) {
		$scope.submitted = false;
		$scope.submitClicked = true;

        $scope.formData.$valid = true;
        $scope.formData.recipient = $scope.emailAddress;

        //@TODO Write validation for this

        function validateForm() {

        	var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

       		if (!$scope.formData.name == "") {
       			$scope.resultMessage = "Please enter a Name";
       			return false;
       		}

       		if (!$scope.formData.email) {
       			$scope.resultMessage = "Please enter an email";
       			return false;
       		} else if (emailRegex.test($scope.formData.email)) {
       			$scope.resultMessage = "Please enter a valid email";
       			return false;
       		}
       		return true;
        }

        if ($scope.formData.$valid) {
        // if (validateForm()) {
            $http({
                method  : 'POST',
                url     : './php/contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data) {
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                	console.log("Error Mailing");
                	console.log(data);
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
            $scope.result='bg-danger';
        }
        e.preventDefault();
	};
}]);