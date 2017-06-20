"use strict";

app.controller("MoodCtrl", function(MDBFactory, AuthFactory, DataFactory, $scope) {
	console.log("~ MoodCtrl Yay! ~");

	$scope.userObj = {};

	let user = AuthFactory.getUser(),
		personality = {
			"Believer": "14,878",
			"Dramatic": "18",
			"Indie": "18",
			"Laughaholic": "35",
			"NailBiter": "53,27",
			"Romantic": "10749",
			"​StuntDouble": "28"
		},
		moods = {
			happy: 1,
			crappy: 2,
			sappy: 3,
			fappy: 4,
			nappy: 5
		},
		withGenre = "",
		withoutGenre = "",
		indie = false;

	DataFactory.getUser(user)
	.then((userObj) => {
		$scope.userObj = userObj.data;
		console.log(userObj.data.personality);

		let arr = [];

		if(userObj.data.personality.indexOf('/') > 0) {
			console.log("holleh shit");
			arr = userObj.data.personality.split('/');
			//console.log(arr, personality[arr[1]]);
		}else {
			arr.push(userObj.data.personality);
		}

		console.log(arr);

		for(let i = 0; i < arr.length; i++) {
			arr[i] = arr[i].replace(" ", "");
			for(var prop in personality) {
				if(prop == arr[i]) {
					withGenre += personality[prop] + ',';
					console.log(prop, personality[prop]);
				}
			}
			if(arr[i] == "Indie") {
				indie = true;
			}
		}
				console.log(indie);
	});

	$scope.getRecs = () => {
		let currentMood = $("input[name='appy']:checked").val();
		if(indie) {
			indie = "&vote_count.lte=2500&vote_average.gte=7";
		}
		MDBFactory.getMovies(withGenre, withoutGenre, indie);
		console.log(moods[currentMood]);
	};
});