"use strict";

const app = angular.module("2cozy", ["ngRoute", "ui.bootstrap"]);

let isAuth = (AuthFactory, $location) => new Promise ((resolve, reject) => {
	AuthFactory.isAuthenticated()
	.then((user) => {
		if(user) {
			console.log("u made it!");
			resolve();
		}else {
			console.log("REEEEEEJECTED!");
			reject();
			$location.path('/');
		}
	});
});

app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/auth.html',
		controller: "AuthCtrl"
	})
	.when('/logout', {
		templateUrl: 'partials/auth.html',
		controller: "AuthCtrl"
	})
	.when('/:profile', {
		templateUrl: 'partials/profile.html',
		controller: "ProfileCtrl",
		//resolve: {isAuth}
	})
	.when('/:profile/mood', {
		templateUrl: 'partials/mood.html',
		controller: "MoodCtrl",
		//resolve: {isAuth}
	})
	.when('/:profile/edit', {
		templateUrl: 'partials/profile-edit.html',
		controller: "EditProfileCtrl",
		//resolve: {isAuth}
	})
	.otherwise('/');
});

app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };

    firebase.initializeApp(authConfig);
});