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
	- npm install pm2 -g
- Install project dependent libs(found in package.js) with:
	- npm install
	- bower install
- Run the application with:
	- nodemon --harmony app.js

##Deployment:
- Get a VM up and running on Azure or other provider
- ssh into the machine and clone repo and perform the above steps
- once it works as above try using pm2(https://github.com/Unitech/pm2) start app.js to run the app
- setup git webhooks (https://developer.github.com/webhooks/) to ping your app at yoursite/deploy to autodeploy
