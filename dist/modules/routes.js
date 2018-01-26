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

router.post('/todoItem/:userId/:todoName/:todoDeadline', function (req, res) {
  var userId = req.params.userId;
  var todoName = req.params.todoName;
  var todoDeadline = req.params.todoDeadline;

  var todoItem = {
    userId: userId,
    todoName: todoName,
    todoDeadline: todoDeadline,
    createdTime: Date.now()
  };
  var todoId = _firebase.todoRef.push(todoItem).key;
  res.json({
    todoId: todoId
  });
});

router.get('/todoItem/:todoId', function (req, res) {
  var todoId = req.params.todoId;

  _firebase.todoRef.child(todoId).once('value').then(function (snapshot) {
    var todoItem = snapshot.val();
    res.json(todoItem);
    res.end();
  });
});

router.put('/todoItem/:todoId/:todoDeadline', function (req, res) {
  var todoId = req.params.todoId;
  var todoDeadline = req.params.todoDeadline;

  _firebase.todoRef.child(todoId).once('value').then(function (snapshot) {
    var todoItem = snapshot.val();
    todoItem.todoDeadline = todoDeadline;

    var update = {};
    update['/todos/' + todoId] = todoItem;

    _firebase.ref.update(update);

    res.json(todoItem);
    res.end();
  }).catch(function (error) {
    console.log(error);
  });
});

router.delete('/todoItem/:todoId', function (req, res) {
  var todoId = req.params.todoId;

  _firebase.todoRef.child(todoId).remove().then(function () {
    res.json({
      result: 'Success'
    });
    res.end();
  }).catch(function (error) {
    res.json({
      result: 'Failed'
    });
    res.end();
  });
});

router.get('/todoItems/:userId', function (req, res) {
  var userId = req.params.userId;
  _firebase.todoRef.orderByChild('userId').equalTo(userId).once('value', function (snapshot) {
    var todoItems = [];
    snapshot.forEach(function (childSnapshot) {
      todoItems.push(childSnapshot.val());
    });
    res.json(todoItems);
    res.end();
  });
});

exports.default = router;