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