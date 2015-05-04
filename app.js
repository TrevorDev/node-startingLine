var http = require('http')
var koa = require('koa')
var swig = require('swig')
var router = require('koa-router')
var serve = require('koa-static')
var views = require('co-views')
var jsonResp = require('koa-json-response')
var request = require('co-request')
var parse = require('co-body')

var config = {appPort: process.env.PORT || 3000}
var render = views('view', { map: { html: 'swig' } });
var app = koa()

//ROUTES
app.use(jsonResp())
app.use(router(app))
app.get('/', function*(){ this.body = yield render("index") })
app.get(/\/public\/*/, serve('.'))
app.get(/\/bower_components\/*/, serve('.'))

app.get('/api/get/test/:name', function *(){
    console.log(this.params)
    console.log(this.query)
	return this.jsonResp(200, {hello: "world"})
})

app.post('/api/post/test/:name', function *(){
    console.log(this.params)
    console.log(this.query)
    console.log(yield parse(this))
	return this.jsonResp(200, {hello: "world"})
})

app.post('/deploy', function*(){
	//TODO filter deployment with secret and filter to only push to master (see npm gith which didnt work when i tried)
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) { 
      console.log(stdout)
    }
    exec(". "+__dirname+"/deploy.sh", puts); // command to be execute
})

//Start server and listen on port
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

