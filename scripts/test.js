var request = require("request");
const options = {
    // url: 'https://api.github.com/repos/wongjiahau/ttap-web/contents/ts/tests/testData',
    url: 'https://raw.githubusercontent.com/wongjiahau/ttap-web/master/ts/tests/testData/heng_2017_nov.html',
    headers: {
        'User-Agent': 'hou32hou'
    }
}
request(options, function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    // const result = JSON.parse(body);
    // console.log(Object.keys(result[0]))

});
