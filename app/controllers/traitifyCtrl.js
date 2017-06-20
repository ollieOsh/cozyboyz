"use strict";

app.controller('TraitifyCtrl', function(TraitifyCreds, $scope, DataFactory, AuthFactory) {
	console.log("~ TraitifyCtrl Yay! ~");

	let user = AuthFactory.getUser();

	$scope.obj = {};



	$scope.quiz = () => {
		Traitify.setPublicKey(TraitifyCreds.publicKey);
		Traitify.setHost("api-sandbox.traitify.com");
		Traitify.setVersion("v1");

		DataFactory.getUser(user)
			.then((obj) => {
				$scope.obj = obj.data;
				console.log("HIIIII", $scope.obj);
			let assessmentId = $scope.obj.assessmentid;
			console.log("this is it", $scope.obj.assessmentid);

			//Traitify.ui.load(assessmentId, '.assessment');
			Traitify.ui.load(assessmentId, ".slide-deck", {
			results: {target: ".results"},
			personalityTypes: {target: ".personality-types"},
			personalityTraits: {target: ".personality-traits"}
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

	$scope.quiz();
});
