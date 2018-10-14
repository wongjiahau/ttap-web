# [Timetable Arranging Program - Web (TTAP)](https://github.com/wongjiahau/ttap-web)
## Special thanks to
- My parents
- Keli
- Dr. Madhavan
- Dr. Victor
- Mr. James
- Sean Ho
- Heng
- All those who tested TTAP


[![Greenkeeper badge](https://badges.greenkeeper.io/wongjiahau/ttap-web.svg)](https://greenkeeper.io/)
[![travis-ci](https://travis-ci.org/wongjiahau/ttap-web.svg?branch=master)](https://travis-ci.org/wongjiahau/ttap-web)
[![BCH compliance](https://bettercodehub.com/edge/badge/wongjiahau/ttap-web?branch=master)](https://bettercodehub.com/)
[![codecov](https://codecov.io/gh/wongjiahau/ttap-web/branch/code-cov/graph/badge.svg)](https://codecov.io/gh/wongjiahau/ttap-web/branch/code-cov)
[![Maintainability](https://api.codeclimate.com/v1/badges/5ce98f451482c90bfce6/maintainability)](https://codeclimate.com/github/wongjiahau/ttap-web/maintainability)
## Objectives
This software is used to helps student's of UTAR to arrange their timetable without frustration.
## Technologies used :
- [Facebook's React](https://reactjs.org/)
- [Microsoft's Visual Studio Code](https://code.visualstudio.com/)
- [Microsoft's TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Redux](http://redux.js.org/)
- [GitHub](https://github.com/)
- [Surge](https://surge.sh/)
- [Create-React-App](https://github.com/facebookincubator/create-react-app)
- [Material-UI](https://material-ui-next.com/)

## How to build this app?
### Prerequisites
1. Make sure you have installed [Git](https://git-scm.com/downloads) and 
[Node.js](https://nodejs.org/en/).

### Steps
#### 1. Clone the project
```
git clone https://github.com/wongjiahau/ttap-web.git
```

#### 2. Install all the required Node packages
```
cd ttap-web
npm install
```

#### 3. Compile TypeScript files into JavaScripts
Make sure you are in the `ttap-web` directory.  
This will start the `Typescript compiler` in --watch mode
```
./scripts/watch
```

#### 4. Run the server
You need to run this in another terminal.
```
npm run start
```
#### 5. Enjoy!


## Extra
### How to run test?
```
./transpile
npm run test
```

### How to visualize bundle size and dependencies in this app?
```
npm run analyze
```
It is also hosted at https://ttap-source-analysis.surge.sh

### How many visits are there to ttap.surge.sh?
To view the analytical data, go to https://goo.gl/#analytics/goo.gl/nHNNCF/all_time
