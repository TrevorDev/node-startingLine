node-startingLine V2
============

NodeJS starting skeleton

##Starting Line uses:
- Frontend:
	- Bootstrap (http://getbootstrap.com/)
	- rivetsJS (http://rivetsjs.com/)
	- bower(package manager http://bower.io/)
- Backend:
	- NodeJS (http://nodejs.org/)
	- SocketIO (http://socket.io/)
	- KoaJS (http://koajs.com/)

##Setup (Ubuntu):
- Install NodeJS 0.12.x or io.js(I like to use nvm https://github.com/creationix/nvm for this
- Clone this repo and open terminal to the folder
- Run the following to install libraries globally:
	- npm install nodemon -g
	- npm install mocha -g
	- npm install bower -g
- Install project dependent libs(found in package.js) with:
	- npm install
	- bower install
- Run the application with:
	- nodemon --harmony app.js

##Deployment:
