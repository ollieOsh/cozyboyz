"use strict";

app.controller("NavCtrl", function ($scope, $location, DataFactory, AuthFactory) {
	console.log("~ NavCtrl yay! ~");

	let userObj = {
		mood: "",
		name: "",
		private: false,
		personality: "",
		uid: ""
	};

	$scope.isLoggedIn = false;

	firebase.auth().onAuthStateChanged((user) => {
		if(user) {
			$scope.isLoggedIn = true;
			console.log("somebody done logged in", user);
			if(user.displayName) {
				console.log("USER", user);
				userObj.name = user.displayName;
			}else {
				userObj.name = "Stranger";
			}
			userObj.uid = user.uid;

			DataFactory.getUser(user.uid)
			.then((response) => {
				console.log("getUser", response.data);

				if(response.data) {
					console.log("fuckin ayyyy. welcome back brew");
					userObj = response.data;
					$location.path("/fuckhole");
				}else {
					DataFactory.addUser(user.uid, userObj);
					$location.path('/profile');
				}
			});

			$scope.$apply();
		}else {
			$scope.isLoggedIn = false;
			console.log("ain't nobody logged in");
		}
	});

	$scope.go = () => {
		$location.url(`${userObj.name}`);
	};
});