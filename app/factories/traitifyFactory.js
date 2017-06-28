"use strict";

app.factory("TraitifyFactory", function($q, $http, TraitifyCreds, DataFactory, AuthFactory) {

	let user = AuthFactory.getUser();

	const register = () => {
		return $q((resolve, reject) => {
			let req = {
				method: 'POST',
				url: TraitifyCreds.databaseURL,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Basic ${TraitifyCreds.secretKey}:x`
				},
				data: {
					"deck_id": "movies"
				}
			};
			$http(req)
			.then((data) => {
				console.log("NEW ID", data.data);
				//DataFactory.editUser(user, {assessmentid: data.data.id});
				resolve(data);
			})
			.catch((error) => {
				console.log("ERROR", error);
			});
		});
	};

	return{register};
});