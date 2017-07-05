"use strict";

app.controller("ProfileCtrl", function(AuthFactory, DataFactory, $scope, $location) {
	console.log("~ ProfileCtrl Yay! ~");

	let user = AuthFactory.getUser();

	$scope.movies = [];

	// let isWatched = false,
	// 	noShow = false;

	DataFactory.getUserMovies(user)
	.then((movies) => {
		$scope.movies = movies;
	});

	$scope.edit = (movie, toEdit) => {
		console.log("EDIT", toEdit, movie);
		DataFactory.editMovie(movie, toEdit)
		.then((it) => {
			console.log("updated fb", it);
		});
	};
});