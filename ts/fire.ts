// Initialize firebase
const config = {
    apiKey: "API_KEY",
    authDomain: "ttap-web.firebaseapp.com",
    databaseURL: "https://ttap-web.firebaseio.com",
    projectId: "ttap-web",
    storageBucket: "ttap-web.appspot.com",
    messagingSenderId: "4207791492"
};
const firebase = require("firebase");
const fire =  firebase.initializeApp(config);
export default fire;
