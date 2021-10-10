var request = require("phin");
const options = {
  url: "https://api.github.com/repos/wongjiahau/ttap-sample-data/contents/",
  // url: 'https://raw.githubusercontent.com/wongjiahau/ttap-sample-data/master/',
  headers: {
    "User-Agent": "hou32hou",
  },
};
request(options, function (error, response) {
  console.log("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  console.log("body:", response.body.toString()); // Print the HTML for the Google homepage.
  // const result = JSON.parse(body);
  // console.log(Object.keys(result[0]))
});
