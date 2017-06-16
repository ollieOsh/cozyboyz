"use strict";

// FB interaction

app.factory("DataFactory", function($q, $http, FBCreds, AuthFactory){

	let user = AuthFactory.getUser();

	const addToWatchList = () => {};

	const addToWatched = () => {};

	const rateMovie = () => {};

	const removeMovie = () => {};

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
		console.log("adding user to fb");
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


	const getUserMovies = () => {};

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

	return {addToWatchList, addToWatched, rateMovie, removeMovie, addUser, getUser, getUserName, editUser};
});