"use strict";

app.controller("NavCtrl", function ($scope, $location, DataFactory, AuthFactory, SearchTerm, TraitifyFactory) {
	console.log("~ NavCtrl yay! ~");

	$scope.userObj = {
		assessmentid: "",
		mood: "",
		name: "",
		private: false,
		personality: "",
		uid: ""
	};

	$scope.isLoggedIn = false;
	$scope.searching = SearchTerm;

	firebase.auth().onAuthStateChanged((user) => {
		if(user) {
			$scope.isLoggedIn = true;
			console.log("somebody done logged in", user);
			if(user.displayName) {
				console.log("USER", user);
				$scope.userObj.name = user.displayName;
			}else {
				$scope.userObj.name = "Stranger";
			}
			$scope.userObj.uid = user.uid;

			DataFactory.getUser(user.uid)
			.then((response) => {
				console.log("getUser", response.data);

				if(response.data) {
					console.log("fuckin ayyyy. welcome back brew");
					$scope.userObj = response.data;
					$location.path($scope.userObj.name + "/mood");
				}else {
					TraitifyFactory.register()
					.then((data) => {
						$scope.userObj.assessmentid = data.data.id;
						DataFactory.addUser(user.uid, $scope.userObj)
						.then(() =>{
							$location.path($scope.userObj.name + '/edit');
						});
					});
				}
			});

			$scope.$apply();
		}else {
			$scope.isLoggedIn = false;
			console.log("ain't nobody logged in");
		}
	});

	// $scope.go = () => {
	// 	$location.url(`${userObj.name}`);
	// };
});