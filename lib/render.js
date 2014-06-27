var views = require('co-views');
var config = require('./../lib/config');

module.exports = views(__dirname + '/../view', config.templateOptions);