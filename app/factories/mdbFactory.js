"use strict";

app.factory("MDBFactory", function($q, $http, AuthFactory, MDBCreds) {

	let user = AuthFactory.getUser(),
		genres = {
			Action: 28,
			Adventure: 12,
			Animation: 16,
			Comedy: 35,
			Crime: 80,
			Documentary: 99,
			Drama: 18,
			Family: 10751,
			Fantasy: 14,
			History: 36,
			Horror: 27,
			Music: 10402,
			Mystery: 9648,
			Romance: 10749,
			SciFi: 878,
			TVMovie: 10770,
			Thriller: 53,
			War: 10752,
			Western: 37
		};

	const getMovies = (withGenre, withoutGenre, indie) => {
		return $q((resolve, reject) => {
			console.log(MDBCreds.searchURL + withGenre + withoutGenre);
			$http.get(`${MDBCreds.searchURL}${withGenre}${withoutGenre}`)
			.then((data) => {
				console.log(data.data);
			});
		});
	};

	return {getMovies};
});