"use strict";

app.controller('TraitifyCtrl', function(TraitifyCreds, $scope, DataFactory, AuthFactory, TraitifyFactory) {
	console.log("~ TraitifyCtrl Yay! ~");

	let user = AuthFactory.getUser();

	$scope.obj = {
		assessmentid: "",
		mood: "",
		name: "",
		private: false,
		personality: "",
		uid: ""
	};

	$scope.quiz = () => {
		Traitify.setPublicKey(TraitifyCreds.publicKey);
		Traitify.setHost("api-sandbox.traitify.com");
		Traitify.setVersion("v1");
		console.log("TraitifyCtrl", user);
		DataFactory.getUser(user)
			.then((obj) => {
				$scope.obj = obj.data;
				console.log("HIIIII", $scope.obj);
			let assessmentId = $scope.obj.assessmentid;
			console.log("this is it", $scope.obj.assessmentid, Traitify);

			//Traitify.ui.load(assessmentId, '.assessment');
			Traitify.ui.load(assessmentId, ".slide-deck", {
			results: {target: ".results"},
			personalityTypes: {target: ".personality-types"},
			personalityTraits: {target: ".personality-traits"}
			});
		});
	};

	$scope.newAssessment = () => {
		TraitifyFactory.register()
		.then((data) => {
			console.log("assessmentid", data.data);
			DataFactory.editUser(user, {assessmentid: data.data.id, personality: ""});
			$scope.userObj.assessmentid = data.data.id;
			$scope.userObj.personality = "*Take the Personality Quiz!*";
			DataFactory.getUser(user)
			.then(() => {
				$scope.quiz();
			});
		});

		DataFactory.getUserMovies(user)
		.then((results) => {
			results.forEach(function(movie) {
				console.log(movie.fb);
				DataFactory.removeMovie(movie.fb);
			});
		});
	};

	$scope.save = () => {
		let result = $(".personality-blend > .name")[0].innerHTML;

		console.log("fart box", result, $('#userPersonality'));
		$('#userPersonality')[0].innerHTML = result;
		DataFactory.editUser(user, {personality: result})
		.then((resultObj) => {
			console.log(resultObj);
		});
	};


	//$scope.quiz();
});
