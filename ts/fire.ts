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
const fire = firebase.initializeApp(config);
export default fire;

// How to retrieve tokens ?
// import fire from "../../../fire";
// const retrieveTokens = () => {
//     const db = fire.database();
//     const ref1 = db.ref("tokens/gcal_client_id");
//     ref1.on("value", (snapshot) => {
//          var client_id = snapshot.val();
//     }, (errorObject) => {
//         console.log("The read failed: " + errorObject.code);
//     });
// }
