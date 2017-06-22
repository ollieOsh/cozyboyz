"use strict";

app.controller("EditProfileCtrl", function($scope, DataFactory, AuthFactory) {
	console.log("~ EditProfileCtrl Yay! ~");

	let user = AuthFactory.getUser();

	$scope.userObj = {
		mood: "",
		name: "",
		private: false,
		personality: "",
		uid: ""
	};

	//console.log(user);

	DataFactory.getUser(user)
	.then((results) => {
		$scope.userObj = results.data;
		if(results.data.personality === ""){
			$scope.userObj.personality = "*Take the Personality Quiz!*";
		}
		console.log($scope.userObj);
	});

	$scope.editUser = () => {
		console.log("changes", $scope.userObj);
		DataFactory.editUser($scope.userObj.uid, $scope.userObj);
	};
});