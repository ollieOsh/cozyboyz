# 2Comfy2Cozy

This is a web app designed to help users find tailored movie recommendations based on their personality and current mood. 

## Dependencies

*see package.json for dependencies*

From the main directory:
```
cd lib
npm install
```

###* API Keys
    * Traitify (specifically the 'Movie Personality' assessment)
    * TheMovieDB
    * Firebase

*Once you have them*

From the main directory:
 ```
mkdir app/values
cd app/values
```
* Make a new file to store each key in the following formats:
    * Traitify
    ```
    app.constant("TraitifyCreds", {
    publicKey: "YOUR_PUBLIC_KEY",
    secretKey: "YOU_PRIVATE_KEY",
    databaseURL: "https://api-sandbox.traitify.com/v1/assessments"
    });
    ```
    * TheMovieDB
    ```
    app.constant("MDBCreds", {
    apiKey: {YOUR_KEY},
    searchURL: "https://api.themoviedb.org/3/discover/movie?api_key={YOUR_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_original_language=en&with_genres=",
    creditURL: "https://api.themoviedb.org/3/movie/",
    endCreditURL: "/credits?api_key={YOUR_KEY}",
    posterURL: "https://image.tmdb.org/t/p/w500"
    });
    ```
    * Firebase
    ```
    app.constant("FBCreds", {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DB_URL"
    });
    ```

## Run the app

* Run grunt
    * From the main directory: 
    ```
    cd lib
    grunt
    ```
* Start your local server
    * In a duplicate terminal window cd back into the main directory: 
    ```
    cd ..
    hs
    ```

## Other Technologies Used

* AngularJS
* Bootstrap
* JQuery
* Sass
