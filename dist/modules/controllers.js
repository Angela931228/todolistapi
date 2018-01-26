'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('./firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var TodoItem = require('./todoItem');

router.post('/todoItem/:userId/:todoName/:todoDeadline', function (req, res) {
  var data = {
    userId: req.params.userId,
    todoName: req.params.todoName,
    todoDeadline: req.params.todoDeadline,
    createdTime: Date.now()
  };
  var todoId = TodoItem.add(data);
  res.status(200).send({ todoId: todoId });
});

router.get('/todoItem/:todoId', function (req, res) {
  TodoItem.getById(req.params.todoId, function (todoItem, err) {
    if (err || typeof err !== 'undefined') return res.status(500).send("There was a problem finding the todo item.");
    if (!todoItem) return res.status(404).send("No todoItem found.");
    res.status(200).send(todoItem);
  });
});

router.put('/todoItem/:todoId/:todoDeadline', function (req, res) {
  var todoId = req.params.todoId;
  var todoDeadline = req.params.todoDeadline;
  TodoItem.update(todoId, 'todoDeadline', todoDeadline, function (todoItem, err) {
    if (err || typeof err !== 'undefined') return res.status(500).send(err);
    if (!todoItem) return res.status(404).send("No todoItem found.");
    res.status(200).send(todoItem);
  });
});

router.delete('/todoItem/:todoId', function (req, res) {
  var todoId = req.params.todoId;
  TodoItem.deleteById(todoId, function (err) {
    if (err || typeof err !== 'undefined') return res.status(500).send(err);
    res.status(200).send({ result: "success" });
  });
});

router.get('/todoItems/:userId', function (req, res) {
  var userId = req.params.userId;
  TodoItem.getByUserId(userId, function (todoItems) {
    res.status(200).send(todoItems);
  });
});

exports.default = router;