"use strict";

// FB interaction

app.factory("DataFactory", function($q, $http, FBCreds, AuthFactory){

	let user = AuthFactory.getUser();

	const addToWatchList = (movie) => {
		console.log("adding movie to fb");
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/movies.json`, JSON.stringify(movie))
			.then((movie) => {
				resolve(movie);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const editMovie = (movie, obj) => {
		console.log("editing movie", movie, obj);
		return $q((resolve, reject) => {
			$http.patch(`${FBCreds.databaseURL}/movies/${movie}.json`, JSON.stringify(obj))
			.then((newobj) => {
				resolve(newobj.data);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const rateMovie = () => {};

	const removeMovie = (movie) => {
		console.log("deleting movie", movie);
		let movies = [];
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/movies/${movie}.json`)
			.then((userMovies) => {
				resolve(movies);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const addUser = (uid, userObj) => {
		console.log("adding user to fb");
		return $q((resolve, reject) => {
			$http.put(`${FBCreds.databaseURL}/users/${uid}.json`, JSON.stringify(userObj))
			.then((userData) => {
				resolve(userData);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const getUser = (uid) => {
		console.log("getting user from fb");
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/users/${uid}.json`)
			.then((userData) => {
				resolve(userData);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};


	const getUserMovies = (user) => {
		console.log("getting users movies");
		let movies = [];
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/movies.json?orderBy="uid"&equalTo="${user}"`)
			.then((userMovies) => {
				if(userMovies.data) {
					let movieCollection = userMovies.data;
					Object.keys(movieCollection).forEach((key) => {
						movieCollection[key].fb = key;
						movies.push(movieCollection[key]);
					});
				}
				resolve(movies);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const getUserName = () => {};

	const editUser = (uid, editObj) => {
		console.log("editing", editObj);
		return $q((resolve, reject) => {
			$http.patch(`${FBCreds.databaseURL}/users/${uid}.json`, JSON.stringify(editObj))
			.then((obj) => {
				resolve(obj.data);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	return {addToWatchList, editMovie, rateMovie, removeMovie, addUser, getUser, getUserMovies, editUser};
});