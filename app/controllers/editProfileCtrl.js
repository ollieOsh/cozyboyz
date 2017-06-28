"use strict";

app.controller("EditProfileCtrl", function($scope, DataFactory, AuthFactory, TraitifyFactory) {
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
		console.log("EditProfileCtrl", $scope.userObj);
	});

	$scope.editUser = () => {
		console.log("changes", $scope.userObj);
		DataFactory.editUser($scope.userObj.uid, $scope.userObj);
	};

	$scope.newAssessment = () => {
		TraitifyFactory.register()
		.then((data) => {
			console.log(data);
			DataFactory.editUser(user, {assessmentid: data.data.id, personality: ""});
			$scope.userObj.assessmentid = data.data.id;
			$scope.userObj.personality = "*Take the Personality Quiz!*";
			DataFactory.getUser(user);
		});
	};
});