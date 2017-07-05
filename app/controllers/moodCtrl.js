"use strict";

app.controller("MoodCtrl", function(MDBCreds, MDBFactory, AuthFactory, DataFactory, $scope, $routeParams) {
	console.log("~ MoodCtrl Yay! ~");

	$scope.userObj = {};
	$scope.movies = [];
	//$scope.username = $routeParams.profile;

	let user = AuthFactory.getUser(),
		personality = {
			"Believer": "14,878",
			"Dramatic": "18",
			"​Dramatic": "18",
			"Indie": "18",
			"Laughaholic": "35",
			"​Laughaholic": "35",
			"NailBiter": "53,27",
			"​Romantic": "10749",
			"Romantic": "10749",
			"​StuntDouble": "28"
		},
		appy = {
			happy: 1,
			crappy: 2,
			sappy: 3,
			fappy: 4,
			nappy: 5
		},
		withGenre = "",
		wG = "",
		withoutGenre = "",
		woG = "",
		indie = false,
		isWatched = false,
		noShow = false,
		fam = "",
		cowboy = "",
		musical = "",
		martian = "",
		anime = "",
		currentMood = "",
		wanna = "";

	DataFactory.getUser(user)
	.then((userObj) => {
		$scope.userObj = userObj.data;
		console.log(userObj.data.personality);
		if(userObj.data.personality === ""| userObj.data.personality == "*Take the Personality Quiz!*"){
			$scope.userObj.personality = "*Take the Personality Quiz!*";
			$('.btn-danger').prop('disabled',true);
		}

		$scope.userObj.mood = "FANTASTIC";

		let arr = [];

		if(userObj.data.personality.indexOf('/') > 0) {
			console.log("holleh shit");
			arr = userObj.data.personality.split('/');
		}else {
			arr.push(userObj.data.personality);
		}

		console.log(arr);

		for(let i = 0; i < arr.length; i++) {
			arr[i] = arr[i].replace(" ", "");
			for(var prop in personality) {
				if(prop == arr[i]) {
					wG += personality[prop] + ',';
					console.log(prop, personality[prop]);
				}
			}
			if(arr[i] == "Indie") {
				indie = true;
			}
		}
				console.log(indie);
	});


	$scope.safeSearch = (safe) => {
		console.log("safeSearch", safe);
		if(safe) {
			fam = "10751,";
		}else {
			fam = "";
		}
	};

	$scope.western = (yeehaw) => {
		console.log("western", yeehaw);
		if(yeehaw) {
			cowboy = "37,";
		}else {
			cowboy = "";
		}
	};

	$scope.music = (tune) => {
		console.log("musical", tune);
		if(tune) {
			musical = "10402,";
		}else {
			musical = "";
		}
	};

	$scope.alien = (grey) => {
		console.log("martian", grey);
		if(grey) {
			martian = "878,";
		}else {
			martian = "";
		}
	};

	$scope.toons = (toon) => {
		console.log("anime", toon);
		if(toon) {
			anime = "16,";
		}else {
			anime = "";
		}
	};

	$scope.watchedIt = (watched) => {
		isWatched = watched;
		console.log(isWatched);
	};

	$scope.show = (nah) => {
		noShow = nah;
		console.log(noShow);
	};

	// $scope.addGenre = (genreID, val) => {
	// 		if(genreID){
	// 			console.log(genreID, val);
	// 			if(withGenre.indexOf(val) > -1){
	// 				withGenre += val + ',';
	// 			}

	// 		}else{
	// 			wG = '';
	// 		}
	// 		console.log(wG);
	// };

	$scope.getRecs = () => {
		$scope.movies = [];
		currentMood = $("input[name='appy']:checked").val();
		wanna = $("input[name='wanna']:checked").val();
		if(indie) {
			indie = "&vote_count.lte=2500&vote_average.gte=7";
		}
		withGenre += fam + musical + anime + cowboy + martian;
		console.log("withGenre", wG + withGenre);
		MDBFactory.getMovies(wG + withGenre, woG + withoutGenre, indie)
		.then((movieObj) => {
			console.log(movieObj);
			for(let i = 0; i < movieObj.results.length; i++) {
				$scope.movies.push(movieObj.results[i]);
				if($scope.movies[i].poster_path.indexOf(MDBCreds.posterURL) == -1){
					$scope.movies[i].poster_path = MDBCreds.posterURL + $scope.movies[i].poster_path;
				}
			}
		})
		.then(() => {
			DataFactory.getUserMovies(user)
			.then((movies) => {
				$scope.userMovies = movies;
				console.log("userMovies", $scope.userMovies, $scope.movies);
				for(let i = 0; i < $scope.movies.length; i++) {
					for(let j = 0; j < $scope.userMovies.length; j++){
						if($scope.userMovies[j].id == $scope.movies[i].id || $scope.userMovies[j].title == $scope.movies[i].title) {
							console.log("OYYY", $scope.movies[i]);
							$scope.movies.splice(i, 1);
							i = 0;
						}
					}
				}
				console.log("LENGTH", $scope.movies.length);
				if($scope.movies.length === 0){
					console.log("booty");
					$('#noMatch').html(`<h3>Oops, looks like we couldn't find anything to match!<h3>`);
				}else {
					$('#noMatch').html("");
				}
			});
		});
		withGenre = "";
		withoutGenre = "";
	};

	$scope.more = (movieID) => {
		movieID = '#' + movieID;
		let show = movieID + ' > .caption > p';
		console.log(show);
		$(show).toggleClass("hidden");
	};

	$scope.buildObject = (event) => {
		console.log(event);
		let movieObj = {
			title: event.target.parentElement.childNodes[1].firstChild.innerHTML,
			poster_path: event.currentTarget.offsetParent.childNodes[1].children[0].firstElementChild.currentSrc,
			id: event.currentTarget.offsetParent.firstElementChild.id,
			uid: user,
			overview: event.target.parentElement.lastElementChild.innerHTML,
			mood: "",
			watched: isWatched,
			noShow: noShow,
			rating: 0
		};
		return movieObj;
	};

	$scope.addToWatchlist = (event) => {
		console.log($scope.buildObject(event));
		DataFactory.addToWatchList($scope.buildObject(event))
		.then(() => {
			$scope.getRecs();
			isWatched = false;
			noShow = false;
		});
	};

});