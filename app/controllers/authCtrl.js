"use strict";

//Login + Logout functions, Authorization (from AuthFactory)

app.controller("AuthCtrl", function ($scope, AuthFactory, $window, $location) {
	console.log("~ AuthCtrl yay! ~");
	// body...
	$scope.logout = () => {
		console.log("Logging Out");
		AuthFactory.logoutUser()
		.then((data) => {
			console.log("~Logged Out~", data);
			$window.location.url = '#!/'; //so user can't press back and view stuff again
		}, (error) => {
			console.log("error occurred on logut", error);
		});
	};

	$scope.loginGoogle = () => {
		console.log("Google Log In");
		let provider = new firebase.auth.GoogleAuthProvider();
		AuthFactory.authWithProvider(provider)
		.then((result) => {
			console.log("result", result);
			$scope.apply();
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