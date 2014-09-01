var config = require('./lib/config')
    //var database = require('./lib/database')
var logger = require('koa-logger')
var router = require('koa-router')
var serve = require('koa-static')
var session = require('koa-session')
var views = require('co-views')
var parse = require('co-body')
var jsonResp = require('koa-json-response')
var koa = require('koa')
var swig = require('swig')
var https = require('https')
var http = require('http')
var request = require('request');
var fs = require('fs')
var passport = require('koa-passport'),
    LocalStrategy = require('passport-local').Strategy;
var app = koa()
var auth = require('./lib/auth.js');
var bodyParser = require('koa-bodyparser')
var session = require('koa-sess')
//Add database
// si = database.getSequelizeInstance()
//si.sync()

//var userCtrl = require('./controller/user')

//REMOVE IN PRODUCTION??
swig.setDefaults(config.templateOptions)
app.keys = ['your-session-secret']
app.use(session())
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(jsonResp())
app.use(router(app))

//ROUTES --------------------------------------------------------------------------------------------------------------------

//AUTH
auth.setRoutes(app);

//DEFAULTS
app.get('/', defaultPageLoad('index'))
app.get(/\/public\/*/, serve('.'))

//SECURE
var secured = new router()
app.use(function*(next) {
	console.log(this.session)
  if (this.isAuthenticated()) {
    yield next
  } else {
    this.redirect('/')
  }
})

secured.get('/account',defaultPageLoad('account'))

app.use(secured.middleware())

//API ROUTES
//app.get('/testUser', userCtrl.getUsers)

//PAGE HANDLERS ---------------------------------------------------------------------------------------------------------------------
function defaultPageLoad(pageName, requiresLogin) {
    return function * () {
        /*if(requiresLogin===true && !sessionHelper.isLoggedIn(this.session)){
			this.redirect('/login')
			return
		}*/
        var temp = {};
        this.body = yield render(pageName, temp)
    }
}

function render(page, template) {
    return views(__dirname + '/view', config.templateOptions)(page, template)
}

var server = http.createServer(app.callback())




//SOCKETIO ---------------------------------------------------------------------------------------------------------------------
var io = require('socket.io').listen(server);
io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

server.listen(config.appPort);
console.log('Started ----------------------------------------------' + config.appPort)
