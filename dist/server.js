'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('./modules/load');

require('./modules/firebase');

var _controllers = require('./modules/controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_controllers2.default);

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  return console.log('Service is now running on port ' + port);
});

exports.default = server;