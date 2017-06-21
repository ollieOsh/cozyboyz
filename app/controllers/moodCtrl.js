"use strict";

app.controller("MoodCtrl", function(MDBCreds, MDBFactory, AuthFactory, DataFactory, $scope) {
	console.log("~ MoodCtrl Yay! ~");

	$scope.userObj = {};
	$scope.movies = [];

	let user = AuthFactory.getUser(),
		personality = {
			"Believer": "14,878",
			"Dramatic": "18",
			"Indie": "18",
			"Laughaholic": "35",
			"NailBiter": "53,27",
			"​Romantic": "10749",
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
		indie = false,
		isWatched = false,
		noShow = false,
		currentMood = "";

	DataFactory.getUser(user)
	.then((userObj) => {
		$scope.userObj = userObj.data;
		console.log(userObj.data.personality);

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

	$scope.watchedIt = (watched) => {
		isWatched = watched;
		console.log(isWatched);
	};

	$scope.show = (nah) => {
		noShow = nah;
		console.log(noShow);
	};

	$scope.getRecs = () => {
		$scope.movies = [];
		currentMood = $("input[name='appy']:checked").val();
		if(indie) {
			indie = "&vote_count.lte=2500&vote_average.gte=7";
		}
		MDBFactory.getMovies(withGenre, withoutGenre, indie)
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
						if($scope.userMovies[j].id == $scope.movies[i].id) {
							console.log("OYYY");
							$scope.movies.splice(i, 1);
						}
					}
				}
			});
		});
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
			overview: event.target.parentElement.childNodes[15].innerHTML,
			mood: "",
			watched: isWatched,
			noShow: noShow,
			rating: 0
		};
		return movieObj;
	};

	$scope.addToWatchlist = (event) => {
		console.log($scope.buildObject(event));
		DataFactory.addToWatchList($scope.buildObject(event));
	};

	$scope.save = () => {};

});