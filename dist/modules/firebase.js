'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userTodoRef = exports.todoRef = exports.ref = undefined;

var _events = require('events');

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONFIG = require('../config/firebase/config');

_firebase2.default.initializeApp(CONFIG);

var ref = exports.ref = _firebase2.default.database().ref();
var todoRef = exports.todoRef = _firebase2.default.database().ref('todos');
var userTodoRef = exports.userTodoRef = _firebase2.default.database().ref('user-todos');

var firebaseModule = new _events.EventEmitter();

exports.default = firebaseModule;


ref.child('init').once('value', function () {
  return firebaseModule.emit('init');
});