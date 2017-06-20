"use strict";

//Login + Logout functions, Authorization (from AuthFactory)

app.controller("AuthCtrl", function ($scope, AuthFactory, $window, $location) {
	console.log("~ AuthCtrl yay! ~");
	// body...

	$scope.account = {
		email: '',
		password: ''
	};

	$scope.logout = () => {
		console.log("Logging Out");
		AuthFactory.logoutUser()
		.then((data) => {
			console.log("~Logged Out~", data);
			$window.location.href = '#!/'; //so user can't press back and view stuff again
		}, (error) => {
			console.log("error occurred on logut", error);
		});
	};

	//when first loaded, make sure no one is logged in
	if (AuthFactory.isAuthenticated()) {
	  $scope.logout();
	}

	$scope.register = () => {
		console.log("you clicked register");
		AuthFactory.createUser({
			email: $scope.account.email,
			password: $scope.account.password
		})
		.then((userData) => {
			console.log("UserCtrl newUser:", userData);
	    	// $window.location.href = "#!/profile";
			$scope.login();
		}, (error) => {
		    console.log("Error creating user:", error);
		});
	};

	$scope.login = () => {
	  console.log("you clicked login");
	  AuthFactory
	    .loginUser($scope.account)
	    .then(() => {
	      $scope.isLoggedIn = true;
	      console.log("UserCtrl: user is loggedIn", $scope.isLoggedIn );
	      // $window.location.href = "#!/";
	      $scope.$apply();
	    });
	};

	$scope.loginGoogle = () => {
		console.log("Google Log In");
		let provider = new firebase.auth.GoogleAuthProvider();
		AuthFactory.authWithProvider(provider)
		.then((result) => {
			var user = result.user.uid;
			console.log("result", result);
			// $location.path("#!/profile");
			$scope.$apply();
		})
		.catch((error) => {
			console.log("there was an error logging in", error);
			let errorCode = error.code,
				errorMessage = error.message,
				email = error.email,
				credential = error.credential;
		});
	};
});