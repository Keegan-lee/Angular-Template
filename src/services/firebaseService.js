app.service('firebaseService', ['$q', function($q) {

	var auth;
	var storage;
	var database;
	var fire;

	var config = {
    	apiKey: "AIzaSyCgHMiZtZJ0dlr2EsRTGvqZIw8aunROeEw",
    	authDomain: "template-91ca8.firebaseapp.com",
    	databaseURL: "https://template-91ca8.firebaseio.com",
    	projectId: "template-91ca8",
    	storageBucket: "template-91ca8.appspot.com",
    	messagingSenderId: "190737203648"
  	};


	this.init = function(config) {
		fire = firebase.initializeApp(config);

		fire.auth().onAuthStateChanged(function(user) {
  			if (user) { // User is logged in
  				$rootScope.loggedIn = true;
  			} else { // User is is logged out
  				$rootScope.loggedIn = false;
  			}
  		});


		fire.storage();
		fire.database();

		// Storage Functions
		this.storage.getRef = function(ref) {
			if (ref === null) return storage.ref();
			return storage.ref(ref);
		}

		// Database Functions
		this.database.getRef = function(ref) {
			if (ref === null) return database.ref();
			return database.ref(ref);
		}

	}


	this.storage = function() {
		return storage;
	}

	this.database = function() {
		return database;
	}

	this.auth = function() {
		return auth;
	}
}]);